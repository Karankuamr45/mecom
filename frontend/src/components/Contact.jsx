import React from 'react'
import { useAuth } from '../context/AuthContext'

function Contact() {
  const {isAuthenticated} = useAuth();
  console.log('isAuthenticated in contact',isAuthenticated)
  return (
    <div>
      contact
    </div>
  )
}

export default Contact
