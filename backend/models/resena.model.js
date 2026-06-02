import db from '../config/db.js';

export const ObtenerResenas = async()=>{
    const [resultado] = await db.query('SELECT * FROM resena');
    return resultado;
}

export const ObtenerResenaPorId = async(id)=>{
    const [resultado] = await db.query('SELECT * FROM resena WHERE id = ?', [id]);
    return resultado[0];
}

export const CrearResena = async(resena)=>{
    const {cliente_ci_fk, producto_cod_fk, calificacion, comentario, fecha} = resena;
    const [resultado] = await db.query('INSERT INTO resena (cliente_ci_fk, producto_cod_fk, calificacion, comentario, fecha) VALUES (?, ?, ?, ?, ?)', [cliente_ci_fk, producto_cod_fk, calificacion, comentario, fecha]);
    return resultado.insertId;
}

export const ActualizarResena = async(id, resena)=>{
    const {cliente_ci_fk, producto_cod_fk, calificacion, comentario, fecha} = resena;
    await db.query('UPDATE resena SET cliente_ci_fk = ?, producto_cod_fk = ?, calificacion = ?, comentario = ?, fecha = ? WHERE id = ?', [cliente_ci_fk, producto_cod_fk, calificacion, comentario, fecha, id]);
}

export const EliminarResena = async(id)=>{
    await db.query('DELETE FROM resena WHERE id = ?', [id]);
}