PadCrashing.Views.EventIndexItemText = Backbone.View.extend({
  template: JST["events/index_item_text"],

  events: {
    "click h4": "gotoShow"
  },

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    return this;
  },

  gotoShow: function () {
    Backbone.history.navigate("#events/" + this.model.id, { trigger: true });
  }
});