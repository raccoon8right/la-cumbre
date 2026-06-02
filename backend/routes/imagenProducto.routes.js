import { getImagen, getImagenPorID, getImagenPorProducto, postImagen, putImagenPorID, deleteImagenPorID } from '../controllers/imagenProducto.controller.js'
import { validarImagen } from '../middlewares/imagenProducto.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import express from 'express'

const routes = express.Router()

routes.get('/', getImagen)
routes.get('/producto/:producto_cod_fk', getImagenPorProducto)
routes.get('/:id', getImagenPorID)
routes.post('/', validarImagen, validarCampos, postImagen)
routes.put('/:id', validarImagen, validarCampos, putImagenPorID)
routes.delete('/:id', deleteImagenPorID)

export default routes