PadCrashing.Utils.renderEventForm = function (options) {
  var model = options && options.model;
  var navigateBack = options && options.navigateBack;

  if (!model) {
    model = new PadCrashing.Models.Event();
  }

  new PadCrashing.Views.Modal({
    navigateBack: navigateBack,

    subview: new PadCrashing.Views.EventForm({ model: model })
  });
};