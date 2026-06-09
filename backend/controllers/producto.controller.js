import { obtenerProductos, obtenerProductoPorCod, crearProducto, modificarProductoPorCod, eliminarProductoPorCod } from '../models/producto.model.js'

export const getProductos = async (req, res) => {
    try {
        const productos = await obtenerProductos()
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' })
    }
}

export const getProductoPorCod = async (req, res) => {
    try {
        const { cod } = req.params
        const producto = await obtenerProductoPorCod(cod)
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }
        res.status(200).json(producto)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' })
    }
}

export const postProducto = async (req, res) => {
    try {
        const { cod, nombre, tipo, material, descripcion, precio, stock, activo, categoria_id_fk, empresa_nit_fk, admin_ci_fk } = req.body
        if (!cod || !nombre || !tipo || !material || !descripcion || !precio || !stock || !activo || !categoria_id_fk || !empresa_nit_fk || !admin_ci_fk) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' })
        }
        const nuevoProducto = await crearProducto(cod, nombre, tipo, material, descripcion, precio, stock, activo, categoria_id_fk, empresa_nit_fk, admin_ci_fk)
        res.status(201).json(nuevoProducto)
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' })
    }
}

export const putProductoPorCod = async (req, res) => {
    try {
        const { cod } = req.params
        const { nombre, tipo, material, descripcion, precio, stock, activo, categoria_id_fk, empresa_nit_fk, admin_ci_fk } = req.body
        if (!cod || !nombre || !tipo || !material || !descripcion || !precio || !stock || !activo || !categoria_id_fk || !empresa_nit_fk || !admin_ci_fk) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' })
        }
        const productoModificado = await modificarProductoPorCod(cod, nombre, tipo, material, descripcion, precio, stock, activo, categoria_id_fk, empresa_nit_fk, admin_ci_fk)
        res.status(200).json(productoModificado)
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar el producto' })
    }
}

export const deleteProductoPorCod = async (req, res) => {
    try {
        const { cod } = req.params
        const productoEliminado = await eliminarProductoPorCod(cod)
        if (!productoEliminado) {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }
        res.status(200).json(productoEliminado)
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' })
    }
}