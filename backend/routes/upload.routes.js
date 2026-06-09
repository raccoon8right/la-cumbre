import express from 'express'
import { upload } from '../config/cloudinary.js'
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/', verificarToken, verificarRol('administrador'), upload.single('imagen'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No se subió ninguna imagen' })
    res.status(200).json({
        url: req.file.path,
        public_id: req.file.filename
    })
})

export default router