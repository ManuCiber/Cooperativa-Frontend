//import { Route, Routes } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login/LoginPage'
import Register from './pages/Auth/Register/Register'
import NotFound from './pages/NotFound/404Page'
import DashboardPage from './pages/Dashboard/DashboardPage'
import SocioList from './pages/Socios/Socios-List/SociosList'
import UserPage from './pages/Users/Users'
import NewUserPage from './pages/Users/NewUser'
import EmpleadosPage from './pages/Empleados/Empleados'
//import Login from './pages/Auth/LoginPage'
//import RegisterUser from './pages/Register/Register-Users/Register'
//import Login from './pages/Auth/Login/LoginPage'
//import NotFound from './pages/NotFound/404Page'
//import UsuariosPage from './pages/Users/Users'
//import Register from './pages/Auth/Register'
//import RegisterUser from './pages/Register/Register-Users/Register'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/users' element={<UserPage />} />
        <Route path='/users/new' element={<NewUserPage />} />
        <Route path='/empleados' element ={<EmpleadosPage/>}/>
        <Route path='/dashboard/*' element={<DashboardPage />} />
        <Route path='/socios' element={<SocioList/>}/>
        <Route path='/404' element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
