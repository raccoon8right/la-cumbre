import { obtenerImagen, obtenerImagenPorID, obtenerImagenPorProducto, crearImagen, modificarImagenPorID, eliminarImagenPorID } from '../models/imagenProducto.model.js'

export const getImagen = async (req, res) => {
    try {
        const imagenes = await obtenerImagen()
        res.status(200).json(imagenes)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las imagenes' })
    }
}

export const getImagenPorID = async (req, res) => {
    try {
        const { id } = req.params
        const imagen = await obtenerImagenPorID(id)
        if (!imagen) {
            return res.status(404).json({ error: 'Imagen no encontrada' })
        }
        res.status(200).json(imagen)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la imagen' })
    }
}

export const getImagenPorProducto = async (req, res) => {
    try {
        const { producto_cod_fk } = req.params
        const imagen = await obtenerImagenPorProducto(producto_cod_fk)

        res.status(200).json(imagen)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la imagen' })
    }
}

export const postImagen = async (req, res) => {
    try {
        const { producto_cod_fk, url, es_principal } = req.body
        if (!producto_cod_fk || !url || !es_principal) {
            return res.status(400).json({ error: 'El COD, URL y es_principal son obligatorios' })
        }
        const nuevaIamgen = await crearImagen(producto_cod_fk, url, es_principal)
        res.status(201).json(nuevaIamgen)
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la imagen' })
    }
}

export const putImagenPorID = async (req, res) => {
    try {
        const { id } = req.params
        const { producto_cod_fk, url, es_principal } = req.body
        if (!producto_cod_fk || !url || !es_principal) {
            return res.status(400).json({ error: 'El COD, URL y es_principal son obligatorios' })
        }
        const imagenModificada = await modificarImagenPorID(id, producto_cod_fk, url, es_principal)
        res.status(200).json(imagenModificada)
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar la imagen' })
    }
}

export const deleteImagenPorID = async (req, res) => {
    try {
        const { id } = req.params
        const imagenEliminada = await eliminarImagenPorID(id)
        if (!imagenEliminada) {
            return res.status(404).json({ error: 'Imagen no encontrada' })
        }
        res.status(200).json(imagenEliminada)
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la imagen' })
    }
}