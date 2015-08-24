EventSurfing.Models.User = Backbone.Model.extend({
  urlRoot: "api/users/",

  parse: function (payload) {
    this.avatar = new EventSurfing.Models.Image(payload.avatar);

    this.sentMessages =
      new EventSurfing.Collections.Messages(payload.sent_messages);
    this.receivedMessages =
      new EventSurfing.Collections.Messages(payload.received_messages);

    delete payload.sent_messages;
    delete payload.received_messages;
    delete payload.avatar;

    return payload;
  }
});