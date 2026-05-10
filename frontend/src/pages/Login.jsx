import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { signin } from '../services/auth.service'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors]     = useState({})
  const [serverError, setServerError] = useState('')
  const { login } = useAuth()
  const navigate  = useNavigate()

  const validate = () => {
    const errs = {}
    if (!username.trim())       errs.username = 'El usuario es requerido'
    if (password.length < 6)    errs.password = 'Mínimo 6 caracteres'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setServerError('')
    try {
      const res = await signin(username, password)
      login(res.data)
      navigate('/')
    } catch (err) {
      setServerError(err.response?.data?.message || 'Error al iniciar sesión')
    }
  }

  return (
    <div className="page">
      <div className="form-card">
        <h2>Iniciar sesión</h2>
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
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          {serverError && <p className="error">{serverError}</p>}
          <button type="submit" className="btn-primary">Iniciar sesión</button>
        </form>
      </div>
    </div>
  )
}

export default Login
