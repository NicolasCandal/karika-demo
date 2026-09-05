# Karika — Landing

Landing de una marca de dermocosmética (cremas, protector solar) que distribuye
en México. Objetivo: transmitir calidad y cerrar contacto por WhatsApp.

Brief completo, contenido y plan de fases: `docs/brief.md`.
Sistema de diseño: `src/estilos/tokens.css`.

## Stack

Astro con islas de Preact. Sitio estático, sin servidor.

Preact y no React: las islas son pocas y chicas, y `react` + `react-dom`
costaban ~190 KB, muy por encima del presupuesto de JS. Con Preact el
bundle queda en ~28 KB.

- Todo es `.astro` por defecto. Preact solo donde hay estado del cliente:
  loader de marca, toaster, formulario. El carrusel es CSS scroll-snap
  puro, sin framework.
- Hidratar con `client:visible`, nunca `client:load`, salvo el loader.
- Imágenes siempre con `<Image />` de `astro:assets`, nunca `<img>` crudo
  ni `background-image` en fotos de producto.
- Sin librería de UI ni de CSS. CSS propio con los tokens.

## Idioma

Todo en español: carpetas, archivos, componentes, funciones, variables,
comentarios y mensajes de commit.

Únicas excepciones, por convención: `hooks/` y `layout/`.

- Componentes: `PascalCase` español → `TarjetaProducto.astro`
- Hooks: `usarCarrusel.js`
- Funciones y variables: `camelCase` español → `formatearPrecio`, `listaProductos`
- CSS: `kebab-case` español → `.tarjeta-producto__titulo`

El copy visible es es-MX. No usar voseo ni vocabulario rioplatense.

## Estructura

```
src/
├── activos/imagenes/{hero,productos,marca}/
├── componentes/
│   ├── comunes/      Boton, Contenedor, Titulo, Skeleton, Toast
│   ├── layout/       Encabezado, PieDePagina, MenuMovil
│   ├── marca/        Logo, CargadorMarca
│   └── secciones/    hero, propuesta, carrusel, beneficios, ubicacion, contacto
├── contexto/         ContextoToast
├── datos/            productos.js, beneficios.js, navegacion.js
├── hooks/
├── layout/
├── estilos/          tokens.css, globales.css
└── paginas/
```

Cada sección es una carpeta autocontenida: su componente, sus subcomponentes
y su CSS. Debe poder borrarse entera sin romper el resto.

Los textos y los productos viven en `src/datos/`, nunca escritos dentro del
markup. Cambiar un precio debe ser tocar un array.

## Reglas no negociables

**Colores.** Ningún hexadecimal fuera de `tokens.css`. Si hace falta un tono
que no existe, se agrega al archivo de tokens con su comentario de uso.

**Espaciado.** Solo múltiplos de la escala (`--espacio-*`). Nada de `13px`.

**Comentarios.** Cada archivo abre con un bloque que dice qué hace y de qué
depende. Los comentarios explican por qué, no qué.

**Datos del cliente.** No inventar precios, testimonios, dirección, teléfono,
ni afirmaciones sobre los productos. Si falta un dato, dejar
`{/* PENDIENTE: ... */}` y avisarlo en la respuesta. Ver la lista abierta en
`docs/brief.md`.

**Alcance.** Una sección por tarea. No construir la landing completa de una vez.

## Presupuestos

| Métrica | Techo |
|---|---|
| Peso de la primera carga | 800 KB |
| Imagen del hero | 180 KB |
| Imagen de producto | 80 KB |
| JS enviado al cliente | 40 KB |
| LCP | 2.5 s |
| CLS | 0.1 |
| Lighthouse (las cuatro categorías) | ≥ 95 |

Si un cambio rompe un presupuesto, decirlo antes de aplicarlo.

## Accesibilidad

Contraste AA como piso. Foco visible en todo lo interactivo. Navegación
completa por teclado en el carrusel y el menú móvil. `prefers-reduced-motion`
respetado (los tokens ya anulan las duraciones). `alt` descriptivo en las
fotos de producto, `alt=""` en lo decorativo.

## Antipatrones a evitar

Vienen de decisiones ya tomadas, no son preferencias sueltas:

- Etiquetas en mayúsculas sostenidas sobre los títulos
- Marcadores numerados `01 / 02 / 03` en contenido que no es una secuencia
- Entradas fade-and-slide-up en cada sección al hacer scroll
- Tarjetas idénticas con el mismo radio y la misma sombra gris para todo
- Flechas `→` pegadas al texto de los botones
- Resaltar una sola palabra del titular en otro color
- Sombras negras (las del sistema son azuladas y muy bajas)

El sitio tiene un solo momento de movimiento orquestado: la transición del
loader al hero. Todo lo demás responde a una acción del usuario.

## Git

Commits convencionales en español, una rama por sección:

```
feat(hero): agrega titular y CTA principal
fix(carrusel): corrige foco al navegar con teclado
```
