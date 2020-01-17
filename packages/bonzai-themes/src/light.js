//import { rgb; rgba } from './colors/rgb';
const {
    white,
    black,

    midnightBlue3,
    midnightBlue5,

    leafGreen1,
    leafGreen3,
    leafGreen5,

    gray3,
    gray5,

    blueGreen3,
    blueGreen5,

    blue3,
    blue5,

    yellow3,
    yellow5,

    red3,
    red5
} = require('./colors/colors');

const {
    rgba,
    rgb
}  = require('./colors/rgb');

const { hsl, opacity } = require("./colors/hsl");

const uiBackground = white;
const interactive01 = leafGreen3;
const interactive02 = gray3;
const interactive03 = gray5;
const interactive04 = blueGreen3;
const interactive05 = white;
const text01 = midnightBlue3;
const text02 = leafGreen3;
const text03 = gray3;
const text04 = gray5;
const text05 = white;
const overlay01 = rgba(0,0,0, 0.5);
const danger = red3;
const focus = blueGreen3;
const hoverPrimary = leafGreen1;
const activePrimary = blueGreen3;
const hoverPrimaryText = white;
const hoverSecondary = hsl(204, 6.5, 80);
const activeSecondary = gray3;
const brand01 = midnightBlue3;
const brand02 = leafGreen3;
const ui1 = blueGreen3;
const ui2 = blueGreen5;
const ui3 = gray3;
const ui4 = gray5;
const ui5 = blue3;
const ui6 = blue5;
const ui7 = yellow3;
const ui8 = yellow5;
const ui9 = red3;
const ui10 = red5;
const disabled01 = opacity(0.5, interactive01);
const disabled02 = opacity(0.5, interactive02);
const disabled03 = opacity(0.5, interactive03);
const disabledText01 = opacity(0.6, text01);
const disabledText02 = opacity(0.6, text02);
const disabledText03 = opacity(0.6, text03);
const disabledText04 = opacity(0.6, text04);
const disabledText05 = opacity(0.6, text05);

module.exports.uiBackground = uiBackground ;
module.exports.interactive01 = interactive01;
module.exports.interactive02 = interactive02;
module.exports.interactive03 = interactive03;
module.exports.interactive04 = interactive04;
module.exports.interactive05 = interactive05;
module.exports.text01 = text01;
module.exports.text02 = text02;
module.exports.text03 = text03;
module.exports.text04 = text04;
module.exports.text05 = text05;
module.exports.overlay01 = overlay01;
module.exports.danger = danger;
module.exports.focus = focus;
module.exports.hoverPrimary = hoverPrimary;
module.exports.activePrimary = activePrimary;
module.exports.hoverPrimaryText = hoverPrimaryText;
module.exports.hoverSecondary = hoverSecondary;
module.exports.activeSecondary = activeSecondary;
module.exports.brand01 = brand01;
module.exports.brand02 = brand02;
module.exports.ui1 = ui1;
module.exports.ui2 = ui2;
module.exports.ui3 = ui3;
module.exports.ui4 = ui4;
module.exports.ui5 = ui5;
module.exports.ui6 = ui6;
module.exports.ui7 = ui7;
module.exports.ui8 = ui8;
module.exports.ui9 = ui9;
module.exports.ui10 = ui10;
module.exports.disabled01 = disabled01;
module.exports.disabled02 = disabled02;
module.exports.disabled03 = disabled03;
module.exports.disabledText01 = disabledText01;
module.exports.disabledText02 = disabledText01;
module.exports.disabledText03 = disabledText01;
module.exports.disabledText04 = disabledText01;
module.exports.disabledText05 = disabledText05;