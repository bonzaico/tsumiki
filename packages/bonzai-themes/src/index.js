export * from './light';
import * as light from './light';
import * as dark from './dark';
import { tokens, formatTokenName } from './tokens';

export { light, dark };
export { tokens, formatTokenName };
export const themes = {
  light,
  dark
};
