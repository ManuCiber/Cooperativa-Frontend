import type { RolesName } from "../types/Roles";
import { useAuth } from "./useAuth"

export const useRoles = () => {
    const {user} = useAuth();

    const hasRole = (role: RolesName) => {
        return user?.roles.includes(role);
    }

    const hasAnyRole = (roles: RolesName[]) => {
        return roles.some((r)=> user?.roles.includes(r));
    }

    return {hasRole, hasAnyRole};
}