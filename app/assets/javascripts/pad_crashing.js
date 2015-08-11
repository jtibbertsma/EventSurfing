window.PadCrashing = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new PadCrashing.Routers.Router({ $rootEl: $("#content") });
    Backbone.history.start();
  }
};
