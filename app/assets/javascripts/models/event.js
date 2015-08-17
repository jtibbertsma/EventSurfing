PadCrashing.Models.Event = Backbone.Model.extend({
  urlRoot: "api/events",

  attenders: function () {
    if (!this._attenders) {
      this._attenders = new PadCrashing.Collections.Users();
    }

    return this._attenders;
  },

  adjustSpots: function (options) {
    if (options && typeof options.decrement === "boolean") {
      var spotsRemaining = this.get("spots_remaining");
      var numAttending = this.get("num_attenders");
      if (options.decrement) {
        // join event
        this.set("spots_remaining", spotsRemaining - 1);
        this.set("num_attenders", numAttending + 1);
      } else {
        // unjoin event
        this.set("spots_remaining", spotsRemaining + 1);
        this.set("num_attenders", numAttending - 1);
      }
    }
  },

  _parseAttenders: function (payload) {
    if (payload.attenders) {
      payload.attenders = this.attenders().parse(payload.attenders);
      this.attenders().set(payload.attenders);
      delete payload.attenders;
    }
  },

  _parseTimes: function (payload) {
    payload.start_time = moment(
      payload.start_time
    ).format('MMMM Do YYYY, h:mm a');

    if (payload.end_time) {
      payload.end_time = moment(
        payload.end_time
      ).format('MMMM Do YYYY, h:mm a');
    }
  },

  _parseJoin: function (payload) {
    if (payload.join) {
      this.join = new PadCrashing.Models.EventJoin(payload.join);
      delete payload.join
    }
  },

  _parseBackground: function (payload) {
    if (payload.background) {
      this.background = new PadCrashing.Models.Image(payload.background);
      delete payload.background;
    }
  },

  parse: function (payload) {
    this._parseAttenders(payload);
    this._parseTimes(payload);
    this._parseJoin(payload);
    this._parseBackground(payload);

    if (payload.spots_remaining !== 0 && !payload.spots_remaining) {
      payload.spots_remaining = -1;
    }

    return payload;
  },

  when: function () {
    var whenStr = this.escape("start_time");
    if (this.get("end_time")) {
      whenStr = whenStr.concat(" \u2015 ".concat(this.escape("end_time")));
    }

    return whenStr;
  }
});