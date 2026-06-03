import { body } from 'express-validator'

export const validarTransporte = [
    body('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
    body('NIT').notEmpty().withMessage('El campo NIT es obligatorio')
]