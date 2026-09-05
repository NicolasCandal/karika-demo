// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// Open Graph exige URLs absolutas, así que Astro necesita saber el
// dominio. Todavía no existe: al desplegar se fija con la variable de
// entorno SITE_URL (en Vercel o Netlify se carga desde el panel). El
// valor por defecto sirve para verificar las etiquetas en desarrollo.
const sitio = process.env.SITE_URL ?? 'http://localhost:4321';

// Preact en lugar de React: las dos únicas islas (CargadorMarca y
// Formulario) no justifican los ~190KB de react + react-dom, que rompían
// el presupuesto de 40KB de JS de CLAUDE.md.
// https://astro.build/config
export default defineConfig({
  site: sitio,
  integrations: [preact()],
});
