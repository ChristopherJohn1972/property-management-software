import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Firebase configuration - loaded from external file
let firebaseConfig = null

// Function to load config (can be called from App.jsx)
export const loadFirebaseConfig = async () => {
  if (firebaseConfig) return firebaseConfig
  
  try {
    // Load from public folder (for development) or fetch from secure endpoint
    const response = await fetch('/firebase-config.json')
    if (!response.ok) {
      throw new Error('Failed to load Firebase config')
    }
    firebaseConfig = await response.json()
    return firebaseConfig
  } catch (error) {
    console.error('Error loading Firebase config:', error)
    // Fallback to environment variables for development
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
      databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || '',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
    }
  }
}

// Initialize Firebase (call this in your App.jsx)
export const initializeFirebase = async () => {
  const config = await loadFirebaseConfig()
  const app = initializeApp(config)
  const database = getDatabase(app)
  return { app, database }
}

// For backward compatibility
export let database = null

export const initDatabase = async () => {
  if (!database) {
    const { database: db } = await initializeFirebase()
    database = db
  }
  return database
}
