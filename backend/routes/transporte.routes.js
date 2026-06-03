import { getTransportes, getTransportePorId, crearT, actualizarT, eliminarT } from '../controllers/transporte.controller.js';
import { validarTransporte } from '../middlewares/transporte.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { Router } from 'express';

const rutasTransporte = Router();

rutasTransporte.get('/', getTransportes);
rutasTransporte.get('/:id', getTransportePorId);
rutasTransporte.post('/', validarTransporte, validarCampos, crearT);
rutasTransporte.put('/:id', validarTransporte, validarCampos, actualizarT);
rutasTransporte.delete('/:id', eliminarT);

export default rutasTransporte;