import { useLocation } from 'react-router-dom';

export function useURLQuery() {
  return new URLSearchParams(useLocation().search);
}
