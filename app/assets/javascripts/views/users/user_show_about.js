EventSurfing.Views.UserShowAbout = Backbone.View.extend({
  template: JST["users/show_about"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});