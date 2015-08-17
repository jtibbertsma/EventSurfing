PadCrashing.Utils.renderEventForm = function (options) {
  var model = options && options.model;

  if (!model) {
    model = new PadCrashing.Models.Event();
  }

  new PadCrashing.Views.Modal({
    subview: new PadCrashing.Views.EventForm({ model: model })
  });
};