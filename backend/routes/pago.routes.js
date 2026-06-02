import {getPagos, getPagoPorId, crearP, actualizarP, eliminarP} from '../controllers/pago.controller.js';
import {Router} from 'express';

const rutasPago = Router();

rutasPago.get('/', getPagos);
rutasPago.get('/:id', getPagoPorId);
rutasPago.post('/', crearP);
rutasPago.put('/:id', actualizarP);
rutasPago.delete('/:id', eliminarP);

export default rutasPago;