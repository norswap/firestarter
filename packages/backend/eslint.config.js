import { fixupPluginRules } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals"
import path from "path"
import tseslint from "typescript-eslint"
import { fileURLToPath } from "url"

// see https://typescript-eslint.io/getting-started/
// see https://eslint.org/docs/latest/use/

// Legacy plugin support (for eslint-plugin-import)
// cf. https://github.com/angular-eslint/angular-eslint/issues/91 to check for updates
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: eslint.configs.recommended,
})
function legacyPlugin(name, alias = name) {
    const plugin = compat.plugins(name)[0]?.plugins?.[alias]

    if (!plugin) {
        throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`)
    }

    return fixupPluginRules(plugin)
}

export default tseslint.config(
    {
        ignores: ["**/node_modules"],
    },

    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    eslintConfigPrettier,

    {
        files: ["**/*.js", "**/*.cjs", "**/*.mjs", "**/*.jsx", "**/*.ts", "**/*.tsx"],

        languageOptions: {
            ecmaVersion: 2023,
            sourceType: "module",
            parserOptions: {
                project: "./tsconfig.json",
            },
            globals: {
                ...globals.node,
            },
        },

        plugins: {
            import: legacyPlugin("eslint-plugin-import", "import"),
            "simple-import-sort": simpleImportSort,
        },

        rules: {
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/restrict-template-expressions": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/ban-ts-comment": "off",

            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    // ignore unused args that start with underscore
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],

            "@typescript-eslint/no-restricted-imports": [
                "error",
                {
                    patterns: ["./*", "../*"],
                },
            ],
            "import/first": "error",
            "import/newline-after-import": "error",
            "import/no-duplicates": "error",
            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        // Side effect imports.
                        ["^\\u0000"],
                        // React & Next packages related packages come first.
                        ["^react", "^next"],
                        // Other external packages.
                        ["^@?\\w"],
                        // Custom group for src/ prefixed imports
                        ["^src/"],
                        // Parent imports. Put `..` last.
                        ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                        // Other relative imports. Put same-folder imports and `.` last.
                        ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                        // Style imports.
                        ["^.+\\.s?css$"],
                    ],
                },
            ],
        },
    },
    {
        // disable typing rules for js files
        files: ["**/*.js", "**/*.cjs", "**/*.mjs", "**/*.jsx"],
        extends: [tseslint.configs.disableTypeChecked],
        rules: {
            "@typescript-eslint/internal/no-poorly-typed-ts-props": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
        },
    }
)
