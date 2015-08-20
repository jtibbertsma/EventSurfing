EventSurfing.Utils.renderEventForm = function (options) {
  var model = options && options.model;

  if (!model) {
    model = new EventSurfing.Models.Event();
  }

  new EventSurfing.Views.Modal({
    subview: new EventSurfing.Views.EventForm({ model: model })
  });
};