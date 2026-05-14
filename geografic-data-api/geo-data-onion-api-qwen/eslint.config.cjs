const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const globals = require("globals");

module.exports = [
    {
        // Define os arquivos que o ESLint deve analisar
        files: ["src/**/*.ts"],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: "module", // Mantém "module" pois o código TypeScript usa imports
            globals: {
                ...globals.node, // Habilita variáveis globais do Node.js (ex: process, __dirname)
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            // Importa as regras recomendadas do plugin TypeScript
            ...tsPlugin.configs.recommended.rules,
        },
    },
];
