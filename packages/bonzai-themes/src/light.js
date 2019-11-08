//import { rgb, rgba } from './colors/rgb';
const {
    //Primary Color
    baseMidnightBlue,
    baseLeafGreen,
    baseWhite,
    baseBlack,
    //Secondary Color

    //Grey
    grey10,
    grey20,

    //Green
    green10,
    green20,

    //Blue
    blue10,
    blue20,

    //Yellow
    yellow10,
    yellow20,

    //Red
    red10,
    red20
} = require('./colors/colors');

const {
    rgba,
    rgb
}  = require('./colors/rgb');

module.exports.uiBackground = baseWhite;
module.exports.interactive01 = baseLeafGreen;
module.exports.interactive02 = grey10;
module.exports.interactive03 = grey20;
module.exports.interactive04 = green10;
module.exports.interactive05 = baseWhite;
module.exports.text01 = baseMidnightBlue;
module.exports.text02 = baseLeafGreen;
module.exports.text03 = grey10;
module.exports.text04 = grey20;
module.exports.text05 = baseWhite;
module.exports.overlay01 = rgba(0,0,0, 0.5);
module.exports.danger = red10;
module.exports.focus = green10;
module.exports.hoverPrimary = rgba(0,0,0, 0.9);
module.exports.activePrimary = green10;
module.exports.hoverPrimaryText = baseWhite;
module.exports.hoverSecondary = grey10;
module.exports.activeSecondary = grey10;
module.exports.disabled01 = grey20;
module.exports.brand01 = baseMidnightBlue;
module.exports.brand02 = baseLeafGreen;
module.exports.ui1 = green10;
module.exports.ui2 = green20;
module.exports.ui3 = grey10;
module.exports.ui4 = grey20;
module.exports.ui5 = blue10;
module.exports.ui6 = blue20;
module.exports.ui7 = yellow10;
module.exports.ui8 = yellow20;
module.exports.ui9 = red10;
module.exports.ui10 = red20;
