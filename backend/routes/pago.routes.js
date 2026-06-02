import {getPagos} from '../controllers/pago.controller.js';
import {Router} from 'express';

const rutasPago = Router();

rutasPago.get('/pagos', getPagos);
