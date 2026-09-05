// Deriva dos piezas de la imagen que entregó el cliente:
//
// 1. El emblema circular de Karika, que es el único lugar donde vino el
//    logo. Se usa en encabezado, loader y pie: no inventamos una marca.
// 2. El hero sin el copy quemado. La imagen original trae el titular, la
//    bajada y el logo incrustados en el tercio izquierdo; recortando esa
//    franja quedan solo los envases, y el titular puede ir como texto
//    real en HTML sobre un velo azul, que es lo que pedía el brief
//    (docs/brief.md, sección 4).
//
// PENDIENTE (docs/brief.md, pendiente 2): falta el logo vectorial. Al ser
// un recorte de PNG no escala más allá de su resolución nativa.
//
// Uso: node scripts/preparar-hero.mjs

import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const ORIGEN = 'src/activos/imagenes/hero/hero-provisorio.png';
const hero = await readFile(ORIGEN);

// El emblema se guarda a su resolución nativa: antes se escalaba de 336 a
// 512 y el resultado salía blando, porque no había píxeles nuevos que
// inventar. 336 alcanza de sobra — el uso más grande es el loader, a 96
// CSS px, que en pantallas 3x pide 288.
const LADO_EMBLEMA = 336;

// La máscara circular se hornea en el propio PNG en vez de dejarla al
// `border-radius` del CSS: así el archivo se explica solo y no arrastra
// las esquinas azules del hero, que además pesaban de más.
const mascaraCircular = Buffer.from(
  `<svg width="${LADO_EMBLEMA}" height="${LADO_EMBLEMA}" xmlns="http://www.w3.org/2000/svg">
     <circle cx="${LADO_EMBLEMA / 2}" cy="${LADO_EMBLEMA / 2}" r="${LADO_EMBLEMA / 2 - 1}" fill="white"/>
   </svg>`,
);

const piezas = [
  {
    destino: 'src/activos/imagenes/marca/logo-karika.png',
    region: { left: 156, top: 40, width: LADO_EMBLEMA, height: LADO_EMBLEMA },
    salida: (t) =>
      t
        // Un afilado suave recupera el filo que perdió el emblema al venir
        // incrustado en una imagen comprimida.
        .sharpen({ sigma: 0.6 })
        .composite([{ input: mascaraCircular, blend: 'dest-in' }])
        .png({ compressionLevel: 9 }),
  },
  {
    // Desde x=620 arranca el bodegón y termina el texto quemado.
    destino: 'src/activos/imagenes/hero/hero-productos.jpg',
    region: { left: 620, top: 0, width: 916, height: 1024 },
    salida: (t) => t.jpeg({ quality: 86, mozjpeg: true }),
  },
];

for (const { destino, region, salida } of piezas) {
  const buffer = await salida(sharp(hero).extract(region)).toBuffer();
  await writeFile(destino, buffer);
  console.log(`${destino}  ${(buffer.length / 1024).toFixed(0)} KB`);
}
