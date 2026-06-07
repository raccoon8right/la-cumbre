import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

function Productos() {
    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
    const [searchParams] = useSearchParams()
    const { token } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/productos`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get(`${import.meta.env.VITE_API_URL}/categorias`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ])
                setProductos(prodRes.data)
                setCategorias(catRes.data)
                const cat = searchParams.get('categoria')
                if (cat) setCategoriaSeleccionada(cat)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [token])

    const productosFiltrados = categoriaSeleccionada
        ? productos.filter(p => p.categoria_id_fk == categoriaSeleccionada)
        : productos

    return (
        <div className='productos-page'>
            <h1>Productos</h1>
            <div className='productos-layout'>
                <aside className='filtros'>
                    <h3>Categorías</h3>
                    <ul>
                        <li>
                            <button
                                className={!categoriaSeleccionada ? 'activo' : ''}
                                onClick={() => setCategoriaSeleccionada('')}
                            >Todas</button>
                        </li>
                        {categorias.map(cat => (
                            <li key={cat.id}>
                                <button
                                    className={categoriaSeleccionada == cat.id ? 'activo' : ''}
                                    onClick={() => setCategoriaSeleccionada(cat.id)}
                                >{cat.nombre}</button>
                            </li>
                        ))}
                    </ul>
                </aside>
                <div className='productos-grid'>
                    {productosFiltrados.map(producto => (
                        <Link to={`/productos/${producto.cod}`} key={producto.cod} className='producto-card'>
                            <div className='producto-imagen'>{/* imagen */}</div>
                            <div className='producto-card-info'>
                                <h3>{producto.nombre}</h3>
                                <p>{producto.tipo}</p>
                                <span className='precio'>Bs. {producto.precio}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Productos