EventSurfing.Views.MessageForm = Backbone.View.extend({
  template: JST["messages/form"],

  events: {
    "click #modalButton": "createMessage"
  },

  createMessage: function (event) {
    event.preventDefault();
    var formData = $("form").serializeJSON();
    formData.message.recipient_id = this.model.id;

    var message = new EventSurfing.Models.Message();
    message.save(formData, {
      success: function () {
        this.hideModal();
      }.bind(this)
    })
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});