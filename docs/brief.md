# Brief — Landing Karika

Documento de contexto. `CLAUDE.md` tiene las reglas operativas; esto tiene el
razonamiento y el contenido.

---

## 1. Negocio

Marca de dermocosmética (cremas faciales, protector solar) con distribución en
México. Instagram: `@karika.distribution`. El tráfico llega principalmente
desde ahí, así que la landing recibe visitas mayoritariamente móviles y en
frío: la persona no conoce la marca, viene de un reel.

**Trabajo de la página, en orden:** transmitir que el producto es serio,
mostrar el catálogo, y llevar a WhatsApp.

**Público:** consumidor final mexicano, y posiblemente revendedores (el handle
dice "distribution" — confirmar, ver pendientes).

**Datos que deben aparecer:**

- Lujo y exclusividad (se transmite con diseño, no con la palabra "lujo")
- Garantía de hasta 5 años → **ver pendientes, este dato está en revisión**
- Envíos a todo México
- Ubicación

---

## 2. Decisiones tomadas y por qué

**Astro sobre Next.js y Vite+React.** Una SPA sirve un HTML vacío: mal LCP, mal
SEO y previews rotos al compartir el link por WhatsApp, que es exactamente el
canal de esta marca. Astro entrega HTML estático y 0 KB de JS por defecto,
hidratando solo el carrusel y el loader. Next.js quedó como segunda opción
para cuando haya carrito.

**Estático en CDN.** Con archivos pre-generados, 100 o 100.000 visitas son el
mismo problema. Lo que sí escala mal es el peso de las imágenes (1.000 visitas
× 8 MB = 8 GB de tráfico) y el envío de mails del formulario, que en planes
gratuitos topa cerca de 3.000/mes y un bot lo quema en una tarde.

**Analítica liviana (Cloudflare Web Analytics o Umami), sin Meta Pixel.**
Decisión del cliente. Consecuencia: no hay retargeting ni medición de retorno
de pauta. A cambio, no hace falta banner de cookies. El aviso de privacidad en
el pie sigue siendo obligatorio por la LFPDPPP mexicana.

Eventos a instrumentar: `clic_cta_hero`, `clic_whatsapp`,
`ver_seccion_productos`, `interaccion_carrusel`, `envio_formulario`,
`clic_instagram`, `scroll_75`.

---

## 3. Diseño

**Concepto: luz atravesando agua.** El azul marino es agua profunda, el verde
agua es agua clara con luz. Es el vocabulario del producto (hidratación,
transparencia, filtro solar) y evita que la paleta sea decoración arbitraria.

**Tensión a manejar:** el cliente pidió lujo y exclusividad, pero eligió verde
agua como acento, que tira hacia lo clínico y no hacia lo lujoso. El lujo lo
cargan el espacio en blanco, la contención y el Bodoni. Si la página se llena
de elementos, cae en estética de farmacia.

**Paleta** (valores completos en `tokens.css`):

| Rol | Token | Hex | Contraste |
|---|---|---|---|
| Texto, fondos densos | `--color-azul-900` | `#0A1A2F` | 17.5:1 sobre blanco |
| Acento en texto | `--color-agua-800` | `#2F6660` | 6.6:1 sobre blanco (AA) |
| Acento sobre azul | `--color-agua-400` | `#8FC5C0` | 9.1:1 sobre azul-900 |
| Fondo de página | `--color-bruma` | `#F3F6F6` | — |

El acento ocupa como máximo el 10% de la superficie visible. `agua-400` y
`agua-600` no sirven para texto chico sobre blanco: solo `agua-800` pasa AA.

**Tipografía.** ~~Bodoni Moda~~ **Prata** para display, Manrope para cuerpo e
interfaz. Se descartaron Playfair y Cormorant por sobreexpuestas. Self-hosted
en woff2, subset latino, dos pesos por familia como máximo.

El cambio de Bodoni a Prata se hizo al verlo puesto: la advertencia de este
mismo brief —"su trazo fino desaparece"— se cumplió en los titulares en
versalitas espaciadas, sobre todo contra el azul marino. Prata es didone
también, así que mantiene el registro, pero con más carne. Se compararon
además Castoro Titling, Cinzel, Marcellus y Bodoni en peso 500.

**Fondo.** No es blanco puro ni crema cálido. Es un blanco frío con traza de
aqua, que continúa el concepto en vez de contradecirlo.

---

## 4. Secciones

Cada una es una tarea separada, en este orden.

**Hero.** Imagen a sangre con velo de azul marino (`--velo-hero`) del lado del
texto. Titular en Bodoni, una bajada, un CTA primario y uno secundario como
máximo. Alto `100svh`, no `100vh`. La imagen va con `fetchpriority="high"` y
`preload`, con placeholder borroso mientras carga. Si lleva efecto Ken Burns,
respeta movimiento reducido.

**Propuesta.** Qué es la marca en tres frases. Texto alineado a la izquierda,
no centrado.

**Carrusel de productos.** Empezar con CSS scroll-snap puro: cero JS, inercia
nativa en móvil, accesible por defecto. Migrar a Embla (~5 KB) solo si hacen
falta loop o autoplay. Swiper está descartado por peso. Botones reales,
navegación por teclado, `aria-live`, autoplay que se pausa al hover y al foco.

**Beneficios.** Los cuatro datos obligatorios: exclusividad, garantía, envíos a
todo México, ubicación. Sin marcadores numerados: no es una secuencia.

**Ubicación.** Dirección más mapa. Agregar `schema.org/LocalBusiness`, que
además ayuda al SEO local.

**Contacto.** WhatsApp como acción principal (`wa.me/52...`). Formulario con
honeypot, validación del lado del servidor y límite de envíos. El resultado se
comunica con el toaster.

**Pie.** Redes, aviso de privacidad, razón social.

---

## 5. Loader, toaster y skeletons

**Loader de marca.** El logo trazándose en SVG con `stroke-dasharray` sobre
azul marino, unos 900 ms, y fundido al hero. Reglas: solo la primera visita de
la sesión (`sessionStorage`), corte forzado a 1.5 s aunque no haya terminado,
el contenido ya renderizado detrás, `aria-hidden` y fundido simple si hay
movimiento reducido. Cada milisegundo de loader es rebote potencial.

**Toaster.** Sí, pero con poco trabajo: resultado del formulario, copiar
teléfono al portapapeles. Construirlo chico.

**Skeletons.** Casi no hay datos asíncronos en una landing estática. Para las
imágenes del carrusel, usar blur-up placeholder en lugar de rectángulos grises:
se ve mejor y transmite más calidad. Dejar los skeletons para si en algún
momento el catálogo viene de una API.

---

## 6. Imágenes

Script `scripts/optimizar-imagenes.mjs` con sharp:

- Formatos: AVIF + WebP + JPG de respaldo
- Anchos: 480 / 768 / 1200 / 1920
- Calidad 72–80 en AVIF, metadata removida
- LQIP de 20px en base64 para el placeholder

La imagen del hero la genera el cliente aparte. Especificación pedida: 2560px
de ancho, recortes 16:9 y 4:5, producto sobre degradado azul marino con luz
lateral, mucho espacio negativo del lado del texto, sin texto quemado, sin
marcas de agua, sin personas identificables.

---

## 7. Fases

| Fase | Estado |
|---|---|
| 0. Brief y contenido del cliente | Parcial, faltan datos (ver sección 8) |
| 1. Sistema de diseño (`tokens.css`) | Hecho |
| 2. Andamiaje: repo, Astro, carpetas, ESLint/Prettier | Hecho |
| 3. Layout base + loader de marca | Hecho |
| 4. Hero | Hecho |
| 5. Secciones | Hecho |
| 6. Pipeline de imágenes | Parcial: `scripts/preparar-hero.mjs` y `scripts/recortar-envases.mjs` recortan; falta el pipeline de formatos y LQIP, hoy resuelto por `<Picture>` de Astro |
| 7. Analítica, SEO, schema.org, accesibilidad | Pendiente. Los eventos están marcados con `data-evento` pero no hay analítica conectada; el `LocalBusiness` se cayó junto con la ubicación |
| 8. Auditoría Lighthouse, deploy, aviso de privacidad | Pendiente |

El orden original era una sección por sesión, pero el cliente pidió armar la
página completa de una vez. Las secciones quedaron construidas con marcadores
`PENDIENTE` donde falta material real.

---

## 8. Pendientes del cliente

No inventar ninguno de estos. Si un componente los necesita, dejar el marcador
y avisar.

1. **Qué cubre la garantía de 5 años.** Las cremas y el protector solar tienen
   caducidad (PAO de 6 a 24 meses), no garantía. Hay que aclarar si se refiere
   a un aparato, a garantía de satisfacción, o a vida útil sin abrir. Poner
   "garantía 5 años" sobre una crema resta credibilidad.
   **Dato nuevo:** la frase aparece igual en Oro & Glow, la página de joyería
   que el cliente pasó como referencia, donde sí tiene sentido. Es probable
   que se haya heredado de ahí y no del negocio. Está fuera de la página
   hasta que el cliente lo aclare.
2. Logo vectorial (SVG o AI). Hoy el emblema es un recorte del PNG del hero
   (`scripts/preparar-hero.mjs`), así que no escala.
3. ~~Dirección exacta del local.~~ **Resuelto:** no hay local físico, trabajan
   solo con envíos. Se retiraron la sección Ubicación y el `LocalBusiness`.
4. Catálogo: ~~nombres, descripciones~~, si llevan precio y en qué moneda.
   **Parcialmente resuelto:** las fichas del cliente
   (`src/activos/imagenes/productos/`) dan marca, nombre, presentación y
   descripción de cuatro productos. Sigue faltando el precio y la moneda.
5. Número de WhatsApp Business y correo.
6. ~~Si venden al público, al mayoreo, o ambos.~~ **Resuelto:** las cuatro
   fichas dicen "venta al mayoreo desde 5 piezas", además de "envíos dentro
   de la República" y "atención personalizada". Falta confirmar si además
   venden por unidad al público.
7. Razón social y RFC para el pie de página.
8. ~~Material visual del Instagram.~~ **Resuelto en parte:** el cliente pasó
   la imagen del hero y cuatro fichas de producto.
