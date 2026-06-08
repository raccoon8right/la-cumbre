import { useState, useEffect, useCallback } from 'react'
import api from '../services/api.js'

const FORM_VACIO = { nit: '', nombre: '', direccion: '', telefono: '', facebook: '', ciudad: '' }

function AdminEmpresas() {
    const [empresas, setEmpresas] = useState([])
    const [form, setForm] = useState(FORM_VACIO)
    const [editando, setEditando] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [guardando, setGuardando] = useState(false)
    const [error, setError] = useState('')
    const [exito, setExito] = useState('')

    const fetchEmpresas = useCallback(async () => {
        setError('')
        try {
            const res = await api.get('/empresas')
            setEmpresas(res.data)
        } catch {
            setError('No se pudieron cargar las empresas')
        } finally {
            setCargando(false)
        }
    }, [])

    useEffect(() => { fetchEmpresas() }, [fetchEmpresas])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.nit.trim() || !form.nombre.trim()) return setError('NIT y nombre son obligatorios')
        setGuardando(true)
        setError('')
        setExito('')
        try {
            if (editando) {
                await api.put(`/empresas/${form.nit}`, form)
                setExito('Empresa actualizada correctamente')
            } else {
                await api.post('/empresas', form)
                setExito('Empresa agregada correctamente')
            }
            setForm(FORM_VACIO)
            setEditando(false)
            fetchEmpresas()
        } catch (e) {
            setError(e.response?.data?.error || 'Error al guardar la empresa')
        } finally {
            setGuardando(false)
        }
    }

    const handleEliminar = async (nit) => {
        if (!confirm('¿Eliminar empresa?')) return
        setError('')
        setExito('')
        try {
            await api.delete(`/empresas/${nit}`)
            setExito('Empresa eliminada')
            fetchEmpresas()
        } catch (e) {
            setError(e.response?.data?.error || 'Error al eliminar la empresa')
        }
    }

    const handleEditar = (empresa) => {
        setForm(empresa)
        setEditando(true)
        setError('')
        setExito('')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleCancelar = () => {
        setEditando(false)
        setForm(FORM_VACIO)
        setError('')
        setExito('')
    }

    return (
        <div className='admin-page'>
            <h1>Gestión de empresas</h1>

            {error && <p className='error-mensaje'>{error}</p>}
            {exito && <p className='exito-mensaje'>{exito}</p>}

            <form onSubmit={handleSubmit} className='admin-form'>
                <input placeholder='NIT' value={form.nit} onChange={(e) => setForm({ ...form, nit: e.target.value })} disabled={editando} />
                <input placeholder='Nombre' value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                <input placeholder='Dirección' value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} />
                <input placeholder='Teléfono' value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
                <input placeholder='Facebook' value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} />
                <input placeholder='Ciudad' value={form.ciudad} onChange={(e) => setForm({ ...form, ciudad: e.target.value })} />
                <div className='admin-form-acciones'>
                    <button type='submit' className='btn-principal' disabled={guardando}>
                        {guardando ? 'Guardando...' : editando ? 'Actualizar' : 'Agregar'}
                    </button>
                    {editando && <button type='button' onClick={handleCancelar}>Cancelar</button>}
                </div>
            </form>

            {cargando ? (
                <p>Cargando empresas...</p>
            ) : empresas.length === 0 ? (
                <p>No hay empresas registradas</p>
            ) : (
                <table className='admin-tabla'>
                    <thead>
                        <tr><th>NIT</th><th>Nombre</th><th>Ciudad</th><th>Teléfono</th><th>Facebook</th><th>Acciones</th></tr>
                    </thead>
                    <tbody>
                        {empresas.map(e => (
                            <tr key={e.nit}>
                                <td>{e.nit}</td>
                                <td>{e.nombre}</td>
                                <td>{e.ciudad}</td>
                                <td>{e.telefono}</td>
                                <td>{e.facebook}</td>
                                <td className='acciones'>
                                    <button onClick={() => handleEditar(e)}>Editar</button>
                                    <button className='btn-peligro' onClick={() => handleEliminar(e.nit)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AdminEmpresas