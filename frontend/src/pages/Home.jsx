import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Home() {
    const [categorias, setCategorias] = useState([])
    const [productos, setProductos] = useState([])
    const [minerales, setMinerales] = useState(null)
    const [productoActivo, setProductoActivo] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, prodRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/categorias`),
                    axios.get(`${import.meta.env.VITE_API_URL}/productos`)
                ])
                setCategorias(catRes.data)
                setProductos(prodRes.data)
            } catch (error) {
                console.log(error)
            }
        }
        const fetchMinerales = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/minerales`)
                console.log(res.data)
                setMinerales(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        fetchMinerales()
    }, [])

    const siguiente = () => setProductoActivo((prev) => (prev + 1) % productos.length)
    const anterior = () => setProductoActivo((prev) => (prev - 1 + productos.length) % productos.length)

    return (
        <div className='home'>
            {/* Hero */}
            <section className='hero'>
                <div className='hero-content'>
                    <h1>La Cumbre</h1>
                    <p>Genuine Pewter — Decoraciones artesanales en metal</p>
                    <Link to='/productos' className='btn-principal'>Ver productos</Link>
                </div>
                <div className='hero-imagen'>
                    {/* espacio para imagen */}
                </div>
            </section>

            {/* Categorias */}
            <section className='categorias'>
                <h2>Categorías</h2>
                <div className='categorias-grid'>
                    {categorias.map(cat => (
                        <Link to={`/productos?categoria=${cat.id}`} key={cat.id} className='categoria-card'>
                            <div className='categoria-icono'>{/* espacio para icono/imagen */}</div>
                            <h3>{cat.nombre}</h3>
                            <p>{cat.descripcion}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Carrusel productos */}
            <section className='carrusel'>
                <h2>Productos destacados</h2>
                {productos.length > 0 && (
                    <div className='carrusel-container'>
                        <button onClick={anterior} className='carrusel-btn'>&#8249;</button>
                        <div className='carrusel-item'>
                            <div className='producto-imagen'>
                                {/* espacio para imagen */}
                            </div>
                            <div className='producto-info'>
                                <h3>{productos[productoActivo].nombre}</h3>
                                <p>{productos[productoActivo].descripcion}</p>
                                <span className='precio'>Bs. {productos[productoActivo].precio}</span>
                                <Link to={`/productos/${productos[productoActivo].cod}`} className='btn-principal'>Ver detalle</Link>
                            </div>
                        </div>
                        <button onClick={siguiente} className='carrusel-btn'>&#8250;</button>
                    </div>
                )}
            </section>

            {/* Minerales */}
            <section className='minerales'>
                <h2>Precio de minerales hoy</h2>
                {minerales && (
                    <div className='minerales-grid'>
                        {minerales.slice(0, 4).map((mineral, i) => (
                            <div key={i} className='mineral-card'>
                                <h3>{mineral.metal}</h3>
                                <span className='mineral-precio'>${mineral.price}</span>
                                <small>por oz troy</small>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Home