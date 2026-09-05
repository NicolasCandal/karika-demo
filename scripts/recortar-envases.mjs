// Recorta el envase de cada ficha de producto para usarlo en la tarjeta
// del carrusel. Las fichas que manda el cliente son infografías de
// Instagram (1440x1440) con el copy quemado: a 272px de ancho ese texto
// es ilegible, así que la tarjeta muestra solo el envase y la ficha
// completa queda para el diálogo de "ver ficha".
//
// Uso: node scripts/recortar-envases.mjs
//
// El recorte se apoya en el fondo plano de cada ficha: se toma la región
// del envase y se centra sobre un lienzo cuadrado pintado con el color
// muestreado de esa misma región, para que no se note el corte.

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const CARPETA = 'src/activos/imagenes/productos';
// Salida 3:4: los envases son muy verticales y un lienzo cuadrado deja
// demasiado aire a los costados.
const ANCHO = 750;
const ALTO = 1000;

// Región del envase dentro de cada ficha de 1440x1440. Los límites
// esquivan a propósito la columna de texto de la izquierda, los iconos
// de beneficios de la derecha y la barra inferior de "envío inmediato".
const recortes = [
  {
    archivo: 'round-lab-birch-juice-sun-cream.jpg',
    region: { left: 730, top: 70, width: 660, height: 1125 },
  },
  {
    archivo: 'skin1004-centella-hyalu-cica-sun-serum.jpg',
    region: { left: 700, top: 90, width: 535, height: 1115 },
  },
  {
    archivo: 'skin1004-centella-clay-stick-mask.jpg',
    region: { left: 690, top: 175, width: 535, height: 1000 },
  },
  {
    archivo: 'dr-althea-345-relief-cream-mist.jpg',
    region: { left: 730, top: 100, width: 460, height: 1090 },
  },
];

// Color de fondo: se muestrea la esquina superior izquierda del recorte,
// que en las cuatro fichas cae sobre fondo liso.
async function colorDeFondo(imagen, region) {
  const { data } = await sharp(imagen)
    .extract({ left: region.left, top: region.top, width: 24, height: 24 })
    .resize(1, 1)
    .raw()
    .toBuffer({ resolveWithObject: true });

  return { r: data[0], g: data[1], b: data[2] };
}

for (const { archivo, region } of recortes) {
  const origen = path.join(CARPETA, archivo);
  const destino = path.join(CARPETA, archivo.replace(/\.jpg$/, '-envase.jpg'));
  const original = await readFile(origen);

  const fondo = await colorDeFondo(original, region);

  const salida = await sharp(original)
    .extract(region)
    .resize(ANCHO, ALTO, { fit: 'contain', background: fondo })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  await writeFile(destino, salida);
  console.log(
    `${destino}  ${(salida.length / 1024).toFixed(0)} KB  fondo rgb(${fondo.r},${fondo.g},${fondo.b})`,
  );
}
