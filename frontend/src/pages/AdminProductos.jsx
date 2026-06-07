import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

function AdminProductos() {
    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [empresas, setEmpresas] = useState([])
    const [form, setForm] = useState({ cod: '', nombre: '', tipo: '', material: '', descripcion: '', precio: '', stock: '', activo: 1, categoria_id_fk: '', empresa_nit_fk: '', admin_ci_fk: '' })
    const [editando, setEditando] = useState(false)
    const { token, usuario } = useAuth()

    const fetchData = async () => {
        try {
            const [prodRes, catRes, empRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/productos`, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(`${import.meta.env.VITE_API_URL}/categorias`, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(`${import.meta.env.VITE_API_URL}/empresas`, { headers: { Authorization: `Bearer ${token}` } }),
            ])
            setProductos(prodRes.data)
            setCategorias(catRes.data)
            setEmpresas(empRes.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { fetchData() }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = { ...form, admin_ci_fk: usuario.ci }
            if (editando) {
                await axios.put(`${import.meta.env.VITE_API_URL}/productos/${form.cod}`, data, { headers: { Authorization: `Bearer ${token}` } })
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/productos`, data, { headers: { Authorization: `Bearer ${token}` } })
            }
            setForm({ cod: '', nombre: '', tipo: '', material: '', descripcion: '', precio: '', stock: '', activo: 1, categoria_id_fk: '', empresa_nit_fk: '', admin_ci_fk: '' })
            setEditando(false)
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditar = (producto) => {
        setForm(producto)
        setEditando(true)
    }

    const handleEliminar = async (cod) => {
        if (!confirm('¿Desactivar este producto?')) return
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/productos/${cod}`, { headers: { Authorization: `Bearer ${token}` } })
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='admin-page'>
            <h1>Gestión de productos</h1>
            <form onSubmit={handleSubmit} className='admin-form'>
                <input placeholder='Código' value={form.cod} onChange={(e) => setForm({ ...form, cod: e.target.value })} disabled={editando} />
                <input placeholder='Nombre' value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                <input placeholder='Tipo' value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} />
                <input placeholder='Material' value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} />
                <textarea placeholder='Descripción' value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
                <input type='number' placeholder='Precio' value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} />
                <input type='number' placeholder='Stock' value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                <select value={form.categoria_id_fk} onChange={(e) => setForm({ ...form, categoria_id_fk: e.target.value })}>
                    <option value=''>Seleccionar categoría</option>
                    {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
                </select>
                <select value={form.empresa_nit_fk} onChange={(e) => setForm({ ...form, empresa_nit_fk: e.target.value })}>
                    <option value=''>Seleccionar empresa</option>
                    {empresas.map(emp => <option key={emp.nit} value={emp.nit}>{emp.nombre}</option>)}
                </select>
                <button type='submit' className='btn-principal'>{editando ? 'Actualizar' : 'Agregar'}</button>
                {editando && <button type='button' onClick={() => { setEditando(false); setForm({ cod: '', nombre: '', tipo: '', material: '', descripcion: '', precio: '', stock: '', activo: 1, categoria_id_fk: '', empresa_nit_fk: '', admin_ci_fk: '' }) }}>Cancelar</button>}
            </form>
            <table className='admin-tabla'>
                <thead>
                    <tr>
                        <th>Código</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(p => (
                        <tr key={p.cod}>
                            <td>{p.cod}</td>
                            <td>{p.nombre}</td>
                            <td>Bs. {p.precio}</td>
                            <td>{p.stock}</td>
                            <td>{p.activo ? 'Activo' : 'Inactivo'}</td>
                            <td>
                                <button onClick={() => handleEditar(p)}>Editar</button>
                                <button onClick={() => handleEliminar(p.cod)}>Desactivar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminProductos