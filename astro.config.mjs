// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// Open Graph exige URLs absolutas, así que Astro necesita saber el
// dominio. Se resuelve en cascada para que no dependa de que alguien se
// acuerde de configurarlo: el primer despliegue salió con las etiquetas
// apuntando a localhost justamente por eso, y la página se veía perfecta
// igual, así que no se notaba hasta compartir el enlace.
//
// 1. SITE_URL, para fijar el dominio propio cuando exista.
// 2. VERCEL_PROJECT_PRODUCTION_URL, el dominio de producción del proyecto.
// 3. VERCEL_URL, la URL de ese despliegue puntual (ramas y previews).
// 4. localhost, para desarrollo.
//
// Las variables de Vercel llegan sin protocolo.
const conProtocolo = (host) => (host ? `https://${host}` : null);

const sitio =
  process.env.SITE_URL ??
  conProtocolo(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  conProtocolo(process.env.VERCEL_URL) ??
  'http://localhost:4321';

// Preact en lugar de React: las dos únicas islas (CargadorMarca y
// Formulario) no justifican los ~190KB de react + react-dom, que rompían
// el presupuesto de 40KB de JS de CLAUDE.md.
// https://astro.build/config
export default defineConfig({
  site: sitio,
  integrations: [preact()],
});
