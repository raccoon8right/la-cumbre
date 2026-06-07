import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

function ProductoDetalle() {
    const { cod } = useParams()
    const [producto, setProducto] = useState(null)
    const [imagenes, setImagenes] = useState([])
    const [cantidad, setCantidad] = useState(1)
    const { token } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, imgRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/productos/${cod}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get(`${import.meta.env.VITE_API_URL}/imagenProductos/producto/${cod}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ])
                setProducto(prodRes.data)
                setImagenes(imgRes.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [cod, token])

    const agregarAlCarrito = () => {
        const carrito = JSON.parse(localStorage.getItem('carrito') || '[]')
        const existe = carrito.find(item => item.cod === producto.cod)
        if (existe) {
            existe.cantidad += cantidad
        } else {
            carrito.push({ ...producto, cantidad })
        }
        localStorage.setItem('carrito', JSON.stringify(carrito))
        alert('Producto agregado al carrito')
    }

    if (!producto) return <p>Cargando...</p>

    return (
        <div className='producto-detalle'>
            <div className='detalle-imagenes'>
                <div className='imagen-principal'>
                    {/* espacio para imagen principal */}
                </div>
                <div className='imagenes-miniaturas'>
                    {imagenes.map(img => (
                        <div key={img.id} className='miniatura'>
                            {/* espacio para miniatura */}
                        </div>
                    ))}
                </div>
            </div>
            <div className='detalle-info'>
                <h1>{producto.nombre}</h1>
                <p className='detalle-tipo'>{producto.tipo} — {producto.material}</p>
                <p className='detalle-descripcion'>{producto.descripcion}</p>
                <span className='precio-grande'>Bs. {producto.precio}</span>
                <p className='stock'>Stock disponible: {producto.stock}</p>
                <div className='cantidad-selector'>
                    <button onClick={() => setCantidad(prev => Math.max(1, prev - 1))}>-</button>
                    <span>{cantidad}</span>
                    <button onClick={() => setCantidad(prev => Math.min(producto.stock, prev + 1))}>+</button>
                </div>
                <button onClick={agregarAlCarrito} className='btn-principal'>Agregar al carrito</button>
            </div>
        </div>
    )
}

export default ProductoDetalle