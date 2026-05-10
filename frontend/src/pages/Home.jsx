import { useAuth } from '../context/AuthContext'

function Home() {
  const { user } = useAuth()

  return (
    <div className="page">
      <h1>Bienvenido{user ? `, ${user.username}` : ''}</h1>
      {user ? (
        <div className="welcome-card">
          <p><strong>Usuario:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Roles:</strong> {user.roles.join(', ')}</p>
        </div>
      ) : (
        <p>Inicia sesión para ver tu perfil.</p>
      )}
    </div>
  )
}

export default Home
