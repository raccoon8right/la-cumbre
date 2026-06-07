import { createContext, useState, useContext, Children } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [usuario, setUsuario] = useState(null)

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