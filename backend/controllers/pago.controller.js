import {ObtenerPagos, ObtenerPagoPorId, CrearPago, ActualizarPago, EliminarPago} from '../models/pago.model.js';

export const getPagos = async(req, res)=>{
    try {
        const pagos = await ObtenerPagos();
        res.status(200).json(pagos) ;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
}

export const getPagoPorId = async(req, res)=>{
    try {
        const { id } = req.params.id;
        const pago = await ObtenerPagoPorId(id);
        if(!pago)
            return res.status(404).json({ error: 'Pago no encontrado' });
        res.status(200).json(pago);
    }   
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const crearP = async(req, res)=>{
    try {
        const pago = req.body.body;
        const id = await CrearPago(pago);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarP = async(req, res)=>{
    try {
        const { id } = req.params;  
        const pago = req.body;
        const pagoP = await ObtenerPagoPorId(id);
        if(!pagoP){
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        await ActualizarPago(id, pago);
        res.status(200).json({ message: 'Pago actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarP = async(req, res)=>{
    try {
        const { id } = req.params;
        const pago = await ObtenerPagoPorId(id);
        if(!pago)
            return res.status(404).json({ error: 'Pago no encontrado' });
        res.status(200).json({ message: 'Pago eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
