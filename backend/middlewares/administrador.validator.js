import { body } from 'express-validator'

export const validarAdministrador = [
    body('ci_fk').notEmpty().withMessage('El campo CI es obligatorio'),
]