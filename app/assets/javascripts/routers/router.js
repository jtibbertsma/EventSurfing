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
    this._progress = false;
  },

  toggle: function () {
    if (this._progress) {
      this._progress = false;
      $("body").removeClass("progress");
    } else {
      this._progress = true;
      $("body").addClass("progress");
    }
  },

  userShow: function (id) {
    var user = new EventSurfing.Models.User({ id: id });
    this.toggle();
    user.fetch({
      error: function () {
        this.toggle();
        new EventSurfing.Views.Flash({
          isError: true,
          singleMessage: "User not found"
        });
      }.bind(this),

      success: function () {
        this.toggle();
        var view = new EventSurfing.Views.UserShow({ model: user });
        this._swapView(view);
      }.bind(this)
    });
  },

  redirect: function () {
    Backbone.history.navigate("#events", { trigger: true });
  },

  dashboard: function () {
    var user = new EventSurfing.Models.User();
    this.toggle();
    user.fetch({
      url: "/api/dashboard",

      error: function () {
        this.toggle();
        new EventSurfing.Views.Flash({
          isError: true,
          singleMessage: "User not found"
        });
      }.bind(this),

      success: function () {
        this.toggle();
        var view = new EventSurfing.Views.UserShow({ model: user });
        this._swapView(view);
      }.bind(this)
    });
  },

  eventsIndex: function () {
    var events = new EventSurfing.Collections.Events();
    this.toggle();
    events.fetch({
      error: function () {
        this.toggle();
        new EventSurfing.Views.Flash({
          isError: true,
          singleMessage: "Error looking up events"
        });
      }.bind(this),

      success: function () {
        this.toggle();
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
    this.toggle();
    eventModel.fetch({
      error: function () {
        this.toggle();
        new EventSurfing.Views.Flash({
          isError: true,
          singleMessage: "Event not found"
        });
      }.bind(this),

      success: function () {
        this.toggle();
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