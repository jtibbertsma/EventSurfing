window.PadCrashing = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    new PadCrashing.Routers.Router({ $rootEl: $("#content") });
    Backbone.history.start();
  }
};
