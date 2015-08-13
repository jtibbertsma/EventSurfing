PadCrashing.Views.EventIndexItem = Backbone.View.extend({
  template: JST["events/index_item"],
  className: "index-item clearfix",

  events: {
    "click h4": "gotoShow"
  },

  initialize: function (options) {
    this.currentUserEvents = options.currentUserEvents;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.currentUserEvents, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({
      event: this.model,
      current: this.currentUserEvents
    }));
    return this;
  },

  gotoShow: function () {
    Backbone.history.navigate("#events/" + this.model.id, { trigger: true });
  }
});