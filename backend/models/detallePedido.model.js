import db from '../config/db.js';

export const ObtenerDetallePedidos = async () => {
    const [respuesta] = await db.query('SELECT * FROM detallepedido');
    return respuesta;
}

export const ObtenerDetallePedidoPorId = async (id) => {
    const [respuesta] = await db.query('SELECT * FROM detallepedido WHERE id = ?', [id]);
    return respuesta[0];
}

export const obtenerDetallesPorPedido = async (pedido_cod_fk) => {
    const [result] = await db.query(
        'SELECT producto_cod_fk, cantidad FROM detallePedido WHERE pedido_cod_fk = ?',
        [pedido_cod_fk]
    );
    return result;
}

export const CrearDetallePedido = async (detallePedido) => {
    const { pedido_cod_fk, producto_cod_fk, cantidad, precio_unitario } = detallePedido;
    const [respuesta] = await db.query('INSERT INTO detallepedido (pedido_cod_fk, producto_cod_fk, cantidad, precio_unitario) VALUES (?, ?, ?, ?)', [pedido_cod_fk, producto_cod_fk, cantidad, precio_unitario]);
    return respuesta.insertId;
}

export const ActualizarDetallePedido = async (id, detallePedido) => {
    const { pedido_cod_fk, producto_cod_fk, cantidad, precio_unitario } = detallePedido;
    await db.query('UPDATE detallepedido SET pedido_cod_fk = ?, producto_cod_fk = ?, cantidad = ?, precio_unitario = ? WHERE id = ?', [pedido_cod_fk, producto_cod_fk, cantidad, precio_unitario, id]);
}

export const EliminarDetallePedido = async (id) => {
    await db.query('DELETE FROM detallepedido WHERE id = ?', [id]);
}
