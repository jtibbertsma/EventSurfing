EventSurfing.Collections.Messages = Backbone.Collection.extend({
  url: 'api/messages',
  model: EventSurfing.Models.Message
});