import db  from '../config/db.js';

export const ObtenerPagos = async()=>{
    const [resultado] = await db.query('SELECT * FROM pago');
    return resultado;
}

export const ObtenerPagoPorId = async(id)=>{
    const [resultado] = await db.query('SELECT * FROM pagos WHERE id = ?', [id]);
    return resultado[0];
}

export const CrearPago = async(pago)=>{
    const { id_usuario, monto, fecha } = pago;
    const [resultado] = await db.query('INSERT INTO pagos (id_usuario, monto, fecha) VALUES (?, ?, ?)', [id_usuario, monto, fecha]);
    return resu
    ltado.insertId;
}

export const ActualizarPago = async(id, pago)=>{
    const { id_usuario, monto, fecha } = pago;
    await db.query('UPDATE pagos SET id_usuario = ?, monto = ?, fecha = ? WHERE id = ?', [id_usuario, monto, fecha, id]);
}

export const EliminarPago = async(id)=>{
    await db.query('UPDATE pagos SET estado = 1 WHERE id = ?', [id]);
}

