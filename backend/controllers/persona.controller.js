import { ObtenerPersonas, ObtenerPersonaPorCi, CrearPersona, ActualizarPersona, EliminarPersona } from '../models/persona.model.js'

export const getPersonas = async (req, res) => {
    try {
        const personas = await ObtenerPersonas()
        res.status(200).json(personas)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getPersonaPorCi = async (req, res) => {
    try {
        const { ci } = req.params
        const persona = await ObtenerPersonaPorCi(ci)
        if (!persona) {
            return res.status(404).json({ error: 'Persona no encontrada' })
        }
        res.status(200).json(persona)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const crearPe = async (req, res) => {
    try {
        const { ci, nombres, apellidos, email, password, rol } = req.body
        const nuevaPersona = await CrearPersona(ci, nombres, apellidos, email, password, rol)
        res.status(201).json(nuevaPersona)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const actualizarPe = async (req, res) => {
    try {
        const { ci } = req.params
        const { nombres, apellidos, email } = req.body
        const personaActualizada = await ActualizarPersona(ci, nombres, apellidos, email)
        res.status(200).json(personaActualizada)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const eliminarPe = async (req, res) => {
    try {
        const { ci } = req.params
        const personaEliminada = await EliminarPersona(ci)
        res.status(200).json(personaEliminada)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}