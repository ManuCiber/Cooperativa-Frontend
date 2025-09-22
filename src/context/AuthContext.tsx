import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType } from "../types/AuthContext";
import type { User } from "../types/User";
import { rolePermissions, type Permission, type RolesName } from "../types/Roles";

/**
 * Contexto y Hook de la autenticación
*/

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if(!ctx){
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return ctx;
}


/**
 * Provider para la Autenticación
*/

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
    }, [])

    const login = () => {

    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user")
    }

    /**
     * A partir de acá se estará manejando los roles y permisos
    */

    const hasRole = (role: RolesName):boolean => {
        return user?.roles.includes(role) ?? false;
    }

    const hasPermission = (permission: Permission): boolean =>{
        if(!user){
            return false
        }
        return user.roles.some((role)=> rolePermissions[role].includes(permission));
    }

    return(
        <AuthContext.Provider
        value={{
            user,
            isAuthenticated: !!user, //-> Funcion por realizar
            logout,
            hasRole,
            hasPermission
        }}>
            {children}
        </AuthContext.Provider>
    )
}