/**
 * src/pages/AdminMinerales.jsx
 *
 * Actualización:
 * - Maneja price: null para minerales sin API gratuita (antimonio)
 * - La respuesta de api.metals.live ya viene como array — normalizarMinerales lo maneja
 */

import { useState, useEffect } from 'react'
import api from '../services/api.js'

const normalizarMinerales = (data) => {
    if (Array.isArray(data)) return data
    if (data?.rates && typeof data.rates === 'object') {
        return Object.entries(data.rates).map(([metal, price]) => ({ metal, price }))
    }
    if (Array.isArray(data?.data)) return data.data
    return []
}

function AdminMinerales() {
    const [minerales, setMinerales] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchMinerales = async () => {
            try {
                const res = await api.get('/minerales')
                const lista = normalizarMinerales(res.data)
                setMinerales(lista)
                if (lista.length === 0) setError('No hay datos de minerales disponibles')
            } catch {
                setError('No se pudieron cargar los precios de minerales.')
            } finally {
                setCargando(false)
            }
        }
        fetchMinerales()
    }, [])

    return (
        <div className='admin-page'>
            <h1>Precio de minerales</h1>
            <p className='subtitulo'>Precios en tiempo real (USD/lb) — fuente: LME vía api.metals.live</p>

            {cargando ? (
                <p>Cargando precios...</p>
            ) : error ? (
                <div>
                    <p className='error-mensaje'>{error}</p>
                    <p>Verifica la conexión con el servidor.</p>
                </div>
            ) : (
                <div className='minerales-grid'>
                    {minerales.map((mineral, i) => (
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
                                    <small>{mineral.nota || 'Precio no disponible en tiempo real'}</small>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminMinerales