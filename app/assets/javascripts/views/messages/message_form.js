EventSurfing.Views.MessageForm = Backbone.View.extend({
  template: JST["messages/form"],

  events: {
    "click #modalButton": "createMessage"
  },

  initialize: function (options) {
    this.messageList = options && options.messageList;
    if (this.model.isNew()) {
      this.flashTitle = "Message Sent!";
      this.modalTitle = "Send a Message to " + this.model.escape("recipient_name");
    } else {
      this.flashTitle = "Message Successfully Edited!";
      this.modalTitle = "Edit Message Sent to " + this.model.escape("recipient_name");
    }
  },

  createMessage: function (event) {
    event.preventDefault();
    var formData = $("form").serializeJSON();
    formData.message.recipient_id = this.model.get("recipient_id");

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
          flashTitle: this.flashTitle
        });

        this.messageList && this.messageList.add(this.model);
        this.hideModal();
      }.bind(this)
    })
  },

  onRender: function () {
    this.$("#modalTitle").text(this.modalTitle);
  },

  render: function () {
    this.$el.html(this.template({ message: this.model }));
    return this;
  }
});