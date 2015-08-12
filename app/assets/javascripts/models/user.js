PadCrashing.Models.User = Backbone.Model.extend({
  urlRoot: "api/users/",

  writeDescriptionParagraphs: function () {
    var $el = $("<div>");
    var paragraphs = this.escape("description_head").split("\n");

    paragraphs.forEach(function (paragraph) {
      $el.append($("<p>").text(paragraph));
    });

    return $el.html();
  }
});