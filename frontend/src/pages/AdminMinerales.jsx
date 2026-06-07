import { useState, useEffect } from 'react'
import axios from 'axios'

function AdminMinerales() {
    const [minerales, setMinerales] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const fetchMinerales = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/minerales`)
                console.log(res.data)
                setMinerales(res.data)
            } catch (error) {
                console.log(error)
            } finally {
                setCargando(false)
            }
        }
        fetchMinerales()
    }, [])

    return (
        <div className='admin-page'>
            <h1>Precio de minerales</h1>
            <p>Precios en tiempo real (USD por oz troy)</p>
            {cargando ? (
                <p>Cargando precios...</p>
            ) : (
                <div className='minerales-grid'>
                    {minerales.map((mineral, i) => (
                        <div key={i} className='mineral-card'>
                            <h3>{mineral.metal}</h3>
                            <span className='mineral-precio'>${mineral.price}</span>
                            <small>por oz troy</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminMinerales