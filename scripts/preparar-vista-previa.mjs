// Genera la imagen de vista previa que muestran WhatsApp, Instagram y
// las redes al compartir el enlace (Open Graph). Es la primera impresión
// de la marca en el canal por el que llega casi todo el tráfico, así que
// no conviene dejarla librada a que el crawler elija una imagen suelta.
//
// Formato 1200x630 (1.91:1), el que piden Open Graph y Twitter.
//
// Sale a public/ y no a src/: necesita una ruta estable y sin hash,
// porque los crawlers la piden por URL absoluta.
//
// Uso: node scripts/preparar-vista-previa.mjs

import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const ANCHO = 1200;
const ALTO = 630;
const ANCHO_FOTO = 720;

const AZUL = { r: 10, g: 26, b: 47 }; // --color-azul-900

const [foto, emblema] = await Promise.all([
  readFile('src/activos/imagenes/hero/hero-productos.jpg'),
  readFile('src/activos/imagenes/marca/logo-karika.png'),
]);

// La foto ocupa la derecha; el degradado la funde con el azul de la
// izquierda para que no se lea como un recorte pegado.
const fotoRecortada = await sharp(foto)
  .resize(ANCHO_FOTO, ALTO, { fit: 'cover', position: 'center' })
  .toBuffer();

const degradado = Buffer.from(
  `<svg width="${ANCHO_FOTO}" height="${ALTO}" xmlns="http://www.w3.org/2000/svg">
     <defs>
       <linearGradient id="velo" x1="0" y1="0" x2="1" y2="0">
         <stop offset="0%" stop-color="rgb(${AZUL.r},${AZUL.g},${AZUL.b})" stop-opacity="1"/>
         <stop offset="45%" stop-color="rgb(${AZUL.r},${AZUL.g},${AZUL.b})" stop-opacity="0.35"/>
         <stop offset="100%" stop-color="rgb(${AZUL.r},${AZUL.g},${AZUL.b})" stop-opacity="0"/>
       </linearGradient>
     </defs>
     <rect width="${ANCHO_FOTO}" height="${ALTO}" fill="url(#velo)"/>
   </svg>`,
);

const fotoConVelo = await sharp(fotoRecortada)
  .composite([{ input: degradado, blend: 'over' }])
  .toBuffer();

// El emblema ya viene circular y con transparencia desde
// scripts/preparar-hero.mjs, así que solo hay que escalarlo.
const LADO_EMBLEMA = 190;

const emblemaRedimensionado = await sharp(emblema).resize(LADO_EMBLEMA, LADO_EMBLEMA).toBuffer();

const salida = await sharp({
  create: { width: ANCHO, height: ALTO, channels: 3, background: AZUL },
})
  .composite([
    { input: fotoConVelo, left: ANCHO - ANCHO_FOTO, top: 0 },
    { input: emblemaRedimensionado, left: 96, top: Math.round((ALTO - LADO_EMBLEMA) / 2) },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toBuffer();

await writeFile('public/vista-previa.jpg', salida);
console.log(`public/vista-previa.jpg  ${ANCHO}x${ALTO}  ${(salida.length / 1024).toFixed(0)} KB`);
