import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

function Carrito() {
    const [carrito, setCarrito] = useState([])
    const [direccion, setDireccion] = useState('')
    const { token } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('carrito') || '[]')
        setCarrito(items)
    }, [])

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

    const eliminarItem = (cod) => {
        const nuevo = carrito.filter(item => item.cod !== cod)
        setCarrito(nuevo)
        localStorage.setItem('carrito', JSON.stringify(nuevo))
    }

    const realizarPedido = async () => {
        if (!direccion) return alert('Ingresa una dirección de entrega')
        try {
            const cod = `PED-${Date.now()}`
            await axios.post(`${import.meta.env.VITE_API_URL}/pedidos`, {
                cod,
                estado: 'pendiente',
                direccion_entrega: direccion,
                total
            }, { headers: { Authorization: `Bearer ${token}` } })

            for (const item of carrito) {
                await axios.post(`${import.meta.env.VITE_API_URL}/detallePedidos`, {
                    pedido_cod_fk: cod,
                    producto_cod_fk: item.cod,
                    cantidad: item.cantidad,
                    precio_unitario: item.precio
                }, { headers: { Authorization: `Bearer ${token}` } })
            }

            localStorage.removeItem('carrito')
            alert('Pedido realizado correctamente')
            navigate('/mis-pedidos')
        } catch (error) {
            alert('Error al realizar el pedido')
        }
    }

    return (
        <div className='carrito-page'>
            <h1>Carrito</h1>
            {carrito.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <>
                    <div className='carrito-items'>
                        {carrito.map(item => (
                            <div key={item.cod} className='carrito-item'>
                                <div className='item-imagen'>{/* imagen */}</div>
                                <div className='item-info'>
                                    <h3>{item.nombre}</h3>
                                    <p>Cantidad: {item.cantidad}</p>
                                    <p>Subtotal: Bs. {item.precio * item.cantidad}</p>
                                </div>
                                <button onClick={() => eliminarItem(item.cod)} className='btn-eliminar'>Eliminar</button>
                            </div>
                        ))}
                    </div>
                    <div className='carrito-resumen'>
                        <h3>Total: Bs. {total.toFixed(2)}</h3>
                        <input
                            type='text'
                            placeholder='Dirección de entrega...'
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                        <button onClick={realizarPedido} className='btn-principal'>Realizar pedido</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Carrito