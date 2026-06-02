import {getTransportes, getTransportePorId, crearT, actualizarT, eliminarT} from '../controllers/transporte.controller.js';
import {Router} from 'express';

const rutasTransporte = Router();

rutasTransporte.get('/', getTransportes);
rutasTransporte.get('/:id', getTransportePorId);
rutasTransporte.post('/', crearT);
rutasTransporte.put('/:id', actualizarT);
rutasTransporte.delete('/:id', eliminarT);

export default rutasTransporte;