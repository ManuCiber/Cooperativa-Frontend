import { useState } from "react";
import { update } from "../services/service";

export function useEditItem<T>(url: string, onSuccess?: () => void) {
    const [editItem, setEditItem] = useState<T | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const startEditing = (item: T) => {
        setEditItem(item);
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setEditItem(null);
        setIsEditing(false);
    };

    const saveChanges = async (updatedData: Partial<T>) => {
        if (!editItem) return;
        setLoading(true);
        try {
            await update<T>(url, (editItem as any).id, updatedData);
            if (onSuccess) onSuccess(); 
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    }

    return {
        editItem,
        isEditing,
        loading,
        startEditing,
        cancelEditing,
        saveChanges
    };
}