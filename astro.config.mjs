// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// Preact en lugar de React: las dos únicas islas (CargadorMarca y
// Formulario) no justifican los ~190KB de react + react-dom, que rompían
// el presupuesto de 40KB de JS de CLAUDE.md.
// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
});
