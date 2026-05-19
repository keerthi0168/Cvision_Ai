import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      return params.get('page') === 'dashboard' ? 'dashboard' : 'landing'
    } catch (e) {
      return 'landing'
    }
  })
  const [resumeData, setResumeData] = useState(null)

  const handleResumeUpload = (data) => {
    setResumeData(data)
    setCurrentPage('dashboard')
  }

  return (
    <div className="bg-dark-bg text-text-primary min-h-screen">
      {currentPage === 'landing' && (
        <LandingPage onUpload={handleResumeUpload} />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard data={resumeData} onBack={() => setCurrentPage('landing')} />
      )}
    </div>
  )
}

export default App
