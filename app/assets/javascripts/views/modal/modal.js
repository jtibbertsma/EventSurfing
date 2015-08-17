PadCrashing.Views.Modal = Backbone.View.extend({
  template: JST["modal/modal"],

  initialize: function (options) {
    this.navigateBack = options.navigateBack;

    this.subview = options.subview;
    this.subview.hideModal = function () {
      this.$("#myModal").modal("hide");
    }.bind(this)

    this.$(".modal").on("hidden.bs.modal", this.remove.bind(this));
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubview();
    $("body").append(this.$el);

    this.$("#myModal").modal();
  },

  attachSubview: function () {
    this.subview.render();
    this.$(".modal-content").html(this.subview.$el);
  },

  remove: function () {
    if (this.navigateBack) {
      Backbone.history.navigate(this.navigateBack, { trigger: false });
    }
    this.$(".modal").off("hidden.bs.modal", this.remove.bind(this));
    this.subview.remove();
    Backbone.View.prototype.remove.call(this);
  }
});