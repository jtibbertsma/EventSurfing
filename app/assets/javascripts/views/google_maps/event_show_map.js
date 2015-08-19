PadCrashing.Views.EventShowMap = Backbone.View.extend({
  template: JST["google_maps/event_show_map"],

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    return this;
  },

  onRender: function () {
    var center = new google.maps.LatLng(
      this.model.get("lat"),
      this.model.get("lng")
    );
    var mapOptions = {
      center: center,
      zoom: 15
    };

    $("#myModal").one("shown.bs.modal", function () {
      var map = this.map = new google.maps.Map(
        this.$(".map-holder")[0],
        mapOptions
      );
    }.bind(this));
  }
});