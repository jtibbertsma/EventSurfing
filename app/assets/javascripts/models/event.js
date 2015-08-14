PadCrashing.Models.Event = Backbone.Model.extend({
  urlRoot: "api/events",

  _parseAttenders: function (payload) {
    if (payload.attenders) {
      this.attenders = new PadCrashing.Models.Users();
      this.attenders.set(payload.attenders);
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

  parse: function (payload) {
    this._parseAttenders(payload);
    this._parseTimes(payload);
    this._parseJoin(payload);

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