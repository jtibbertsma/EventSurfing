PadCrashing.Routers.Router = Backbone.Router.extend({
  routes: {
    ''           : 'redirect',
    'dashboard'  : 'dashboard',
    'users/:id'  : 'userShow',
    'events'     : 'eventsIndex',
    'events/new' : 'eventNew',
    'events/:id' : 'eventShow'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  userShow: function (id) {
    var user = new PadCrashing.Models.User({ id: id });
    user.fetch({
      error: function () {
        alert("Shit went wrong in user show");
      }
    });
    var view = new PadCrashing.Views.UserShow({ model: user });
    this._swapView(view);
  },

  redirect: function () {
    Backboard.history.navigate("#dashboard", { trigger: true });
  },

  dashboard: function () {
    var user = new PadCrashing.Models.User();
    user.fetch({
      url: "/api/dashboard",

      error: function () {
        alert("Shit went wrong in dashboard")
      }
    });

    var view = new PadCrashing.Views.Dashboard({ model: user });
    this._swapView(view);
  },

  eventsIndex: function () {
    var events = new PadCrashing.Collections.Events();
    events.fetch({
      error: function () {
        alert("Shit went wrong in events index");
      }
    });
    var view = new PadCrashing.Views.EventsIndex({ collection: events });
    this._swapView(view);
  },

  eventNew: function () {
    if (!this.currentView) {
      this.eventsIndex();
    }
    PadCrashing.Utils.renderEventForm();
  },

  eventShow: function (id) {
    var eventModel = new PadCrashing.Models.Event({ id: id });
    eventModel.fetch({
      error: function () {
        alert("Shit went wrong in event show");
      }
    });
    var view = new PadCrashing.Views.EventShow({ model: eventModel });
    this._swapView(view);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});