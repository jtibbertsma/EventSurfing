EventSurfing.Views.SentMessage = Backbone.View.extend({
  template: JST["messages/sent"],
  className: "message-list-item",

  events: {
    "click .delete": "deleteMessage",
    "click .edit": "editMessage"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  deleteMessage: function () {
    this.model.destroy({
      success: function () {
        new EventSurfing.Views.Flash({
          flashTitle: "Message Successfully Deleted!"
        })
      }
    })
  },

  editMessage: function () {
    var view = new EventSurfing.Views.MessageForm({ model: this.model });

    new EventSurfing.Views.Modal({ subview: view });
  },

  render: function () {
    this.$el.html(this.template({ message: this.model }));
    return this;
  }
});