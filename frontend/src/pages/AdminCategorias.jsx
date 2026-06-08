import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

const FORM_VACIO = { nombre: '', descripcion: '' }
const headers = (token) => ({ headers: { Authorization: `Bearer ${token}` } })

function AdminCategorias() {
    const [categorias, setCategorias] = useState([])
    const [form, setForm] = useState(FORM_VACIO)
    const [editandoId, setEditandoId] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [guardando, setGuardando] = useState(false)
    const [error, setError] = useState('')
    const [exito, setExito] = useState('')
    const { token } = useAuth()

    const fetchCategorias = async () => {
        setError('')
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/categorias`, headers(token))
            setCategorias(res.data)
        } catch {
            setError('No se pudieron cargar las categorías')
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => { fetchCategorias() }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.nombre.trim()) return setError('El nombre es obligatorio')
        setGuardando(true)
        setError('')
        setExito('')
        try {
            if (editandoId) {
                await axios.put(`${import.meta.env.VITE_API_URL}/categorias/${editandoId}`, form, headers(token))
                setExito('Categoría actualizada correctamente')
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/categorias`, form, headers(token))
                setExito('Categoría agregada correctamente')
            }
            setForm(FORM_VACIO)
            setEditandoId(null)
            fetchCategorias()
        } catch (e) {
            setError(e.response?.data?.error || 'Error al guardar la categoría')
        } finally {
            setGuardando(false)
        }
    }

    const handleEliminar = async (id) => {
        if (!confirm('¿Eliminar categoría?')) return
        setError('')
        setExito('')
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/categorias/${id}`, headers(token))
            setExito('Categoría eliminada')
            fetchCategorias()
        } catch (e) {
            setError(e.response?.data?.error || 'Error al eliminar la categoría')
        }
    }

    const handleCancelar = () => {
        setEditandoId(null)
        setForm(FORM_VACIO)
        setError('')
        setExito('')
    }

    return (
        <div className='admin-page'>
            <h1>Gestión de categorías</h1>

            {error && <p className='error-mensaje'>{error}</p>}
            {exito && <p style={{ color: 'var(--color-exito)', marginBottom: '1rem' }}>{exito}</p>}

            <form onSubmit={handleSubmit} className='admin-form'>
                <input
                    placeholder='Nombre'
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                />
                <textarea
                    placeholder='Descripción'
                    value={form.descripcion}
                    onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                />
                <button type='submit' className='btn-principal' disabled={guardando}>
                    {guardando ? 'Guardando...' : editandoId ? 'Actualizar' : 'Agregar'}
                </button>
                {editandoId && (
                    <button type='button' onClick={handleCancelar}>Cancelar</button>
                )}
            </form>

            {cargando ? (
                <p>Cargando categorías...</p>
            ) : (
                <table className='admin-tabla'>
                    <thead>
                        <tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr>
                    </thead>
                    <tbody>
                        {categorias.map(cat => (
                            <tr key={cat.id}>
                                <td>{cat.id}</td>
                                <td>{cat.nombre}</td>
                                <td>{cat.descripcion}</td>
                                <td>
                                    <button onClick={() => { setForm({ nombre: cat.nombre, descripcion: cat.descripcion }); setEditandoId(cat.id); setError(''); setExito('') }}>Editar</button>
                                    <button onClick={() => handleEliminar(cat.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AdminCategorias