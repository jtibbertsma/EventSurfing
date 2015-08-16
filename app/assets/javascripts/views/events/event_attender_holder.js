PadCrashing.Views.EventAttenderHolder = Backbone.CompositeView.extend({
  template: JST["events/attender_holder"],

  initialize: function () {
    this.addSubview(
      ".attenders",
      new PadCrashing.Views.EventAttenders({
        collection: this.model.attenders()
      })
    );
    this.listenTo(this.model, "sync change", this.render);
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    this.attachSubviews();
    return this;
  }
});