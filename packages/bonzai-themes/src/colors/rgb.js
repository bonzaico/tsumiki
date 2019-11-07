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
export function rgba(r, g, b, opacity) {
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function rgb(r, g, b) {
    return rgba(r, g, b, 1);
}
