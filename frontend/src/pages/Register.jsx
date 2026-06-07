import { useState, useRef } from 'react'
import axios from 'axios'

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
                ci, nombres, apellidos, email, password, rol, direccion, telefono
            })
            console.log(response.data)
        } catch (error) {
            setError(error.response?.data?.error || 'Error al registrarse')
        }
    }

    return (
        <>
            <h1>Registrarse</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='CI...' value={ci} onChange={(e) => setCi(e.target.value)} />
                <input type='text' placeholder='Nombres...' value={nombres} onChange={(e) => setNombres(e.target.value)} />
                <input type='text' placeholder='Apellidos...' value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                <input type='email' placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Contraseña...' value={password} onChange={(e) => setPassword(e.target.value)} />
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
                <button type='submit'>Registrarse</button>
            </form>
        </>
    )
}

export default Register