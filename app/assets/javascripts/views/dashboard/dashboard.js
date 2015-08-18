PadCrashing.Views.Dashboard = Backbone.View.extend({
  template: JST['dashboard/dashboard'],
  className: "container-fluid",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});