import { obtenerPedidos, obtenerPedidosPorCliente, obtenerPedidoPorCod, crearPedido, modificarPedidoPorCod, eliminarPedidoPorCod } from '../models/pedido.model.js'

export const getPedido = async (req, res) => {
    try {
        const pedidos = await obtenerPedidos()
        res.status(200).json(pedidos)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los pedidos' })
    }
}

export const getPedidosPorCliente = async (req, res) => {
    try {
        const { ci } = req.params
        const pedidos = await obtenerPedidosPorCliente(ci)
        res.status(200).json(pedidos)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getPedidoPorCod = async (req, res) => {
    try {
        const { cod } = req.params
        const pedido = await obtenerPedidoPorCod(cod)
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' })
        }
        res.status(200).json(pedido)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el pedido' })
    }
}

export const postPedido = async (req, res) => {
    try {
        const { cod, estado, direccion_entrega, total } = req.body
        if (!cod || !estado || !direccion_entrega || !total) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' })
        }
        const nuevoPedido = await crearPedido(cod, estado, direccion_entrega, total)
        res.status(201).json(nuevoPedido)
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el pedido' })
    }
}

export const putPedidoPorCod = async (req, res) => {
    try {
        const { cod } = req.params
        const { estado, direccion_entrega, total } = req.body
        if (!cod || !estado || !direccion_entrega || !total) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' })
        }
        const pedidoModificado = await modificarPedidoPorCod(cod, estado, direccion_entrega, total)
        res.status(200).json(pedidoModificado)
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar el pedido' })
    }
}

export const deletePedidoPorCod = async (req, res) => {
    try {
        const { cod } = req.params
        const pedidoEliminado = await eliminarPedidoPorCod(cod)
        if (!pedidoEliminado) {
            return res.status(404).json({ error: 'Pedido no encontrado' })
        }
        res.status(200).json(pedidoEliminado)
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el pedido' })
    }
}