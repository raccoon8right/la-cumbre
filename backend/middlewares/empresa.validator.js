import { body } from 'express-validator'

export const validarEmpresa = [
    body('nit').notEmpty().withMessage('El campo NIT es obligatorio'),
    body('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
]