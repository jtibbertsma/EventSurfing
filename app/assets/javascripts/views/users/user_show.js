EventSurfing.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  className: "container-fluid",

  events: {
    "click .profile": "editProfile"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  editProfile: function () {
    var view = new EventSurfing.Views.UserForm({ model: this.model });

    new EventSurfing.Views.Modal({ subview: view });
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));

    this.model.avatar && this.$(".avatar-holder").css(
      "background-image",
      "url(" + this.model.avatar.escape("image_url") + ")"
    );

    return this;
  }
});