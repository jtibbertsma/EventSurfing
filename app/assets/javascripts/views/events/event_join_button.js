PadCrashing.Views.EventJoinButton = Backbone.View.extend({
  template: JST["events/join_button"],

  events: {
    "click .join": "joinEvent",
    "click .unjoin": "unjoinEvent"
  },

  joinEvent: function () {
    // Create a new EventJoin and redirect to the event show page
    var join = new PadCrashing.Models.EventJoin();
    join.save({ event_id: this.model.id }, {
      error: function () {
        // Somebody took the last spot since the button rendered.
        // TODO: Put something in flash errors once you implement flash.

        // Trigger a sync on the model so that the button rerenders.
        this.model.trigger("sync");
      }.bind(this),

      success: function () {
        Backbone.history.navigate("events/" + this.model.id, { trigger: true });
      }.bind(this)
    })
  },

  unjoinEvent: function () {
    this.model.join.destroy({
      success: function () {
        delete this.model.join;
        this.render();
      }.bind(this)
    });
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    return this;
  }
});