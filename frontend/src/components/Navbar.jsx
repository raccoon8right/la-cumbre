import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, Link, NavLink, useLocation } from 'react-router-dom'
import axios from 'axios'

// Links para clientes autenticados
const LINKS_CLIENTE = [
    { to: '/productos', label: 'Productos' },
    { to: '/carrito', label: 'Carrito' },
    { to: '/mis-pedidos', label: 'Mis pedidos' },
]

// Links para el panel admin — sidebar/topbar separado
const LINKS_ADMIN = [
    { to: '/admin', label: 'Dashboard', exact: true },
    { to: '/admin/productos', label: 'Productos' },
    { to: '/admin/categorias', label: 'Categorías' },
    { to: '/admin/empresas', label: 'Empresas' },
    { to: '/admin/pedidos', label: 'Pedidos' },
    { to: '/admin/minerales', label: 'Minerales' },
]

export default function Navbar() {
    const { usuario, token, cerrarSesion } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [menuAbierto, setMenuAbierto] = useState(false)

    const esAdmin = usuario?.rol === 'administrador'
    const enPanelAdmin = location.pathname.startsWith('/admin')

    const handleLogout = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/logout`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            )
        } catch (error) {
            // El logout local siempre ocurre aunque el server falle
            console.error(error)
        } finally {
            cerrarSesion()
            navigate('/login')
        }
    }

    // Si el admin está en el panel admin, mostrar navbar de admin
    if (esAdmin && enPanelAdmin) {
        return (
            <nav className='navbar navbar-admin'>
                <div className='navbar-brand'>
                    <Link to='/admin'>⚙ Panel Admin</Link>
                </div>
                <div className='navbar-links'>
                    {LINKS_ADMIN.map(({ to, label, exact }) => (
                        <NavLink key={to} to={to} end={exact} className={({ isActive }) => isActive ? 'nav-link activo' : 'nav-link'} >
                            {label}
                        </NavLink>
                    ))}
                </div>
                <div className='navbar-auth'>
                    <Link to='/' className='nav-link nav-link-secundario'>← Sitio público</Link>
                    <span className='navbar-usuario'>{usuario.nombres}</span>
                    <button onClick={handleLogout} className='btn-logout'>Cerrar sesión</button>
                </div>
            </nav>
        )
    }

    // Navbar pública / cliente
    return (
        <nav className='navbar'>
            <div className='navbar-brand'>
                <Link to='/'>La Cumbre</Link>
            </div>

            {/* Botón hamburguesa mobile */}
            <button className='navbar-hamburguesa' onClick={() => setMenuAbierto(prev => !prev)} aria-label='Menú' aria-expanded={menuAbierto} >
                <span /><span /><span />
            </button>

            <div className={`navbar-links ${menuAbierto ? 'abierto' : ''}`}>
                <NavLink to='/' end className={({ isActive }) => isActive ? 'nav-link activo' : 'nav-link'} onClick={() => setMenuAbierto(false)}>
                    Inicio
                </NavLink>

                {/* Productos siempre visible */}
                <NavLink to='/productos' className={({ isActive }) => isActive ? 'nav-link activo' : 'nav-link'} onClick={() => setMenuAbierto(false)} >
                    Productos
                </NavLink>

                {usuario && LINKS_CLIENTE.filter(l => l.to !== '/productos').map(({ to, label }) => (
                    <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav-link activo' : 'nav-link'} onClick={() => setMenuAbierto(false)} >
                        {label}
                    </NavLink>
                ))}

                {/* Acceso rápido al panel para admins */}
                {esAdmin && (
                    <NavLink to='/admin' className='nav-link nav-link-admin' onClick={() => setMenuAbierto(false)} >
                        Panel Admin
                    </NavLink>
                )}
            </div>

            <div className='navbar-auth'>
                {usuario ? (
                    <>
                        <span className='navbar-usuario'>Hola, {usuario.nombres}</span>
                        <button onClick={handleLogout} className='btn-logout'>Cerrar sesión</button>
                    </>
                ) : (
                    <>
                        <Link to='/login' className='btn-nav-secundario'>Iniciar sesión</Link>
                        <Link to='/register' className='btn-principal btn-nav'>Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
    )
}