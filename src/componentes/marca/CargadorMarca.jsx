// Loader de marca. Isla de excepción: hidrata con client:load (nunca
// client:visible) porque debe estar listo antes de que el usuario vea
// nada. Reglas (docs/brief.md, sección 5): solo la primera visita de la
// sesión, corte forzado a 1.5s, el hero ya está renderizado detrás,
// aria-hidden, y fundido simple si hay movimiento reducido.
import { useEffect, useState } from 'preact/hooks';
import './cargador-marca.css';

const CLAVE_SESION = 'karika-loader-visto';

export function CargadorMarca() {
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

    try {
      window.sessionStorage.setItem(CLAVE_SESION, '1');
    } catch {
      // sessionStorage no disponible (modo privado, etc.): el loader
      // puede repetirse en navegaciones futuras, no es crítico.
    }

    const prefiereMovimientoReducido = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const duracionTrazo = prefiereMovimientoReducido ? 0 : 900;
    const corteForzado = 1500;

    const salir = () => setSaliendo(true);
    const ocultar = () => setVisible(false);

    const temporizadorSalida = setTimeout(salir, Math.min(duracionTrazo + 200, corteForzado - 200));
    const temporizadorCorte = setTimeout(salir, corteForzado - 200);
    const temporizadorOculto = setTimeout(ocultar, corteForzado);

    return () => {
      clearTimeout(temporizadorSalida);
      clearTimeout(temporizadorCorte);
      clearTimeout(temporizadorOculto);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`cargador-marca${saliendo ? ' cargador-marca--saliendo' : ''}`}
      aria-hidden="true"
    >
      <svg
        className="cargador-marca__logo"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="cargador-marca__trazo"
          cx="50"
          cy="50"
          r="42"
          fill="none"
          strokeWidth="3"
        />
        <path
          className="cargador-marca__trazo"
          d="M35 28 V72 M35 50 L65 28 M35 50 L65 72"
          fill="none"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}
