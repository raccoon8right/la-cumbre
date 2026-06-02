import {getPagos} from '../controllers/pago.controller.js';
import {Router} from 'express';

const rutasPago = Router();

rutasPago.get('/', getPagos);
rutasPago.get('/test', (req, res) => {
    res.json({ ok: true });
});

export default rutasPago;