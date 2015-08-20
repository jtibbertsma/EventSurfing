EventSurfing.Views.EventAttenders = Backbone.CompositeView.extend({
  template: JST["users/event_attenders"],

  initialize: function () {
    this.collection.each(this.addAttender.bind(this));
    this.listenTo(this.collection, "sync add remove", this.render);
    this.listenTo(this.collection, "add", this.addAttender);
    this.listenTo(this.collection, "remove", this.removeAttender);
  },

  addAttender: function (attender) {
    this.addSubview(
      ".attender-holder",
      new EventSurfing.Views.AttenderListItem({ model: attender })
    );
  },

  removeAttender: function (attender) {
    this.removeModelSubview(".attender-holder", attender);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});