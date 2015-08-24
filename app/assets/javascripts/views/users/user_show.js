EventSurfing.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  className: "container-fluid",

  events: {
    "click .profile": "editProfile",
    "click .message": "openMessageForm",
    "click .open-messages": "showMessages",
    "click .close-messages": "hideMessages"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);

    this.addSubview(
      ".user-show-main",
      new EventSurfing.Views.UserShowAbout({ model: this.model })
    );
  },

  editProfile: function () {
    var view = new EventSurfing.Views.UserForm({ model: this.model });

    new EventSurfing.Views.Modal({ subview: view });
  },

  openMessageForm: function () {
    var message = new EventSurfing.Models.Message();
    message.set({
      recipient_name: this.model.get("name"),
      recipient_id: this.model.id
    });
    var view = new EventSurfing.Views.MessageForm({ model: message });

    new EventSurfing.Views.Modal({ subview: view });
  },

  showMessages: function () {
    this.removeModelSubview(".user-show-main", this.model);
    this.addSubview(
      ".user-show-main",
      new EventSurfing.Views.MessageIndex({ model: this.model })
    );
    this.$(".open-messages")
      .addClass("close-messages")
      .removeClass("open-messages")
      .text("Hide Messages");
    this.attachSubviews();
  },

  hideMessages: function () {
    this.removeModelSubview(".user-show-main", this.model);
    this.addSubview(
      ".user-show-main",
      new EventSurfing.Views.UserShowAbout({ model: this.model })
    );
    this.$(".close-messages")
      .addClass("open-messages")
      .removeClass("close-messages")
      .text("View Messages");
    this.attachSubviews();
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    this.attachSubviews();

    this.model.avatar && this.$(".avatar-holder").css(
      "background-image",
      "url(" + this.model.avatar.escape("image_url") + ")"
    );

    return this;
  }
});