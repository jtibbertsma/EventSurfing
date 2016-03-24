EventSurfing.Views.EventShow = Backbone.CompositeView.extend({
  template: JST["events/show"],
  className: "container-fluid",

  events: {
    "click .open-map": "openMap",
    "click .destroy": "destroyEvent",
    "click .edit": "editEvent"
  },

  initialize: function () {
    this.addSubview(
      ".main-attender-list",
      new EventSurfing.Views.EventAttenderHolder({
        model: this.model
      })
    );
    this.addSubview(
      ".show-join",
      new EventSurfing.Views.EventJoinButton({
        model: this.model,
        attenders: this.model.attenders()
      })
    );
    this.listenTo(this.model, "sync", this.render);
  },

  openMap: function () {
    var mapView = new EventSurfing.Views.EventShowMap({ model: this.model });
    new EventSurfing.Views.Modal({
      subview: mapView,
      large: true
    });
  },

  destroyEvent: function () {
    // TODO: have a box pop up and ask 'are you sure?''
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("#events", { trigger: true });
        new EventSurfing.Views.Flash({
          flashTitle: "Event Successfully Deleted"
        });
      }
    });
  },

  editEvent: function () {
    EventSurfing.Utils.renderEventForm({ model: this.model });
  },

  render: function () {
    scrollTo(0, 0);
    this.$el.html(this.template({ event: this.model }));
    this.attachSubviews();

    this.model.background && this.$(".event-show-head-background").css(
      "background-image",
      "url(" + this.model.background.escape("image_url") + ")"
    );
    return this;
  }
});