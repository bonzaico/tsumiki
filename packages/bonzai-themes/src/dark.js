//import { rgb, rgba } from './colors/rgb';
const {
    //Secondary Color
    baseMidnightBlueDark,
    baseLeafGreenDark,
    baseWhiteDark,
    baseBlackDark,
    //Secondary Color

    //Grey
    grey10Dark,
    grey20Dark,

    //Green
    green10Dark,
    green20Dark,

    //Blue
    blue10Dark,
    blue20Dark,

    //Yellow
    yellow10Dark,
    yellow20Dark,

    //Red
    red10Dark,
    red20Dark
} = require('./colors/colors');

const {
    rgba,
    rgb
}  = require('./colors/rgb');

module.exports.uiBackground = grey10Dark;
module.exports.interactive01 = baseLeafGreenDark;
module.exports.interactive02 = grey10Dark;
module.exports.interactive03 = grey20Dark;
module.exports.interactive04 = green10Dark;
module.exports.interactive05 = baseWhiteDark;
module.exports.text01 = baseMidnightBlueDark;
module.exports.text02 = baseLeafGreenDark;
module.exports.text03 = grey10Dark;
module.exports.text04 = grey20Dark;
module.exports.text05 = baseWhiteDark;
module.exports.overlay01 = rgba(0,0,0, 0.5);
module.exports.danger = red10Dark;
module.exports.focus = green10Dark;
module.exports.hoverPrimary = rgba(0,0,0, 0.9);
module.exports.activePrimary = green10Dark;
module.exports.hoverPrimaryText = baseWhiteDark;
module.exports.hoverSecondary = grey10Dark;
module.exports.activeSecondary = grey10Dark;
module.exports.disabled01 = grey20Dark;
module.exports.brand01 = baseMidnightBlueDark;
module.exports.brand02 = baseLeafGreenDark;
module.exports.ui1 = green10Dark;
module.exports.ui2 = green20Dark;
module.exports.ui3 = grey10Dark;
module.exports.ui4 = grey20Dark;
module.exports.ui5 = blue10Dark;
module.exports.ui6 = blue20Dark;
module.exports.ui7 = yellow10Dark;
module.exports.ui8 = yellow20Dark;
module.exports.ui9 = red10Dark;
module.exports.ui10 = red20Dark;
