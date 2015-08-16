PadCrashing.Collections.Users = Backbone.Collection.extend({
  url: "api/users",
  model: PadCrashing.Models.User,

  parse: function (payload) {
    return payload.map(function (obj) {
      var user = new this.model();
      obj = user.parse(obj);
      user.set(obj);

      return user;
    }.bind(this));
  }
});