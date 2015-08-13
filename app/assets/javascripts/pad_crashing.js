window.PadCrashing = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    new PadCrashing.Routers.Router({ $rootEl: $("#content") });
    PadCrashing.currentUserEvents = new PadCrashing.Collections.Events();
    PadCrashing.currentUserEvents.fetch();
    Backbone.history.start();
  }
};
