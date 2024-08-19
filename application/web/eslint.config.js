const { fixupPluginRules } = require("@eslint/compat")
const js = require("@eslint/js")
const perfectionistPlugin = require("eslint-plugin-perfectionist")
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended")
const reactHooks = require("eslint-plugin-react-hooks")
const reactRefresh = require("eslint-plugin-react-refresh")
const unusedImports = require("eslint-plugin-unused-imports")
const tseslint = require("typescript-eslint")

module.exports = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {ignores: ['eslint.config.js', 'dist', './src/codegen/__generated__/**/*']},
  {
    ...eslintPluginPrettierRecommended,
    rules: {
      ...eslintPluginPrettierRecommended.rules,
      "prettier/prettier": [
        "error",
        {
          arrowParens: "always",
          bracketSameLine: false,
          bracketSpacing: true,
          endOfLine: "auto",
          htmlWhitespaceSensitivity: "css",
          insertPragma: false,
          jsxSingleQuote: true,
          printWidth: 80,
          proseWrap: "preserve",
          quoteProps: "as-needed",
          requirePragma: true,
          semi: false,
          singleAttributePerLine: true,
          singleQuote: false,
          tabWidth: 2,
          trailingComma: "es5",
        },
      ],
    },
  },
  {
    ...perfectionistPlugin.configs["recommended-alphabetical"],
    plugins: {
      perfectionistPlugin,
      ...perfectionistPlugin.configs["recommended-alphabetical"].plugins,
    },
    rules: {
      ...perfectionistPlugin.configs["recommended-alphabetical"].rules,
      "perfectionist/sort-imports": [
        "error",
        {
          customGroups: {
            value: {
              builtin: "node:*",
            },
          },
          environment: "node",
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          ignoreCase: true,
          internalPattern: ["@/**"],
          newlinesBetween: "always",
          order: "asc",
          type: "alphabetical",
        },
      ],
    },
  },
  {
    plugins: {
      'react-hooks': fixupPluginRules(reactHooks),
      'react-refresh': fixupPluginRules(reactRefresh),
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
    },
  },
)
