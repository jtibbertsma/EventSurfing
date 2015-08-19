PadCrashing.Views.Modal = Backbone.View.extend({
  template: JST["modal/modal"],

  initialize: function (options) {
    this.subview = options.subview;
    this.large = options.large;

    this.subview.hideModal = function () {
      this.$("#myModal").modal("hide");
    }.bind(this)

    this.render();
    this.$(".modal").on("hidden.bs.modal", this.remove.bind(this));
  },

  render: function () {
    this.$el.html(this.template());

    if (this.large) {
      this.$(".modal-dialog").addClass("modal-lg");
    }

    this.attachSubview();
    $("body").append(this.$el);
    this.subview.onRender && this.subview.onRender();

    this.$("#myModal").modal();
  },

  attachSubview: function () {
    this.subview.render();
    this.$(".modal-content").html(this.subview.$el);
  },

  remove: function () {
    // kill all cloudinary iframes
    $("iframe").remove();

    // kill geocomplete container
    $(".pac-container").remove();

    // kill listener
    this.$(".modal").off("hidden.bs.modal", this.remove.bind(this));

    // kill self
    this.subview.remove();
    Backbone.View.prototype.remove.call(this);
  }
});