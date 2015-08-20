window.EventSurfing = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    new EventSurfing.Routers.Router({ $rootEl: $("#content") });
    Backbone.history.start();
  }
};
