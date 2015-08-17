PadCrashing.Views.EventForm = Backbone.View.extend({
  template: JST["events/form"],

  events: {
    "submit form": "createEvent"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  createEvent: function (event) {
    // event.preventDefault();
    // var formData = $(event.currentTarget).serializeJson().event;
    // this.model.save(formData, {
    //   success: function () {
    //     this.remove();
    //   }.bind(this)
    // })
    console.log("Form submitted from modal");
  }
});