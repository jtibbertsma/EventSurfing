EventSurfing.Utils.writeParagraphs = function (text) {
  text = text.replace(/&#x27;/g, "'");

  var $el = $("<div>");
  var paragraphs = text.split("\n");

  paragraphs.forEach(function (paragraph) {
    $el.append($("<p>").text(paragraph));
  });

  return $el.html();
};