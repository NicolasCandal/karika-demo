// Catálogo. Marcas, nombres, presentaciones y descripciones tomados de
// las fichas de producto que envió el cliente
// (src/activos/imagenes/productos/). Nada de esto está inventado.
//
// PENDIENTE (docs/brief.md, pendiente 4): precio y moneda. Las fichas
// dicen "venta al mayoreo desde 5 piezas" pero no traen importe, así que
// la tarjeta remite a consultar por WhatsApp en lugar de mostrar un
// número inventado.
//
// Cada producto tiene dos imágenes:
// - `imagen`: recorte limpio del envase, para la tarjeta del carrusel. Lo
//   genera scripts/recortar-envases.mjs a partir de la ficha.
// - `ficha`: la infografía completa del cliente, que se abre en un
//   diálogo. Ahí su texto sí se lee, cosa que a 272px no pasaba.

import brumaDrAltheaFicha from '../activos/imagenes/productos/dr-althea-345-relief-cream-mist.jpg';
import brumaDrAlthea from '../activos/imagenes/productos/dr-althea-345-relief-cream-mist-envase.jpg';
import protectorRoundLabFicha from '../activos/imagenes/productos/round-lab-birch-juice-sun-cream.jpg';
import protectorRoundLab from '../activos/imagenes/productos/round-lab-birch-juice-sun-cream-envase.jpg';
import mascarillaSkin1004Ficha from '../activos/imagenes/productos/skin1004-centella-clay-stick-mask.jpg';
import mascarillaSkin1004 from '../activos/imagenes/productos/skin1004-centella-clay-stick-mask-envase.jpg';
import serumSkin1004Ficha from '../activos/imagenes/productos/skin1004-centella-hyalu-cica-sun-serum.jpg';
import serumSkin1004 from '../activos/imagenes/productos/skin1004-centella-hyalu-cica-sun-serum-envase.jpg';

export const listaProductos = [
  {
    id: 'round-lab-birch-juice-sun-cream',
    marca: 'Round Lab',
    nombre: 'Birch Juice Moisturizing Sun Cream SPF50+ PA++++',
    presentacion: '50 ml',
    descripcion:
      'Protector solar hidratante que protege contra los rayos UV mientras repone y retiene la humedad en la piel.',
    imagen: protectorRoundLab,
    ficha: protectorRoundLabFicha,
    precio: null,
  },
  {
    id: 'skin1004-centella-hyalu-cica-sun-serum',
    marca: 'SKIN1004',
    nombre: 'Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++',
    presentacion: '50 ml',
    descripcion:
      'Protector solar ligero e hidratante que protege tu piel de los rayos UV mientras la calma e hidrata.',
    imagen: serumSkin1004,
    ficha: serumSkin1004Ficha,
    precio: null,
  },
  {
    id: 'skin1004-centella-clay-stick-mask',
    marca: 'SKIN1004',
    nombre: 'Madagascar Centella Poremizing Quick Clay Stick Mask',
    presentacion: '27 g',
    descripcion:
      'Mascarilla en barra con arcilla que limpia profundamente los poros, controla el exceso de grasa y deja la piel suave y fresca al instante.',
    imagen: mascarillaSkin1004,
    ficha: mascarillaSkin1004Ficha,
    precio: null,
  },
  {
    id: 'dr-althea-345-relief-cream-mist',
    marca: 'Dr. Althea',
    nombre: '345 Relief Cream Mist',
    presentacion: '60 ml',
    descripcion:
      'Bruma facial hidratante y calmante que refresca la piel al instante, aporta hidratación profunda y ayuda a fortalecer la barrera cutánea.',
    imagen: brumaDrAlthea,
    ficha: brumaDrAltheaFicha,
    precio: null,
  },
];
