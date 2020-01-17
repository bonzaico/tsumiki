var hsla = function(r, g, b, opacity) {
    return `hsla(${r}, ${g}%, ${b}%, ${opacity})`;
};

var hsl = function(r, g, b) {
    return hsla(r, g, b, 1);
};

const parse = function(hsl) {
    const [h, s, l, a] = hsl
        .replace(/^hsla\(/, "")
        .replace(/\)$/, "")
        .split(",")
        .map(s => s.trim())
        .map(s => s.replace(/\%/, ""));

    return { h, s, l, a };
};

const opacity = function(a, hsl) {
    var { h, s, l } = parse(hsl);

    return hsla(h, s, l, a);
};

module.exports = { hsla: hsla, hsl: hsl, opacity };
