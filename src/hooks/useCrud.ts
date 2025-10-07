// import axios, {type AxiosResponse } from 'axios';
// import { useState } from 'react';

// interface UseCrudOptions {
//     autoLoad?: boolean;
//     baseUrl: string;
// }

// interface CrudState<T> {
//     items: T[];
//     loading: boolean;
//     error: string | null;
//     creating: boolean;
//     updating: boolean;
//     deleting: boolean;
// }

// export function useCrud<T extends {id: number | string}>(endpoint: string, options: UseCrudOptions) {
//     const { autoLoad = true} = options;

//     const [state, setState] = useState<CrudState<T>>({
//         items: [],
//         loading: false,
//         error: null,
//         creating: false,
//         updating: false,
//         deleting: false,
//     });

//     //Cargar todos los items:
//     const loadItems = async (): Promise<T[]> => {
//         setState(prev => ({...prev, loading: true, error: null}));
//         try {
//             const response: AxiosResponse<T[]> = await axios.get(endpoint);
//             const items = response.data;
//             setState(prev => ({...prev, items, loading: false}));
//             return items;
//         } catch (error: any) {
//             const errorMessage = error.response?.data?.message || error.message || 'Error loading items';
//             setState(prev => ({...prev, error: errorMessage, loading: false}));
//             throw new Error(errorMessage);
//         }
//     }
//     // Crear un item:
//     const createItem = async (item: Omit<T, 'id'>): Promise<T> => {
//         setState(prev => ({...prev, creating: true, error: null}));
//         try {
            
//             const response: AxiosResponse<T> = await axios.post(endpoint, item);
//             const newItem = response.data;
//             setState(prev => ({...prev, items: [...prev.items, newItem], creating: false}));
            
//             return newItem;
//         } catch (error: any) {
            
//             const errorMessage = error.response?.data?.message || error.message || 'Error creating item';
//             setState(prev => ({...prev, error: errorMessage, creating: false}));
//             throw new Error(errorMessage);
//         }
//     }

//     // Actualizar un item:
//     const updateItem = async (id: string | number, data: Partial<T>) => {
//         setState(prev => ({...prev, updating: true, error: null}));
//         try {
//             const response: AxiosResponse<T> = await axios.put(`${endpoint}/${id}`, data);
//             const updatedItem = response.data;
//             setState(prev => ({
//                 ...prev,
//                 items: prev.items.map(item => item.id === id ? updatedItem : item),
//                 updating: false
//             }));
//             return updatedItem;
//         } catch (error: any) {
//             const errorMessage = error.response?.data?.message || error.message || 'Error updating item';
//             setState(prev => ({...prev, error: errorMessage, updating: false}));
//             throw new Error(errorMessage);
//         }
//     }

//     // Eliminar un item:
//     const deleteItem = async (id: string | number) => {
//         setState(prev => ({...prev, deleting: true, error: null}));
//         try {
//             await axios.delete(`${endpoint}/${id}`);
//             setState(prev => ({
//                 ...prev,
//                 items: prev.items.filter(item => item.id !== id),
//                 deleting: false
//             }));
//         } catch (error: any) {
//             const errorMessage = error.response?.data?.message || error.message || 'Error deleting item';
//             setState(prev => ({...prev, error: errorMessage, deleting: false}));
//             throw new Error(errorMessage);
//         }
//     }

//     // Cargar items automáticamente si autoLoad es true
//     if (autoLoad && state.items.length === 0 && !state.loading) {
//         loadItems().catch(() => {});
//     }

//     return {
//         ...state,
//         loadItems,
//         createItem,
//         updateItem,
//         deleteItem
//     };
// }

// hooks/useCrud.ts
import { useState, useEffect } from 'react'
import api from '../services/api' // 👈 Usar tu instancia existente
import {type AxiosResponse } from 'axios'

interface UseCrudOptions {
  autoLoad?: boolean
}

interface CrudState<T> {
  items: T[]
  loading: boolean
  error: string | null
  creating: boolean
  updating: boolean
  deleting: boolean
}

export function useCrud<T extends { id: string | number }>(
  endpoint: string, 
  options: UseCrudOptions = {}
) {
  const { autoLoad = true } = options
  
  const [state, setState] = useState<CrudState<T>>({
    items: [],
    loading: false,
    error: null,
    creating: false,
    updating: false,
    deleting: false
  })

  // 📋 GET ALL - Cargar todos los items
  const loadItems = async (): Promise<T[]> => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const response: AxiosResponse<T[]> = await api.get(endpoint)
      const items = response.data
      
      setState(prev => ({ 
        ...prev, 
        items, 
        loading: false 
      }))
      
      return items
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Error cargando datos'
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage 
      }))
      throw error
    }
  }

  // ➕ POST - Crear nuevo item
  const createItem = async (data: Omit<T, 'id'>): Promise<T> => {
    setState(prev => ({ ...prev, creating: true, error: null }))
    
    try {
      const response: AxiosResponse<T> = await api.post(endpoint, data)
      const newItem = response.data
      
      setState(prev => ({
        ...prev,
        items: [...prev.items, newItem],
        creating: false
      }))
      
      return newItem
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error creando elemento'
      setState(prev => ({ 
        ...prev, 
        creating: false, 
        error: errorMessage 
      }))
      throw error
    }
  }

  // ✏️ PUT - Actualizar item
  const updateItem = async (id: string | number, data: Partial<T>): Promise<T> => {
    setState(prev => ({ ...prev, updating: true, error: null }))
    
    try {
      const response: AxiosResponse<T> = await api.put(`${endpoint}/${id}`, data)
      const updatedItem = response.data
      
      setState(prev => ({
        ...prev,
        items: prev.items.map(item => 
          item.id === id ? updatedItem : item
        ),
        updating: false
      }))
      
      return updatedItem
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error actualizando elemento'
      setState(prev => ({ 
        ...prev, 
        updating: false, 
        error: errorMessage 
      }))
      throw error
    }
  }

  // 🗑️ DELETE - Eliminar item
  const deleteItem = async (id: string | number): Promise<void> => {
    setState(prev => ({ ...prev, deleting: true, error: null }))
    
    try {
      await api.delete(`${endpoint}/${id}`)
      
      setState(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id),
        deleting: false
      }))
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error eliminando elemento'
      setState(prev => ({ 
        ...prev, 
        deleting: false, 
        error: errorMessage 
      }))
      throw error
    }
  }

  // 🔍 GET ONE - Obtener un item específico
  const getItem = async (id: string | number): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await api.get(`${endpoint}/${id}`)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error obteniendo elemento'
      setState(prev => ({ ...prev, error: errorMessage }))
      throw error
    }
  }

  // 🔄 Refresh - Recargar datos
  const refresh = () => {
    return loadItems()
  }

  // 🧹 Clear error
  const clearError = () => {
    setState(prev => ({ ...prev, error: null }))
  }

  // 📡 Auto-load al montar el componente
  useEffect(() => {
    if (autoLoad) {
      loadItems()
    }
  }, [endpoint, autoLoad])

  return {
    // 📊 Estado
    items: state.items,
    loading: state.loading,
    error: state.error,
    creating: state.creating,
    updating: state.updating,
    deleting: state.deleting,
    
    // 🔧 Acciones
    loadItems,
    createItem,
    updateItem,
    deleteItem,
    getItem,
    refresh,
    clearError
  }
}
