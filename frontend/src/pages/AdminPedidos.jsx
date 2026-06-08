import { useState, useEffect, useCallback } from 'react'
import api from '../services/api.js'

function AdminPedidos() {
    const [pedidos, setPedidos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')
    const [exito, setExito] = useState('')

    const fetchPedidos = useCallback(async () => {
        setError('')
        try {
            const res = await api.get('/pedidos')
            setPedidos(res.data)
        } catch {
            setError('No se pudieron cargar los pedidos')
        } finally {
            setCargando(false)
        }
    }, [])

    useEffect(() => { fetchPedidos() }, [fetchPedidos])

    const cambiarEstado = async (cod, estado) => {
        setError('')
        setExito('')
        try {
            const pedido = pedidos.find(p => p.cod === cod)
            await api.put(`/pedidos/${cod}`, {
                estado,
                direccion_entrega: pedido.direccion_entrega,
                total: pedido.total,
            })
            setExito(`Pedido ${cod} actualizado a "${estado}"`)
            fetchPedidos()
        } catch (e) {
            setError(e.response?.data?.error || 'Error al actualizar el estado del pedido')
        }
    }

    return (
        <div className='admin-page'>
            <h1>Gestión de pedidos</h1>

            {error && <p className='error-mensaje'>{error}</p>}
            {exito && <p className='exito-mensaje'>{exito}</p>}

            {cargando ? (
                <p>Cargando pedidos...</p>
            ) : pedidos.length === 0 ? (
                <p>No hay pedidos registrados</p>
            ) : (
                <table className='admin-tabla'>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Dirección</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Cambiar estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(p => (
                            <tr key={p.cod}>
                                <td>{p.cod}</td>
                                <td>{p.direccion_entrega}</td>
                                <td>Bs. {Number(p.total).toFixed(2)}</td>
                                <td><span className={`badge estado-${p.estado}`}>{p.estado}</span></td>
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
            )}
        </div>
    )
}

export default AdminPedidos