import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api.js'

function Register() {
    const [ci, setCi] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rol, setRol] = useState('cliente')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [error, setError] = useState('')
    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setCargando(true)
        try {
            await api.post('/auth/register', {
                ci, nombres, apellidos, email, password, rol, direccion, telefono,
            })
            navigate('/login')
        } catch (error) {
            setError(error.response?.data?.error || 'Error al registrarse')
        } finally {
            setCargando(false)
        }
    }

    return (
        <div className='register-page'>
            <form onSubmit={handleSubmit}>
                <h1>Registrarse</h1>
                {error && <p className='error-mensaje'>{error}</p>}

                <input type='text' placeholder='CI...' value={ci} onChange={(e) => setCi(e.target.value)} />
                <input type='text' placeholder='Nombres...' value={nombres} onChange={(e) => setNombres(e.target.value)} />
                <input type='text' placeholder='Apellidos...' value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                <input type='email' placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Contraseña...' value={password} onChange={(e) => setPassword(e.target.value)} />

                {/* TODO: eliminar selector de rol antes de producción */}
                <select value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value='cliente'>Cliente</option>
                    <option value='administrador'>Administrador</option>
                </select>

                {rol === 'cliente' && (
                    <>
                        <input type='text' placeholder='Dirección...' value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                        <input type='text' placeholder='Teléfono...' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </>
                )}

                <button type='submit' className='btn-principal' disabled={cargando}>
                    {cargando ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>
        </div>
    )
}

export default Register