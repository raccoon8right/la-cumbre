export const evaluarContrasenia = (password) => {
    const tieneMinusculas = /[a-z]/.test(password)
    const tieneMayusculas = /[A-Z]/.test(password)
    const tieneNumeros = /[0-9]/.test(password)
    const tieneEspeciales = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const longitudSuficiente = password.length >= 8

    if (!longitudSuficiente) {
        return { nivel: 'debil', mensaje: 'La contraseña debe tener al menos 8 caracteres' }
    }
    if (tieneMinusculas && tieneMayusculas && tieneNumeros && tieneEspeciales) {
        return { nivel: 'fuerte', mensaje: 'Contraseña fuerte' }
    }
    if ((tieneMinusculas || tieneMayusculas) && tieneNumeros) {
        return { nivel: 'intermedio', mensaje: 'Contraseña intermedia' }
    }
    return { nivel: 'debil', mensaje: 'La contraseña es débil, agrega números y caracteres especiales' }
}