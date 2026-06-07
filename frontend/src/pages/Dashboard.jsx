import { useAuth } from '../context/AuthContext.jsx'

function Dashboard() {
    const { usuario } = useAuth()

    return (
        <>
            <h1>Bienvenido {usuario?.nombres}</h1>
            <p>Rol: {usuario?.rol}</p>
        </>
    )
}

export default Dashboard