PadCrashing.Views.EventAttenders = Backbone.CompositeView.extend({
  template: JST["users/event_attenders"],

  initialize: function () {
    this.listenTo(this.collection, "sync add remove", this.render);
    this.listenTo(this.collection, "add", this.addAttender);
  },

  addAttender: function (attender) {
    this.addSubview(
      ".attender-holder",
      new PadCrashing.Views.AttenderListItem({ model: attender })
    );
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});