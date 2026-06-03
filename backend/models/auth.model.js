import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { CrearPersona, ObtenerPersonaPorEmail } from './persona.model.js'
import { CrearCliente } from './cliente.model.js'
import { CrearAdministrador } from './administrador.model.js'

export const registrar = async (ci, nombres, apellidos, email, password, rol, direccion, telefono) => {
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    const nuevaPersona = await CrearPersona(ci, nombres, apellidos, email, passwordHash, rol)
    if (rol === 'cliente') {
        await CrearCliente(ci, direccion, telefono)
    } else if (rol === 'administrador') {
        await CrearAdministrador(ci)
    }
    return nuevaPersona
}

export const login = async (email, password) => {
    const persona  = await ObtenerPersonaPorEmail(email)
    if(!persona) {
        throw new Error('Credenciales invalidas')
    }
    const passwordValido = await bcrypt.compare(password, persona.password)
    if (!passwordValido) {
        throw new Error('Credenciales invalidas')
    }
    const token = jwt.sign(
        { ci: persona.ci, rol: persona.rol },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
    return {
        token,
        usuario: {
            ci: persona.ci,
            nombres: persona.nombres,
            apellidos: persona.apellidos,
            email: persona.email,
            rol: persona.rol
        }
    }
}