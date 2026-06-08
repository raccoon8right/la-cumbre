import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../services/api.js'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [cargando, setCargando] = useState(false)
    const captchaRef = useRef(null)
    const { guardarSesion } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const captchaToken = captchaRef.current.getValue()
        if (!captchaToken) return setError('Por favor completa el CAPTCHA')

        setCargando(true)
        try {
            const response = await api.post('/auth/login', { email, password, captchaToken })
            guardarSesion(response.data.token, response.data.usuario)
            navigate('/dashboard')
        } catch (error) {
            setError(error.response?.data?.error || 'Error al iniciar sesión')
            captchaRef.current.reset()
        } finally {
            setCargando(false)
        }
    }

    return (
        <div className='login-page'>
            <form onSubmit={handleSubmit}>
                <h1>Iniciar sesión</h1>
                {error && <p className='error-mensaje'>{error}</p>}
                <input type='email' placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} disabled={cargando} />
                <input type='password' placeholder='Contraseña...' value={password} onChange={(e) => setPassword(e.target.value)} disabled={cargando} />
                <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} ref={captchaRef} />
                <button type='submit' className='btn-principal' disabled={cargando}>
                    {cargando ? 'Ingresando...' : 'Iniciar sesión'}
                </button>
            </form>
        </div>
    )
}

export default Login