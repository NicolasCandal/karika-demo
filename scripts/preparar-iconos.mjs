// Íconos de pestaña.
//
// No se usa el emblema del cliente: a 32px su detalle —el mapa, el
// monograma, la palabra KARIKA— se convierte en una mancha marrón que no
// dice nada. Un favicon necesita una sola forma que sobreviva a 16px.
//
// Se usa entonces una K en Prata, la misma tipografía de los titulares,
// en el dorado del emblema sobre el azul de la marca. Es una inicial, no
// un logo inventado: el logo real sigue siendo el emblema del cliente y
// se usa en el encabezado, el loader y el pie.
//
// Uso: node scripts/preparar-iconos.mjs

import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const AZUL = { r: 10, g: 26, b: 47 };
const ORO = '#c8a272';
const LADO = 512; // se genera grande y se reduce, para que el trazo quede limpio

// La K se rasteriza con el propio woff2 del sitio, así el ícono y los
// titulares comparten dibujo de letra.
const letra = await sharp({
  text: {
    text: `<span foreground="${ORO}">K</span>`,
    fontfile: 'public/fuentes/prata-latin.woff2',
    font: 'Prata 120',
    rgba: true,
    dpi: 600,
  },
})
  .png()
  .toBuffer();

const { width, height } = await sharp(letra).metadata();

// Se escala la letra a ~58% del lienzo y se centra por su caja real.
const altoDestino = Math.round(LADO * 0.58);
const anchoDestino = Math.round((width / height) * altoDestino);
const letraEscalada = await sharp(letra).resize(anchoDestino, altoDestino).toBuffer();

const base = await sharp({
  create: { width: LADO, height: LADO, channels: 4, background: AZUL },
})
  .composite([
    {
      input: letraEscalada,
      left: Math.round((LADO - anchoDestino) / 2),
      top: Math.round((LADO - altoDestino) / 2),
    },
  ])
  .png()
  .toBuffer();

for (const lado of [32, 180]) {
  const buffer = await sharp(base).resize(lado, lado).png({ compressionLevel: 9 }).toBuffer();
  await writeFile(`public/icono-${lado}.png`, buffer);
  console.log(`public/icono-${lado}.png  ${lado}x${lado}  ${(buffer.length / 1024).toFixed(1)} KB`);
}
