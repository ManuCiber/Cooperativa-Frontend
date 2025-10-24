// import { useState } from "react";

// import { loginService } from "../../services/authService";
// import Input from "../../components/UI/Input";
// import Button from "../../components/UI/Button";
// import { useNavigate } from "react-router-dom";

// const Login: React.FC = () => {
//     const navigate = useNavigate();
//     const [identifier, setIdentifier] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         setError(null);
//         setLoading(true);
//         try {
//             const response = await loginService(identifier, password);
//             console.log(response);
//             navigate("/dashboard", {replace: true});
//         } catch (error:any) {
//             setError(error?.message || "Credenciales inválidas. Favor revisar error");
//         } finally {
//             setLoading(false)
//         }
//     }


//     return(
//         <div className="flex h-screen w-full"
//         style={{
//             backgroundImage: "url('/assets/login-image.jpg')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//         }}
//         >
//             {/*Fondo oscuro semitransparente en móvil*/}
//             <div className="flex-1 bg-black/50 md:bg-transparent flex items-center justify-center">
//                 <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
//                     <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Iniciar Sesion</h2>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <Input label="Usuario o Correo" type="text" placeholder="Ingresa tu Usuario o Correo" value={identifier} onChange={(e)=> setIdentifier(e.target.value)}
//                         icon="fa-solid fa-user"/>
//                         <Input label="Contraseña" type="password" placeholder="Ingresa tu contraseña" value={password} onChange={(e)=> setPassword(e.target.value)} icon="fa-solid fa-lock" />

//                         {error && (
//                             <p className="text-red-500 text-sm text-center">{error}</p>
//                         )}

//                         <Button text={loading? "Cargando...":"Ingresar"} type="primary" onClick={() => handleSubmit} disabled={loading} className="w-full" icon="fa-solid fa-right-to-bracket"/>

//                     </form>
//                 </div>
//             </div>
//         </div>
//     ) 
// }

// export default Login

// import { useState } from "react";
// import { loginService } from "../../services/authService";
// import Input from "../../components/UI/Input";
// import Button from "../../components/UI/Button";
// import { useNavigate } from "react-router-dom";

// const Login: React.FC = () => {
//     const navigate = useNavigate();
//     const [identifier, setIdentifier] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [imageError, setImageError] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         setError(null);
//         setLoading(true);
//         try {
//             const response = await loginService(identifier, password);
//             console.log(response);
//             navigate("/dashboard", { replace: true }); // ✅ replace: true para evitar volver atrás
//         } catch (error: any) {
//             setError(error?.message || "Credenciales inválidas. Favor revisar error");
//         } finally {
//             setLoading(false)
//         }
//     }

//     // ✅ Estilo de fondo con imagen de respaldo
//     const backgroundStyle = {
//         backgroundImage: imageError 
//             ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
//             : "url('/assets/login-image.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat", // ✅ Evitar repetición
//     };

//     return(
//         <div className="flex h-screen w-full" style={backgroundStyle}>
//             {/* ✅ Imagen oculta para detectar errores de carga */}
//             <img 
//                 src="/assets/login-image.jpg" 
//                 onError={() => setImageError(true)}
//                 style={{ display: 'none' }}
//                 alt=""
//             />
            
//             {/*Fondo oscuro semitransparente en móvil*/}
//             <div className="flex-1 bg-black/50 md:bg-transparent flex items-center justify-center">
//                 <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
//                     <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
//                         Iniciar Sesión {/* ✅ Corregido: "Sesión" con tilde */}
//                     </h2>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <Input 
//                             label="Usuario o Correo" 
//                             type="text" 
//                             placeholder="Ingresa tu Usuario o Correo" 
//                             value={identifier} 
//                             onChange={(e) => setIdentifier(e.target.value)}
//                             icon="fa-solid fa-user"
//                         />
//                         <Input 
//                             label="Contraseña" 
//                             type="password" 
//                             placeholder="Ingresa tu contraseña" 
//                             value={password} 
//                             onChange={(e) => setPassword(e.target.value)} 
//                             icon="fa-solid fa-lock" 
//                         />

//                         {error && (
//                             <p className="text-red-500 text-sm text-center">{error}</p>
//                         )}

//                         <Button 
//                             text={loading ? "Cargando..." : "Ingresar"} 
//                             type="primary" 
//                             onClick={()=> handleSubmit} // ✅ Corregido: sin arrow function
//                             disabled={loading} 
//                             className="w-full" 
//                             icon="fa-solid fa-right-to-bracket"
//                         />
//                     </form>
//                 </div>
//             </div>
//         </div>
//     ) 
// }

// export default Login

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../../services/authService";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageError, setImageError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null);
        setLoading(true);

        console.log("Datos enviados: ", {
            identifier,
            password: password ? "********" : "VACIO",
            identifierLength: identifier.length,
            passwordLength: password.length
        })

        try {
            const response = await loginService(identifier, password);
            console.log("Respuesta del servidor",response);
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            console.log("Token almacenado:", token ? "Existe" : "No existe");

            navigate("/dashboard", { replace: true });
        } catch (error: any) {
            console.error("Error durante el login:", error);
            console.error("Error response data:", error?.response?.data);
            console.error("Error response status:", error?.response?.status);
            setError(error?.message || "Credenciales inválidas. Favor revisar error");
        } finally {
            setLoading(false)
        }
    }

    const backgroundStyle = {
        backgroundImage: imageError 
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
            : "url('/assets/login-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    return(
        <div className="flex h-screen w-full" style={backgroundStyle}>
            <img 
                src="/assets/login-image.jpg" 
                onError={() => setImageError(true)}
                style={{ display: 'none' }}
                alt=""
            />
            
            {/* ✅ Fondo con menos opacidad */}
            <div className="flex-1 bg-black/20 md:bg-transparent flex items-center justify-center p-4">
                {/* ✅ Card transparente con backdrop blur */}
                <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                    {/* ✅ Logo o icono opcional */}
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <i className="fa-solid fa-user-lock text-2xl text-white"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Bienvenido
                        </h2>
                        <p className="text-white/80 text-sm">
                            Inicia sesión para continuar
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* ✅ Inputs con fondo transparente */}
                        <div className="space-y-4">
                            <Input 
                                label="Usuario o Correo" 
                                type="text" 
                                placeholder="Ingresa tu Usuario o Correo" 
                                value={identifier} 
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setIdentifier(e.target.value)}
                                icon="fa-solid fa-user"
                                className="bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-white/50 focus:bg-white/20"
                            />
                            <Input 
                                label="Contraseña" 
                                type="password" 
                                placeholder="Ingresa tu contraseña" 
                                value={password} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                                icon="fa-solid fa-lock"
                                className="bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-white/50 focus:bg-white/20"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 backdrop-blur-sm">
                                <p className="text-red-200 text-sm text-center flex items-center justify-center">
                                    <i className="fa-solid fa-exclamation-triangle mr-2"></i>
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* ✅ Botón con efecto glassmorphism */}
                        <Button
                            text={loading ? "Cargando..." : "Ingresar"} 
                            type="primary" 
                            onClick={handleSubmit}
                            disabled={loading} 
                            className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-3 backdrop-blur-sm transition-all duration-300 hover:shadow-lg" 
                            icon={loading ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-right-to-bracket"}
                        />

                        {/* ✅ Links adicionales */}
                        <div className="text-center space-y-2">
                            <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) 
}

export default Login

