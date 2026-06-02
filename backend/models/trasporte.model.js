import db from '../config/db.js';

export const ObtenerTransportes = async()=>{
    const [resultado] = await db.query('SELECT * FROM transporte');
    return resultado;
}

export const ObtenerTransportePorId = async(id)=>{
    const [resultado] = await db.query('SELECT * FROM transporte WHERE id = ?', [id]);
    return resultado[0];
}

export const CrearTransporte = async(transporte)=>{
    const {nombre, NIT, tipo, confiabilidad, peso} = transporte;
    const [resultado] = await db.query('INSERT INTO transporte (nombre, NIT, tipo, confiabilidad, peso) VALUES (?, ?, ?, ?, ?)', [nombre, NIT, tipo, confiabilidad, peso]);
    return resultado.insertId;
}

export const ActualizarTransporte = async(id, transporte)=>{
    const {nombre, NIT, tipo, confiabilidad, peso} = transporte;
    await db.query('UPDATE transporte SET nombre = ?, NIT = ?, tipo = ?, confiabilidad = ?, peso = ? WHERE id = ?', [nombre, NIT, tipo, confiabilidad, peso, id]);
} 

export const EliminarTransporte = async(id)=>{
    await db.query('DELETE FROM transporte WHERE id = ?', [id]);
}
