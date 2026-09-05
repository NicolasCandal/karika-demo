// Acceso al ContextoToast. Debe usarse dentro de <ProveedorToast>.
import { useContext } from 'react';
import { ContextoToast } from '../contexto/ContextoToast.jsx';

export function usarToast() {
  const contexto = useContext(ContextoToast);
  if (!contexto) {
    throw new Error('usarToast debe usarse dentro de <ProveedorToast>');
  }
  return contexto;
}
