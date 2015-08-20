// The difference between this and the main index is that this doesn't generate
// join/unjoin button along with the index item text

EventSurfing.Views.EventSubIndex = Backbone.CompositeView.extend({
  template: JST["events/sub_index"],

  initialize: function () {
    this.collection.each(this.addIndexItemText.bind(this));
    this.listenTo(this.collection, "add sync remove", this.render);
    this.listenTo(this.collection, "add", this.addIndexItemText);
    this.listenTo(this.collection, "remove", this.removeIndexItemText);
  },

  addIndexItemText: function (model) {
    this.addSubview(
      ".sub-index-item-holder",
      new EventSurfing.Views.EventIndexItemText({ model: model })
    );
  },

  removeIndexItemText: function (model) {
    this.removeModelSubview(".sub-index-item-holder", model);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});