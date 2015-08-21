EventSurfing.Views.UserForm = Backbone.View.extend({
  template: JST["users/form"],

  events: {
    "click #modalButton": "editUser",
    "click #ImageInput": "imageInput"
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  },

  onRender: function () {
    this.$("#UserLocation").geocomplete({
      details: ".details"
    });

    $("#myModal").one("shown.bs.modal", function () {
      // We need to set a high z-index for the autolocation div to appear above
      // the bootstrap modal.
      $(".pac-container").css("z-index", "2000");
    });
  },

  imageInput: function (event) {
    event.preventDefault();
    this.$("#UploadSuccess").text("");
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function (error, result) {
      if (!error) {
        var data = result[0];
        this.model.set({ image_url: data.url, thumb_url: data.thumbnail_url });
        this.model.avatar && this.model.avatar.set({
          image_url: data.url,
          thumb_url: data.thumbnail_url
        });
        this.$("#UploadSuccess").text("Upload Successful!");
      } 
    }.bind(this));
  },

  parseLocation: function (data) {
    data.location = {};

    data.location.place_id = data.place_id;
    data.location.lng = data.lng;
    data.location.lat = data.lat;

    if (data.place_id) {
      data.place_id = data.place_id + "_munged";
      var location = [
        data.locality, data.administrative_area_level_1, data.country_short
      ].join(", ");

      data.location_title = location;
      data.location.formatted_address = location;
    }

    return data;
  },

  editUser: function (event) {
    event.preventDefault();
    var formData = this.$('form').serializeJSON();
    var avatar = this.model.avatar;

    formData = this.parseLocation(formData);

    this.model.save(formData, {
      error: function () {
        console.log("Error in editing user");
      },

      success: function () {
        this.model.avatar = avatar;
        this.hideModal();
      }.bind(this)
    });
  }
});