import { useState } from 'react'
import CalendarPage from './pages/CalendarPage'
import CreateMeetingPage from './pages/CreateMeetingPage'

function App() {
  const [page, setPage] = useState('calendar')

  if (page === 'create-meeting') {
    return <CreateMeetingPage onNavigate={setPage} />
  }

  return <CalendarPage onNavigate={setPage} />
}

export default App
