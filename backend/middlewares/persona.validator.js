import { body } from 'express-validator'

export const validarPersona = [
    body('ci').notEmpty().withMessage('El campo CI es obligatorio'),
    body('nombres').notEmpty().withMessage('El campo nombres es obligatorio'),
    body('apellidos').notEmpty().withMessage('El campo apellidos es obligatorio'),
    body('email').notEmpty().withMessage('El campo email es obligatorio')
        .isEmail().withMessage('El email no es válido'),
    body('password').notEmpty().withMessage('El campo password es obligatorio')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('rol').notEmpty().withMessage('El campo rol es obligatorio')
        .isIn(['cliente', 'administrador']).withMessage('El rol debe ser cliente o administrador')
]