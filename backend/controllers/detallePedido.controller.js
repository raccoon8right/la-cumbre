import { ObtenerDetallePedidos, ObtenerDetallePedidoPorId, CrearDetallePedido, ActualizarDetallePedido, EliminarDetallePedido } from '../models/detallePedido.model.js';

export const getDetallePedidos = async (req, res) => {
    try {
        const detallePedidos = await ObtenerDetallePedidos();
        res.status(200).json(detallePedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getDetallePedidoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const detallePedido = await ObtenerDetallePedidoPorId(id);
        if (!detallePedido) return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
        res.status(200).json(detallePedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const crearD = async (req, res) => {
    try {
        const detallePedido = req.body;
        const id = await CrearDetallePedido(detallePedido);
        res.status(201).json({ id });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarD = async (req, res) => {
    try {
        const { id } = req.params;
        const detallePedido = req.body;
        const detallePedidoP = await ObtenerDetallePedidoPorId(id);
        if (!detallePedidoP) {
            return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
        }
        await ActualizarDetallePedido(id, detallePedido);
        res.status(200).json({ message: 'Detalle de pedido actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const eliminarD = async (req, res) => {
    try {
        const { id } = req.params;
        const detallePedido = await ObtenerDetallePedidoPorId(id);
        if (!detallePedido) return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
        await EliminarDetallePedido(id);
        res.status(200).json({ message: 'Detalle de pedido eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}