PadCrashing.Views.EventJoinButton = Backbone.View.extend({
  template: JST["events/join_button"],

  events: {
    "click .join": "joinEvent",
    "click .unjoin": "unjoinEvent"
  },

  initialize: function (options) {
    this.joined = options.joined;
    this.listenTo(this.model, "sync", this.render);
  },

  joinEvent: function () {
    if (this._working) {
      return;
    }
    this._working = true;
    var join = new PadCrashing.Models.EventJoin();
    join.save({ event_id: this.model.id }, {
      error: function () {
        // Somebody took the last spot since the button rendered.
        // TODO: Put something in flash errors once you implement flash.

        // rerender the button; the button should disappear
        this.render();
        this._working = false;
      }.bind(this),

      success: function () {
        this.joined && this.joined.add(this.model);
        this.model.join = join;
        this.switchToUnjoin();
        this._working = false;
      }.bind(this)
    })
  },

  unjoinEvent: function () {
    if (this._working) {
      return;
    }
    this._working = true;
    this.model.join.destroy({
      success: function () {
        this.joined.remove(this.model);
        delete this.model.join;
        this.render();
        this._working = false;
      }.bind(this)
    });
  },

  switchToUnjoin: function () {
    var $button = this.$(".join");
    if ($button.length === 0) {
      return;
    }
    $button.removeClass("join").addClass("unjoin").text("Unjoin");
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    return this;
  }
});