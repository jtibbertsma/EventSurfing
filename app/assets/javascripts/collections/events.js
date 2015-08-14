PadCrashing.Collections.Events = Backbone.Collection.extend({
  url: "api/events/",
  model: PadCrashing.Models.Event,

  organized: function () {
    if (!this._organized) {
      this._organized = new PadCrashing.Collections.Events();
    }

    return this._organized;
  },

  joined: function () {
    if (!this._joined) {
      this._joined = new PadCrashing.Collections.Events();
    }

    return this._joined;
  },

  parse: function (payload) {
    if (payload.organized) {
      this.organized().set(payload.organized);
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