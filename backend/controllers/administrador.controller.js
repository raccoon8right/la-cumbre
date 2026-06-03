import { ObtenerAdministradores, ObtenerAdministradorPorCi, CrearAdministrador, EliminarAdministrador } from '../models/administrador.model.js'

export const getAdministradores = async (req, res) => {
    try {
        const administradores = await ObtenerAdministradores()
        if (administradores.length === 0) {
            return res.status(404).json({ error: 'No se encontraron administradores' })
        }
        res.status(200).json(administradores)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getAdministradorPorCi = async (req, res) => {
    try {
        const { ci } = req.params
        const administrador = await ObtenerAdministradorPorCi(ci)
        if (!administrador) {
            return res.status(404).json({ error: 'Administrador no encontrado' })
        }
        res.status(200).json(administrador)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const crearA = async (req, res) => {
    try {
        const { ci_fk } = req.body
        const nuevoAdmin = await CrearAdministrador(ci_fk)
        res.status(201).json(nuevoAdmin)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const eliminarA = async (req, res) => {
    try {
        const { ci } = req.params
        const adminEliminado = await EliminarAdministrador(ci)
        res.status(200).json(adminEliminado)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}