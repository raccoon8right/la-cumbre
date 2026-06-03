import { registrar, login } from '../models/auth.model.js'

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
        const result = await login(email, password)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}