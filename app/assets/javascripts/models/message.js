EventSurfing.Models.Message = Backbone.Model.extend({
  urlRoot: 'api/messages',

  parse: function (payload) {
    payload.updated_at = moment(payload.updated_at).fromNow();

    return payload;
  }
});