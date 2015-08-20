PadCrashing.Views.UserForm = Backbone.View.extend({
  template: JST["users/form"],

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});