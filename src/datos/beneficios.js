// Datos que la página destaca. Todos salen de las fichas que entregó el
// cliente (src/activos/imagenes/productos/), ninguno está inventado.
//
// Se cayó "Ubicación": el cliente confirmó que no tienen local físico y
// trabajan solo con envíos, así que el punto dejó de existir.
//
// Se cayó también "Garantía de hasta 5 años". Ese dato venía del brief,
// pero aparece tal cual en Oro & Glow, la página de joyería que el
// cliente pasó como referencia — donde una garantía de 5 años sí tiene
// sentido. Sobre cremas y protector solar, que caducan, no lo tiene.
// Hasta que el cliente aclare qué cubre, no se publica.
// Ver docs/brief.md, pendiente 1.

export const listaBeneficios = [
  {
    id: 'mayoreo',
    titulo: 'Mayoreo desde 5 piezas',
    descripcion: 'Pedido mínimo de cinco piezas, pensado para quien revende.',
  },
  {
    id: 'envios',
    titulo: 'Envíos a todo México',
    descripcion: 'Hacemos llegar el pedido a cualquier punto de la República.',
  },
  {
    id: 'existencia',
    titulo: 'En existencia',
    descripcion: 'Lo que está en el catálogo está disponible, con envío inmediato.',
  },
  {
    id: 'atencion',
    titulo: 'Atención personalizada',
    descripcion: 'Te acompañamos por Instagram, pedido por pedido.',
  },
];
