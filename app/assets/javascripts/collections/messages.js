EventSurfing.Collections.Messages = Backbone.Collection.extend({
  url: 'api/messages',
  model: EventSurfing.Models.Message,

  parse: function (payload) {
    if (payload) {
      payload = payload.map(function (obj) {
        var message = new this.model();
        obj = message.parse(obj);
        message.set(obj);

        return message;
      }.bind(this));
    }

    return payload;
  }
});