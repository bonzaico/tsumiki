//import { rgb, rgba } from './colors/rgb';
const {
    //Secondary Color
    baseMidnightBlue,
    baseLeafGreen,
    baseWhite,
    baseBlack,
    //Secondary Color

    //Grey
    darkGrey10,
    darkGrey20,

    //Green
    darkGreen10,
    darkGreen20,

    //Blue
    darkBlue10,
    darkBlue20,

    //Yellow
    darkYellow10,
    darkYellow20,

    //Red
    darkRed10,
    darkRed20
} = require('./colors/colors');

const {
    rgba,
    rgb
}  = require('./colors/rgb');

module.exports.uiBackground = darkGrey10;
module.exports.interactive01 = baseLeafGreen;
module.exports.interactive02 = darkGrey10;
module.exports.interactive03 = darkGrey20;
module.exports.interactive04 = darkGreen10;
module.exports.interactive05 = baseWhite;
module.exports.text01 = baseMidnightBlue;
module.exports.text02 = baseLeafGreen;
module.exports.text03 = darkGrey10;
module.exports.text04 = darkGrey20;
module.exports.text05 = baseWhite;
module.exports.overlay01 = rgba(0,0,0, 0.5);
module.exports.danger = darkRed10;
module.exports.focus = darkGreen10;
module.exports.hoverPrimary = rgba(0,0,0, 0.9);
module.exports.activePrimary = darkGreen10;
module.exports.hoverPrimaryText = baseWhite;
module.exports.hoverSecondary = darkGrey10;
module.exports.activeSecondary = darkGrey10;
module.exports.disabled01 = darkGrey20;
module.exports.brand01 = baseMidnightBlue;
module.exports.brand02 = baseLeafGreen;
module.exports.ui1 = darkGreen10;
module.exports.ui2 = darkGreen20;
module.exports.ui3 = darkGrey10;
module.exports.ui4 = darkGrey20;
module.exports.ui5 = darkBlue10;
module.exports.ui6 = darkBlue20;
module.exports.ui7 = darkYellow10;
module.exports.ui8 = darkYellow20;
module.exports.ui9 = darkRed10;
module.exports.ui10 = darkRed20;
