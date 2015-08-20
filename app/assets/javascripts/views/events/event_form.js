EventSurfing.Views.EventForm = Backbone.View.extend({
  template: JST["events/form"],

  events: {
    "click #modalButton": "createEvent",
    "click #ImageInput": "imageInput"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    if (this.model.isNew()) {
      this.$("#myModalLabel").text("Create New Event");
    }

    return this;
  },

  onRender: function () {
    this.$("#EventLocation").geocomplete({
      details: ".details"
    });

    $("#myModal").one("shown.bs.modal", function () {
      // We need to set a high z-index for the autolocation div to appear above
      // the bootstrap modal.
      $(".pac-container").css("z-index", "2000");
    });
  },

  parseTimes: function (data) {
    data.event.start_time = data.start_time.date + ' ' + data.start_time.time;
    data.event.end_time = data.end_time.date + ' ' + data.end_time.time;

    return data.event;
  },

  parseLocation: function (data) {
    data.event.location = {};
    data.event.location.formatted_address = data.formatted_address;
    data.event.location.place_id = data.place_id;
    data.event.location.lng = data.lng;
    data.event.location.lat = data.lat;

    if (data.place_id) {
      data.event.formatted_address = data.formatted_address;
      data.event.place_id = data.place_id;
      data.event.lng = data.lng;
      data.event.lat = data.lat;
    }

    return data;
  },

  imageInput: function (event) {
    event.preventDefault();
    this.$("#UploadSuccess").text("");
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function (error, result) {
      if (!error) {
        var data = result[0];
        this.model.set({ image_url: data.url, thumb_url: data.thumbnail_url });
        this.model.background && this.model.background.set({
          image_url: data.url,
          thumb_url: data.thumbnail_url
        });
        this.$("#UploadSuccess").text("Upload Successful!");
      } 
    }.bind(this));
  },

  createEvent: function (event) {
    event.preventDefault();
    var formData = this.$('form').serializeJSON();

    formData = this.parseLocation(formData);
    formData = this.parseTimes(formData);

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