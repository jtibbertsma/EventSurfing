// The difference between this and the main index is that this doesn't generate
// join/unjoin button along with the index item text

PadCrashing.Views.EventSubIndex = Backbone.CompositeView.extend({
  template: JST["events/sub_index"],

  initialize: function () {
    this.collection.each(this.addIndexItemText.bind(this));
    this.listenTo(this.collection, "add remove sync", this.render);
    this.listenTo(this.collection, "add", this.addIndexItemText);
  },

  addIndexItemText: function (event) {
    this.addSubview(
      ".sub-index-item-holder",
      new PadCrashing.Views.EventIndexItemText({ model: event })
    );
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});