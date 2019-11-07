(function () {
  'use strict';

  /**
   * Copyright IBM Corp. 2015, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   */

  require('core-js/features/array/flat-map');

  const { types: t, generate } = require('./src/scss-generator/index');
  const fs = require('fs-extra');
  const path = require('path');
  const light = require('./src/bundle');
  const dark = require('./src/bundle');
  const { formatTokenName, tokens } = require('./src/bundle');

  const themes = {
      light,
      dark
  };

  const FILE_BANNER = t.Comment(` Code generated by @bonzai/themes. DO NOT EDIT.
 Copyright IBM Corp. 2018, 2018
 This source code is licensed under the Apache-2.0 license found in the
 LICENSE file in the root directory of this source tree.
`);

  const defaultTheme = 'light';
  const defaultThemeMapName = 'bonzai--theme';

  async function build() {
    const SCSS_DIR = path.resolve(__dirname, './scss');
    const files = [
      {
        filepath: path.join(SCSS_DIR, '_tokens.scss'),
        builder() {
          return buildTokensFile(tokens, themes[defaultTheme]);
        },
      },
      {
        filepath: path.join(SCSS_DIR, '_themes.scss'),
        builder() {
          return buildThemesFile(themes, tokens);
        },
      },
      {
        filepath: path.join(SCSS_DIR, '_mixins.scss'),
        builder() {
          return buildMixinsFile();
        },
      },
    ];

    await fs.ensureDir(SCSS_DIR);
    for (const { filepath, builder } of files) {
        console.log("filepath", filepath);
      const { code } = generate(builder());
      await fs.writeFile(filepath, code);
    }
  }

  /**
   * Build the AST for a _tokens.scss file with a structure similar to:
   *
   * $token-name-01: <some-value>;
   * $token-name-02: <some-value>;
   *
   * By default, these tokens are assigned to their value in the given
   * `defaultTheme`
   * @param {object} tokens
   * @param {object} metadata
   * @param {object} defaultTheme
   * @returns {SassAST}
   */
  function buildTokensFile(tokens, defaultTheme) {
    const assignments = Object.keys(tokens).flatMap(group => {
      return tokens[group].flatMap(token => {
        const name = formatTokenName(token);

        return [
          t.Newline(),
          t.Comment(`/ @type Color
/ @access public
/ @group @bonzai/themes`),
          t.Assignment({
            id: t.Identifier(name),
            init: t.SassFunctionCall(t.Identifier('if'), [
              t.LogicalExpression({
                left: t.SassFunctionCall(t.Identifier('global-variable-exists'), [
                  t.SassString('bonzai--theme'),
                ]),
                operator: 'and',
                right: t.SassFunctionCall(t.Identifier('map-has-key'), [
                  t.Identifier('bonzai--theme'),
                  t.SassString(name),
                ]),
              }),
              t.SassFunctionCall(t.Identifier('map-get'), [
                t.Identifier('bonzai--theme'),
                t.SassString(name),
              ]),
              //console.log("defaultTheme-->", defaultTheme),
              //console.log(token),
              primitive(defaultTheme[token]),
            ]),
            // init: ,
            default: true,
          }),
        ].filter(Boolean);
      });
    });

    return t.StyleSheet([FILE_BANNER, t.Newline(), ...assignments]);
  }

  function buildThemesFile(themes, tokens) {
    // Create maps for each theme:
    // $bonzai--theme--name: (
    //   token-name: token-value
    // ) !default;
    const themeMaps = Object.keys(themes).flatMap(name => {
      const theme = themes[name];
      const comment = t.Comment(`/ bonzai's ${name} color theme
/ @type Map
/ @access public
/ @group @bonzai/themes`);
    console.log("theme-->", theme);
      const variable = t.Assignment({
        id: t.Identifier(`bonzai--theme--${name}`),
        init: t.SassMap({
          properties: Object.keys(theme).map(token =>
            t.SassMapProperty(
              t.Identifier(formatTokenName(token)),
              primitive(theme[token])
            )
          ),
        }),
        default: true,
      });
      return [t.Newline(), comment, variable];
    });

    const bonzaiTheme = t.Assignment({
      id: t.Identifier(defaultThemeMapName),
      init: t.SassMap({
        properties: Object.keys(tokens).flatMap(group => {
          return tokens[group].flatMap(token => {
            const name = formatTokenName(token);
            return t.SassMapProperty(
              t.Identifier(name),
              t.SassFunctionCall(t.Identifier('if'), [
                t.SassFunctionCall(t.Identifier('global-variable-exists'), [
                  t.SassString(name),
                ]),
                t.Identifier(name),
                t.SassFunctionCall(t.Identifier('map-get'), [
                  t.Identifier('bonzai--theme--light'),
                  t.SassString(name),
                ]),
              ])
            );
          });
        }),
      }),
      default: true,
    });

    return t.StyleSheet([
      FILE_BANNER,
      t.Newline(),
      ...themeMaps,
      t.Newline(),
      t.Comment(`/ bonzai's default theme
/ @type Map
/ @access public
/ @alias bonzai--theme--${defaultTheme}
/ @group @bonzai/themes`),
      bonzaiTheme,
    ]);
  }

  function buildMixinsFile() {
    const comment = t.Comment(`/ Define theme variables from a map of tokens
/ @access public
/ @param {Map} $theme [$${defaultThemeMapName}] - Map of theme tokens
/ @param {Bool} $emit-custom-properties [false] - Output CSS Custom Properties for theme tokens
/ @content Pass in your custom declaration blocks to be used after the token maps set theming variables.
/
/ @example scss
/   // Default usage
/   @include bonzai--theme();
/
/   // Alternate styling (not light theme)
/   @include bonzai--theme($bonzai--theme--g90) {
/     // declarations...
/   }
/
/   // Inline styling
/   @include bonzai--theme($bonzai--theme--g90) {
/     .my-dark-theme {
/       // declarations...
/     }
/   }
/
/ @group @bonzai/themes`);

    // Create bonzai--theme mixin, takes a theme as input and assigns all theme
    // variables using the `!global` flag before resetting at the end of the
    // function block
    const mixin = t.SassMixin({
      id: t.Identifier('bonzai--theme'),
      params: [
        t.AssignmentPattern({
          left: t.Identifier('theme'),
          right: t.Identifier(defaultThemeMapName),
        }),
        t.AssignmentPattern({
          left: t.Identifier('emit-custom-properties'),
          right: t.SassBoolean(false),
        }),
        t.AssignmentPattern({
          left: t.Identifier('emit-difference'),
          right: t.SassBoolean(false),
        }),
      ],
      body: t.BlockStatement({
        body: [
          ...Object.keys(tokens).flatMap(group => {
            return tokens[group].flatMap(token => {
              const name = formatTokenName(token);

              return t.Assignment({
                id: t.Identifier(name),
                init: t.CallExpression({
                  callee: t.Identifier('map-get'),
                  arguments: [t.Identifier('theme'), t.SassString(name)],
                }),
                global: true,
              });
            });
          }),
          t.IfStatement({
            test: t.LogicalExpression({
              left: t.SassFunctionCall(t.Identifier('global-variable-exists'), [
                t.SassString('feature-flags'),
              ]),
              operator: 'and',
              right: t.SassFunctionCall(t.Identifier('map-get'), [
                t.Identifier('feature-flags'),
                t.SassString('enable-css-custom-properties'),
              ]),
            }),
            consequent: t.BlockStatement(
              Object.keys(tokens).flatMap(group => {
                return tokens[group]
                  .filter(token => {
                    // We don't want to inline CSS Custom Properties for tokens
                    // that are maps, we'll need to use a corresponding mixin for
                    // that token to embed CSS Custom Properties
                    return typeof themes[defaultTheme][token] !== 'object';
                  })
                  .flatMap(token => {
                    const name = formatTokenName(token);
                    return t.Assignment({
                      id: t.Identifier(name),
                      init: t.CallExpression({
                        callee: t.Identifier('var'),
                        arguments: [
                          t.SassValue({
                            value: `--#{$custom-property-prefix}-${name}`,
                          }),
                          t.CallExpression({
                            callee: t.Identifier('map-get'),
                            arguments: [
                              t.Identifier('theme'),
                              t.SassString(name),
                            ],
                          }),
                        ],
                      }),
                      global: true,
                    });
                  });
              })
            ),
          }),
          t.IfStatement({
            test: t.LogicalExpression({
              left: t.Identifier('emit-custom-properties'),
              operator: '==',
              right: t.SassBoolean(true),
            }),
            consequent: t.BlockStatement(
              Object.keys(tokens).flatMap(group => {
                return tokens[group].flatMap(token => {
                  const name = formatTokenName(token);
                  return [
                    t.Newline(),
                    t.IfStatement({
                      test: t.SassFunctionCall(t.Identifier('should-emit'), [
                        t.Identifier('theme'),
                        t.Identifier('bonzai--theme'),
                        t.SassString(name),
                        t.Identifier('emit-difference'),
                      ]),
                      consequent: t.BlockStatement([
                        t.SassMixinCall(t.Identifier('custom-property'), [
                          t.SassString(name),
                          t.SassFunctionCall(t.Identifier('map-get'), [
                            t.Identifier('theme'),
                            t.SassString(name),
                          ]),
                        ]),
                      ]),
                    }),
                  ];
                });
              })
            ),
          }),
          t.AtContent(),
          t.Comment(' Reset to default theme after apply in content'),
          t.IfStatement({
            test: t.LogicalExpression({
              left: t.Identifier('theme'),
              operator: '!=',
              right: t.Identifier(defaultThemeMapName),
            }),
            consequent: t.BlockStatement([
              t.SassMixinCall(t.Identifier('bonzai--theme')),
            ]),
          }),
        ],
      }),
    });

    return t.StyleSheet([
      FILE_BANNER,
      t.Newline(),
      t.SassImport('./themes'),
      t.Newline(),
      comment,
      mixin,
    ]);
  }

  function primitive(value) {
    if (typeof value === 'string') {
      if (value[0] === '#') {
        return t.SassColor(value);
      }
      if (
        value.endsWith('px') ||
        value.endsWith('em') ||
        value.endsWith('%') ||
        value.startsWith('rgb')
      ) {
        return t.SassValue(value);
      }
      return t.SassValue(`unquote("${value}")`);
    }
    if (typeof value === 'number') {
      return t.SassNumber(value);
    }
    if (Array.isArray(value)) {
      return t.SassList({
        elements: value.map(primitive),
      });
    }
    if (typeof value === 'object') {
      return t.SassMap({
        properties: Object.keys(value).map(key => {
          const quoted = key.includes(' ');
          const identifier = quoted
            ? t.Identifier(key)
            : t.Identifier(formatTokenName(key));
          return t.SassMapProperty({
            key: identifier,
            value: primitive(value[key]),
            quoted,
          });
        }),
      });
    }

    throw new Error(`Unknown primitive type for ${typeof value}`);
  }

  build().catch(error => {
    console.error(error);
    process.exit(1);
  });

}());
