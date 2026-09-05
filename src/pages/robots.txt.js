// robots.txt generado, no estático: lo gobierna la misma variable que la
// etiqueta <meta name="robots"> de MetaSeo.astro, así no pueden quedar
// diciendo cosas distintas.
//
// Mientras esto sea una demo privada, se bloquea todo. Al publicar de
// verdad se habilita con PERMITIR_INDEXACION=true en el entorno.

export function GET() {
  const permitirIndexacion = process.env.PERMITIR_INDEXACION === 'true';

  // Sin línea de Sitemap: es una sola página y no hay sitemap generado.
  const cuerpo = permitirIndexacion
    ? ['User-agent: *', 'Allow: /']
    : // El comentario lo lee cualquiera que abra /robots.txt, así que va
      // neutro y no como nota interna.
      ['# Sitio en preparación.', 'User-agent: *', 'Disallow: /'];

  return new Response(`${cuerpo.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
