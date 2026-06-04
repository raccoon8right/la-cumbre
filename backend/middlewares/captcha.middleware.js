import axios from 'axios'

export const verificarCaptcha = async (req, res, next) => {
    const { captchaToken } = req.body
    if (!captchaToken) {
        return res.status(400).json({ error: 'CAPTCHA requerido' })
    }
    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`
        )
        if (!response.data.success) {
            return res.status(400).json({ error: 'CAPTCHA inválido' })
        }
        next()
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar CAPTCHA' })
    }
}