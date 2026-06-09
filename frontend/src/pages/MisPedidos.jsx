/**
 * src/pages/MisPedidos.jsx
 *
 * Correcciones:
 * 1. Bug crítico: antes traía TODOS los pedidos (misma llamada que el admin)
 *    Ahora filtra por usuario.ci en el frontend mientras el backend
 *    no tenga un endpoint /pedidos/mis-pedidos o /pedidos?cliente=ci
 *
 *    NOTA: Lo ideal es que el backend filtre por el JWT directamente.
 *    Cuando el backend lo soporte, solo cambiar api.get('/pedidos/mis-pedidos')
 *    y quitar el .filter() de aquí.
 *
 * 2. Usa api.js centralizado
 * 3. useAuth para leer usuario.ci
 * 4. Estado vacío con link a productos
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { formatPrecio } from '../utils/formatPrecio.js'
import api from '../services/api.js'

// Etiquetas de color por estado
const ESTADO_CLASS = {
    pendiente: 'badge-pendiente',
    enviado: 'badge-enviado',
    entregado: 'badge-entregado',
    cancelado: 'badge-cancelado',
}

function MisPedidos() {
    const [pedidos, setPedidos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')
    const { usuario } = useAuth()

    useEffect(() => {
        if (!usuario?.ci) return

        const fetchPedidos = async () => {
            try {
                const res = await api.get(`/pedidos/cliente/${usuario.ci}`)
                const pedidos = Array.isArray(res.data) ? res.data : []
                setPedidos(pedidos) // ya no necesitas el .filter()
            } catch {
                setError('No se pudieron cargar tus pedidos')
            } finally {
                setCargando(false)
            }
        }

        fetchPedidos()
    }, [usuario])

    return (
        <div className='mis-pedidos'>
            <h1>Mis pedidos</h1>

            {cargando ? (
                <p>Cargando pedidos...</p>
            ) : error ? (
                <p className='error-mensaje'>{error}</p>
            ) : pedidos.length === 0 ? (
                <div className='pedidos-vacio'>
                    <p>No tienes pedidos aún</p>
                    <Link to='/productos' className='btn-principal'>Explorar productos</Link>
                </div>
            ) : (
                <div className='pedidos-lista'>
                    {pedidos.map(pedido => (
                        <div key={pedido.cod} className='pedido-card'>
                            <div className='pedido-header'>
                                <h3>Pedido #{pedido.cod}</h3>
                                <span className={`badge ${ESTADO_CLASS[pedido.estado] || ''}`}>
                                    {pedido.estado}
                                </span>
                            </div>
                            <p><strong>Dirección:</strong> {pedido.direccion_entrega}</p>
                            <p><strong>Total:</strong> Bs. {formatPrecio(pedido.total)}</p>
                            <small>{new Date(pedido.fecha).toLocaleDateString('es-BO', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MisPedidos