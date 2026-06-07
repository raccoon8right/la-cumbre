import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

function MisPedidos() {
    const [pedidos, setPedidos] = useState([])
    const { token } = useAuth()

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/pedidos`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setPedidos(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPedidos()
    }, [token])

    return (
        <div className='mis-pedidos'>
            <h1>Mis pedidos</h1>
            {pedidos.length === 0 ? (
                <p>No tienes pedidos aún</p>
            ) : (
                <div className='pedidos-lista'>
                    {pedidos.map(pedido => (
                        <div key={pedido.cod} className='pedido-card'>
                            <div className='pedido-header'>
                                <h3>Pedido #{pedido.cod}</h3>
                                <span className={`estado estado-${pedido.estado}`}>{pedido.estado}</span>
                            </div>
                            <p>Dirección: {pedido.direccion_entrega}</p>
                            <p>Total: Bs. {pedido.total}</p>
                            <small>{new Date(pedido.fecha).toLocaleDateString()}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MisPedidos