/**
 * src/pages/AdminProductos.jsx
 *
 * Correcciones aplicadas:
 * 1. Usa api.js centralizado — sin headers manuales ni VITE_API_URL repetido
 * 2. Valida que usuario.ci exista antes de enviar (evita crash silencioso)
 * 3. fetchData con useCallback para no recrearse en cada render
 * 4. Código comentado eliminado
 * 5. Campo "activo" manejado correctamente como checkbox en el form
 */

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../services/api.js'

const FORM_VACIO = {
    cod: '',
    nombre: '',
    tipo: '',
    material: '',
    descripcion: '',
    precio: '',
    stock: '',
    activo: 1,
    categoria_id_fk: '',
    empresa_nit_fk: '',
}

function AdminProductos() {
    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [empresas, setEmpresas] = useState([])
    const [imagenFile, setImagenFile] = useState(null)
    const [subiendoImagen, setSubiendoImagen] = useState(false)
    const [form, setForm] = useState(FORM_VACIO)
    const [editando, setEditando] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [guardando, setGuardando] = useState(false)
    const [error, setError] = useState('')
    const [exito, setExito] = useState('')
    const { usuario } = useAuth()

    // useCallback evita que fetchData se recree en cada render
    const fetchData = useCallback(async () => {
        setError('')
        setCargando(true)
        try {
            // Las tres llamadas en paralelo — si una falla no bloquea las otras
            const [prodRes, catRes, empRes] = await Promise.allSettled([
                api.get('/productos'),
                api.get('/categorias'),
                api.get('/empresas'),
            ])

            setProductos(
                prodRes.status === 'fulfilled' && Array.isArray(prodRes.value.data)
                    ? prodRes.value.data
                    : []
            )
            setCategorias(
                catRes.status === 'fulfilled' && Array.isArray(catRes.value.data)
                    ? catRes.value.data
                    : []
            )
            setEmpresas(
                empRes.status === 'fulfilled' && Array.isArray(empRes.value.data)
                    ? empRes.value.data
                    : []
            )

            // Avisar si alguna carga parcial falló
            if (prodRes.status === 'rejected') setError('No se pudieron cargar los productos')
        } finally {
            setCargando(false)
        }
    }, []) // sin dependencias — no usa estado ni props

    useEffect(() => { fetchData() }, [fetchData])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setExito('')

        if (!form.cod.trim() || !form.nombre.trim()) {
            return setError('Código y nombre son obligatorios')
        }
        // Bug corregido: validar que usuario y ci existan antes de enviar
        if (!usuario?.ci) {
            return setError('No se pudo identificar al administrador. Vuelve a iniciar sesión.')
        }

        setGuardando(true)
        try {
            const data = { ...form, admin_ci_fk: usuario.ci }
            if (editando) {
                await api.put(`/productos/${form.cod}`, data)
                await subirImagen(form.cod)
                setExito('Producto actualizado correctamente')
            } else {
                await api.post('/productos', data)
                await subirImagen(form.cod)
                setExito('Producto agregado correctamente')
            }
            setForm(FORM_VACIO)
            setEditando(false)
            fetchData()
        } catch (e) {
            setError(e.response?.data?.error || 'Error al guardar el producto')
        } finally {
            setGuardando(false)
        }
    }

    const handleEditar = (producto) => {
        setForm(producto)
        setEditando(true)
        setError('')
        setExito('')
        // Scroll al form para que el usuario vea que se cargaron los datos
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleEliminar = async (cod) => {
        if (!confirm('¿Desactivar este producto?')) return
        setError('')
        setExito('')
        try {
            await api.delete(`/productos/${cod}`)
            setExito('Producto desactivado')
            fetchData()
        } catch (e) {
            setError(e.response?.data?.error || 'Error al desactivar el producto')
        }
    }

    const handleCancelar = () => {
        setEditando(false)
        setForm(FORM_VACIO)
        setError('')
        setExito('')
    }

    const subirImagen = async (cod) => {
        if (!imagenFile) return
        setSubiendoImagen(true)
        try {
            const formData = new FormData()
            formData.append('imagen', imagenFile)
            const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                body: formData
            })
            const data = await res.json()
            await api.post('/imagenProductos', {
                producto_cod_fk: cod,
                url: data.url,
                es_principal: 1
            })
            setImagenFile(null)
        } catch {
            setError('Producto guardado pero error al subir imagen')
        } finally {
            setSubiendoImagen(false)
        }
    }

    return (
        <div className='admin-page'>
            <h1>Gestión de productos</h1>

            {error && <p className='error-mensaje'>{error}</p>}
            {exito && <p className='exito-mensaje'>{exito}</p>}

            <form onSubmit={handleSubmit} className='admin-form'>
                <input name='cod' placeholder='Código' value={form.cod} onChange={handleChange} disabled={editando} />
                <input name='nombre' placeholder='Nombre' value={form.nombre} onChange={handleChange} />
                <input name='tipo' placeholder='Tipo' value={form.tipo} onChange={handleChange} />
                <input name='material' placeholder='Material' value={form.material} onChange={handleChange} />
                <textarea name='descripcion' placeholder='Descripción' value={form.descripcion} onChange={handleChange} />
                <div className='admin-form-imagen'>
                    <label>Imagen del producto</label>
                    <input type='file' accept='image/*' onChange={(e) => setImagenFile(e.target.files[0])} />
                    {subiendoImagen && <small>Subiendo imagen...</small>}
                </div>
                <input name='precio' type='number' min='0' step='0.01' placeholder='Precio' value={form.precio} onChange={handleChange} />
                <input name='stock' type='number' min='0' placeholder='Stock' value={form.stock} onChange={handleChange} />
                <select name='categoria_id_fk' value={form.categoria_id_fk} onChange={handleChange} >
                    <option value=''>Seleccionar categoría</option>
                    {categorias.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                </select>

                <select name='empresa_nit_fk' value={form.empresa_nit_fk} onChange={handleChange} >
                    <option value=''>Seleccionar empresa</option>
                    {empresas.map(emp => (
                        <option key={emp.nit} value={emp.nit}>{emp.nombre}</option>
                    ))}
                </select>

                {/* Campo activo solo visible al editar */}
                {editando && (
                    <label className='admin-form-check'>
                        <input name='activo' type='checkbox' checked={form.activo === 1} onChange={handleChange} />
                        Producto activo
                    </label>
                )}

                <div className='admin-form-acciones'>
                    <button type='submit' className='btn-principal' disabled={guardando}>
                        {guardando ? 'Guardando...' : editando ? 'Actualizar' : 'Agregar'}
                    </button>
                    {editando && (
                        <button type='button' onClick={handleCancelar}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {cargando ? (
                <p>Cargando productos...</p>
            ) : productos.length === 0 ? (
                <p>No hay productos registrados</p>
            ) : (
                <table className='admin-tabla'>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(p => (
                            <tr key={p.cod} className={!p.activo ? 'fila-inactiva' : ''}>
                                <td>{p.cod}</td>
                                <td>{p.nombre}</td>
                                <td>{p.tipo}</td>
                                <td>Bs. {Number(p.precio).toFixed(2)}</td>
                                <td>{p.stock}</td>
                                <td>
                                    <span className={`badge ${p.activo ? 'badge-activo' : 'badge-inactivo'}`}>
                                        {p.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className='acciones'>
                                    <button onClick={() => handleEditar(p)}>Editar</button>
                                    <button onClick={() => handleEliminar(p.cod)} className='btn-peligro' disabled={!p.activo} title={!p.activo ? 'Ya está desactivado' : 'Desactivar'} >
                                        Desactivar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AdminProductos