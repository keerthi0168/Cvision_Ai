import { useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'

export default function LandingPage({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = async (file) => {
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file')
      return
    }

    setIsLoading(true)
    try {
      // Mock data for now - will integrate with backend API
      const mockData = {
        resume_id: 'mock_' + Date.now(),
        filename: file.name,
        upload_time: new Date().toISOString()
      }
      onUpload(mockData)
    } catch (error) {
      alert('Error uploading file')
    }
    setIsLoading(false)
  }

  const handleInputChange = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg overflow-hidden">
      {/* Gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 glass sticky top-0 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">CVision AI</h1>
          <p className="text-text-secondary text-sm">Intelligent Resume Analysis</p>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Your Resume,
            <span className="gradient-primary bg-clip-text text-transparent"> Elevated</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            AI-powered resume analysis, skill extraction, job role prediction, and personalized career guidance. 
            Get actionable insights in seconds.
          </p>

          {/* Upload Section */}
          <div className="mt-12 space-y-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`glass rounded-2xl p-12 border-2 border-dashed transition-all duration-300 cursor-pointer ${
                isDragging ? 'border-primary bg-primary bg-opacity-5' : 'border-text-secondary border-opacity-30'
              }`}
            >
              <div className="space-y-4">
                <div className="text-5xl">📄</div>
                <h3 className="text-2xl font-semibold">Drag your resume here</h3>
                <p className="text-text-secondary">or</p>
                <label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleInputChange}
                    className="hidden"
                    disabled={isLoading}
                  />
                  <Button
                    variant="primary"
                    className="cursor-pointer"
                    disabled={isLoading}
                    onClick={(e) => e.currentTarget.parentElement.querySelector('input').click()}
                  >
                    {isLoading ? 'Uploading...' : 'Choose PDF'}
                  </Button>
                </label>
                <p className="text-sm text-text-secondary">PDF format only, max 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Powerful Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '🎯', title: 'Skill Extraction', desc: 'AI identifies and categorizes all your skills' },
            { icon: '👔', title: 'Job Prediction', desc: 'Discover ideal roles matching your profile' },
            { icon: '💡', title: 'Smart Suggestions', desc: 'Personalized recommendations to improve' },
            { icon: '🎤', title: 'Interview Prep', desc: 'AI-generated interview questions' },
            { icon: '📊', title: 'Resume Score', desc: 'Get detailed analysis and scoring' },
            { icon: '🚀', title: 'Career Roadmap', desc: 'Personalized learning and growth path' }
          ].map((feature, i) => (
            <Card key={i}>
              <div className="space-y-3">
                <div className="text-4xl">{feature.icon}</div>
                <h4 className="font-semibold text-lg">{feature.title}</h4>
                <p className="text-text-secondary text-sm">{feature.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 glass border-t border-text-secondary border-opacity-10 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-text-secondary">
          <p>CVision AI © 2024. Built for ambitious professionals.</p>
        </div>
      </footer>
    </div>
  )
}
