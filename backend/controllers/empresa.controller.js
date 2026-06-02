import { obtenerEmpresas, obtenerEmpresaPorNIT, crearEmpresa, modificarEmpresaPorNIT, eliminarEmpresaPorNIT } from '../models/empresa.model.js'

export const getEmpresas = async (req, res) => {
    try {
        const empresas = await obtenerEmpresas()
        if (empresas.length === 0) {
            return res.status(404).json({ error: 'No se encontraron empresas' })
        }
        res.status(200).json(empresas)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las empresas' })
    }
}

export const getEmpresaPorNIT = async (req, res) => {
    try {
        const { nit } = req.params
        const empresa = await obtenerEmpresaPorNIT(nit)
        if (!empresa) {
            return res.status(404).json({ error: 'Empresa no encontrada' })
        }
        res.status(200).json(empresa)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la empresa' })
    }
}

export const postEmpresa = async (req, res) => {
    try {
        const { nit, nombre, direccion, telefono, facebook, ciudad } = req.body
        if (!nit || !nombre) {
            return res.status(400).json({ error: 'El NIT y nombre son obligatorios' })
        }
        const nuevaEmpresa = await crearEmpresa(nit, nombre, direccion, telefono, facebook, ciudad)
        res.status(201).json(nuevaEmpresa)
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la empresa' })
    }
}

export const putEmpresaPorNIT = async (req, res) => {
    try {
        const { nit } = req.params
        const { nombre, direccion, telefono, facebook, ciudad } = req.body
        if (!nit || !nombre || !direccion || !telefono || !facebook || !ciudad) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' })
        }
        const empresaModificada = await modificarEmpresaPorNIT(nit, nombre, direccion, telefono, facebook, ciudad)
        res.status(200).json(empresaModificada)
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar la empresa' })
    }
}

export const deleteEmpresaPorNIT = async (req, res) => {
    try {
        const { nit } = req.params
        const empresaEliminada = await eliminarEmpresaPorNIT(nit)
        if (!empresaEliminada) {
            return res.status(404).json({ error: 'Empresa no encontrada' })
        }
        res.status(200).json(empresaEliminada)
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la empresa' })
    }
}
