import { getResenas, getResenaPorId, crearR, actualizarR, eliminarR } from '../controllers/resena.controller.js';
import { validarResena } from '../middlewares/resena.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { Router } from 'express';

const rutasResena = Router();

rutasResena.get('/', getResenas);
rutasResena.get('/:id', getResenaPorId);
rutasResena.post('/', validarResena, validarCampos, crearR);
rutasResena.put('/:id', validarResena, validarCampos, actualizarR);
rutasResena.delete('/:id', eliminarR);

export default rutasResena;