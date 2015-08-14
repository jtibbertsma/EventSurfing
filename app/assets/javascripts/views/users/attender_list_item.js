PadCrashing.Views.AttenderListItem = Backbone.View.extend({
  template: JST["users/attender_list_item"],
  className: "attender-list-item",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ attender: this.model }));
    return this;
  }
});