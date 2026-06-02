import db  from '../config/db.js';

export const ObtenerPagos = async()=>{
    const [resultado] = await db.query('SELECT * FROM pago');
    return resultado;
}

export const ObtenerPagoPorId = async(id)=>{
    const [resultado] = await db.query('SELECT * FROM pago WHERE id = ?', [id]);
    return resultado[0];
}

export const CrearPago = async(pago)=>{
    const { metodo, estado, monto, fecha, pedido_cod_fk } = pago;
    const [resultado] = await db.query('INSERT INTO pago (metodo, estado, monto, fecha, pedido_cod_fk) VALUES (?, ?, ?, ?, ?)', [metodo, estado, monto, fecha, pedido_cod_fk]);
    return resultado.insertId;
}

export const ActualizarPago = async(id, pago)=>{
    const { metodo, estado, monto, fecha, pedido_cod_fk } = pago;
    await db.query('UPDATE pago SET metodo = ?, estado = ?, monto = ?, fecha = ?, pedido_cod_fk = ? WHERE id = ?', [metodo, estado, monto, fecha, pedido_cod_fk, id]);
}

export const EliminarPago = async(id)=>{
    const [resultado] = await db.query('DELETE FROM pago WHERE id = ?', [id]);
    return resultado;
}

