PadCrashing.Views.EventForm = Backbone.View.extend({
  template: JST["events/form"],

  events: {
    "click #modalButton": "createEvent"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template());
    if (this.model.isNew()) {
      this.$("#myModalLabel").text("Create New Event");
    }
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
    this.hideModal();
  }
});