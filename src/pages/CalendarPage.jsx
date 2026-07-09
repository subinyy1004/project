import StatusBar from '../components/StatusBar'
import CalendarHeader from '../components/CalendarHeader'
import CalendarGrid from '../components/CalendarGrid'
import AttendanceStatus from '../components/AttendanceStatus'
import ScheduleSection from '../components/ScheduleSection'
import BottomNav from '../components/BottomNav'
import { frame } from '../designTokens'

export default function CalendarPage({ onNavigate }) {
  return (
    <div
      style={{
        width: frame.width,
        minHeight: frame.height,
        backgroundColor: '#FFFFFF',
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
        <ScheduleSection onNavigate={onNavigate} />
      </div>
      <BottomNav />
    </div>
  )
}
