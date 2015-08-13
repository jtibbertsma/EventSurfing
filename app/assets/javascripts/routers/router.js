PadCrashing.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'eventsIndex',
    'users/:id': 'userShow',
    'events': 'eventsIndex',
    'events/:id': 'eventShow'//,
    // 'test': 'test'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  // test: function () {
  //   var user = new PadCrashing.Models.User();
  //   user.fetch({
  //     url: "api/users/1",
  //     error: function () {
  //       alert("It goes to error if don't pass an id.")
  //     },

  //     success: function () {
  //       alert("Why are you here??");
  //       console.log(user);
  //     }
  //   })
  // },

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