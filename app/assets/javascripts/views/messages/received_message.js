EventSurfing.Views.ReceivedMessage = Backbone.View.extend({
  template: JST["messages/received"],

  initialize: function (options) {
    this.messageList = options.messageList;
  },

  render: function () {
    this.$el.html(this.template({ message: this.model }));
    return this;
  }
});