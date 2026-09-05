// Íconos de pestaña, recortados del emblema del cliente.
//
// Se recorta solo el mapa con el monograma K&K y se deja fuera el aro, la
// palabra KARIKA y las cajas: con el emblema entero, a 32px todo se
// apelmazaba en una mancha marrón. Recortado así, el mapa llena el ícono.
//
// Compromiso conocido: de 48px para arriba se lee bien —se distingue
// México y el K&K—, pero a 32px, que es lo que muestra la pestaña en
// pantallas sin alta densidad, queda borroso. Es la decisión del cliente,
// que prefiere que se vea el país. La alternativa evaluada fue una K en
// Prata, legible a cualquier tamaño pero sin el mapa.
//
// Uso: node scripts/preparar-iconos.mjs

import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const AZUL = { r: 10, g: 26, b: 47, alpha: 1 };

// Caja del mapa dentro del emblema de 336px, medida sobre una grilla.
const MAPA = { left: 84, top: 74, width: 212, height: 152 };

// 32 para la pestaña, 48 y 96 para pestañas en alta densidad y marcadores,
// 180 para el ícono de iOS.
const LADOS = [32, 48, 96, 180];

for (const lado of LADOS) {
  const buffer = await sharp('src/activos/imagenes/marca/logo-karika.png')
    .extract(MAPA)
    // `contain` sobre el azul de la marca: el mapa es apaisado y recortarlo
    // a cuadrado le cortaría las puntas, que es justo lo que lo hace
    // reconocible.
    .resize(lado, lado, { fit: 'contain', background: AZUL })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await writeFile(`public/icono-${lado}.png`, buffer);
  console.log(`public/icono-${lado}.png  ${lado}x${lado}  ${(buffer.length / 1024).toFixed(1)} KB`);
}
