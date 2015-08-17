PadCrashing.Views.EventForm = Backbone.View.extend({
  template: JST["events/form"],

  events: {
    "click #modalButton": "createEvent",
    "click #ImageInput": "imageInput"
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

  imageInput: function (event) {
    event.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function (error, result) {
      if (!error) {
        var data = result[0];
        this.model.set({ image_url: data.url, thumb_url: data.thumbnail_url });
      } 
    }.bind(this));
  },

  createEvent: function (event) {
    event.preventDefault();
    // var formData = $(event.currentTarget).serializeJson().event;
    // this.model.save(formData, {
    //   success: function () {
    //     this.remove();
    //   }.bind(this)
    // })
    debugger;
    this.hideModal();
  }
});