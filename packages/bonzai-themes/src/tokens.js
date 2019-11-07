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
export function formatTokenName(token) {
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

export const tokens = {
  colors,
  type: []
};
