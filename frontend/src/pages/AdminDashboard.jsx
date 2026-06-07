import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { generarReportePedidos, generarReporteProductos } from '../utils/generarReporte.js'

function AdminDashboard() {
    const [stats, setStats] = useState({ productos: 0, pedidos: 0, clientes: 0, empresas: 0 })
    const [pedidosPorEstado, setPedidosPorEstado] = useState([])
    const { token } = useAuth()

    const [pedidos, setPedidos] = useState([])
    const [productos, setProductos] = useState([])
    
    const handleReportePedidos = () => generarReportePedidos(pedidos)
    const handleReporteProductos = () => generarReporteProductos(productos)

    const COLORES = ['#0F3B7A', '#B8A060', '#1A55A8', '#C8B87A']

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [prodRes, pedRes, cliRes, empRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/productos`, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get(`${import.meta.env.VITE_API_URL}/pedidos`, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get(`${import.meta.env.VITE_API_URL}/clientes`, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get(`${import.meta.env.VITE_API_URL}/empresas`, { headers: { Authorization: `Bearer ${token}` } }),
                ])
                setStats({
                    productos: prodRes.data.length,
                    pedidos: pedRes.data.length,
                    clientes: cliRes.data.length,
                    empresas: empRes.data.length
                })
                const estados = pedRes.data.reduce((acc, p) => {
                    acc[p.estado] = (acc[p.estado] || 0) + 1
                    return acc
                }, {})
                setPedidosPorEstado(Object.entries(estados).map(([name, value]) => ({ name, value })))
                {/* Pruebas */ }
                setProductos(prodRes.data)
                setPedidos(pedRes.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchStats()
    }, [token])

    return (
        <div className='admin-dashboard'>
            <h1>Dashboard</h1>
            <div className='stats-grid'>
                <div className='stat-card'>
                    <h3>Productos</h3>
                    <span>{stats.productos}</span>
                </div>
                <div className='stat-card'>
                    <h3>Pedidos</h3>
                    <span>{stats.pedidos}</span>
                </div>
                <div className='stat-card'>
                    <h3>Clientes</h3>
                    <span>{stats.clientes}</span>
                </div>
                <div className='stat-card'>
                    <h3>Empresas</h3>
                    <span>{stats.empresas}</span>
                </div>
            </div>
            <div className='graficos'>
                <div className='grafico-card'>
                    <h3>Pedidos por estado</h3>
                    <ResponsiveContainer width='100%' height={300}>
                        <PieChart>
                            <Pie data={pedidosPorEstado} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={100} label>
                                {pedidosPorEstado.map((_, i) => (
                                    <Cell key={i} fill={COLORES[i % COLORES.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
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
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey='valor' fill='#0F3B7A' />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className='reportes'>
                <h2>Reportes PDF</h2>
                <button onClick={handleReportePedidos} className='btn-principal'>
                    Descargar reporte de pedidos
                </button>
                <button onClick={handleReporteProductos} className='btn-principal'>
                    Descargar reporte de productos
                </button>
            </div>
        </div>
    )
}

export default AdminDashboard