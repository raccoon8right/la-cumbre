import { getPagos, getPagoPorId, crearP, actualizarP, eliminarP } from '../controllers/pago.controller.js';
import { validarPago } from '../middlewares/pago.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { Router } from 'express';

const rutasPago = Router();

rutasPago.get('/', getPagos);
rutasPago.get('/:id', getPagoPorId);
rutasPago.post('/', validarPago, validarCampos, crearP);
rutasPago.put('/:id', validarPago, validarCampos, actualizarP);
rutasPago.delete('/:id', eliminarP);

export default rutasPago;