EventSurfing.Views.MessageForm = Backbone.View.extend({
  template: JST["messages/form"],

  events: {
    "click #modalButton": "createMessage"
  },

  createMessage: function (event) {
    event.preventDefault();
    var formData = $("form").serializeJSON();

    this.model.save(formData, {
      error: function (data, response) {
        var messages = JSON.parse(response.responseText);
        new EventSurfing.Views.Flash({
          isError: true,
          messages: messages,
          flashTitle: "Couldn't Send Message"
        });
      },

      success: function () {
        new EventSurfing.Views.Flash({
          flashTitle: "Message sent!"
        });

        this.hideModal();
      }.bind(this)
    })
  },

  render: function () {
    this.$el.html(this.template({ message: this.model }));
    return this;
  }
});