var hsla = function (r, g, b, opacity) {
  return `hsla(${r}, ${g}%, ${b}%, ${opacity})`;
}

var hsl = function (r, g, b) {
    return hsla(r, g, b, 1);
}

module.exports = { hsla: hsla, hsl: hsl };
