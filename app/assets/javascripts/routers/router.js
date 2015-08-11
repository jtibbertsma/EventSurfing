PadCrashing.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'blankPage',
    'users/:id': 'userShow'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
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

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});