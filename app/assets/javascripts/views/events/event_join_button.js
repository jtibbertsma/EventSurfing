PadCrashing.Views.EventJoinButton = Backbone.View.extend({
  template: JST["events/join_button"],

  events: {
    "click .join": "joinEvent",
    "click .unjoin": "unjoinEvent"
  },

  joinEvent: function () {
    var join = new PadCrashing.Models.EventJoin();
    join.save({ event_id: this.model.id }, {
      error: function () {
        // Somebody took the last spot since the button rendered.
        // TODO: Put something in flash errors once you implement flash.

        // Trigger a sync on the model so that the button rerenders.
        this.model.trigger("sync");
      }.bind(this),

      success: function () {
        this.model.trigger("sync");
        this.joined.add(this.model);
      }.bind(this)
    })
  },

  unjoinEvent: function () {
    this.model.join.destroy({
      success: function () {
        delete this.model.join;
        this.joined.remove(this.model);
        this.render();
      }.bind(this)
    });
  },

  initialize: function (options) {
    this.joined = options.joined;
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    return this;
  }
});