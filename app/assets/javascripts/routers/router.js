EventSurfing.Routers.Router = Backbone.Router.extend({
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
    var user = new EventSurfing.Models.User({ id: id });
    user.fetch({
      error: function () {
        new EventSurfing.Views.Flash({
          isError: true,
          singleMessage: "User not found"
        });
      },

      success: function () {
        var view = new EventSurfing.Views.UserShow({ model: user });
        this._swapView(view);
      }.bind(this)
    });
  },

  redirect: function () {
    Backbone.history.navigate("#dashboard", { trigger: true });
  },

  dashboard: function () {
    var user = new EventSurfing.Models.User();
    user.fetch({
      url: "/api/dashboard",

      error: function () {
        new EventSurfing.Views.Flash({
          isError: true,
          singleMessage: "User not found"
        });
      },

      success: function () {
        var view = new EventSurfing.Views.UserShow({ model: user });
        this._swapView(view);
      }.bind(this)
    });
  },

  eventsIndex: function () {
    var events = new EventSurfing.Collections.Events();
    events.fetch({
      error: function () {
        new EventSurfing.Views.Flash({
          isError: true,
          singleMessage: "Error looking up events"
        });
      },

      success: function () {
        var view = new EventSurfing.Views.EventsIndex({ collection: events });
        this._swapView(view);
      }.bind(this)
    });
  },

  eventNew: function () {
    if (!this.currentView) {
      this.eventsIndex();
    }
    EventSurfing.Utils.renderEventForm();
  },

  eventShow: function (id) {
    var eventModel = new EventSurfing.Models.Event({ id: id });
    eventModel.fetch({
      error: function () {
        new EventSurfing.Views.Flash({
          isError: true,
          singleMessage: "Event not found"
        });
      },

      success: function () {
        var view = new EventSurfing.Views.EventShow({ model: eventModel });
        this._swapView(view);
      }.bind(this)
    });
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});