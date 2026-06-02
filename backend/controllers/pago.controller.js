import {obtenerPagos, ObtenerPagoPorId, crearPago, ActualizarPago, eliminarPago} from '../models/pago.model.js';

export const getPagos = async(req, res)=>{
    try {
        const pagos = await obtenerPagos();
        if(pagos.length === 0 ){
            return res.status(404).json({ error: 'No se encontraron pagos' });
        }
        res.status(200).json(pagos) ;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
}

export const getPagoPorId = async(req, res)=>{
    try {
        const { id } = req.params;
        const pago = await ObtenerPagoPorId(id);
        if (pago) {
            res.status(200).json(pago);
        } else {
            res.status(404).json({ error: 'Pago no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}