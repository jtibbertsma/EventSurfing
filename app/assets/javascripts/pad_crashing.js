window.PadCrashing = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    new PadCrashing.Routers.Router({ $rootEl: $("#content") });
    PadCrashing.currentUserEvents = new PadCrashing.Collections.CurrentUserEvents();
    PadCrashing.currentUserEvents.fetch({
      success: function () {
        alert("It worked");
      },

      error: function () {
        alert("It didn't work");
      }
    })
    Backbone.history.start();
  }
};
