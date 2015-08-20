EventSurfing.Models.User = Backbone.Model.extend({
  urlRoot: "api/users/",

  parse: function (payload) {
    this.avatar = new EventSurfing.Models.Image(payload.avatar);
    delete payload.avatar;

    return payload;
  }
});