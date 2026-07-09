import { useState } from 'react'
import CalendarPage from './pages/CalendarPage'
import CreateMeetingPage from './pages/CreateMeetingPage'
import RecommendTimePage from './pages/RecommendTimePage'
import RecommendDetailPage from './pages/RecommendDetailPage'
import CompletionPage from './pages/CompletionPage'

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

  if (page === 'recommend-detail') {
    return <RecommendDetailPage onNavigate={handleNavigate} meetingForm={meetingForm} selectedRec={meetingForm?.selectedRec} />
  }

  if (page === 'completion') {
    return <CompletionPage onNavigate={handleNavigate} meetingForm={meetingForm} selectedRec={meetingForm?.selectedRec} />
  }

  return <CalendarPage onNavigate={handleNavigate} />
}

export default App
