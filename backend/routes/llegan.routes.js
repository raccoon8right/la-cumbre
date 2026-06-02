import { getLlegan, getLleganPorClaves, postLlegan, deleteLlegan } from '../controllers/llegan.controller.js'
import { validarLlegan } from '../middlewares/llegan.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import express from 'express'

const routes = express.Router()

routes.get('/', getLlegan)
routes.get('/:ci_fk/:cod_pedido_fk/:id_transporte_fk', getLleganPorClaves)
routes.post('/', validarLlegan, validarCampos, postLlegan)
routes.delete('/:ci_fk/:cod_pedido_fk/:id_transporte_fk', deleteLlegan)

export default routes