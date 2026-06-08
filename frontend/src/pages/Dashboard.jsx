import { useAuth } from '../context/AuthContext.jsx'

function Dashboard() {
    const { usuario } = useAuth()

    return (
        <div className='dashboard'>
            <h1>Bienvenido {usuario?.nombres}</h1>
            <p>Rol: {usuario?.rol}</p>
        </div>
    )
}

export default Dashboard