PadCrashing.Views.EventShow = Backbone.CompositeView.extend({
  template: JST["events/show"],
  className: "container-fluid",

  initialize: function () {
    this.addSubview(
      ".attenders",
      new PadCrashing.Views.EventAttenders({
        collection: this.model.attenders()
      })
    );
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    this.attachSubviews();
    return this;
  }
});