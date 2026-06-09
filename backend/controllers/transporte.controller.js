import { obtenerTransportes, obtenerTransportePorId, crearTransporte, modificarTransporte, eliminarTransporte } from '../models/transporte.model.js';

export const getTransportes = async (req, res) => {
    try {
        const transportes = await obtenerTransportes();
        res.status(200).json(transportes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getTransportePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const transporte = await obtenerTransportePorId(id);
        if (!transporte) {
            return res.status(404).json({ error: 'Transporte no encontrado' });
        }
        res.status(200).json(transporte);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const crearT = async (req, res) => {
    try {
        const transporte = req.body;
        const id = await crearTransporte(transporte);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarT = async (req, res) => {
    try {
        const { id } = req.params;
        const transporte = req.body;
        const transporteP = await obtenerTransportePorId(id);
        if (!transporteP) {
            return res.status(404).json({ error: 'Transporte no encontrado' });
        }
        await modificarTransporte(id, transporte);
        res.status(200).json({ message: 'Transporte actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarT = async (req, res) => {
    try {
        const { id } = req.params;
        const transporte = await obtenerTransportePorId(id);
        if (!transporte) {
            return res.status(404).json({ error: 'Transporte no encontrado' });
        }
        await eliminarTransporte(id);
        res.status(200).json({ message: 'Transporte eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}