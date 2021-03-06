EventSurfing.Views.EventsIndex = Backbone.CompositeView.extend({
  template: JST["events/index"],
  className: "container-fluid",

  events: {
    "click .new-event-btn": "renderForm"
  },

  initialize: function () {
    this.collection.each(this.addEventIndexItem.bind(this));
    this.listenTo(this.collection, "sync add remove", this.render);
    this.listenTo(this.collection, "add", this.addEventIndexItem);

    this.addSubview(
      ".events-organizing",
      new EventSurfing.Views.EventSubIndex({
        collection: this.collection.organizing()
      })
    );

    this.addSubview(
      ".events-joined",
      new EventSurfing.Views.EventSubIndex({
        collection: this.collection.joined()
      })
    );
  },

  addEventIndexItem: function (eventModel) {
    this.addSubview(
      ".index-item-holder",
      new EventSurfing.Views.EventIndexItem({
        model: eventModel,
        joined: this.collection.joined()
      })
    );
  },

  render: function () {
    this.$el.html(this.template({
      num_events: this.collection.length
    }));
    this.attachSubviews();
    return this;
  },

  renderForm: function () {
    EventSurfing.Utils.renderEventForm();
  }
});