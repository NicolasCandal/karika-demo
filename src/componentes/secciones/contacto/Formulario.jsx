// Isla de Contacto: WhatsApp, copiar teléfono y formulario, todo dentro de
// un único ProveedorToast (docs/contexto/ContextoToast.jsx no cruza islas).
// PENDIENTE (docs/brief.md, pendiente 5): número de WhatsApp Business y
// correo — hasta entonces el CTA de WhatsApp y "copiar teléfono" quedan
// deshabilitados en vez de simular un dato que no existe.
// PENDIENTE: destino real del envío. El sitio es estático (CLAUDE.md,
// sección Stack), así que el formulario necesita un servicio externo
// (Formspree o similar) todavía no elegido — por ahora valida y honestamente
// avisa que el envío no está conectado, en lugar de fingir un éxito falso.
import { useId, useState } from 'preact/hooks';
import { ProveedorToast } from '../../../contexto/ContextoToast.jsx';
import { Toast } from '../../comunes/Toast.jsx';
import { usarToast } from '../../../hooks/usarToast.js';
import './formulario.css';

const NUMERO_WHATSAPP = null; // wa.me/52XXXXXXXXXX cuando exista
const TELEFONO_CONTACTO = null;

function AccionesRapidas() {
  const { mostrarToast } = usarToast();

  const copiarTelefono = async () => {
    if (!TELEFONO_CONTACTO) return;
    try {
      await navigator.clipboard.writeText(TELEFONO_CONTACTO);
      mostrarToast('Teléfono copiado.');
    } catch {
      mostrarToast('No se pudo copiar el teléfono.', 'error');
    }
  };

  return (
    <div className="acciones-rapidas">
      <a
        className="acciones-rapidas__whatsapp"
        href={NUMERO_WHATSAPP ?? undefined}
        aria-disabled={!NUMERO_WHATSAPP}
        data-evento="clic_whatsapp"
        title={!NUMERO_WHATSAPP ? 'PENDIENTE: número de WhatsApp Business' : undefined}
        onClick={(evento) => {
          if (!NUMERO_WHATSAPP) evento.preventDefault();
        }}
      >
        Escribir por WhatsApp
        {!NUMERO_WHATSAPP && <span className="acciones-rapidas__nota"> (PENDIENTE)</span>}
      </a>

      <button
        type="button"
        className="acciones-rapidas__telefono"
        disabled={!TELEFONO_CONTACTO}
        onClick={copiarTelefono}
      >
        {TELEFONO_CONTACTO ?? 'Teléfono: PENDIENTE'}
      </button>
    </div>
  );
}

function Campos() {
  const idNombre = useId();
  const idContacto = useId();
  const idMensaje = useId();
  const idHoneypot = useId();
  const { mostrarToast } = usarToast();
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState({});

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    const datos = new FormData(evento.target);

    if (datos.get('sitio-web')) {
      // Honeypot: un bot completó un campo que un humano no ve.
      return;
    }

    const nuevosErrores = {};
    if (!String(datos.get('nombre') ?? '').trim()) nuevosErrores.nombre = 'Falta tu nombre.';
    if (!String(datos.get('contacto') ?? '').trim())
      nuevosErrores.contacto = 'Dejanos un teléfono o correo.';
    if (!String(datos.get('mensaje') ?? '').trim()) nuevosErrores.mensaje = 'Falta el mensaje.';

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    setEnviando(true);
    // PENDIENTE: reemplazar por el POST real cuando exista el servicio de
    // envío y el límite de envíos del lado del servidor.
    await new Promise((resolver) => setTimeout(resolver, 400));
    setEnviando(false);
    mostrarToast(
      'PENDIENTE: este formulario todavía no está conectado a un servicio de envío.',
      'error',
    );
  };

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      <p className="formulario__campo formulario__campo--trampa" aria-hidden="true">
        <label htmlFor={idHoneypot}>No completar</label>
        <input id={idHoneypot} name="sitio-web" type="text" tabIndex={-1} autoComplete="off" />
      </p>

      <p className="formulario__campo">
        <label htmlFor={idNombre}>Nombre</label>
        <input id={idNombre} name="nombre" type="text" autoComplete="name" />
        {errores.nombre && <span className="formulario__error">{errores.nombre}</span>}
      </p>

      <p className="formulario__campo">
        <label htmlFor={idContacto}>Teléfono o correo</label>
        <input id={idContacto} name="contacto" type="text" autoComplete="tel" />
        {errores.contacto && <span className="formulario__error">{errores.contacto}</span>}
      </p>

      <p className="formulario__campo">
        <label htmlFor={idMensaje}>Mensaje</label>
        <textarea id={idMensaje} name="mensaje" rows={4}></textarea>
        {errores.mensaje && <span className="formulario__error">{errores.mensaje}</span>}
      </p>

      <button type="submit" className="formulario__enviar" disabled={enviando}>
        {enviando ? 'Enviando…' : 'Enviar'}
      </button>
    </form>
  );
}

export function Formulario() {
  return (
    <ProveedorToast>
      <AccionesRapidas />
      <Campos />
      <Toast />
    </ProveedorToast>
  );
}
