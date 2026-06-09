import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../services/api.js'

const leerCarrito = () => JSON.parse(localStorage.getItem('carrito') || '[]')
const guardarCarrito = (items) => localStorage.setItem('carrito', JSON.stringify(items))

const PASO_CARRITO = 1
const PASO_ENVIO = 2
const PASO_CONFIRMAR = 3

function Carrito() {
    const [carrito, setCarrito] = useState([])
    const [direccion, setDireccion] = useState('')
    const [transportes, setTransportes] = useState([])
    const [transporteId, setTransporteId] = useState('')
    const [transporteInfo, setTransporteInfo] = useState(null)
    const [paso, setPaso] = useState(PASO_CARRITO)
    const [cargando, setCargando] = useState(false)
    const [cargandoT, setCargandoT] = useState(false)
    const [error, setError] = useState('')
    const { usuario } = useAuth()
    const navigate = useNavigate()

    useEffect(() => { setCarrito(leerCarrito()) }, [])

    useEffect(() => {
        if (paso !== PASO_ENVIO) return
        const fetchTransportes = async () => {
            setCargandoT(true)
            try {
                const res = await api.get('/transportes')
                setTransportes(Array.isArray(res.data) ? res.data : [])
            } catch {
                setError('No se pudieron cargar las opciones de transporte')
            } finally {
                setCargandoT(false)
            }
        }
        fetchTransportes()
    }, [paso])

    useEffect(() => {
        if (!transporteId) return setTransporteInfo(null)
        const t = transportes.find(t => String(t.id) === String(transporteId))
        setTransporteInfo(t || null)
    }, [transporteId, transportes])

    const actualizarCarrito = (nuevoCarrito) => {
        setCarrito(nuevoCarrito)
        guardarCarrito(nuevoCarrito)
    }

    const cambiarCantidad = (cod, delta) => {
        actualizarCarrito(carrito.map(item => {
            if (item.cod !== cod) return item
            const nuevaCantidad = item.cantidad + delta
            if (nuevaCantidad < 1 || nuevaCantidad > item.stock) return item
            return { ...item, cantidad: nuevaCantidad }
        }))
    }

    const eliminarItem = (cod) => actualizarCarrito(carrito.filter(item => item.cod !== cod))

    const vaciarCarrito = () => {
        if (!confirm('¿Vaciar todo el carrito?')) return
        actualizarCarrito([])
    }

    const totalProductos = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    const totalEnvio = transporteInfo ? Number(transporteInfo.precio_envio) : 0
    const totalFinal = totalProductos + totalEnvio
    const hayProblemasStock = carrito.some(item => item.cantidad > item.stock)

    const irAEnvio = () => {
        setError('')
        if (!direccion.trim()) return setError('Ingresa una dirección de entrega')
        if (hayProblemasStock) return setError('Hay productos con stock insuficiente')
        setPaso(PASO_ENVIO)
    }

    const irAConfirmar = () => {
        setError('')
        if (!transporteId) return setError('Selecciona una opción de transporte')
        setPaso(PASO_CONFIRMAR)
    }

    const realizarPedido = async () => {
        setError('')
        setCargando(true)
        try {
            const cod = `PED-${Date.now()}`

            await api.post('/pedidos', {
                cod,
                estado: 'pendiente',
                direccion_entrega: direccion,
                total: totalFinal,
            })

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

            await api.post('/llegan', {
                ci_fk: usuario.ci,
                cod_pedido_fk: cod,
                id_transporte_fk: transporteId,
            })

            localStorage.removeItem('carrito')
            navigate('/mis-pedidos')
        } catch (err) {
            setError(err.response?.data?.error || 'Error al realizar el pedido. Intenta de nuevo.')
        } finally {
            setCargando(false)
        }
    }

    if (carrito.length === 0 && paso === PASO_CARRITO) {
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
            <div className='checkout-pasos'>
                <span className={paso >= PASO_CARRITO ? 'paso activo' : 'paso'}>1. Carrito</span>
                <span className='paso-separador'>›</span>
                <span className={paso >= PASO_ENVIO ? 'paso activo' : 'paso'}>2. Envío</span>
                <span className='paso-separador'>›</span>
                <span className={paso >= PASO_CONFIRMAR ? 'paso activo' : 'paso'}>3. Confirmar</span>
            </div>

            {error && <p className='error-mensaje'>{error}</p>}

            {paso === PASO_CARRITO && (
                <>
                    <div className='carrito-header'>
                        <h1>Carrito</h1>
                        <button onClick={vaciarCarrito} className='btn-texto-peligro'>Vaciar carrito</button>
                    </div>
                    <div className='carrito-contenido'>
                        <div className='carrito-items'>
                            {carrito.map(item => (
                                <div key={item.cod} className='carrito-item'>
                                    <div className='producto-imagen'>
                                        {item.imagen_url
                                            ? <img src={item.imagen_url} alt={item.nombre} />
                                            : <div className='imagen-placeholder' />
                                        }
                                    </div>
                                    <div className='item-info'>
                                        <h3>{item.nombre}</h3>
                                        <p className='item-tipo'>{item.tipo}</p>
                                        <p className='item-precio-unit'>Bs. {Number(item.precio).toFixed(2)} c/u</p>
                                        {item.cantidad > item.stock && (
                                            <p className='error-mensaje'>Stock insuficiente (máx: {item.stock})</p>
                                        )}
                                    </div>
                                    <div className='item-cantidad'>
                                        <button onClick={() => cambiarCantidad(item.cod, -1)} disabled={item.cantidad <= 1} aria-label='Reducir'>−</button>
                                        <span>{item.cantidad}</span>
                                        <button onClick={() => cambiarCantidad(item.cod, +1)} disabled={item.cantidad >= item.stock} aria-label='Aumentar'>+</button>
                                    </div>
                                    <div className='item-subtotal'>
                                        <strong>Bs. {(item.precio * item.cantidad).toFixed(2)}</strong>
                                    </div>
                                    <button onClick={() => eliminarItem(item.cod)} className='btn-eliminar' aria-label={`Eliminar ${item.nombre}`}>✕</button>
                                </div>
                            ))}
                        </div>
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
                                <strong>Subtotal</strong>
                                <strong>Bs. {totalProductos.toFixed(2)}</strong>
                            </div>
                            <input
                                type='text'
                                placeholder='Dirección de entrega...'
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                className='input-direccion'
                            />
                            <button onClick={irAEnvio} className='btn-principal btn-checkout' disabled={hayProblemasStock}>
                                Continuar →
                            </button>
                            <Link to='/productos' className='btn-texto'>← Seguir comprando</Link>
                        </aside>
                    </div>
                </>
            )}

            {paso === PASO_ENVIO && (
                <div className='checkout-envio'>
                    <h1>Seleccionar transporte</h1>
                    <p className='checkout-direccion'>Enviar a: <strong>{direccion}</strong></p>
                    {cargandoT ? (
                        <p>Cargando opciones de transporte...</p>
                    ) : transportes.length === 0 ? (
                        <p className='error-mensaje'>No hay opciones de transporte disponibles</p>
                    ) : (
                        <div className='transportes-lista'>
                            {transportes.map(t => (
                                <label key={t.id} className={`transporte-card ${String(transporteId) === String(t.id) ? 'seleccionado' : ''}`}>
                                    <input
                                        type='radio'
                                        name='transporte'
                                        value={t.id}
                                        checked={String(transporteId) === String(t.id)}
                                        onChange={(e) => setTransporteId(e.target.value)}
                                    />
                                    <div className='transporte-info'>
                                        <h3>{t.nombre}</h3>
                                        <p>Tipo: {t.tipo}</p>
                                        <p>Confiabilidad: {t.confiabilidad}/5</p>
                                    </div>
                                    <div className='transporte-precio'>
                                        <strong>Bs. {Number(t.precio_envio).toFixed(2)}</strong>
                                        <small>envío</small>
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                    <div className='checkout-acciones'>
                        <button onClick={() => { setPaso(PASO_CARRITO); setError('') }} className='btn-secundario'>← Volver</button>
                        <button onClick={irAConfirmar} className='btn-principal' disabled={!transporteId}>Continuar →</button>
                    </div>
                </div>
            )}

            {paso === PASO_CONFIRMAR && (
                <div className='checkout-confirmar'>
                    <h1>Confirmar pedido</h1>
                    <div className='confirmar-resumen'>
                        <h3>Productos</h3>
                        {carrito.map(item => (
                            <div key={item.cod} className='resumen-linea'>
                                <span>{item.nombre} ×{item.cantidad}</span>
                                <span>Bs. {(item.precio * item.cantidad).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className='resumen-linea'>
                            <span>Subtotal productos</span>
                            <span>Bs. {totalProductos.toFixed(2)}</span>
                        </div>
                        <div className='resumen-linea'>
                            <span>Envío — {transporteInfo?.nombre}</span>
                            <span>Bs. {totalEnvio.toFixed(2)}</span>
                        </div>
                        <div className='resumen-total'>
                            <strong>Total</strong>
                            <strong>Bs. {totalFinal.toFixed(2)}</strong>
                        </div>
                        <div className='confirmar-detalle'>
                            <p><strong>Dirección:</strong> {direccion}</p>
                            <p><strong>Transporte:</strong> {transporteInfo?.nombre} ({transporteInfo?.tipo})</p>
                        </div>
                    </div>
                    <div className='checkout-acciones'>
                        <button onClick={() => { setPaso(PASO_ENVIO); setError('') }} className='btn-secundario'>← Volver</button>
                        <button onClick={realizarPedido} className='btn-principal btn-checkout' disabled={cargando}>
                            {cargando ? 'Procesando...' : 'Confirmar pedido'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Carrito