import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

function AdminPedidos() {
    const [pedidos, setPedidos] = useState([])
    const { token } = useAuth()

    const fetchPedidos = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/pedidos`, { headers: { Authorization: `Bearer ${token}` } })
            setPedidos(res.data)
        } catch (error) { console.log(error) }
    }

    useEffect(() => { fetchPedidos() }, [token])

    const cambiarEstado = async (cod, estado) => {
        try {
            const pedido = pedidos.find(p => p.cod === cod)
            await axios.put(`${import.meta.env.VITE_API_URL}/pedidos/${cod}`, {
                estado,
                direccion_entrega: pedido.direccion_entrega,
                total: pedido.total
            }, { headers: { Authorization: `Bearer ${token}` } })
            fetchPedidos()
        } catch (error) { console.log(error) }
    }

    return (
        <div className='admin-page'>
            <h1>Gestión de pedidos</h1>
            <table className='admin-tabla'>
                <thead>
                    <tr><th>Código</th><th>Dirección</th><th>Total</th><th>Estado</th><th>Fecha</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {pedidos.map(p => (
                        <tr key={p.cod}>
                            <td>{p.cod}</td>
                            <td>{p.direccion_entrega}</td>
                            <td>Bs. {p.total}</td>
                            <td><span className={`estado estado-${p.estado}`}>{p.estado}</span></td>
                            <td>{new Date(p.fecha).toLocaleDateString()}</td>
                            <td>
                                <select value={p.estado} onChange={(e) => cambiarEstado(p.cod, e.target.value)}>
                                    <option value='pendiente'>Pendiente</option>
                                    <option value='enviado'>Enviado</option>
                                    <option value='entregado'>Entregado</option>
                                    <option value='cancelado'>Cancelado</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminPedidos