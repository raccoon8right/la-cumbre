import { useState, useEffect, useCallback } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { generarReportePedidos, generarReporteProductos } from '../utils/generarReporte.js'
import api from '../services/api.js'

const COLORES = [
    '#0F3B7A', // azul principal (pendiente)
    '#B8A060', // dorado (enviado)
    '#2E72CC', // azul claro (entregado)
    '#D5CCBB', // crema (cancelado)
    '#1A55A8', // azul medio (otros)
    '#C8B87A'  // dorado claro
];

function AdminDashboard() {
    const [stats, setStats] = useState({ productos: 0, pedidos: 0, clientes: 0, empresas: 0 })
    const [pedidosPorEstado, setPedidosPorEstado] = useState([])
    const [pedidos, setPedidos] = useState([])
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    const fetchStats = useCallback(async () => {
        setError('')
        try {
            // allSettled: si una falla, las demás igual llegan
            const [prodRes, pedRes, cliRes, empRes] = await Promise.allSettled([
                api.get('/productos'),
                api.get('/pedidos'),
                api.get('/clientes'),   // ruta correcta del backend
                api.get('/empresas'),
            ])

            const prod = prodRes.status === 'fulfilled' ? prodRes.value.data : []
            const ped = pedRes.status === 'fulfilled' ? pedRes.value.data : []
            const cli = cliRes.status === 'fulfilled' ? cliRes.value.data : []
            const emp = empRes.status === 'fulfilled' ? empRes.value.data : []

            setStats({
                productos: Array.isArray(prod) ? prod.length : 0,
                pedidos: Array.isArray(ped) ? ped.length : 0,
                clientes: Array.isArray(cli) ? cli.length : 0,
                empresas: Array.isArray(emp) ? emp.length : 0,
            })

            if (Array.isArray(ped)) {
                const estados = ped.reduce((acc, p) => {
                    acc[p.estado] = (acc[p.estado] || 0) + 1
                    return acc
                }, {})
                setPedidosPorEstado(Object.entries(estados).map(([name, value]) => ({ name, value })))
                setPedidos(ped)
            }

            if (Array.isArray(prod)) setProductos(prod)

            // Avisar si alguna carga falló parcialmente
            const fallidos = [prodRes, pedRes, cliRes, empRes].filter(r => r.status === 'rejected')
            if (fallidos.length > 0) setError('Algunas estadísticas no pudieron cargarse')

        } catch {
            setError('No se pudieron cargar las estadísticas')
        } finally {
            setCargando(false)
        }
    }, [])

    useEffect(() => { fetchStats() }, [fetchStats])

    return (
        <div className='admin-dashboard'>
            <h1>Dashboard</h1>

            {error && <p className='error-mensaje'>{error}</p>}

            {cargando ? (
                <p>Cargando estadísticas...</p>
            ) : (
                <>
                    <div className='stats-grid'>
                        <div className='stat-card'><h3>Productos</h3><span>{stats.productos}</span></div>
                        <div className='stat-card'><h3>Pedidos</h3><span>{stats.pedidos}</span></div>
                        <div className='stat-card'><h3>Clientes</h3><span>{stats.clientes}</span></div>
                        <div className='stat-card'><h3>Empresas</h3><span>{stats.empresas}</span></div>
                    </div>

                    <div className='graficos'>
                        <div className='grafico-card'>
                            <h3>Pedidos por estado</h3>
                            {pedidosPorEstado.length === 0 ? (
                                <p>Sin datos de pedidos</p>
                            ) : (
                                <ResponsiveContainer width='100%' height={300}>
                                    <PieChart>
                                        <Pie
                                            data={pedidosPorEstado}
                                            dataKey='value'
                                            nameKey='name'
                                            cx='50%' cy='50%'
                                            outerRadius={100}
                                            label
                                        >
                                            {pedidosPorEstado.map((_, i) => (
                                                <Cell key={i} fill={COLORES[i % COLORES.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>

                        <div className='grafico-card'>
                            <h3>Resumen general</h3>
                            <ResponsiveContainer width='100%' height={300}>
                                <BarChart data={[
                                    { name: 'Productos', valor: stats.productos },
                                    { name: 'Pedidos', valor: stats.pedidos },
                                    { name: 'Clientes', valor: stats.clientes },
                                    { name: 'Empresas', valor: stats.empresas },
                                ]}>
                                    <XAxis dataKey='name' />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Bar dataKey='valor' fill='#0F3B7A' />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className='reportes'>
                        <h2>Reportes PDF</h2>
                        <button
                            onClick={() => generarReportePedidos(pedidos)}
                            className='btn-principal'
                            disabled={pedidos.length === 0}
                        >
                            Descargar reporte de pedidos
                        </button>
                        <button
                            onClick={() => generarReporteProductos(productos)}
                            className='btn-principal'
                            disabled={productos.length === 0}
                        >
                            Descargar reporte de productos
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default AdminDashboard