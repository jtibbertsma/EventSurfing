EventSurfing.Views.Navbar = Backbone.View.extend({
  template: JST["navbar/navbar"],
  className: "navbar-main",

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});