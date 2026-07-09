import { fonts, colors, frame } from '../designTokens'
import Icon from '../components/Icon'
import BottomNav from '../components/BottomNav'
import StatusBar from '../components/StatusBar'

const requests = [
  {
    initial: '최',
    name: '최PM',
    message: '최PM이 회의를 요청했습니다',
    time: '방금 전',
  },
]

export default function MeetingsPage({ onNavigate }) {
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
      }}
    >
      <StatusBar />

      {/* Header */}
      <div
        style={{
          padding: '0 16px',
          paddingTop: 12,
          backgroundColor: colors.white,
        }}
      >
        <span
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 20,
            fontWeight: 700,
            lineHeight: '26px',
            color: colors.primaryText,
          }}
        >
          Meetings
        </span>
      </div>

      {/* Tab bar */}
      <div
        style={{
          margin: '12px 16px 0',
          borderBottom: `1px solid ${colors.borderLight}`,
          display: 'flex',
        }}
      >
        <div
          style={{
            flex: 1,
            paddingBottom: 12,
            borderBottom: `1.5px solid ${colors.primaryText}`,
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: fonts.pretendard,
              fontSize: 14,
              fontWeight: 700,
              lineHeight: '21px',
              color: colors.primaryText,
            }}
          >
            요청받은 회의
          </span>
        </div>
        <div
          style={{
            flex: 1,
            paddingBottom: 12,
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: fonts.pretendard,
              fontSize: 14,
              fontWeight: 400,
              lineHeight: '21px',
              color: colors.lightText,
            }}
          >
            내가 만든 회의
          </span>
        </div>
      </div>

      {/* Request list */}
      <div style={{ flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {requests.map((req, i) => (
          <div
            key={i}
            onClick={() => onNavigate('meeting-confirm')}
            style={{
              backgroundColor: '#F8F8F8',
              borderRadius: 12,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.borderLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 15,
                  fontWeight: 500,
                  lineHeight: '22.5px',
                  color: colors.tertiaryText,
                }}
              >
                {req.initial}
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: '21px',
                  color: colors.primaryText,
                }}
              >
                {req.message}
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
                {req.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeTab="meetings" onTabClick={(key) => onNavigate(key)} />
    </div>
  )
}
