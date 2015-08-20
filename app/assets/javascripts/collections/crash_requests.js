PadCrashing.Collections.CrashRequests = Backbone.Collection.extend({
  url: "api/crash_requests",
  model: PadCrashing.Models.CrashRequest
});