import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      {user ? (
        <>
          <Link to="/usuario">Usuario</Link>
          <button onClick={logout} className="logout-btn">Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/registro">Registro</Link>
        </>
      )}
    </nav>
  )
}

export default Navbar
