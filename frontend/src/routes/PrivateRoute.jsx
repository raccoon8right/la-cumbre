import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function PrivateRoute({ children, rol }) {
    const { usuario, token } = useAuth()
    if (!token) {
        return <Navigate to='/login' />
    }
    if (rol && usuario?.rol !== rol) {
        return <Navigate to='/dashboard' />
    }
    return children
}