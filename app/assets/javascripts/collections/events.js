PadCrashing.Collections.Events = Backbone.Collection.extend({
  url: "api/events/",
  model: PadCrashing.Models.Event,

  // getOrFetch: function (id) {
  //   var model = this.get(id);
  //   if (!model) {
  //     model = new this.model({ id: id });
  //     this.add(model);
  //     model.fetch({
  //       error: function () {
  //         this.remove(id);
  //       }
  //     }.bind(this))
  //   } else {
  //     model.fetch();
  //   }

  //   return model;
  // }
});