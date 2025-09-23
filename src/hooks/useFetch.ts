import { useEffect, useState } from "react";
import axios from "axios"
import type { FetchState } from "../types/FetchState";
import type { AxiosRequestConfig } from "axios";
/**
 * Hook genérico para consumir APIs con Axios.
 * @param url - endpoint a consultar
 * @param config - configuración opcional de Axios (headers, params, etc.)
 */
export function useFetch<T = unknown>(url: string, config?: AxiosRequestConfig) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true; // Evita actualizar si el componente ya fue desmontado

    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, config);
        if (isMounted) {
          setState({ data: response.data, loading: false, error: null });
        }
      } catch (err: any) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: err.message || "Error al cargar datos",
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return state;
}