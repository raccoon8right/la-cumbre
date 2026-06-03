import { ObtenerClientes, ObtenerClientePorCi, CrearCliente, ActualizarCliente, EliminarCliente } from '../models/cliente.model.js';

export const getClientes = async (req, res) => {
    try {
        const clientes = await ObtenerClientes();
        if (clientes.length === 0) {
            return res.status(404).json({ error: 'No se encontraron clientes' });
        }
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getClientePorCi = async (req, res) => {
    try {
        const { ci } = req.params;
        const cliente = await ObtenerClientePorCi(ci);

        if (!cliente)
            return res.status(404).json({ error: 'Cliente no encontrado' });

        res.status(200).json(cliente);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const crearC = async (req, res) => {
    try {
        const cliente = req.body;
        const id = await CrearCliente(cliente);

        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarC = async (req, res) => {
    try {
        const { ci } = req.params;
        const cliente = req.body;

        const clienteP = await ObtenerClientePorCi(ci);

        if (!clienteP) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        await ActualizarCliente(cliente);

        res.status(200).json({ message: 'Cliente actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarC = async (req, res) => {
    try {
        const { ci } = req.params;

        const cliente = await ObtenerClientePorCi(ci);

        if (!cliente)
            return res.status(404).json({ error: 'Cliente no encontrado' });

        await EliminarCliente({ ci_fk: ci });

        res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}