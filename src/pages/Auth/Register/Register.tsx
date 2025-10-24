// import { useState } from "react";
// import Input from "../../components/UI/Input";
// import Button from "../../components/UI/Button";
// import { useAuth } from "../../hooks/useAuth";

// const Register: React.FC = () => {
//   const { login } = useAuth(); // luego puedes conectar a registerService
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (password !== confirmPassword) {
//       setError("Las contraseñas no coinciden");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Aquí deberías usar registerService, de momento simulo login tras registro
//       await login(username || email, password);
//     } catch (err: any) {
//       setError("Error al registrar el usuario");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="flex h-screen w-full"
//       style={{
//         backgroundImage: "url('/d73d8710-e0ed-44be-bb40-fcaf74ba89c9.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="flex-1 bg-black/50 md:bg-transparent flex items-center justify-center">
//         <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
//           <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
//             Crear Cuenta
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               label="Nombre completo"
//               type="text"
//               placeholder="Ej. Juan Pérez"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               icon="fa-solid fa-id-card"
//             />

//             <Input
//               label="Correo"
//               type="email"
//               placeholder="ejemplo@correo.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               icon="fa-solid fa-envelope"
//             />

//             <Input
//               label="Usuario"
//               type="text"
//               placeholder="Nombre de usuario"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               icon="fa-solid fa-user"
//             />

//             <Input
//               label="Contraseña"
//               type="password"
//               placeholder="Ingresa tu contraseña"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               icon="fa-solid fa-lock"
//             />

//             <Input
//               label="Confirmar contraseña"
//               type="password"
//               placeholder="Repite tu contraseña"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               icon="fa-solid fa-lock"
//             />

//             {error && (
//               <p className="text-red-500 text-sm text-center">{error}</p>
//             )}

//             <Button
//               text={loading ? "Cargando..." : "Registrarse"}
//               type="primary"
//               onClick={()=>handleSubmit}
//               disabled={loading}
//               className="w-full"
//               icon="fa-solid fa-user-plus"
//             />
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


// import { useState } from "react";
// import Input from "../../components/UI/Input";
// import Button from "../../components/UI/Button";
// import { useAuth } from "../../hooks/useAuth";

// const Register: React.FC = () => {
//   const { login } = useAuth(); // luego puedes conectar a registerService
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (password !== confirmPassword) {
//       setError("Las contraseñas no coinciden");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Aquí deberías usar registerService, de momento simulo login tras registro
//       await login(username || email, password);
//     } catch (err: any) {
//       setError("Error al registrar el usuario");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="flex h-screen w-full"
//       style={{
//         backgroundImage:
//           "url('/public/assets/imagen-login.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="flex-1 bg-black/50 md:bg-transparent flex items-center justify-center">
//         <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
//           <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
//             Crear Cuenta
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               label="Nombre completo"
//               type="text"
//               placeholder="Ej. Juan Pérez"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               icon="fa-solid fa-id-card"
//             />

//             <Input
//               label="Correo"
//               type="email"
//               placeholder="ejemplo@correo.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               icon="fa-solid fa-envelope"
//             />

//             <Input
//               label="Usuario"
//               type="text"
//               placeholder="Nombre de usuario"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               icon="fa-solid fa-user"
//             />

//             <Input
//               label="Contraseña"
//               type="password"
//               placeholder="Ingresa tu contraseña"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               icon="fa-solid fa-lock"
//             />

//             <Input
//               label="Confirmar contraseña"
//               type="password"
//               placeholder="Repite tu contraseña"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               icon="fa-solid fa-lock"
//             />

//             {error && (
//               <p className="text-red-500 text-sm text-center">{error}</p>
//             )}

//             <Button
//               text={loading ? "Cargando..." : "Registrarse"}
//               type="primary"
//               onClick={() => {}} // prevenir doble trigger
//               disabled={loading}
//               className="w-full"
//               icon="fa-solid fa-user-plus"
//             />
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import { useState } from "react";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";
//import { useAuth } from "../../../hooks/useAuth";
import { create } from "../../../services/service";

const Register: React.FC = () => {
  //const { login } = useAuth(); // ⚠️ luego cambia por registerService
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      // aquí deberías usar registerService
      //await login(username || email, password);
      await create("/add", { name, email, username, password });
    } catch (err: any) {
      setError("Error al registrar el usuario");
    } finally {
      setLoading(false);
    }
  };

  const backgroundStyle = {
    backgroundImage: imageError
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "url('/assets/login-image.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="flex h-screen w-full" style={backgroundStyle}>
      <img
        src="/assets/login-image.jpg"
        onError={() => setImageError(true)}
        style={{ display: "none" }}
        alt=""
      />

      <div className="flex-1 bg-black/20 md:bg-transparent flex items-center justify-center p-4">
        <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
          {/* ✅ Icono superior */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <i className="fa-solid fa-user-plus text-2xl text-white"></i>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Crear Cuenta</h2>
            <p className="text-white/80 text-sm">
              Regístrate para acceder al sistema
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                label="Nombre completo"
                type="text"
                placeholder="Ej. Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon="fa-solid fa-id-card"
                className="bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-white/50 focus:bg-white/20"
              />

              <Input
                label="Correo"
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon="fa-solid fa-envelope"
                className="bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-white/50 focus:bg-white/20"
              />

              <Input
                label="Usuario"
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                icon="fa-solid fa-user"
                className="bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-white/50 focus:bg-white/20"
              />

              <Input
                label="Contraseña"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon="fa-solid fa-lock"
                className="bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-white/50 focus:bg-white/20"
              />

              <Input
                label="Confirmar contraseña"
                type="password"
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

            <Button
              text={loading ? "Cargando..." : "Registrarse"}
              type="primary"
              onClick={() => {}} // usamos solo onSubmit del form
              disabled={loading}
              className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-3 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
              icon={loading ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-user-plus"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;