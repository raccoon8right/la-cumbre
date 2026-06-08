/**
 * src/pages/Carrito.jsx
 *
 * Correcciones aplicadas:
 * 1. Bug crítico: no se mutaba el array al actualizar cantidad — ahora usa .map()
 * 2. Controles de cantidad inline (+ / -) sin tener que ir al detalle del producto
 * 3. Validación de stock en tiempo real por item
 * 4. Usa api.js centralizado
 * 5. Confirmación antes de vaciar el carrito
 */

import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../services/api.js'

// Helper: leer y guardar carrito en localStorage
const leerCarrito = () => JSON.parse(localStorage.getItem('carrito') || '[]')
const guardarCarrito = (items) => localStorage.setItem('carrito', JSON.stringify(items))

function Carrito() {
    const [carrito, setCarrito] = useState([])
    const [direccion, setDireccion] = useState('')
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState('')
    const { token } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        setCarrito(leerCarrito())
    }, [])

    // Sincronizar estado → localStorage cada vez que cambia el carrito
    const actualizarCarrito = (nuevoCarrito) => {
        setCarrito(nuevoCarrito)
        guardarCarrito(nuevoCarrito)
    }

    // Bug corregido: usaba existe.cantidad += cantidad (mutación directa)
    // Ahora crea un nuevo array con .map()
    const cambiarCantidad = (cod, delta) => {
        const nuevo = carrito.map(item => {
            if (item.cod !== cod) return item
            const nuevaCantidad = item.cantidad + delta
            // No bajar de 1 ni superar el stock disponible
            if (nuevaCantidad < 1 || nuevaCantidad > item.stock) return item
            return { ...item, cantidad: nuevaCantidad }
        })
        actualizarCarrito(nuevo)
    }

    const eliminarItem = (cod) => {
        actualizarCarrito(carrito.filter(item => item.cod !== cod))
    }

    const vaciarCarrito = () => {
        if (!confirm('¿Vaciar todo el carrito?')) return
        actualizarCarrito([])
    }

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

    // Verificar si algún item tiene cantidad mayor al stock
    const hayProblemasStock = carrito.some(item => item.cantidad > item.stock)

    const realizarPedido = async () => {
        setError('')

        if (!direccion.trim()) return setError('Ingresa una dirección de entrega')
        if (hayProblemasStock) return setError('Hay productos con stock insuficiente. Ajusta las cantidades.')

        setCargando(true)
        try {
            const cod = `PED-${Date.now()}`

            await api.post('/pedidos', {
                cod,
                estado: 'pendiente',
                direccion_entrega: direccion,
                total,
            })

            // Registrar el detalle de cada producto en paralelo
            await Promise.all(
                carrito.map(item =>
                    api.post('/detallePedidos', {
                        pedido_cod_fk: cod,
                        producto_cod_fk: item.cod,
                        cantidad: item.cantidad,
                        precio_unitario: item.precio,
                    })
                )
            )

            localStorage.removeItem('carrito')
            navigate('/mis-pedidos')
        } catch (err) {
            setError(err.response?.data?.error || 'Error al realizar el pedido. Intenta de nuevo.')
        } finally {
            setCargando(false)
        }
    }

    if (carrito.length === 0) {
        return (
            <div className='carrito-page carrito-vacio'>
                <h1>Carrito</h1>
                <p>Tu carrito está vacío</p>
                <Link to='/productos' className='btn-principal'>Ver productos</Link>
            </div>
        )
    }

    return (
        <div className='carrito-page'>
            <div className='carrito-header'>
                <h1>Carrito</h1>
                <button onClick={vaciarCarrito} className='btn-texto-peligro'>
                    Vaciar carrito
                </button>
            </div>

            <div className='carrito-contenido'>
                <div className='carrito-items'>
                    {carrito.map(item => (
                        <div key={item.cod} className='carrito-item'>
                            <div className='item-imagen'>
                                {item.imagen_url
                                    ? <img src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/${item.imagen_url}`} alt={item.nombre} />
                                    : <div className='imagen-placeholder' />
                                }
                            </div>

                            <div className='item-info'>
                                <h3>{item.nombre}</h3>
                                <p className='item-tipo'>{item.tipo}</p>
                                <p className='item-precio-unit'>Bs. {Number(item.precio).toFixed(2)} c/u</p>

                                {/* Alerta de stock insuficiente */}
                                {item.cantidad > item.stock && (
                                    <p className='error-mensaje'>
                                        Stock insuficiente (máx: {item.stock})
                                    </p>
                                )}
                            </div>

                            {/* Controles de cantidad inline */}
                            <div className='item-cantidad'>
                                <button
                                    onClick={() => cambiarCantidad(item.cod, -1)}
                                    disabled={item.cantidad <= 1}
                                    aria-label='Reducir cantidad'
                                >
                                    −
                                </button>
                                <span>{item.cantidad}</span>
                                <button
                                    onClick={() => cambiarCantidad(item.cod, +1)}
                                    disabled={item.cantidad >= item.stock}
                                    aria-label='Aumentar cantidad'
                                >
                                    +
                                </button>
                            </div>

                            <div className='item-subtotal'>
                                <strong>Bs. {(item.precio * item.cantidad).toFixed(2)}</strong>
                            </div>

                            <button
                                onClick={() => eliminarItem(item.cod)}
                                className='btn-eliminar'
                                aria-label={`Eliminar ${item.nombre}`}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                {/* Resumen y checkout */}
                <aside className='carrito-resumen'>
                    <h2>Resumen</h2>

                    <div className='resumen-lineas'>
                        {carrito.map(item => (
                            <div key={item.cod} className='resumen-linea'>
                                <span>{item.nombre} ×{item.cantidad}</span>
                                <span>Bs. {(item.precio * item.cantidad).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className='resumen-total'>
                        <strong>Total</strong>
                        <strong>Bs. {total.toFixed(2)}</strong>
                    </div>

                    {error && <p className='error-mensaje'>{error}</p>}

                    <input
                        type='text'
                        placeholder='Dirección de entrega...'
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        disabled={cargando}
                        className='input-direccion'
                    />

                    <button
                        onClick={realizarPedido}
                        className='btn-principal btn-checkout'
                        disabled={cargando || hayProblemasStock}
                    >
                        {cargando ? 'Procesando...' : 'Realizar pedido'}
                    </button>

                    <Link to='/productos' className='btn-texto'>
                        ← Seguir comprando
                    </Link>
                </aside>
            </div>
        </div>
    )
}

export default Carrito