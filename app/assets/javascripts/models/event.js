PadCrashing.Models.Event = Backbone.Model.extend({
  urlRoot: "api/events",

  parse: function (payload) {
    payload.start_time = moment(
      payload.start_time).format('MMMM Do YYYY, h:mm a');

    if (payload.end_time) {
      payload.end_time = moment(
        payload.end_time).format('MMMM Do YYYY, h:mm a');
    }

    return payload;
  }
});