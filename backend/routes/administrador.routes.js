import { getAdministradores, getAdministradorPorCi, crearA, eliminarA } from '../controllers/administrador.controller.js'
import { validarAdministrador } from '../middlewares/administrador.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { Router } from 'express'

const rutasAdministrador = Router()

rutasAdministrador.get('/', getAdministradores)
rutasAdministrador.get('/:ci', getAdministradorPorCi)
rutasAdministrador.post('/', validarAdministrador, validarCampos, crearA)
rutasAdministrador.delete('/:ci', eliminarA)

export default rutasAdministrador;