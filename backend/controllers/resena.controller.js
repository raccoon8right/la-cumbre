import {ObtenerResenas, ObtenerResenaPorId, CrearResena, ActualizarResena, EliminarResena} from '../models/resena.model.js'

export const getResenas = async(req, res)=>{
    try {
        const resenas = await ObtenerResenas();
        res.status(200).json(resenas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
}

export const getResenaPorId = async(req, res)=>{
    try {
        const { id } = req.params;
        const resena = await ObtenerResenaPorId(id);
        if(!resena){
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        res.status(200).json(resena);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const crearR = async(req, res)=>{
    try {
        const resena = req.body;
        const id = await CrearResena(resena);
        res.status(201).json({ id });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarR = async(req, res)=>{
    try {
        const { id } = req.params;
        const resena = req.body;
        const resenaP = await ObtenerResenaPorId(id);
        if(!resenaP){
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        await ActualizarResena(id, resena);
        res.status(200).json({ message: 'Reseña actualizada correctamente' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarR = async(req, res)=>{
    try {
        const { id } = req.params;
        const resena = await ObtenerResenaPorId(id);
        if(!resena){
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        await EliminarResena(id);
        res.status(200).json({ message: 'Reseña eliminada correctamente' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}