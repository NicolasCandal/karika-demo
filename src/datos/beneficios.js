// Los cuatro datos que el brief pide destacar (docs/brief.md, sección 1 y
// 4). Sin marcadores numerados: no son una secuencia.
//
// El primer punto ya no dice "Exclusividad" con una frase genérica: las
// fichas del cliente traen un dato concreto — "venta al mayoreo desde 5
// piezas" — que dice mucho más. La exclusividad la carga el diseño, como
// pide el propio brief, no una oración que la nombre.
//
// PENDIENTE: alcance real de la garantía y dirección exacta — ver
// docs/brief.md, pendientes 1 y 3. No se afirma "garantía de 5 años" sin
// aclarar qué cubre, para no restar credibilidad sobre un producto con
// fecha de caducidad.

export const listaBeneficios = [
  {
    id: 'mayoreo',
    titulo: 'Venta al mayoreo desde 5 piezas',
    descripcion: 'Pedido mínimo de cinco piezas, con atención personalizada.',
  },
  {
    id: 'garantia',
    titulo: 'Garantía',
    descripcion:
      'PENDIENTE: confirmar con el cliente qué cubre la garantía (satisfacción, vida útil sin abrir, u otro alcance) antes de publicar un plazo.',
  },
  {
    id: 'envios',
    titulo: 'Envíos a todo México',
    descripcion: 'Hacemos llegar el pedido a cualquier punto de la República.',
  },
  {
    id: 'ubicacion',
    titulo: 'Ubicación',
    descripcion: 'PENDIENTE: dirección exacta del local (docs/brief.md, pendiente 3).',
  },
];
