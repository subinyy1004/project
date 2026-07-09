import { useState } from 'react'
import CalendarPage from './pages/CalendarPage'
import CreateMeetingPage from './pages/CreateMeetingPage'
import RecommendTimePage from './pages/RecommendTimePage'

function App() {
  const [page, setPage] = useState('calendar')

  if (page === 'create-meeting') {
    return <CreateMeetingPage onNavigate={setPage} />
  }

  if (page === 'recommend-time') {
    return <RecommendTimePage onNavigate={setPage} />
  }

  return <CalendarPage onNavigate={setPage} />
}

export default App
