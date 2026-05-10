import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/auth.service'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors]     = useState({})
  const [serverMsg, setServerMsg] = useState('')
  const [success, setSuccess]   = useState(false)
  const navigate = useNavigate()

  const validate = () => {
    const errs = {}
    if (!username.trim())    errs.username = 'El usuario es requerido'
    if (!email.trim())       errs.email    = 'El email es requerido'
    if (password.length < 6) errs.password = 'Mínimo 6 caracteres'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setServerMsg('')
    try {
      const res = await signup(username, email, password)
      setSuccess(true)
      setServerMsg(res.data.message || 'Registro exitoso')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setServerMsg(err.response?.data?.message || 'Error al registrarse')
    }
  }

  return (
    <div className="page">
      <div className="form-card">
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          {serverMsg && <p className={success ? 'success' : 'error'}>{serverMsg}</p>}
          <button type="submit" className="btn-primary">Registrarse</button>
        </form>
      </div>
    </div>
  )
}

export default Register
