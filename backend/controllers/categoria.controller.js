import { ObtenerCategorias, ObtenerCategoriaPorId, CrearCategoria, ActualizarCategoria, EliminarCategoria } from '../models/categoria.model.js'

export const getCategorias = async (req, res) => {
    try {
        const categorias = await ObtenerCategorias()
        res.status(200).json(categorias)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params
        const categoria = await ObtenerCategoriaPorId(id)
        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' })
        }
        res.status(200).json(categoria)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const crearCa = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body
        const nuevaCategoria = await CrearCategoria(nombre, descripcion)
        res.status(201).json(nuevaCategoria)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const actualizarCa = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, descripcion } = req.body
        const categoriaActualizada = await ActualizarCategoria(id, nombre, descripcion)
        res.status(200).json(categoriaActualizada)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const eliminarCa = async (req, res) => {
    try {
        const { id } = req.params
        const categoriaEliminada = await EliminarCategoria(id)
        res.status(200).json(categoriaEliminada)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}