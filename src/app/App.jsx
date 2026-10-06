import React, { useEffect, useState } from 'react'
import { initializeDatabase } from '../services/database'
import Layout from '../components/Layout'
import './App.css'

function App() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const init = async () => {
      try {
        await initializeDatabase()
        setIsInitialized(true)
      } catch (err) {
        console.error('Error initializing database:', err)
        setError(err.message)
      }
    }

    init()
  }, [])

  if (error) {
    return (
      <div className="error-container">
        <h1>Error</h1>
        <p>{error}</p>
        <p>Por favor, recarga la página o contacta al administrador.</p>
      </div>
    )
  }

  if (!isInitialized) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Inicializando LeadFlow...</p>
      </div>
    )
  }

  return <Layout />
}

export default App
