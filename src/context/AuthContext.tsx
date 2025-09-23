import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType } from "../types/AuthContext";
import type { User } from "../types/User";
import { rolePermissions, type Permission, type RolesName } from "../types/Roles";
import { getProfileService, loginService, logoutService } from "../services/authService";

/**
 * Contexto y Hook de la autenticación
*/

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider para la Autenticación
*/

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        const loadUser = async () => {
                try {
                   const profile = await getProfileService();
                   setUser(profile);
                   localStorage.setItem("user", JSON.stringify(profile));
                } catch (error) {
                    setUser(null);
                } finally {
                    setLoading(false)
                }
            }
            loadUser()
        }, [])

    const login = async (identifier: string, password: string) => {
        try {
            const loggedUser = await loginService(identifier, password);
            setUser(loggedUser);
            localStorage.setItem("user",JSON.stringify(loggedUser))
        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        logoutService();
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
            login,
            loading,
            logout,
            hasRole,
            hasPermission
        }}>
            {children}
        </AuthContext.Provider>
    )
}