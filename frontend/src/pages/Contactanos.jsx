import { useState } from 'react'

function Contactanos() {
    const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' })
    const [enviando, setEnviando] = useState(false)
    const [exito, setExito] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim())
            return setError('Completa los campos obligatorios')
        setEnviando(true)
        // Aquí conectar con tu endpoint de contacto o servicio de email
        await new Promise(r => setTimeout(r, 900)) // simula petición
        setEnviando(false)
        setExito(true)
        setForm({ nombre: '', email: '', asunto: '', mensaje: '' })
    }

    return (
        <div className='contactanos-page'>
            {/* Hero */}
            <section className='contactanos-hero'>
                <div className='contactanos-hero-content'>
                    <h6>Estamos aquí</h6>
                    <h1>Contáctanos</h1>
                    <p>¿Tienes preguntas sobre nuestros productos de peltre genuino? Escríbenos y te responderemos a la brevedad.</p>
                </div>
            </section>

            <section className='contactanos-body'>
                {/* Info de contacto */}
                <aside className='contactanos-info'>
                    <div className='info-bloque'>
                        <div className='info-icono'>📍</div>
                        <div>
                            <h4>Ubicación</h4>
                            <p>La Paz, Bolivia<br />Zona Sur — Calle Metalúrgica 42</p>
                        </div>
                    </div>
                    <div className='info-bloque'>
                        <div className='info-icono'>📞</div>
                        <div>
                            <h4>Teléfono</h4>
                            <p>+591 2 123 4567<br />Lun–Vie 8:00 – 18:00</p>
                        </div>
                    </div>
                    <div className='info-bloque'>
                        <div className='info-icono'>✉️</div>
                        <div>
                            <h4>Correo</h4>
                            <p>info@lacumbre.bo<br />ventas@lacumbre.bo</p>
                        </div>
                    </div>
                    <div className='info-bloque'>
                        <div className='info-icono'>🕐</div>
                        <div>
                            <h4>Horario de atención</h4>
                            <p>Lunes a Viernes: 8:00 – 18:00<br />Sábados: 9:00 – 13:00</p>
                        </div>
                    </div>
                </aside>

                {/* Formulario */}
                <div className='contactanos-form-area'>
                    <h2>Envíanos un mensaje</h2>
                    {exito && (
                        <p className='exito-mensaje'>¡Mensaje enviado! Te contactaremos pronto.</p>
                    )}
                    {error && <p className='error-mensaje'>{error}</p>}

                    <form className='contactanos-form' onSubmit={handleSubmit} noValidate>
                        <div className='form-fila'>
                            <div className='form-grupo'>
                                <label htmlFor='nombre'>Nombre *</label>
                                <input
                                    id='nombre'
                                    name='nombre'
                                    type='text'
                                    placeholder='Tu nombre completo'
                                    value={form.nombre}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-grupo'>
                                <label htmlFor='email'>Correo electrónico *</label>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    placeholder='tucorreo@ejemplo.com'
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='form-grupo'>
                            <label htmlFor='asunto'>Asunto</label>
                            <input
                                id='asunto'
                                name='asunto'
                                type='text'
                                placeholder='¿En qué podemos ayudarte?'
                                value={form.asunto}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-grupo'>
                            <label htmlFor='mensaje'>Mensaje *</label>
                            <textarea
                                id='mensaje'
                                name='mensaje'
                                rows={5}
                                placeholder='Escribe tu mensaje aquí...'
                                value={form.mensaje}
                                onChange={handleChange}
                            />
                        </div>
                        <button type='submit' className='btn-principal btn-contacto' disabled={enviando}>
                            {enviando ? 'Enviando...' : 'Enviar mensaje'}
                        </button>
                    </form>
                </div>
            </section>

            {/* Mapa */}
            <section className='contactanos-mapa'>
                <h2>Encuéntranos</h2>
                <div className='mapa-wrapper'>
                    <iframe
                        title='Ubicación La Cumbre'
                        src='https://www.openstreetmap.org/export/embed.html?bbox=-68.20,-16.55,-68.10,-16.45&layer=mapnik'
                        width='100%'
                        height='400'
                        style={{ border: 'none', borderRadius: 'var(--radio-lg)' }}
                        loading='lazy'
                        allowFullScreen
                    />
                    <p className='mapa-nota'>
                        <a
                            href='https://www.openstreetmap.org/?mlat=-16.5&mlon=-68.15#map=13/-16.5/-68.15'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Ver mapa más grande ↗
                        </a>
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Contactanos