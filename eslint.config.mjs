// Configuración de ESLint (flat config). Depende de typescript-eslint,
// eslint-plugin-astro, eslint-plugin-jsx-a11y y eslint-config-prettier
// (este último desactiva reglas de estilo que ya cubre Prettier).
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'jsx-a11y': jsxA11y },
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
  },
  {
    // El frontmatter de .astro es TypeScript: los tipos globales del DOM
    // (HTMLElementTagNameMap, etc.) los valida `astro check`, no ESLint.
    files: ['**/*.astro'],
    rules: {
      'no-undef': 'off',
    },
  },
  {
    // Los scripts de scripts/ corren en Node, no en el navegador.
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: { console: 'readonly', process: 'readonly' },
    },
  },
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
  prettier,
);
