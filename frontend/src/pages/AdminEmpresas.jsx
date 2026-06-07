import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

function AdminEmpresas() {
    const [empresas, setEmpresas] = useState([])
    const [form, setForm] = useState({ nit: '', nombre: '', direccion: '', telefono: '', facebook: '', ciudad: '' })
    const [editando, setEditando] = useState(false)
    const { token } = useAuth()

    const fetchEmpresas = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/empresas`, { headers: { Authorization: `Bearer ${token}` } })
            setEmpresas(res.data)
        } catch (error) { console.log(error) }
    }

    useEffect(() => { fetchEmpresas() }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editando) {
                await axios.put(`${import.meta.env.VITE_API_URL}/empresas/${form.nit}`, form, { headers: { Authorization: `Bearer ${token}` } })
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/empresas`, form, { headers: { Authorization: `Bearer ${token}` } })
            }
            setForm({ nit: '', nombre: '', direccion: '', telefono: '', facebook: '', ciudad: '' })
            setEditando(false)
            fetchEmpresas()
        } catch (error) { console.log(error) }
    }

    const handleEliminar = async (nit) => {
        if (!confirm('¿Eliminar empresa?')) return
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/empresas/${nit}`, { headers: { Authorization: `Bearer ${token}` } })
            fetchEmpresas()
        } catch (error) { console.log(error) }
    }

    return (
        <div className='admin-page'>
            <h1>Gestión de empresas</h1>
            <form onSubmit={handleSubmit} className='admin-form'>
                <input placeholder='NIT' value={form.nit} onChange={(e) => setForm({ ...form, nit: e.target.value })} disabled={editando} />
                <input placeholder='Nombre' value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                <input placeholder='Dirección' value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} />
                <input placeholder='Teléfono' value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
                <input placeholder='Facebook' value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} />
                <input placeholder='Ciudad' value={form.ciudad} onChange={(e) => setForm({ ...form, ciudad: e.target.value })} />
                <button type='submit' className='btn-principal'>{editando ? 'Actualizar' : 'Agregar'}</button>
                {editando && <button type='button' onClick={() => { setEditando(false); setForm({ nit: '', nombre: '', direccion: '', telefono: '', facebook: '', ciudad: '' }) }}>Cancelar</button>}
            </form>
            <table className='admin-tabla'>
                <thead>
                    <tr><th>NIT</th><th>Nombre</th><th>Ciudad</th><th>Teléfono</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {empresas.map(e => (
                        <tr key={e.nit}>
                            <td>{e.nit}</td><td>{e.nombre}</td><td>{e.ciudad}</td><td>{e.telefono}</td>
                            <td>
                                <button onClick={() => { setForm(e); setEditando(true) }}>Editar</button>
                                <button onClick={() => handleEliminar(e.nit)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminEmpresas