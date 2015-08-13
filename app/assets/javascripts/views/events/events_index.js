PadCrashing.Views.EventsIndex = Backbone.CompositeView.extend({
  template: JST["events/index"],
  className: "container",

  initialize: function () {
    this.collection.each(function (eventModel) {
      this.addEventIndexItem(eventModel);
    }.bind(this));
    this.listenTo(this.collection, "sync add remove", this.render);
    this.listenTo(this.collection, "add", this.addEventIndexItem);
    this.currentUserEvents = new PadCrashing.Collections.Events();
    this.currentUserEvents.fetch({
      url: "api/events/current"
    });
  },

  addEventIndexItem: function (eventModel) {
    this.addSubview(".index-item-holder", new PadCrashing.Views.EventIndexItem({
      model: eventModel, currentUserEvents: this.currentUserEvents
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