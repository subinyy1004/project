import { useState } from 'react'
import CalendarPage from './pages/CalendarPage'
import CreateMeetingPage from './pages/CreateMeetingPage'
import RecommendTimePage from './pages/RecommendTimePage'
import RecommendDetailPage from './pages/RecommendDetailPage'
import CompletionPage from './pages/CompletionPage'

function App() {
  const [page, setPage] = useState('calendar')
  const [meetingForm, setMeetingForm] = useState(null)
  const [viewDate, setViewDate] = useState(null)

  const handleNavigate = (pageName, formData) => {
    if (formData) {
      if (formData.viewDate) {
        setViewDate(formData.viewDate)
        const { viewDate: vd, ...rest } = formData
        if (Object.keys(rest).length > 0) setMeetingForm(prev => ({ ...prev, ...rest }))
      } else {
        setMeetingForm(prev => ({ ...prev, ...formData }))
      }
    }
    if (pageName === 'calendar' && !formData?.viewDate) {
      setViewDate(null)
    }
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

  return <CalendarPage onNavigate={handleNavigate} initialDate={viewDate} />
}

export default App
