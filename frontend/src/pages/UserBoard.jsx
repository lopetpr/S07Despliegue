import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getUserBoard } from '../services/user.service'

function UserBoard() {
  const [content, setContent] = useState('')
  const [error, setError]     = useState('')
  const { user }   = useAuth()
  const navigate   = useNavigate()

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    getUserBoard(user.accessToken)
      .then(res => setContent(res.data))
      .catch(err => setError(err.response?.data?.message || 'Error al obtener contenido'))
  }, [user, navigate])

  return (
    <div className="page">
      <h2>Área de Usuario</h2>
      {error
        ? <p className="error">{error}</p>
        : <p className="content-msg">{content}</p>
      }
    </div>
  )
}

export default UserBoard
