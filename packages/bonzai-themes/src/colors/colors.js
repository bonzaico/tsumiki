const { rgb, rgba } = require('./rgb');
const { hsl, hsla } = require('./hsl');

// Primary Color

module.exports.baseMidnightBlue = hsl(210, 29.1, 21.6);
module.exports.baseLeafGreen = hsl(85, 100, 25.9);
module.exports.baseWhite = hsl(0, 0, 100);
module.exports.baseBlack = hsl(0, 0, 0);

// Secondary Color

// Grey
module.exports.grey10 = hsl(207, 8.1, 48.6);
module.exports.grey20 = hsl(204, 6.5, 84.9);

// Green
module.exports.green10 = hsl(182.2, 52.9, 30.8);
module.exports.green20 = hsl(94.3, 38.9, 92.9);

// Blue
module.exports.blue10 = hsl(230.5, 27, 54.3);
module.exports.blue20 = hsl(215.8, 54.3, 79.4);

// Yellow
module.exports.yellow10 = hsl(43.3, 87.8, 58.2);
module.exports.yellow20 = hsl(50.9, 84, 75.5);

// Red
module.exports.red10 = hsl(18.1, 72.7, 52.5);
module.exports.red20 = hsl(14.8, 71, 74.3);

//----------------------------------------------------------
//dark theme dummy color codes
module.exports.baseMidnightBlue = rgb(39, 55, 71);
module.exports.baseLeafGreen = rgb(77, 123, 0);
module.exports.baseWhite = rgb(255, 255, 255);
module.exports.baseBlack = rgb(0, 0, 0);

//Secondary Color

//Grey
module.exports.darkGrey10 = "#191c20";
module.exports.darkGrey20 = "#2d2d2d";

//Green
module.exports.darkGreen10 = "#47a447";
module.exports.darkGreen20 = "rgb(37, 117, 120)";

//Blue
module.exports.darkBlue10 = "#0088cc";
module.exports.darkBlue20 = "#5bc0de";

//Yellow
module.exports.darkYellow10 = "#ed9c28";
module.exports.darkYellow20 = rgb(245, 229, 140);

//Red
module.exports.darkRed10 = "#d53f3a";
module.exports.darkRed20 = rgb(236, 166, 143);
