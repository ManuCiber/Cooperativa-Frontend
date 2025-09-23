import api from "./api";

export const loginService = async (identifier: string, password: string) => {  
   const res = await api.post("/login", {identifier, password});
   const {token, user} = res.data;
   
   
   // Para guardar el token:
   localStorage.setItem("token", token);

   return user;
}

export const logoutService = () => {
    localStorage.removeItem("token")
}

export const getProfileService = async () => {
    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("El token no existe");
    }
    const res = await api.get("", {
        headers: {Authorization: `Bearer ${token}`}
    })

    return res.data;
}