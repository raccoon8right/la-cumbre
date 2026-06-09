import { getLlegan, getLleganPorClaves, postLlegan, deleteLlegan } from '../controllers/llegan.controller.js'
import { validarLlegan } from '../middlewares/llegan.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js'
import express from 'express'

const routes = express.Router()

routes.get('/', verificarToken, getLlegan)
routes.get('/:ci_fk/:cod_pedido_fk/:id_transporte_fk', verificarToken, getLleganPorClaves)
routes.post('/', verificarToken, validarLlegan, validarCampos, postLlegan)
routes.delete('/:ci_fk/:cod_pedido_fk/:id_transporte_fk', verificarToken, verificarRol('administrador'), deleteLlegan)

export default routes