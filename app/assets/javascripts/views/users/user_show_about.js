EventSurfing.Views.UserShowAbout = Backbone.View.extend({
  template: JST["users/show_about"],

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});