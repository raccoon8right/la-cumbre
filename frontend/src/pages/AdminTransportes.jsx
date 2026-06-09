import { useState, useEffect } from 'react'
import api from '../services/api.js'

const TIPOS = ['terrestre', 'aéreo', 'fluvial', 'ferroviario']

const estadoInicial = { nombre: '', tipo: 'terrestre', confiabilidad: 5, peso: '', precio_envio: '' }

function AdminTransportes() {
    const [transportes, setTransportes] = useState([])
    const [form, setForm] = useState(estadoInicial)
    const [editandoId, setEditandoId] = useState(null)
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState('')
    const [exito, setExito] = useState('')

    const cargarTransportes = async () => {
        try {
            const res = await api.get('/transportes')
            setTransportes(Array.isArray(res.data) ? res.data : [])
        } catch {
            setError('No se pudieron cargar los transportes')
        }
    }

    useEffect(() => { cargarTransportes() }, [])

    const limpiarMensajes = () => { setError(''); setExito('') }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(f => ({ ...f, [name]: value }))
    }

    const validar = () => {
        if (!form.nombre.trim()) return 'El nombre es obligatorio'
        if (!form.NIT || form.NIT.trim() === '') return 'El NIT es obligatorio'
        if (!form.peso || isNaN(form.peso) || Number(form.peso) < 0)
            return 'Peso del transporte inválido'
        if (!form.precio_envio || isNaN(form.precio_envio) || Number(form.precio_envio) < 0)
            return 'Precio de envío inválido'
        const conf = Number(form.confiabilidad)
        if (isNaN(conf) || conf < 1 || conf > 5) return 'Confiabilidad debe ser entre 1 y 5'
        return null
    }

    const handleSubmit = async () => {
        limpiarMensajes()
        const err = validar()
        if (err) return setError(err)
        setCargando(true)
        try {
            const payload = {
                nombre: form.nombre.trim(),
                NIT: form.NIT,
                tipo: form.tipo,
                confiabilidad: Number(form.confiabilidad),
                peso: Number(form.peso),
                precio_envio: Number(form.precio_envio),
            }
            if (editandoId) {
                await api.put(`/transportes/${editandoId}`, payload)
                setExito('Transporte actualizado')
            } else {
                await api.post('/transportes', payload)
                setExito('Transporte creado')
            }
            setForm(estadoInicial)
            setEditandoId(null)
            await cargarTransportes()
        } catch (e) {
            setError(e.response?.data?.error || 'Error al guardar')
        } finally {
            setCargando(false)
        }
    }

    const handleEditar = (t) => {
        limpiarMensajes()
        setEditandoId(t.id)
        setForm({
            nombre: t.nombre,
            NIT: t.NIT,
            tipo: t.tipo,
            confiabilidad: t.confiabilidad,
            peso: t.peso,
            precio_envio: t.precio_envio,
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleCancelar = () => {
        limpiarMensajes()
        setEditandoId(null)
        setForm(estadoInicial)
    }

    const handleEliminar = async (id, nombre) => {
        if (!confirm(`¿Eliminar transporte "${nombre}"?`)) return
        limpiarMensajes()
        try {
            await api.delete(`/transportes/${id}`)
            setExito('Transporte eliminado')
            await cargarTransportes()
        } catch (e) {
            setError(e.response?.data?.error || 'Error al eliminar')
        }
    }

    return (
        <div className='admin-page'>
            <h1>{editandoId ? 'Editar Transporte' : 'Gestión de Transportes'}</h1>

            {error && <p className='error-mensaje'>{error}</p>}
            {exito && <p className='exito-mensaje'>{exito}</p>}

            <div className='admin-form'>
                <input name='nombre' type='text' placeholder='Nombre del transporte' value={form.nombre} onChange={handleChange} />
                <input name='NIT' type='text' placeholder='NIT del transporte' value={form.NIT || ''} onChange={handleChange} />
                <select name='tipo' value={form.tipo} onChange={handleChange}>
                    {TIPOS.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
                <input name='confiabilidad' type='number' placeholder='Confiabilidad (1–5)' min='1' max='5' step='0.1' value={form.confiabilidad} onChange={handleChange} />
                <input name='peso' type='number' placeholder='Peso soportado' min='0' value={form.peso} onChange={handleChange} />
                <input name='precio_envio' type='number' placeholder='Precio de envío (Bs.)' min='0' step='0.01' value={form.precio_envio} onChange={handleChange} />
                <div className='admin-form-acciones'>
                    <button onClick={handleSubmit} className='btn-principal' disabled={cargando}>
                        {cargando ? 'Guardando...' : editandoId ? 'Actualizar' : 'Crear transporte'}
                    </button>
                    {editandoId && (
                        <button onClick={handleCancelar} className='btn-secundario'>Cancelar</button>
                    )}
                </div>
            </div>

            <table className='admin-tabla'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>NIT</th>
                        <th>Tipo</th>
                        <th>Confiabilidad</th>
                        <th>Peso</th>
                        <th>Precio envío</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {transportes.length === 0 ? (
                        <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--neutro-medio)' }}>Sin transportes registrados</td></tr>
                    ) : transportes.map(t => (
                        <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.nombre}</td>
                            <td>{t.NIT}</td>
                            <td style={{ textTransform: 'capitalize'}}>{t.tipo}</td>
                            <td>⭐ {Number(t.confiabilidad).toFixed(1)}</td>
                            <td>{t.peso} Kg</td>
                            <td>Bs. {Number(t.precio_envio).toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleEditar(t)}>Editar</button>
                                <button onClick={() => handleEliminar(t.id, t.nombre)} className='btn-peligro'>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminTransportes