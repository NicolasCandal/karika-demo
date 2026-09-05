// Contexto de toasts. Vive dentro de un único árbol de React (la isla de
// Contacto), no cruza islas de Astro — por eso el formulario y el botón de
// copiar teléfono están dentro del mismo componente que este Provider.
import { createContext, useCallback, useState } from 'react';

export const ContextoToast = createContext(null);

let contadorId = 0;

export function ProveedorToast({ children }) {
  const [toasts, setToasts] = useState([]);

  const mostrarToast = useCallback((mensaje, tipo = 'info') => {
    const id = ++contadorId;
    setToasts((actuales) => [...actuales, { id, mensaje, tipo }]);
    setTimeout(() => {
      setToasts((actuales) => actuales.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  return (
    <ContextoToast.Provider value={{ toasts, mostrarToast }}>{children}</ContextoToast.Provider>
  );
}
