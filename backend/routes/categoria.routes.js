import { getCategorias, getCategoriaPorId, crearCa, actualizarCa, eliminarCa } from '../controllers/categoria.controller.js'
import { validarCategoria } from '../middlewares/categoria.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js'
import { Router } from 'express';

const rutasCategoria = Router();

rutasCategoria.get('/', verificarToken, getCategorias)
rutasCategoria.get('/:id', verificarToken, getCategoriaPorId)
rutasCategoria.post('/', verificarToken, verificarRol('administrador'), validarCategoria, validarCampos, crearCa)
rutasCategoria.put('/:id', verificarToken, verificarRol('administrador'), validarCategoria, validarCampos, actualizarCa)
rutasCategoria.delete('/:id', verificarToken, verificarRol('administrador'), eliminarCa)

export default rutasCategoria