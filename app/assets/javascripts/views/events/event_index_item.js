PadCrashing.Views.EventIndexItem = Backbone.CompositeView.extend({
  template: JST["events/index_item"],
  className: "index-item clearfix",

  initialize: function (options) {
    this.joined = options.joined;
    this.listenTo(this.model, "sync", this.render);
    this.addSubview(
      ".index-item-join",
      new PadCrashing.Views.EventJoinButton({
        model: this.model,
        joined: this.joined
      })
    );
    this.addSubview(
      ".index-item-text",
      new PadCrashing.Views.EventIndexItemText({ model: this.model })
    );
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});