const { rgb, rgba } = require('./rgb');
const { hsl, hsla } = require('./hsl');

const colors = {
    midnightBlue1: hsl(215.6, 45.7, 13.7),
    midnightBlue2: hsl(212.7, 37.1, 17.5),
    midnightBlue3: hsl(210, 29.1, 21.6),
    midnightBlue4: hsl(206.9, 20.5, 46.9),
    midnightBlue5: hsl(203.3, 32.5, 67.5),

    leafGreen1: hsl(90.3, 100, 18.6),
    leafGreen2: hsl(87.6, 100, 22.2),
    leafGreen3: hsl(85, 100, 25.9),
    leafGreen4: hsl(82.5, 60.2, 44.3),
    leafGreen5: hsl(80.2, 63.9, 59.8),

    gray1: hsl(213.8, 25.5, 30),
    gray2: hsl(210, 16.2, 38.8),
    gray3: hsl(207, 8.1, 48.6),
    gray4: hsl(202.9, 12.6, 67.3),
    gray5: hsl(198.9, 20.4, 81.8),

    blueGreen1: hsl(192.4, 65.4, 20.4),
    blueGreen2: hsl(187.1, 58.5, 25.5),
    blueGreen3: hsl(182.2, 52.9, 30.8),
    blueGreen4: hsl(176.7, 36, 50.4),
    blueGreen5: hsl(171.9, 52, 66.5),

    blue1: hsl(232.2, 39.4, 34.3),
    blue2: hsl(232.1, 30.4, 43.9),
    blue3: hsl(230.5, 27, 54.3),
    blue4: hsl(229.5, 35.8, 68.8),
    blue5: hsl(228.2, 49.5, 79.8),

    yellow1: hsl(40, 73.1, 39.4),
    yellow2: hsl(41.4, 67.7, 48.6),
    yellow3: hsl(43.3, 87.8, 58.2),
    yellow4: hsl(45, 90, 68.6),
    yellow5: hsl(46.7, 93.6, 75.5),

    red1: hsl(10.1, 74.7, 35.7),
    red2: hsl(14.1, 70.4, 43.7),
    red3: hsl(18.1, 72.7, 52.5),
    red4: hsl(21.9, 77.8, 64.7),
    red5: hsl(26.2, 85.4, 73.1),

    white: hsl(0, 0, 100),
    black: hsl(0, 0, 0),

    // temporary dark theme
    darkGrey10: "#191c20",
    darkGrey20: "#2d2d2d",

    //Green
    darkGreen10: "#47a447",
    darkGreen20: "rgb(37, 117, 120)",

    //Blue
    darkBlue10: "#0088cc",
    darkBlue20: "#5bc0de",

    //Yellow
    darkYellow10: "#ed9c28",
    darkYellow20: rgb(245, 229, 140),

    //Red
    darkRed10: "#d53f3a",
    darkRed20: rgb(236, 166, 143)

};

module.exports = colors;

// Primary Color

// module.exports.baseMidnightBlue = hsl(210, 29.1, 21.6);
// module.exports.baseLeafGreen = hsl(85, 100, 25.9);
// module.exports.baseWhite = hsl(0, 0, 100);
// module.exports.baseBlack = hsl(0, 0, 0);

// Secondary Color

// Grey
// module.exports.grey10 = hsl(207, 8.1, 48.6);
// module.exports.grey20 = hsl(204, 6.5, 84.9);

// Green
// module.exports.green10 = hsl(182.2, 52.9, 30.8);
// module.exports.green20 = hsl(94.3, 38.9, 92.9);

// Blue
// module.exports.blue10 = hsl(230.5, 27, 54.3);
// module.exports.blue20 = hsl(215.8, 54.3, 79.4);

// Yellow
// module.exports.yellow10 = hsl(43.3, 87.8, 58.2);
// module.exports.yellow20 = hsl(50.9, 84, 75.5);

// Red
// module.exports.red10 = hsl(18.1, 72.7, 52.5);
// module.exports.red20 = hsl(14.8, 71, 74.3);

//----------------------------------------------------------
//dark theme dummy color codes
// module.exports.baseMidnightBlue = rgb(39, 55, 71);
// module.exports.baseLeafGreen = rgb(77, 123, 0);
// module.exports.baseWhite = rgb(255, 255, 255);
// module.exports.baseBlack = rgb(0, 0, 0);

// //Secondary Color

// //Grey
// module.exports.darkGrey10 = "#191c20";
// module.exports.darkGrey20 = "#2d2d2d";

// //Green
// module.exports.darkGreen10 = "#47a447";
// module.exports.darkGreen20 = "rgb(37, 117, 120)";

// //Blue
// module.exports.darkBlue10 = "#0088cc";
// module.exports.darkBlue20 = "#5bc0de";

// //Yellow
// module.exports.darkYellow10 = "#ed9c28";
// module.exports.darkYellow20 = rgb(245, 229, 140);

// //Red
// module.exports.darkRed10 = "#d53f3a";
// module.exports.darkRed20 = rgb(236, 166, 143);
