PadCrashing.Views.EventForm = Backbone.View.extend({
  template: JST["events/form"],

  events: {
    "submit form": "createEvent",
    "click .m-background": "remove",
    "click .close": "removeButton"
  },

  initialize: function () {
    this.$(document).on('keyup', this.handleKey.bind(this));
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  createEvent: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJson().event;
    this.model.save(formData, {
      success: function () {
        this.remove();
      }.bind(this)
    })
  }
});