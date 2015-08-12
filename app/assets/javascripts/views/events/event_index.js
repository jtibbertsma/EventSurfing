PadCrashing.Views.EventIndex = Backbone.CompositeView.extend({
  template: JST["events/index"],
  className: "container",

  initialize: function () {
    this.collection.each(function (eventModel) {
      this.addEventIndexItem(eventModel);
    }.bind(this));
    this.listenTo(this.collection, "sync add remove", this.render);
    this.listenTo(this.collection, "add", this.addEventIndexItem);
  },

  addEventIndexItem: function (eventModel) {
    this.addSubview(".col-xs-6", new PadCrashing.Views.EventIndexItem({
      model: eventModel
    }));
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});