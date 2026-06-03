import { ObtenerAdministradores, ObtenerAdministradorPorCi, CrearAdministrador, ActualizarAdministrador, EliminarAdministrador } from '../models/administrador.model.js';

export const getAdministradores = async (req, res) => {
    try {
        const administradores = await ObtenerAdministradores();

        if (administradores.length === 0) {
            return res.status(404).json({ error: 'No se encontraron administradores' });
        }

        res.status(200).json(administradores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAdministradorPorCi = async (req, res) => {
    try {
        const { ci } = req.params;

        const administrador = await ObtenerAdministradorPorCi(ci);

        if (!administrador)
            return res.status(404).json({ error: 'Administrador no encontrado' });

        res.status(200).json(administrador);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const crearA = async (req, res) => {
    try {
        const administrador = req.body;

        const id = await CrearAdministrador(administrador);

        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarA = async (req, res) => {
    try {
        const { ci } = req.params;

        const administrador = req.body;

        const administradorP = await ObtenerAdministradorPorCi(ci);

        if (!administradorP) {
            return res.status(404).json({ error: 'Administrador no encontrado' });
        }

        await ActualizarAdministrador(administrador);

        res.status(200).json({ message: 'Administrador actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarA = async (req, res) => {
    try {
        const { ci } = req.params;

        const administrador = await ObtenerAdministradorPorCi(ci);

        if (!administrador)
            return res.status(404).json({ error: 'Administrador no encontrado' });

        await EliminarAdministrador({ ci_fk: ci });

        res.status(200).json({ message: 'Administrador eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}