import { ObtenerClientes, ObtenerClientePorCi, CrearCliente, ActualizarCliente, EliminarCliente } from '../models/cliente.model.js'

export const getClientes = async (req, res) => {
    try {
        const clientes = await ObtenerClientes()
        res.status(200).json(clientes)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getClientePorCi = async (req, res) => {
    try {
        const { ci } = req.params
        const cliente = await ObtenerClientePorCi(ci)
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' })
        }
        res.status(200).json(cliente)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const crearC = async (req, res) => {
    try {
        const { ci_fk, direccion, telefono } = req.body
        const nuevoCliente = await CrearCliente(ci_fk, direccion, telefono)
        res.status(201).json(nuevoCliente)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const actualizarC = async (req, res) => {
    try {
        const { ci } = req.params
        const { direccion, telefono } = req.body
        const clienteActualizado = await ActualizarCliente(ci, direccion, telefono)
        res.status(200).json(clienteActualizado)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const eliminarC = async (req, res) => {
    try {
        const { ci } = req.params
        const clienteEliminado = await EliminarCliente(ci)
        res.status(200).json(clienteEliminado)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}