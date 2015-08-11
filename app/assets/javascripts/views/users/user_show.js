PadCrashing.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  className: "container-fluid",

  initialize: function () {
    var aboutView = new PadCrashing.Views.UserAbout({ user: this.model });
    this.addSubview(".center-window", aboutView);
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    this.attachSubviews();
    return this;
  }
});