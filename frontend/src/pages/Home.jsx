/**
 * src/pages/Home.jsx
 *
 * Actualización:
 * - Maneja price: null para antimonio en la sección de minerales
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api.js'

const normalizarMinerales = (data) => {
    if (Array.isArray(data)) return data
    if (data?.rates && typeof data.rates === 'object') {
        return Object.entries(data.rates).map(([metal, price]) => ({ metal, price }))
    }
    if (Array.isArray(data?.data)) return data.data
    return []
}

function Home() {
    const [categorias, setCategorias] = useState([])
    const [productos, setProductos] = useState([])
    const [minerales, setMinerales] = useState([])
    const [productoActivo, setProductoActivo] = useState(0)
    const [errorPrincipal, setErrorPrincipal] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, prodRes] = await Promise.all([
                    api.get('/categorias'),
                    api.get('/productos'),
                ])
                setCategorias(Array.isArray(catRes.data) ? catRes.data : [])
                setProductos(Array.isArray(prodRes.data) ? prodRes.data : [])
            } catch {
                setErrorPrincipal('No se pudo cargar el contenido. Intenta recargar la página.')
            }
        }

        const fetchMinerales = async () => {
            try {
                const res = await api.get('/minerales')
                setMinerales(normalizarMinerales(res.data))
            } catch {
                setMinerales([]) // falla silenciosa — no rompe la página
            }
        }

        fetchData()
        fetchMinerales()
    }, [])

    const siguiente = () => setProductoActivo(prev => (prev + 1) % productos.length)
    const anterior = () => setProductoActivo(prev => (prev - 1 + productos.length) % productos.length)

    return (
        <div className='home'>
            {/* Hero */}
            <section className='hero'>
                <div className='hero-content'>
                    <h6>Genuine Pewter</h6>
                    <h1>La Cumbre</h1>
                    <p>Decoraciones artesanales en metal</p>
                    <Link to='/productos' className='btn-principal'>Ver productos</Link>
                </div>
                <div className='hero-imagen' />
            </section>

            {errorPrincipal && (
                <p className='error-mensaje' style={{ textAlign: 'center', margin: '2rem' }}>
                    {errorPrincipal}
                </p>
            )}

            {/* Categorías */}
            {categorias.length > 0 && (
                <section className='categorias'>
                    <div className='section-heading center'>
                        <h2>Categorías</h2>
                    </div>
                    <div className='categorias-grid'>
                        {categorias.map(cat => (
                            <Link to={`/productos?categoria=${cat.id}`} key={cat.id} className='categoria-card'>
                                <div className='categoria-icono' />
                                <h3>{cat.nombre}</h3>
                                <p>{cat.descripcion}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Carrusel productos */}
            {productos.length > 0 && (
                <section className='carrusel'>
                    <div className='section-heading center'>
                        <h2>Productos destacados</h2>
                    </div>
                    <div className='carrusel-container'>
                        <button onClick={anterior} className='carrusel-btn' aria-label='Anterior'>&#8249;</button>
                        <div className='carrusel-item'>
                            <div className='producto-imagen'>
                                {productos[productoActivo].imagen_url
                                    ? <img src={productos[productoActivo].imagen_url} alt={productos[productoActivo].nombre} />
                                    : <div className='imagen-placeholder' />
                                }
                            </div>
                            <div className='producto-info'>
                                <h3>{productos[productoActivo].nombre}</h3>
                                <p>{productos[productoActivo].descripcion}</p>
                                <span className='precio'>Bs. {Number(productos[productoActivo].precio).toFixed(2)}</span>
                                <Link to={`/productos/${productos[productoActivo].cod}`} className='btn-principal'>
                                    Ver detalle
                                </Link>
                            </div>
                        </div>
                        <button onClick={siguiente} className='carrusel-btn' aria-label='Siguiente'>&#8250;</button>
                    </div>
                </section>
            )}

            {/* Minerales — solo si hay datos */}
            {minerales.length > 0 && (
                <section className='minerales'>
                    <div className='section-heading center'>
                        <h2>Precio de minerales hoy</h2>
                    </div>
                    <div className='minerales-grid'>
                        {minerales.slice(0, 4).map((mineral, i) => (
                            <div key={i} className={`mineral-card ${mineral.price === null ? 'mineral-card-inactivo' : ''}`}>
                                <h3>{mineral.metal}</h3>
                                {mineral.price !== null ? (
                                    <>
                                        <span className='mineral-precio'>
                                            ${typeof mineral.price === 'number'
                                                ? mineral.price.toFixed(2)
                                                : mineral.price}
                                        </span>
                                        <small>{mineral.unidad || 'USD/lb'}</small>
                                    </>
                                ) : (
                                    <>
                                        <span className='mineral-precio mineral-precio-nd'>N/D</span>
                                        <small>{mineral.nota || 'No disponible en tiempo real'}</small>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}

export default Home