import { body } from 'express-validator'

export const validarResena = [
    body('cliente_ci_fk').notEmpty().withMessage('El campo cliente_ci_fk es obligatorio'),
    body('producto_cod_fk').notEmpty().withMessage('El campo producto_cod_fk es obligatorio'),
    body('calificacion').notEmpty().withMessage('El campo calificacion es obligatorio')
        .isInt({ min: 1, max: 5 }).withMessage('La calificación debe ser un número entre 1 y 5')
]