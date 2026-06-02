import db from '../config/db.js'

export const obtenerPedidos = async () => {
    const [result] = await db.query('SELECT * FROM pedido')
    return result
}

export const obtenerPedidoPorCod = async (cod) => {
    const [result] = await db.query('SELECT * FROM pedido WHERE cod = ?', [cod])
    return result[0]
}

export const crearPedido = async (cod, estado, direccion_entrega, total) => {
    const pedidoExiste = await obtenerPedidoPorCod(cod)
    if (pedidoExiste) {
        throw new Error('El código del pedido ya existe')
    }
    await db.query(
        'INSERT INTO pedido(cod, estado , direccion_entrega, total) VALUES ( ?, ?, ?, ?)',
        [cod, estado, direccion_entrega, total]
    )
    return await obtenerPedidoPorCod(cod)
}

export const modificarPedidoPorCod = async (cod, estado, direccion_entrega, total) => {
    const pedidoExistente = await obtenerPedidoPorCod(cod)
    if (!pedidoExistente) {
        throw new Error('Pedido no encontrado')
    }
    await db.query('UPDATE pedido SET estado = ?, direccion_entrega = ?, total = ? WHERE cod = ?',
        [estado, direccion_entrega, total, cod]
    )
    return await obtenerPedidoPorCod(cod)
}

export const eliminarPedidoPorCod = async (cod) => {
    const pedidoExistente = await obtenerPedidoPorCod(cod)
    if (!pedidoExistente) {
        throw new Error('Pedido no encontrado')
    }
    await db.query('DELETE FROM pedido WHERE cod = ?', [cod])
    return pedidoExistente
}