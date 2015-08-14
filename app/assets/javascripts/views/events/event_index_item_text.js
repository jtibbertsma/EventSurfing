PadCrashing.Views.EventIndexItemText = Backbone.View.extend({
  template: JST["events/index_item_text"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    return this;
  }
});