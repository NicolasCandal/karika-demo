// Loader de marca. Isla de excepción: hidrata con client:load (nunca
// client:visible) porque debe estar listo antes de que el usuario vea
// nada. Reglas (docs/brief.md, sección 5): solo la primera visita de la
// sesión, corte forzado a 1.5s, el hero ya está renderizado detrás,
// aria-hidden, y fundido simple si hay movimiento reducido.
//
// Ya no traza un monograma inventado: muestra el emblema real del cliente
// y le dibuja alrededor un aro dorado con stroke-dasharray, que es el
// único gesto de trazo que queda. El `src` llega optimizado desde
// LayoutBase porque una isla de Preact no puede usar <Image> de Astro.
import { useEffect, useState } from 'preact/hooks';
import './cargador-marca.css';

const CLAVE_SESION = 'karika-loader-visto';
const CORTE_FORZADO = 1500;

export function CargadorMarca({ logo }) {
  const [visible, setVisible] = useState(false);
  const [saliendo, setSaliendo] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let yaVisto = false;
    try {
      yaVisto = window.sessionStorage.getItem(CLAVE_SESION) === '1';
    } catch {
      yaVisto = false;
    }

    if (yaVisto) return;

    setVisible(true);
    document.documentElement.classList.add('cargando');

    try {
      window.sessionStorage.setItem(CLAVE_SESION, '1');
    } catch {
      // sessionStorage no disponible (modo privado, etc.): el loader
      // puede repetirse en navegaciones futuras, no es crítico.
    }

    const prefiereQuieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const salida = prefiereQuieto ? 200 : 1100;

    const irSaliendo = () => setSaliendo(true);
    const ocultar = () => {
      setVisible(false);
      document.documentElement.classList.remove('cargando');
    };

    const temporizadores = [
      setTimeout(irSaliendo, Math.min(salida, CORTE_FORZADO - 300)),
      setTimeout(ocultar, CORTE_FORZADO),
    ];

    return () => {
      temporizadores.forEach(clearTimeout);
      document.documentElement.classList.remove('cargando');
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`cargador${saliendo ? ' cargador--saliendo' : ''}`} aria-hidden="true">
      <div className="cargador__marca">
        <svg className="cargador__aro" viewBox="0 0 120 120">
          <circle className="cargador__aro-trazo" cx="60" cy="60" r="57" fill="none" />
        </svg>
        {logo && <img className="cargador__emblema" src={logo} alt="" width="96" height="96" />}
      </div>
    </div>
  );
}
