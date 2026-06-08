import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null)
    const [usuario, setUsuario] = useState(() => {
        const usuarioGuardado = localStorage.getItem('usuario')
        return usuarioGuardado ? JSON.parse(usuarioGuardado) : null
    })

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
        } else {
            localStorage.removeItem('token')
        }
    }, [token])

    useEffect(() => {
        if (usuario) {
            localStorage.setItem('usuario', JSON.stringify(usuario))
        } else {
            localStorage.removeItem('usuario')
        }
    }, [usuario])

    const guardarSesion = (token, usuario) => {
        setToken(token)
        setUsuario(usuario)
    }

    const cerrarSesion = () => {
        setToken(null)
        setUsuario(null)
    }

    return (
        <AuthContext.Provider value={{ token, usuario, guardarSesion, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext) 