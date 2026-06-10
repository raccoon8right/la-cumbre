import { obtenerLlegan, obtenerLleganPorClaves, crearLlegan, eliminarLlegan } from '../models/llegan.model.js'
import { descontarStock } from '../models/producto.model.js'
import { obtenerDetallesPorPedido } from '../models/detallePedido.model.js'

export const getLlegan = async (req, res) => {
    try {
        const llegan = await obtenerLlegan()
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
        const detalles = await obtenerDetallesPorPedido(cod_pedido_fk)
        if (!detalles.length) {
            return res.status(400).json({ error: 'El pedido no tiene productos' })
        }
        const items = detalles.map(d => ({
            cod: d.producto_cod_fk,
            cantidad: d.cantidad
        }))
        await descontarStock(items)
        const nuevaLlegan = await crearLlegan(ci_fk, cod_pedido_fk, id_transporte_fk)
        res.status(201).json(nuevaLlegan)
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: error.message })
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