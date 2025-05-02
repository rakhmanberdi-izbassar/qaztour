import React, { createContext, useState, useEffect } from 'react'
import api from '../utils/axios'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (token) {
          const response = await api.get('/user', {
            headers: { Authorization: `Bearer ${token}` },
          })
          setUser(response.data)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        setUser(null) // Қателік болса, пайдаланушыны null етіп орнатыңыз
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  )
}
