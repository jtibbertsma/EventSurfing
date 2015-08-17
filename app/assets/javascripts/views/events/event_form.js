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
    var formData = this.$('form').serializeJSON().event;
    this.model.save(formData, {
      error: function () {
        console.log("Error in creating event");
      },

      success: function () {
        $('.modal').one("hidden.bs.modal", function () {
          Backbone.history.navigate("#events/" + this.model.id, { trigger: true });
        }.bind(this));
        this.hideModal();
      }.bind(this)
    });
  }
});