import type { RolesName, Permission } from "./Roles";
import type { User } from "./User";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  //login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  hasRole: (role: RolesName) => boolean;
  hasPermission: (permission: Permission) => boolean;
}