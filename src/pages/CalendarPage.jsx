import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import CalendarHeader from '../components/CalendarHeader'
import CalendarGrid from '../components/CalendarGrid'
import AttendanceStatus from '../components/AttendanceStatus'
import ScheduleSection from '../components/ScheduleSection'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'
import { fonts, colors, frame } from '../designTokens'

export default function CalendarPage({ onNavigate, initialDate }) {
  const today = new Date()
  const initDate = initialDate ? new Date(initialDate + 'T00:00:00') : today
  const [currentYear, setCurrentYear] = useState(initDate.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(initDate.getMonth())
  const [selectedDay, setSelectedDay] = useState(initDate.getDate())

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(y => y - 1)
      setCurrentMonth(11)
    } else {
      setCurrentMonth(m => m - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(y => y + 1)
      setCurrentMonth(0)
    } else {
      setCurrentMonth(m => m + 1)
    }
  }

  const goToToday = () => {
    const now = new Date()
    setCurrentYear(now.getFullYear())
    setCurrentMonth(now.getMonth())
    setSelectedDay(now.getDate())
  }

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
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 48 }}>
        <CalendarHeader
          year={currentYear}
          month={currentMonth}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
          onToday={goToToday}
        />
        <CalendarGrid
          year={currentYear}
          month={currentMonth}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />
        <AttendanceStatus />
        <ScheduleSection selectedDay={selectedDay} />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 16px 12px',
        }}
      >
        <button
          onClick={() => onNavigate?.('create-meeting')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '12px 20px',
            backgroundColor: colors.primaryText,
            borderRadius: 28,
            boxShadow: '0 4px 16px rgba(0,0,0,0.20)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Icon name="add" size={20} color={colors.white} />
          <span
            style={{
              fontFamily: fonts.pretendard,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '21px',
              color: colors.white,
            }}
          >
            회의 만들기
          </span>
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
