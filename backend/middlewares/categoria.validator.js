import { body } from 'express-validator'

export const validarCategoria = [
    body('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
]