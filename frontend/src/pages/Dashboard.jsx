import Button from '../components/Button'
import Card from '../components/Card'

export default function Dashboard({ data, onBack }) {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Navigation */}
      <nav className="glass sticky top-0 backdrop-blur-xl z-10 border-b border-text-secondary border-opacity-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">CVision AI</h1>
          <Button variant="secondary" onClick={onBack}>
            ← Back to Upload
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Resume Score */}
          <Card className="lg:col-span-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Resume Score</h2>
              <div className="flex items-center gap-6">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#CBD5E1" strokeWidth="2" opacity="0.2" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#6366F1" strokeWidth="3" strokeDasharray="212" strokeDashoffset="50" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">78%</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-text-secondary">Your resume is competitive</p>
                  <p className="text-sm text-text-secondary">Top 15% of profiles in your industry</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Skills Detected */}
            <Card>
              <h3 className="text-xl font-bold mb-4">Skills Detected</h3>
              <div className="space-y-2">
                {['Python', 'React', 'FastAPI', 'Machine Learning', 'AWS', 'Docker'].map((skill, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-text-secondary">{skill}</span>
                    <div className="w-24 bg-dark-card rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Job Role Prediction */}
            <Card>
              <h3 className="text-xl font-bold mb-4">Predicted Roles</h3>
              <div className="space-y-3">
                {[
                  { role: 'Senior Software Engineer', match: 92 },
                  { role: 'ML Engineer', match: 88 },
                  { role: 'Full Stack Developer', match: 85 }
                ].map((pred, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-dark-card rounded-lg">
                    <span className="font-medium">{pred.role}</span>
                    <span className="text-accent font-bold">{pred.match}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* AI Suggestions */}
          <Card>
            <h3 className="text-xl font-bold mb-4">✨ AI Improvement Suggestions</h3>
            <div className="space-y-3">
              {[
                'Add quantifiable achievements to your projects section',
                'Include more technical certifications relevant to your target roles',
                'Expand on your leadership experience',
                'Add metrics to demonstrate impact'
              ].map((suggestion, i) => (
                <div key={i} className="flex gap-3 p-3 bg-dark-card rounded-lg">
                  <span className="text-accent font-bold flex-shrink-0">•</span>
                  <p className="text-text-secondary text-sm">{suggestion}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Interview Questions */}
          <Card>
            <h3 className="text-xl font-bold mb-4">🎤 Interview Prep Questions</h3>
            <div className="space-y-4">
              {[
                'Tell us about your experience with microservices architecture',
                'How do you approach machine learning model optimization?',
                'Describe a challenging project and how you overcame obstacles'
              ].map((question, i) => (
                <div key={i} className="border-l-4 border-accent pl-4 py-2">
                  <p className="font-medium">{question}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
