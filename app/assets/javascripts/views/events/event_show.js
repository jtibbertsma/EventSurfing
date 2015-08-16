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
        model: this.model,
        attenders: this.model.attenders()
      })
    );
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    this.attachSubviews();

    this.model.background && this.$(".event-show-head-background").css(
      "background-image",
      "url(" + this.model.background.escape("image_url") + ")"
    );
    return this;
  }
});