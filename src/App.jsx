import StatusBar from './components/StatusBar'
import CalendarHeader from './components/CalendarHeader'
import CalendarGrid from './components/CalendarGrid'
import AttendanceStatus from './components/AttendanceStatus'
import ScheduleSection from './components/ScheduleSection'
import BottomNav from './components/BottomNav'
import { frame } from './designTokens'

function App() {
  return (
    <div
      style={{
        width: frame.width,
        minHeight: frame.height,
        backgroundColor: '#FFFFFF',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 40,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <CalendarHeader />
        <CalendarGrid />
        <AttendanceStatus />
        <ScheduleSection />
      </div>
      <BottomNav />
    </div>
  )
}

export default App
