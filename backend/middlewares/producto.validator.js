import { body } from 'express-validator'

export const validarProducto = [
    body('cod').notEmpty().withMessage('El campo código es obligatorio'),
    body('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
    body('precio').notEmpty().withMessage('El campo precio es obligatorio')
        .isFloat({ min: 0 }).withMessage('El campo precio debe ser un número positivo'),
    body('stock').optional().isInt({ min: 0 }).withMessage('El campo stock debe ser un número entero positivo'),
    body('categoria_id_fk').notEmpty().withMessage('El campo categoría es obligatorio'),
    body('empresa_nit_fk').notEmpty().withMessage('El campo empresa es obligatorio'),
    body('admin_ci_fk').notEmpty().withMessage('El campo administrador es obligatorio')
]