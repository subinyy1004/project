import { fonts, colors } from '../designTokens'
import { events } from '../data'
import Icon from './Icon'

const todayEvents = events[16]

export default function ScheduleSection({ onNavigate }) {
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
        {todayEvents.map((event, i) => (
          <div key={i}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 0',
                borderTop: i > 0 ? `1px solid ${colors.borderLighter}` : 'none',
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

              <div
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 11,
                  fontWeight: 400,
                  lineHeight: '16.5px',
                  color: colors.mutedText,
                  backgroundColor: colors.white,
                  padding: '2px 8px',
                  borderRadius: 100,
                }}
              >
                {event.status}
              </div>
            </div>
          </div>
        ))}
      </div>

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
          alignSelf: 'flex-end',
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
