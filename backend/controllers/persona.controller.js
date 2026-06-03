import { ObtenerPersonas, ObtenerPersonaPorCi, CrearPersona, ActualizarPersona, EliminarPersona } from '../models/persona.model.js';

export const getPersonas = async (req, res) => {
    try {
        const personas = await ObtenerPersonas();

        if (personas.length === 0) {
            return res.status(404).json({ error: 'No se encontraron personas' });
        }

        res.status(200).json(personas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getPersonaPorCi = async (req, res) => {
    try {
        const { ci } = req.params;

        const persona = await ObtenerPersonaPorCi(ci);

        if (!persona)
            return res.status(404).json({ error: 'Persona no encontrada' });

        res.status(200).json(persona);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const crearPe = async (req, res) => {
    try {
        const persona = req.body;

        const id = await CrearPersona(persona);

        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarPe = async (req, res) => {
    try {
        const { ci } = req.params;

        const persona = req.body;

        const personaP = await ObtenerPersonaPorCi(ci);

        if (!personaP) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }

        await ActualizarPersona(persona);

        res.status(200).json({ message: 'Persona actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarPe = async (req, res) => {
    try {
        const { ci } = req.params;

        const persona = await ObtenerPersonaPorCi(ci);

        if (!persona)
            return res.status(404).json({ error: 'Persona no encontrada' });

        await EliminarPersona({ ci });

        res.status(200).json({ message: 'Persona eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}