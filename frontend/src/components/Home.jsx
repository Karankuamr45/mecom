import React from 'react'
import { useAuth } from '../context/AuthContext'

function Home() {
  const {user} = useAuth()
  return (
    <div>
      Home
      <h1>{user && user.username}</h1>
    </div>
  )
}

export default Home
