EventSurfing.Utils.writeParagraphs = function (text) {
  var $el = $("<div>");
  var paragraphs = text.split("\n");

  paragraphs.forEach(function (paragraph) {
    $el.append($("<p>").text(paragraph));
  });

  return $el.html();
};