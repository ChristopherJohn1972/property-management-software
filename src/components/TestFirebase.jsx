import React, { useEffect } from 'react'
import { database } from '../services/firebase'
import { ref, set, onValue } from 'firebase/database'

function TestFirebase() {
  useEffect(() => {
    console.log('Testing Firebase connection...')
    
    // Write test data
    const testRef = ref(database, 'test/connection')
    set(testRef, {
      timestamp: new Date().toISOString(),
      status: 'connected'
    }).then(() => {
      console.log('Test data written successfully')
      
      // Read it back
      onValue(testRef, (snapshot) => {
        console.log('Test data read:', snapshot.val())
      }, { onlyOnce: true })
    }).catch(error => {
      console.error('Firebase error:', error)
    })
  }, [])
  
  return (
    <div className="alert alert-success">
      <h5>Firebase Test</h5>
      <p>Check browser console for connection status.</p>
      <p>Using database: {import.meta.env.VITE_FIREBASE_DATABASE_URL}</p>
    </div>
  )
}

export default TestFirebase
