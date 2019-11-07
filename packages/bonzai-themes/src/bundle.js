'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parse a given hexcode string into an rgba statement with the given opacity
 * @param {string} hexcode
 * @param {number} opacity
 * @returns {string}
 */
function rgba(r, g, b, opacity) {
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function rgb(r, g, b) {
    return rgba(r, g, b, 1);
}

//Primary Color

const baseMidnightBlue = rgb(39, 55, 71);
const baseLeafGreen = rgb(77, 123, 0);
const baseWhite = rgb(255, 255, 255);

//Secondary Color

//Grey
const grey10 = rgb(114, 125, 134);
const grey20 = rgb(214, 217, 219);

//Green
const green10 = rgb(37, 117, 120);
const green20 = rgb(236, 244, 230);

//Blue
const blue10 = rgb(107, 117, 170);
const blue20 = rgb(174, 197, 231);

//Yellow
const yellow10 = rgb(242, 190, 55);
const yellow20 = rgb(245, 229, 140);

//Red
const red10 = rgb(222, 99, 46);

//import { rgb, rgba } from './colors/rgb';

const uiBackground = baseWhite;
const interactive01 = baseLeafGreen;
const interactive02 = grey10;
const interactive03 = grey20;
const interactive04 = green10;
const interactive05 = baseWhite;
const text01 = baseMidnightBlue;
const text02 = baseLeafGreen;
const text03 = grey10;
const text04 = grey20;
const text05 = baseWhite;
const overlay01 = rgba(0,0,0, 0.5);
const danger = red10;
const focus = green10;
const hoverPrimary = rgba(0,0,0, 0.9);
const activePrimary = green10;
const hoverPrimaryText = baseWhite;
const hoverSecondary = grey10;
const activeSecondary = grey10;
const disabled01 = grey20;
const brand01 = baseMidnightBlue;
const brand02 = baseLeafGreen;
const ui1 = green10;
const ui2 = green20;
const ui3 = grey10;
const ui4 = grey20;
const ui5 = blue10;
const ui6 = blue20;
const ui7 = yellow10;
const ui8 = yellow20;
const ui9 = red10;
//export const ui10 = red20;

var light = /*#__PURE__*/Object.freeze({
  uiBackground: uiBackground,
  interactive01: interactive01,
  interactive02: interactive02,
  interactive03: interactive03,
  interactive04: interactive04,
  interactive05: interactive05,
  text01: text01,
  text02: text02,
  text03: text03,
  text04: text04,
  text05: text05,
  overlay01: overlay01,
  danger: danger,
  focus: focus,
  hoverPrimary: hoverPrimary,
  activePrimary: activePrimary,
  hoverPrimaryText: hoverPrimaryText,
  hoverSecondary: hoverSecondary,
  activeSecondary: activeSecondary,
  disabled01: disabled01,
  brand01: brand01,
  brand02: brand02,
  ui1: ui1,
  ui2: ui2,
  ui3: ui3,
  ui4: ui4,
  ui5: ui5,
  ui6: ui6,
  ui7: ui7,
  ui8: ui8,
  ui9: ui9
});

//import { rgb, rgba } from './colors/rgb';

const uiBackground$1 = baseWhite;
const interactive01$1 = baseLeafGreen;
const interactive02$1 = grey10;
const interactive03$1 = grey20;
const interactive04$1 = green10;
const interactive05$1 = baseWhite;
const text01$1 = baseMidnightBlue;
const text02$1 = baseLeafGreen;
const text03$1 = grey10;
const text04$1 = grey20;
const text05$1 = baseWhite;
const overlay01$1 = rgba(0,0,0, 0.5);
const danger$1 = red10;
const focus$1 = green10;
const hoverPrimary$1 = rgba(0,0,0, 0.9);
const activePrimary$1 = green10;
const hoverPrimaryText$1 = baseWhite;
const hoverSecondary$1 = grey10;
const activeSecondary$1 = grey10;
const disabled01$1 = grey20;
const brand01$1 = baseMidnightBlue;
const brand02$1 = baseLeafGreen;
const ui1$1 = green10;
const ui2$1 = green20;
const ui3$1 = grey10;
const ui4$1 = grey20;
const ui5$1 = blue10;
const ui6$1 = blue20;
const ui7$1 = yellow10;
const ui8$1 = yellow20;
const ui9$1 = red10;
//export const ui10 = red20;

var dark = /*#__PURE__*/Object.freeze({
  uiBackground: uiBackground$1,
  interactive01: interactive01$1,
  interactive02: interactive02$1,
  interactive03: interactive03$1,
  interactive04: interactive04$1,
  interactive05: interactive05$1,
  text01: text01$1,
  text02: text02$1,
  text03: text03$1,
  text04: text04$1,
  text05: text05$1,
  overlay01: overlay01$1,
  danger: danger$1,
  focus: focus$1,
  hoverPrimary: hoverPrimary$1,
  activePrimary: activePrimary$1,
  hoverPrimaryText: hoverPrimaryText$1,
  hoverSecondary: hoverSecondary$1,
  activeSecondary: activeSecondary$1,
  disabled01: disabled01$1,
  brand01: brand01$1,
  brand02: brand02$1,
  ui1: ui1$1,
  ui2: ui2$1,
  ui3: ui3$1,
  ui4: ui4$1,
  ui5: ui5$1,
  ui6: ui6$1,
  ui7: ui7$1,
  ui8: ui8$1,
  ui9: ui9$1
});

const colors = [
    'uiBackground',
    'interactive01',
    'interactive02',
    'interactive03',
    'interactive04',
    'interactive05',
    'text01',
    'text02',
    'text03',
    'text04',
    'text05',
    'overlay01',
    'danger',
    'focus',
    'hoverPrimary',
    'activePrimary',
    'hoverPrimaryText',
    'hoverSecondary',
    'activeSecondary',
    'disabled01',
    'brand01',
    'brand02',
    'ui1',
    'ui2',
    'ui3',
    'ui4',
    'ui5',
    'ui6',
    'ui7',
    'ui8',
    'ui9',
];

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Format a given token into the format expected in CSS/SCSS-based projects.
 * @param {string} token
 * @returns {string}
 */
function formatTokenName(token) {
  let string = '';

  for (let i = 0; i < token.length; i++) {
    // If we run into a number, we hit the scale step at the end of a token name
    // and can safely truncate the rest of the token
    if (numbers.indexOf(token[i]) !== -1) {
      string += '-' + token.slice(i);
      break;
    }

    // When encountering an uppercase name, we will want to start adding `-`
    // between words
    if (token[i] === token[i].toUpperCase()) {
      // Check backwards to see if previous letter was also capitalized, if so
      // we are in a special case like UI where each piece should be connected
      if (token[i - 1] && token[i - 1] === token[i - 1].toUpperCase()) {
        string += token[i].toLowerCase();
        continue;
      }

      // Otherwise, just concatenate this new part on to the existing string
      string += '-' + token[i].toLowerCase();
      continue;
    }

    // By default, we add the current character to the output string
    string += token[i];
  }

  return string;
}

const tokens = {
  colors,
  type: []
};

const themes = {
  light,
  dark
};

exports.light = light;
exports.dark = dark;
exports.tokens = tokens;
exports.formatTokenName = formatTokenName;
exports.themes = themes;
exports.uiBackground = uiBackground;
exports.interactive01 = interactive01;
exports.interactive02 = interactive02;
exports.interactive03 = interactive03;
exports.interactive04 = interactive04;
exports.interactive05 = interactive05;
exports.text01 = text01;
exports.text02 = text02;
exports.text03 = text03;
exports.text04 = text04;
exports.text05 = text05;
exports.overlay01 = overlay01;
exports.danger = danger;
exports.focus = focus;
exports.hoverPrimary = hoverPrimary;
exports.activePrimary = activePrimary;
exports.hoverPrimaryText = hoverPrimaryText;
exports.hoverSecondary = hoverSecondary;
exports.activeSecondary = activeSecondary;
exports.disabled01 = disabled01;
exports.brand01 = brand01;
exports.brand02 = brand02;
exports.ui1 = ui1;
exports.ui2 = ui2;
exports.ui3 = ui3;
exports.ui4 = ui4;
exports.ui5 = ui5;
exports.ui6 = ui6;
exports.ui7 = ui7;
exports.ui8 = ui8;
exports.ui9 = ui9;
