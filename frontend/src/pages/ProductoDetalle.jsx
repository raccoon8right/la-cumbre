/**
 * src/pages/ProductoDetalle.jsx
 *
 * Correcciones:
 * 1. Bug: si el producto no existía, mostraba "Cargando..." indefinidamente
 *    Ahora tiene estado de error explícito
 * 2. Bug carrito: mutaba el objeto directamente al incrementar cantidad
 *    Ahora usa .map() para crear nuevo array sin mutación
 * 3. Cantidad máxima limitada al stock disponible desde el selector
 * 4. Usa api.js centralizado
 * 5. Feedback visual al agregar al carrito (en lugar de alert())
 */

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api.js'

function ProductoDetalle() {
    const { cod } = useParams()
    const [producto, setProducto] = useState(null)
    const [imagenes, setImagenes] = useState([])
    const [cantidad, setCantidad] = useState(1)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')
    const [agregado, setAgregado] = useState(false) // feedback visual

    useEffect(() => {
        const fetchData = async () => {
            setCargando(true)
            setError('')
            try {
                const [prodRes, imgRes] = await Promise.allSettled([
                    api.get(`/productos/${cod}`),
                    api.get(`/imagenProductos/producto/${cod}`),
                ])

                if (prodRes.status === 'fulfilled') {
                    setProducto(prodRes.value.data)
                } else {
                    setError('Producto no encontrado')
                }

                if (imgRes.status === 'fulfilled' && Array.isArray(imgRes.value.data)) {
                    setImagenes(imgRes.value.data)
                }
            } catch {
                setError('Error al cargar el producto')
            } finally {
                setCargando(false)
            }
        }
        fetchData()
    }, [cod])

    const agregarAlCarrito = () => {
        if (!producto) return

        const carrito = JSON.parse(localStorage.getItem('carrito') || '[]')
        const existe = carrito.find(item => item.cod === producto.cod)

        let nuevoCarrito
        if (existe) {
            // Bug corregido: antes hacía existe.cantidad += cantidad (mutación directa)
            nuevoCarrito = carrito.map(item =>
                item.cod === producto.cod
                    ? { ...item, cantidad: Math.min(item.cantidad + cantidad, producto.stock) }
                    : item
            )
        } else {
            nuevoCarrito = [...carrito, { ...producto, cantidad }]
        }

        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito))

        // Feedback visual breve en lugar de alert()
        setAgregado(true)
        setTimeout(() => setAgregado(false), 2000)
    }

    const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '')

    if (cargando) return <p className='cargando-texto'>Cargando producto...</p>

    if (error) return (
        <div className='error-page'>
            <p className='error-mensaje'>{error}</p>
            <Link to='/productos' className='btn-principal'>Volver a productos</Link>
        </div>
    )

    return (
        <div className='producto-detalle'>
            {/* Imágenes */}
            <div className='detalle-imagenes'>
                <div className='imagen-principal'>
                    {imagenes.length > 0
                        ? <img src={`${BASE_URL}/${imagenes[0].url}`} alt={producto.nombre} />
                        : <div className='imagen-placeholder' />
                    }
                </div>
                {imagenes.length > 1 && (
                    <div className='imagenes-miniaturas'>
                        {imagenes.map(img => (
                            <div key={img.id} className='miniatura'>
                                <img src={`${BASE_URL}/${img.url}`} alt={`${producto.nombre} vista`} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className='detalle-info'>
                <h1>{producto.nombre}</h1>
                <p className='detalle-tipo'>{producto.tipo} — {producto.material}</p>
                <p className='detalle-descripcion'>{producto.descripcion}</p>
                <span className='precio-grande'>Bs. {Number(producto.precio).toFixed(2)}</span>
                <p className='stock'>Stock disponible: {producto.stock}</p>

                {producto.stock === 0 ? (
                    <p className='error-mensaje'>Sin stock disponible</p>
                ) : (
                    <>
                        <div className='cantidad-selector'>
                            <button
                                onClick={() => setCantidad(prev => Math.max(1, prev - 1))}
                                disabled={cantidad <= 1}
                                aria-label='Reducir cantidad'
                            >
                                −
                            </button>
                            <span>{cantidad}</span>
                            <button
                                onClick={() => setCantidad(prev => Math.min(producto.stock, prev + 1))}
                                disabled={cantidad >= producto.stock}
                                aria-label='Aumentar cantidad'
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={agregarAlCarrito}
                            className={`btn-principal ${agregado ? 'btn-exito' : ''}`}
                            disabled={agregado}
                        >
                            {agregado ? '✓ Agregado al carrito' : 'Agregar al carrito'}
                        </button>
                    </>
                )}

                <Link to='/productos' className='btn-texto'>← Volver a productos</Link>
            </div>
        </div>
    )
}

export default ProductoDetalle