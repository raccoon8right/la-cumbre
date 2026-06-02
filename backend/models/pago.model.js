import { db } from '../config/db.js';

export const ObtenerPagos = async()=>{
    const [resultado] = await db.query('SELECT * FROM pagos');
    return resultado;
}