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
      this.$el.addClass("alert-warning");
    }

    this.flashTitle = options.flashTitle;
    this.messages = options.messages;
    this.singleMessage = options.singleMessage;

    $("#flash").html(this.render().$el);
  },

  closeIt: function () {
    this.remove();
  },

  fadeIn: function () {
    this.$el.css("opacity", "0");
    this.$el.css("transition", "opacity 750ms");
    setTimeout(function () {
      this.$el.css("opacity", "0.95");
    }.bind(this), 0);
  },

  fadeOut: function () {
    this.$el.css("transition", "opacity 3s");
    this.$el.css("opacity", "0");
    setTimeout(function () {
      this.remove();
    }.bind(this), 3050);
  },

  render: function () {
    setTimeout(function () {
      this.fadeOut();
    }.bind(this), 4000);

    this.$el.html(this.template({
      flashTitle: this.flashTitle,
      messages: this.messages,
      singleMessage: this.singleMessage
    }));

    this.fadeIn();

    return this;
  }
});