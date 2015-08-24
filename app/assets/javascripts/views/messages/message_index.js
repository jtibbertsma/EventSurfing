EventSurfing.Views.MessageIndex = Backbone.CompositeView.extend({
  template: JST["messages/index"],

  initialize: function () {
    this.model.receivedMessages.each(this.addReceivedMessage.bind(this));
    this.model.sentMessages.each(this.addSentMessage.bind(this));

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.receivedMessages, "sync add remove", this.render);
    this.listenTo(this.model.sentMessages, "sync add remove", this.render);

    this.listenTo(this.model.receivedMessages, "add", this.addReceivedMessage);
    this.listenTo(this.model.sentMessages, "remove", this.removeSentMessage);
  },

  addReceivedMessage: function (message) {
    this.addSubview(
      ".message-index-left",
      new EventSurfing.Views.ReceivedMessage({
        model: message,
        messageList: this.model.receivedMessages;
      })
    );
  },

  addSentMessage: function (message) {
    this.addSubview(
      ".message-index-right",
      new EventSurfing.Views.SentMessage({ model: message })
    );
  },

  removeSentMessage: function (message) {
    this.removeModelSubview(
      ".message-index-right",
      message
    );
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});