import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Navbar() {
    const { usuario, token, cerrarSesion } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
        } catch (error) {
            console.log(error)
        } finally {
            cerrarSesion()
            navigate('/login')
        }
    }

    return (
        <nav className='navbar'>
            <div className='navbar-brand'>
                <Link to='/'>La Cumbre</Link>
            </div>
            <div className='navbar-links'>
                <Link to='/'>Inicio</Link>
                <Link to='/productos'>Productos</Link>
                {usuario?.rol === 'administrador' && (
                    <Link to='/admin'>Admin</Link>
                )}
            </div>
            <div className='navbar-auth'>
                {usuario ? (
                    <>
                        <span>Hola, {usuario.nombres}</span>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </>
                ) : (
                    <>
                        <Link to='/login'>Iniciar sesión</Link>
                        <Link to='/register'>Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
    )
}