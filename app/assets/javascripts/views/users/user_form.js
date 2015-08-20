PadCrashing.Views.UserForm = Backbone.View.extend({
  template: JST["users/form"],

  events: {
    "click #modalButton": "editUser",
    "click #ImageInput": "imageInput"
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
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

  editUser: function (event) {
    event.preventDefault();
    var formData = this.$('form').serializeJSON();
    var avatar = this.model.avatar;

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