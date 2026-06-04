import { registrar, login, logout } from '../models/auth.model.js'

export const register = async (req, res) => {
    try {
        const { ci, nombres, apellidos, email, password, rol, direccion, telefono } = req.body
        if (!ci || !nombres || !apellidos || !email || !password || !rol) {
            return res.status(400).json({ error: 'Los campos son obligatorios' })
        }
        const nuevoUsuario = await registrar(ci, nombres, apellidos, email, password, rol, direccion, telefono)
        res.status(201).json(nuevoUsuario)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const logearse = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: 'Los campos son obligatorios' })
        }
        const ip = req.ip
        const browser = req.headers['user-agent']
        const result = await login(email, password, ip, browser)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deslogearse = async (req, res) => {
    try {
        const { ci, email } = req.usuario
        const ip = req.ip
        const browser = req.headers['user-agent']
        await logout(ci, email, ip, browser)
        res.status(200).json({ message: 'Sesión cerrada correctamente' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}