EventSurfing.Views.SentMessage = Backbone.View.extend({
  template: JST["messages/sent"],
  className: "message-list-item",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ message: this.model }));
    return this;
  }
});