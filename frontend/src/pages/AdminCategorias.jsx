import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

function AdminCategorias() {
    const [categorias, setCategorias] = useState([])
    const [form, setForm] = useState({ nombre: '', descripcion: '' })
    const [editandoId, setEditandoId] = useState(null)
    const { token } = useAuth()

    const fetchCategorias = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/categorias`, { headers: { Authorization: `Bearer ${token}` } })
            setCategorias(res.data)
        } catch (error) { console.log(error) }
    }

    useEffect(() => { fetchCategorias() }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editandoId) {
                await axios.put(`${import.meta.env.VITE_API_URL}/categorias/${editandoId}`, form, { headers: { Authorization: `Bearer ${token}` } })
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/categorias`, form, { headers: { Authorization: `Bearer ${token}` } })
            }
            setForm({ nombre: '', descripcion: '' })
            setEditandoId(null)
            fetchCategorias()
        } catch (error) { console.log(error) }
    }

    const handleEliminar = async (id) => {
        if (!confirm('¿Eliminar categoría?')) return
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/categorias/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            fetchCategorias()
        } catch (error) { console.log(error) }
    }

    return (
        <div className='admin-page'>
            <h1>Gestión de categorías</h1>
            <form onSubmit={handleSubmit} className='admin-form'>
                <input placeholder='Nombre' value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                <textarea placeholder='Descripción' value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
                <button type='submit' className='btn-principal'>{editandoId ? 'Actualizar' : 'Agregar'}</button>
                {editandoId && <button type='button' onClick={() => { setEditandoId(null); setForm({ nombre: '', descripcion: '' }) }}>Cancelar</button>}
            </form>
            <table className='admin-tabla'>
                <thead>
                    <tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {categorias.map(cat => (
                        <tr key={cat.id}>
                            <td>{cat.id}</td><td>{cat.nombre}</td><td>{cat.descripcion}</td>
                            <td>
                                <button onClick={() => { setForm({ nombre: cat.nombre, descripcion: cat.descripcion }); setEditandoId(cat.id) }}>Editar</button>
                                <button onClick={() => handleEliminar(cat.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminCategorias