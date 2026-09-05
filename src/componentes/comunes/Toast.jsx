// Lista de toasts activos. `aria-live` para que lectores de pantalla
// anuncien el resultado sin robar el foco.
import { usarToast } from '../../hooks/usarToast.js';
import './toast.css';

export function Toast() {
  const { toasts } = usarToast();

  return (
    <div className="toast-contenedor" aria-live="polite" role="status">
      {toasts.map((toast) => (
        <p key={toast.id} className={`toast toast--${toast.tipo}`}>
          {toast.mensaje}
        </p>
      ))}
    </div>
  );
}
