import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'


export const uploadResume = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    const response = await axios.post(`${API_BASE}/resume/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}

export const analyzeResume = async (resumeId) => {
  try {
    const response = await axios.get(`${API_BASE}/resume/analyze/${resumeId}`)
    return response.data
  } catch (error) {
    console.error('Analysis error:', error)
    throw error
  }
}

export const generateSuggestions = async (resumeId) => {
  try {
    const response = await axios.get(`${API_BASE}/resume/suggestions/${resumeId}`)
    return response.data
  } catch (error) {
    console.error('Suggestions error:', error)
    throw error
  }
}

export const generateInterviewQuestions = async (resumeId) => {
  try {
    const response = await axios.get(`${API_BASE}/interview/generate/${resumeId}`)
    return response.data
  } catch (error) {
    console.error('Interview questions error:', error)
    throw error
  }
}
