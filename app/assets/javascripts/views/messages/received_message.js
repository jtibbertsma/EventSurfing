EventSurfing.Views.ReceivedMessage = Backbone.View.extend({
  template: JST["messages/received"],
  className: "message-list-item",

  events: {
    "click .reply": "replyToMessage"
  },

  initialize: function (options) {
    this.messageList = options.messageList;
  },

  replyToMessage: function () {
    var newMessage = new EventSurfing.Models.Message();
    newMessage.set({
      recipient_name: this.model.get("sender_name"),
      recipient_id: this.model.get("sender_id"),
      subject: "RE: " + this.model.get("subject")
    });

    var view = new EventSurfing.Views.MessageForm({
      model: newMessage,
      messageList: this.messageList
    });

    new EventSurfing.Views.Modal({ subview: view });
  },

  render: function () {
    this.$el.html(this.template({ message: this.model }));
    return this;
  }
});