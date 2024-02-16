import React from 'react'
import { useAuth } from '../context/AuthContext'

function Contact() {
  const {isAuthenticated, user} = useAuth();
  // console.log('isAuthenticated in contact',isAuthenticated)
  // console.log('isAuthenticated in contact user',user)
  return (
    <div>
      contact
    </div>
  )
}

export default Contact
