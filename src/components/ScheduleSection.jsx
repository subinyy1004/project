import { useState } from 'react'
import { fonts, colors } from '../designTokens'
import Icon from './Icon'
import { events } from '../data'

export default function ScheduleSection({ selectedDay, currentYear, currentMonth, newMeetings = [] }) {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const dayEvents = events[selectedDay] || []
  const dayNewMeetings = newMeetings.filter(m => {
    const d = new Date(m.date + 'T00:00:00')
    return !isNaN(d.getTime()) && d.getDate() === selectedDay && d.getMonth() === currentMonth && d.getFullYear() === currentYear
  })

  const allEvents = [...dayEvents, ...dayNewMeetings.map(m => ({
    time: m.time,
    title: m.title,
    duration: m.duration,
    status: m.status,
    organizer: m.organizer,
    mandatory: m.mandatory,
    optional: m.optional,
  }))].sort((a, b) => a.time.localeCompare(b.time))

  const openDetail = (event) => setSelectedEvent(event)

  return (
    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SectionLabel text="오늘 일정" />

      <div
        style={{
          borderRadius: 12,
          padding: '8px 16px',
          backgroundColor: colors.white,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {allEvents.map((event, i) => (
          <div key={i}>
            <div
              onClick={() => openDetail(event)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 0',
                borderTop: i > 0 ? `1px solid ${colors.borderLighter}` : 'none',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: '18px',
                  color: colors.lightText,
                  width: 40,
                  flexShrink: 0,
                }}
              >
                {event.time}
              </span>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '21px',
                    color: colors.primaryText,
                  }}
                >
                  {event.title}
                </div>
                <div
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: '18px',
                    color: colors.lightText,
                  }}
                >
                  {event.duration}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div
          onClick={() => setSelectedEvent(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: colors.white,
              borderRadius: 20,
              padding: 28,
              width: 320,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: fonts.pretendard, fontSize: 18, fontWeight: 700, lineHeight: '26px', color: colors.primaryText }}>
                {selectedEvent.title}
              </span>
              <div onClick={() => setSelectedEvent(null)} style={{ cursor: 'pointer', display: 'flex' }}>
                <Icon name="close" size={20} color={colors.mutedText} />
              </div>
            </div>

            <div style={{ height: 1, backgroundColor: colors.borderLight }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <DetailRow label="주최자" value={selectedEvent.organizer || '-'} />
              <DetailRow
                label="참석자"
                value={[...(selectedEvent.mandatory || []), ...(selectedEvent.optional || [])].join(', ') || '-'}
              />
              <DetailRow label="날짜" value={`${currentYear}년 ${currentMonth + 1}월 ${selectedDay}일`} />
              <DetailRow label="시간" value={`${selectedEvent.time} (${selectedEvent.duration})`} />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontFamily: fonts.pretendard, fontSize: 11, fontWeight: 600, lineHeight: '16.5px', color: colors.lightText }}>
        {label}
      </span>
      <span style={{ fontFamily: fonts.pretendard, fontSize: 14, fontWeight: 500, lineHeight: '21px', color: colors.primaryText }}>
        {value}
      </span>
    </div>
  )
}

function SectionLabel({ text }) {
  return (
    <div
      style={{
        fontFamily: fonts.pretendard,
        fontSize: 14,
        fontWeight: 700,
        lineHeight: '18.2px',
        letterSpacing: '0.88px',
        color: colors.lightText,
      }}
    >
      {text}
    </div>
  )
}
