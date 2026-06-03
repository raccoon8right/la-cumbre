import { ObtenerCategorias, ObtenerCategoriaPorId, CrearCategoria, ActualizarCategoria, EliminarCategoria } from '../models/categoria.model.js';

export const getCategorias = async (req, res) => {
    try {
        const categorias = await ObtenerCategorias();

        if (categorias.length === 0) {
            return res.status(404).json({ error: 'No se encontraron categorías' });
        }

        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await ObtenerCategoriaPorId(id);

        if (!categoria)
            return res.status(404).json({ error: 'Categoría no encontrada' });

        res.status(200).json(categoria);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const crearCa = async (req, res) => {
    try {
        const categoria = req.body;

        const id = await CrearCategoria(categoria);

        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarCa = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = req.body;

        const categoriaP = await ObtenerCategoriaPorId(id);

        if (!categoriaP) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        await ActualizarCategoria(categoria);

        res.status(200).json({ message: 'Categoría actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarCa = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await ObtenerCategoriaPorId(id);

        if (!categoria)
            return res.status(404).json({ error: 'Categoría no encontrada' });

        await EliminarCategoria({ id });

        res.status(200).json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}