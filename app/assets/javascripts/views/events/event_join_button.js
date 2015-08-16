PadCrashing.Views.EventJoinButton = Backbone.View.extend({
  template: JST["events/join_button"],

  events: {
    "click .join": "joinEvent",
    "click .unjoin": "unjoinEvent"
  },

  initialize: function (options) {
    this.joined = options.joined;
    this.attenders = options.attenders;
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
        this.model.fetch({
          success: function () {
            this.render();
            this._working = false;
          }.bind(this)
        });
      }.bind(this),

      success: function () {
        // adjust spots_remaining and num_attending
        this.model.adjustSpots({ decrement: true });

        // if we passed the attenders collection in, we need to update it.
        // so we need to fetch the current user using the attender_id in
        // the event join model. This causes the attenders list on the show
        // page to rerender
        if (this.attenders) {
          var currentUser = new PadCrashing.Models.User({
            id: join.get("attender_id")
          });
          currentUser.fetch({
            success: function () {
              this.attenders.add(currentUser);
            }.bind(this)
          });
        }

        // Add this model to the joined collection
        this.joined && this.joined.add(this.model);

        // Add an event join model to the database
        this.model.join = join;
        this.changeButton({ to: "unjoin" });
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
        // adjust spots_remaining and num_attending
        this.model.adjustSpots({ decrement: false });

        // Remove this model from the joined collection if it's there
        this.joined && this.joined.remove(this.model);

        // Remove the current user from the attenders collection if it's there
        if (this.attenders) {
          var currentUser = new PadCrashing.Models.User({
            id: this.model.join.get("attender_id")
          });
          this.attenders.remove(currentUser);
        }

        // delete the join model attribute from the main model and change the
        // button to join
        delete this.model.join;
        this.changeButton({ to: "join" });
        this._working = false;
      }.bind(this)
    });
  },

  changeButton: function (options) {
    if (options.to === "unjoin") {
      var $button = this.$(".join");
      $button.removeClass("join").addClass("unjoin").text("Unjoin");
    } else if (options.to === "join") {
      var $button = this.$(".unjoin");
      $button.removeClass("unjoin").addClass("join").text("Join");
    }
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    return this;
  }
});