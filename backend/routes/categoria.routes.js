import { getCategorias, getCategoriaPorId, crearCa, actualizarCa, eliminarCa } from '../controllers/categoria.controller.js';
import { validarCategoria } from '../middlewares/categoria.validator.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { Router } from 'express';

const rutasCategoria = Router();

rutasCategoria.get('/', getCategorias);
rutasCategoria.get('/:id', getCategoriaPorId);
rutasCategoria.post('/', validarCategoria, validarCampos, crearCa);
rutasCategoria.put('/:id', validarCategoria, validarCampos, actualizarCa);
rutasCategoria.delete('/:id', eliminarCa);

export default rutasCategoria;