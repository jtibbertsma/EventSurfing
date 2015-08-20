EventSurfing.Collections.Events = Backbone.Collection.extend({
  url: "api/events/",
  model: EventSurfing.Models.Event,

  organizing: function () {
    if (!this._organizing) {
      this._organizing = new EventSurfing.Collections.Events();
    }

    return this._organizing;
  },

  joined: function () {
    if (!this._joined) {
      this._joined = new EventSurfing.Collections.Events();
    }

    return this._joined;
  },

  _subParse: function (collection, array) {
    array.forEach(function (value) {
      EventSurfing.Models.Event.prototype._parseTimes(value);
    });
    collection.set(array);
  },

  parse: function (payload) {
    if (payload.organizing) {
      this._subParse(this.organizing(), payload.organizing);
    }

    if (payload.joined) {
      this._subParse(this.joined(), payload.joined);
    }

    if (typeof payload.main === "undefined") {
      return payload;
    } else {
      return payload.main;
    }
  }
});