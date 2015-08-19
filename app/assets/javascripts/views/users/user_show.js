PadCrashing.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  className: "container-fluid",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));

    this.model.avatar && this.$(".avatar-holder").css(
      "background-image",
      "url(" + this.model.avatar.escape("image_url") + ")"
    );

    if (this.model.get("hosting_status") === "Accepting Guests") {
      this.$(".hosting-status").css("color", "green");
    }
    return this;
  }
});