PadCrashing.Views.EventsIndex = Backbone.CompositeView.extend({
  template: JST["events/index"],
  className: "container",

  initialize: function () {
    this.collection.each(this.addEventIndexItem.bind(this));
    this.listenTo(this.collection, "sync add remove", this.render);
    this.listenTo(this.collection, "add", this.addEventIndexItem);
  },

  addEventIndexItem: function (eventModel) {
    this.addSubview(".index-item-holder", new PadCrashing.Views.EventIndexItem({
      model: eventModel
    }));
  },

  render: function () {
    this.$el.html(this.template({
      num_events: this.collection.length
    }));
    this.attachSubviews();
    return this;
  }
});