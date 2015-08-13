PadCrashing.Views.EventIndexItem = Backbone.CompositeView.extend({
  template: JST["events/index_item"],
  className: "index-item clearfix",

  events: {
    "click h4": "gotoShow"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.addSubview(
      ".index-item-join",
      new PadCrashing.Views.EventJoinButton({ model: this.model })
    )
  },

  render: function () {
    this.$el.html(this.template({
      event: this.model
    }));
    this.attachSubviews();
    return this;
  },

  gotoShow: function () {
    Backbone.history.navigate("#events/" + this.model.id, { trigger: true });
  }
});