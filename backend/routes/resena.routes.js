import {getResenas, getResenaPorId, crearR, actualizarR, eliminarR} from '../controllers/resena.controller.js';
import {Router} from 'express';

const rutasResena = Router();

rutasResena.get('/', getResenas);
rutasResena.get('/:id', getResenaPorId);
rutasResena.post('/', crearR);
rutasResena.put('/:id', actualizarR);
rutasResena.delete('/:id', eliminarR);

export default rutasResena;