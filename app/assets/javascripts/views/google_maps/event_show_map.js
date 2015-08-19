PadCrashing.Views.EventShowMap = Backbone.View.extend({
  template: JST["google_maps/event_show_map"],

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    return this;
  },

  onRender: function () {
    var mapOptions = {
      center: new google.maps.LatLng( 37.5816061, -122.052577 ),
      zoom: 15
    };

    var map = this.map = new google.maps.Map(this.$(".map-holder")[0], mapOptions);

    $("#myModal").on("shown.bs.modal", function () {
      google.maps.event.trigger(map, 'resize');
    });
  }
});