import { getPersonas, getPersonaPorCi, crearPe, actualizarPe, eliminarPe } from '../controllers/persona.controller.js';
import { validarPersona } from '../middlewares/persona.validator.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { Router } from 'express';

const rutasPersona = Router();

rutasPersona.get('/', getPersonas);
rutasPersona.get('/:ci', getPersonaPorCi);
rutasPersona.post('/', validarPersona, validarCampos, crearPe);
rutasPersona.put('/:ci', validarPersona, validarCampos, actualizarPe);
rutasPersona.delete('/:ci', eliminarPe);

export default rutasPersona;