import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import CalendarHeader from '../components/CalendarHeader'
import CalendarGrid from '../components/CalendarGrid'
import AttendanceStatus from '../components/AttendanceStatus'
import ScheduleSection from '../components/ScheduleSection'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'
import { fonts, colors, frame } from '../designTokens'

const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

export default function CalendarPage({ onNavigate, initialDate, newMeetings, attendanceStatus, onAttendanceChange }) {
  const today = new Date()
  const initDate = initialDate ? new Date(initialDate + 'T00:00:00') : today
  const [currentYear, setCurrentYear] = useState(initDate.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(initDate.getMonth())
  const [selectedDay, setSelectedDay] = useState(initDate.getDate())
  const [showPicker, setShowPicker] = useState(false)

  const startYear = currentYear - 5
  const years = Array.from({ length: 11 }, (_, i) => startYear + i)

  const selectMonthYear = (y, m) => {
    setCurrentYear(y)
    setCurrentMonth(m)
    setShowPicker(false)
  }

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
      {showPicker && (
        <div
          onClick={() => setShowPicker(false)}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: 160,
            borderRadius: 40,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: colors.white,
              borderRadius: 20,
              padding: 24,
              width: 280,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <div
                onClick={() => setCurrentYear(y => y - 1)}
                style={{ cursor: 'pointer', display: 'flex' }}
              >
                <Icon name="chevron_left" size={20} color={colors.mutedText} />
              </div>
              <span style={{ fontFamily: fonts.pretendard, fontSize: 18, fontWeight: 700, color: colors.primaryText, minWidth: 80, textAlign: 'center' }}>
                {currentYear}년
              </span>
              <div
                onClick={() => setCurrentYear(y => y + 1)}
                style={{ cursor: 'pointer', display: 'flex' }}
              >
                <Icon name="chevron_right" size={20} color={colors.mutedText} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {MONTHS.map((m, i) => (
                <div
                  key={i}
                  onClick={() => selectMonthYear(currentYear, i)}
                  style={{
                    padding: '8px 0',
                    textAlign: 'center',
                    borderRadius: 8,
                    cursor: 'pointer',
                    backgroundColor: i === currentMonth ? colors.primaryText : 'transparent',
                    color: i === currentMonth ? colors.white : colors.primaryText,
                    fontFamily: fonts.pretendard,
                    fontSize: 14,
                    fontWeight: i === currentMonth ? 600 : 400,
                  }}
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 48 }}>
        <CalendarHeader
          year={currentYear}
          month={currentMonth}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
          onToday={goToToday}
          onMonthYearClick={() => setShowPicker(true)}
        />
        <CalendarGrid
          year={currentYear}
          month={currentMonth}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          newMeetings={newMeetings}
        />
        <AttendanceStatus attendanceStatus={attendanceStatus} onAttendanceChange={onAttendanceChange} />
        <ScheduleSection selectedDay={selectedDay} currentYear={currentYear} currentMonth={currentMonth} newMeetings={newMeetings} />
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

      <BottomNav activeTab="calendar" onTabClick={(key) => onNavigate(key)} />
    </div>
  )
}
