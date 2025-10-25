import api from "./api";

export const loginService = async (identifier: string, password: string) => {  

    try {
        console.log("Enviando peticion de login... :", `${api.defaults.baseURL}auth/login`);
        console.log("Datos enviados:", {identifier, password});

        const response = await api.post(`${api.defaults.baseURL}auth/login`, {
            username: identifier,
            email: identifier,
            password: password
        });
        console.log("Respuesta Recibida: ",response.data);

        if(response.data.token){
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        return response.data;

    } catch (error:any) {
        console.error("Error durante el login:", error);
        console.error("Detalles del error:", error.response?.data || error.message);
        throw error;
    }
//    const res = await api.post("auth/login", {identifier, password});
//    const {token, user} = res.data;
   
//    console.log(res.data);
//    // Para guardar el token:
//    localStorage.setItem("token", token);

//    return user;
}

export const logoutService = () => {
    localStorage.removeItem("token")
}

export const getProfileService = async () => {
    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("El token no existe");
    }
    const res = await api.get("/api/usuarios/user", {
        headers: {Authorization: `Bearer ${token}`}
    })

    return res.data;
}

// export async function login(body: LoginData): Promise<LoginResponse> {
//   const response = await create<LoginResponse>("auth/login", body);
//   return response;
// }
