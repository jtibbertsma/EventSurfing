window.PadCrashing = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    // render navbar
    var navbar = PadCrashing.navbar = new PadCrashing.Views.Navbar();
    $("#page-header").html(navbar.render().$el);

    // fire up router
    new PadCrashing.Routers.Router({
      $rootEl: $("#content")
    });
    Backbone.history.start();
  }
};
