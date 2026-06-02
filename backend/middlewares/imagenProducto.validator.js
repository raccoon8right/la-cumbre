import { body } from 'express-validator'

export const validarImagen = [
    body('producto_cod_fk').notEmpty().withMessage('El campo producto_cod_fk es obligatorio'),
    body('url').notEmpty().withMessage('El campo url es obligatorio'),
    body('es_principal').notEmpty().withMessage('El campo es_principal es obligatorio')
]