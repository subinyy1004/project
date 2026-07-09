import { fonts, colors } from '../designTokens'
import { events } from '../data'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = []
  let week = []
  for (let i = 0; i < firstDay; i++) {
    week.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d)
    if (week.length === 7) {
      days.push(week)
      week = []
    }
  }
  if (week.length > 0) days.push(week)
  return days
}

export default function CalendarGrid({ year, month, selectedDay, onSelectDay }) {
  const weeks = getCalendarDays(year, month)

  return (
    <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex' }}>
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            style={{
              flex: 1,
              textAlign: 'center',
              fontFamily: fonts.pretendard,
              fontSize: 12,
              fontWeight: 400,
              lineHeight: '18px',
              color: colors.lightText,
              paddingBottom: 4,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {weeks.map((week, wi) => (
        <div key={wi} style={{ display: 'flex' }}>
          {week.map((day, di) => {
            if (day === null) {
              return <div key={`e-${di}`} style={{ flex: 1 }} />
            }

            const isSelected = day === selectedDay
            const dayEvents = events[day] || []

            return (
              <div
                key={day}
                onClick={() => onSelectDay(day)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: 4,
                  gap: 2,
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isSelected ? colors.primaryText : 'transparent',
                    transition: 'background-color 0.15s',
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.pretendard,
                      fontSize: 14,
                      fontWeight: isSelected ? 700 : 400,
                      lineHeight: '21px',
                      color: isSelected ? colors.white : colors.secondaryText,
                    }}
                  >
                    {day}
                  </span>
                </div>
                {dayEvents.length > 0 && (
                  <div style={{ display: 'flex', gap: 2 }}>
                    {dayEvents.map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: 2,
                          backgroundColor: colors.dotMarker,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
