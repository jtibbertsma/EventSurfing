PadCrashing.Models.Event = Backbone.Model.extend({
  urlRoot: "api/events",

  parse: function (payload) {
    payload.start_time = moment(
      payload.start_time
    ).format('MMMM Do YYYY, h:mm a');

    if (payload.end_time) {
      payload.end_time = moment(
        payload.end_time
      ).format('MMMM Do YYYY, h:mm a');
    }

    if (payload.joined) {
      this.joined = new PadCrashing.Models.EventJoin(payload.joined);
      delete payload.joined
    }

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