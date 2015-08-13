PadCrashing.Views.EventJoinButton = Backbone.View.extend({
  template: JST["events/join_button"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    return this;
  }
});