import { body } from 'express-validator'

export const validarCliente = [
    body('ci_fk').notEmpty().withMessage('El campo CI es obligatorio'),
]