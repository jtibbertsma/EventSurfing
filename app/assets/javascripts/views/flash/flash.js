EventSurfing.Views.Flash = Backbone.View.extend({
  template: JST['flash/flash'],
  className: 'alert',
  attributes: {
    role: 'alert'
  },

  events: {
    "click .close": "closeIt"
  },

  initialize: function (options) {
    if (options.isError) {
      this.$el.addClass("alert-danger");
    } else {
      this.$el.addClass("alert-success");
    }

    this.messages = options.messages;
    this.singleMessage = options.singleMessage;

    $("#flash").html(this.render().$el);
  },

  closeIt: function () {
    this.remove();
  },

  fadeOut: function () {
    $("#flash > div").css("opacity", "0");
    setTimeout(function () {
      this.remove();
    }.bind(this), 3050);
  },

  render: function () {
    setTimeout(function () {
      this.fadeOut();
    }.bind(this), 5000);

    this.$el.html(this.template({
      messages: this.messages,
      singleMessage: this.singleMessage
    }));
    return this;
  }
});