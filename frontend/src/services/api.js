/**
 * src/services/api.js
 *
 * Instancia centralizada de axios.
 * - baseURL tomada de VITE_API_URL (ya incluye /api)
 * - Interceptor de request: adjunta el token JWT automáticamente
 * - Interceptor de response: maneja 401 (sesión expirada) globalmente
 *
 * USO en cualquier componente:
 *   import api from '../services/api.js'
 *   const res = await api.get('/productos')
 *   const res = await api.post('/pedidos', data)
 *   // — sin necesidad de pasar headers ni token manualmente
 */

import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // http://localhost:5000/api
    timeout: 10000,                         // 10s máximo por request
    headers: {
        'Content-Type': 'application/json',
    },
})

// ── REQUEST: adjuntar token si existe ─────────────────────────────────────────
api.interceptors.request.use(
    (config) => {
        // Leer el token directo de localStorage para no depender de contexto React
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// ── RESPONSE: manejo global de errores ────────────────────────────────────────
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Error 401 detectado:', error.response?.data || error.message)
            alert('Sesión expirada o token inválido. Revisa consola para más detalles.')
            // Sesión expirada o token inválido → limpiar y redirigir al login
            localStorage.removeItem('token')
            localStorage.removeItem('usuario')
            // Evitar loop si ya estamos en /login
            if (window.location.pathname !== '/login') {
                window.location.href = '/login'
            }
        }
        // Re-lanzar el error para que cada componente pueda mostrar su propio mensaje
        return Promise.reject(error)
    }
)

export default api