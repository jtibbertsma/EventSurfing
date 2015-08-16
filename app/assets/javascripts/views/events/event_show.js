PadCrashing.Views.EventShow = Backbone.CompositeView.extend({
  template: JST["events/show"],
  className: "container-fluid",

  initialize: function () {
    this.addSubview(
      ".main-attender-list",
      new PadCrashing.Views.EventAttenderHolder({
        model: this.model
      })
    );
    this.addSubview(
      ".show-join",
      new PadCrashing.Views.EventJoinButton({
        model: this.model
      })
    );
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    this.attachSubviews();
    return this;
  }
});