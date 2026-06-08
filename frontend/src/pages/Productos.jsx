import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../services/api.js'

function Productos() {
    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')
    const [searchParams] = useSearchParams()

    const fetchData = useCallback(async () => {
        setCargando(true)
        setError('')
        try {
            const [prodRes, catRes] = await Promise.all([
                api.get('/productos'),
                api.get('/categorias'),
            ])
            setProductos(Array.isArray(prodRes.data) ? prodRes.data : [])
            setCategorias(Array.isArray(catRes.data) ? catRes.data : [])
        } catch {
            setError('No se pudieron cargar los productos')
        } finally {
            setCargando(false)
        }
    }, [])

    useEffect(() => { fetchData() }, [fetchData])

    // Sincronizar filtro de URL con estado local
    useEffect(() => {
        setCategoriaSeleccionada(searchParams.get('categoria') || '')
    }, [searchParams])

    const productosFiltrados = categoriaSeleccionada
        ? productos.filter(p => Number(p.categoria_id_fk) === Number(categoriaSeleccionada))
        : productos

    return (
        <div className='productos-page'>
            <h1>Productos</h1>

            {cargando ? (
                <p>Cargando productos...</p>
            ) : error ? (
                <p className='error-mensaje'>{error}</p>
            ) : (
                <div className='productos-layout'>
                    <aside className='filtros'>
                        <h3>Categorías</h3>
                        <ul>
                            <li>
                                <button
                                    className={!categoriaSeleccionada ? 'activo' : ''}
                                    onClick={() => setCategoriaSeleccionada('')}
                                >
                                    Todas
                                </button>
                            </li>
                            {categorias.map(cat => (
                                <li key={cat.id}>
                                    <button
                                        className={Number(categoriaSeleccionada) === Number(cat.id) ? 'activo' : ''}
                                        onClick={() => setCategoriaSeleccionada(String(cat.id))}
                                    >
                                        {cat.nombre}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <div className='productos-grid'>
                        {productosFiltrados.length === 0 ? (
                            <p>No hay productos en esta categoría</p>
                        ) : (
                            productosFiltrados.map(producto => (
                                <Link to={`/productos/${producto.cod}`} key={producto.cod} className='producto-card'>
                                    <div className='producto-imagen'>{/* imagen */}</div>
                                    <div className='producto-card-info'>
                                        <h3>{producto.nombre}</h3>
                                        <p>{producto.tipo}</p>
                                        <span className='precio'>Bs. {Number(producto.precio).toFixed(2)}</span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Productos