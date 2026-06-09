import { getImagen, getImagenPorID, getImagenPorProducto, postImagen, putImagenPorID, deleteImagenPorID } from '../controllers/imagenProducto.controller.js'
import { validarImagen } from '../middlewares/imagenProducto.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js'
import express from 'express'

const routes = express.Router()

routes.get('/', getImagen)
routes.get('/producto/:producto_cod_fk', getImagenPorProducto)
routes.get('/:id', getImagenPorID)
routes.post('/', verificarToken, verificarRol('administrador'), validarImagen, validarCampos, postImagen)
routes.put('/:id', verificarToken, verificarRol('administrador'), validarImagen, validarCampos, putImagenPorID)
routes.delete('/:id', verificarToken, verificarRol('administrador'), deleteImagenPorID)

export default routes