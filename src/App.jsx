import { useState } from 'react'
import CalendarPage from './pages/CalendarPage'
import CreateMeetingPage from './pages/CreateMeetingPage'
import RecommendTimePage from './pages/RecommendTimePage'

function App() {
  const [page, setPage] = useState('calendar')
  const [meetingForm, setMeetingForm] = useState(null)

  const handleNavigate = (pageName, formData) => {
    if (formData) setMeetingForm(formData)
    setPage(pageName)
  }

  if (page === 'create-meeting') {
    return <CreateMeetingPage onNavigate={handleNavigate} />
  }

  if (page === 'recommend-time') {
    return <RecommendTimePage onNavigate={handleNavigate} meetingForm={meetingForm} />
  }

  return <CalendarPage onNavigate={handleNavigate} />
}

export default App
