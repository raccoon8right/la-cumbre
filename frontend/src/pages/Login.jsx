import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const captchaRef = useRef(null)
    const { guardarSesion } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const captchaToken = captchaRef.current.getValue()
        if (!captchaToken) {
            setError('Por favor completa el CAPTCHA')
            return
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                email, password, captchaToken
            })
            guardarSesion(response.data.token, response.data.usuario)
            navigate('/dashboard')
        } catch (error) {
            setError(error.response?.data?.error || 'Error al iniciar sesión')
        }
    }

    return (
        <>
            <h1>Iniciar sesión</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Contraseña...' value={password} onChange={(e) => setPassword(e.target.value)} />
                <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} ref={captchaRef} />
                <button type='submit'>Iniciar sesión</button>
            </form>
        </>
    )
}

export default Login