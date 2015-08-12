PadCrashing.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'blankPage',
    'users/:id': 'userShow',
    'events': 'eventsIndex'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  eventCollection: function () {
    if (!this._eventCollection) {
      this._eventCollection = new PadCrashing.Collections.Events();
    }

    return this._eventCollection;
  },

  blankPage: function () {
    this.currentView && this.currentView.remove();
  },

  userShow: function (id) {
    var user = new PadCrashing.Models.User({ id: id });
    var view = new PadCrashing.Views.UserShow({ model: user });
    this._swapView(view);
    user.fetch({
      error: function () {
        alert("Shit went wrong in user show");
        debugger;
      }
    });
  },

  eventsIndex: function () {
    var coll = this.eventCollection();
    var view = new PadCrashing.Views.EventIndex({ collection: coll });
    this._swapView(view);
    coll.fetch({
      error: function () {
        alert("Shit went wrong in events index");
        debugger;
      }
    });
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});