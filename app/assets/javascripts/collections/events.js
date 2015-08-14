PadCrashing.Collections.Events = Backbone.Collection.extend({
  url: "api/events/",
  model: PadCrashing.Models.Event,

  organizing: function () {
    if (!this._organizing) {
      this._organizing = new PadCrashing.Collections.Events();
    }

    return this._organizing;
  },

  joined: function () {
    if (!this._joined) {
      this._joined = new PadCrashing.Collections.Events();
    }

    return this._joined;
  },

  parse: function (payload) {
    if (payload.organizing) {
      this.organizing().set(payload.organizing);
    }

    if (payload.joined) {
      this.joined().set(payload.joined);
    }

    if (typeof payload.main === "undefined") {
      return payload;
    } else {
      return payload.main;
    }
  }
});