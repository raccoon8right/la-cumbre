import express from 'express'
import 'dotenv/config'
import empresaRoutes from './routes/empresa.routes.js'

const app = express()
app.use(express.json())

app.use('/api/empresas', empresaRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})