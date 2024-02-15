import React from 'react'
import { useAuth } from '../context/AuthContext'

function About() {
  const {isAuthenticated} = useAuth();
  console.log('isAuthenticated in about',isAuthenticated)
  return (
    <div>
      About
    </div>
  )
}

export default About
