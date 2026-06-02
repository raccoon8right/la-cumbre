import { obtenerLlegan, obtenerLleganPorClaves, crearLlegan, eliminarLlegan } from '../models/llegan.model.js'

export const getLlegan = async (req, res) => {
    try {
        const llegan = await obtenerLlegan()
        if (llegan.length === 0) {
            return res.status(404).json({ error: 'No se encontraron relaciones llegan' })
        }
        res.status(200).json(llegan)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las relaciones llegan' })
    }
}

export const getLleganPorClaves = async (req, res) => {
    try {
        const { ci_fk, cod_pedido_fk, id_transporte_fk } = req.params
        const llegan = await obtenerLleganPorClaves(ci_fk, cod_pedido_fk, id_transporte_fk)
        if (!llegan) {
            return res.status(404).json({ error: 'Relación llegan no encontrada' })
        }
        res.status(200).json(llegan)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la relación llegan' })
    }
}

export const postLlegan = async (req, res) => {
    try {
        const { ci_fk, cod_pedido_fk, id_transporte_fk } = req.body
        if (!ci_fk || !cod_pedido_fk || !id_transporte_fk) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' })
        }
        const nuevaLlegan = await crearLlegan(ci_fk, cod_pedido_fk, id_transporte_fk)
        res.status(201).json(nuevaLlegan)
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la relación llegan' })
    }
}

export const deleteLlegan = async (req, res) => {
    try {
        const { ci_fk, cod_pedido_fk, id_transporte_fk } = req.params
        const lleganEliminada = await eliminarLlegan(ci_fk, cod_pedido_fk, id_transporte_fk)
        if (!lleganEliminada) {
            return res.status(404).json({ error: 'Relación llegan no encontrada' })
        }
        res.status(200).json(lleganEliminada)
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la relación llegan' })
    }
}