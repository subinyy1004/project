import { useState } from 'react'
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

const formatDate = (iso) => {
  if (!iso) return ''
  const parts = iso.split('-')
  return `${parseInt(parts[1])}월 ${parseInt(parts[2])}일`
}

const durationLabel = (min) => {
  if (!min) return ''
  const h = Math.floor(min / 60)
  const m = min % 60
  if (h === 0) return `${m}분`
  if (m === 0) return `${h}시간`
  return `${h}시간 ${m}분`
}

export default function MeetingsPage({ onNavigate, myMeetings = [], confirmedRequests }) {
  const [tab, setTab] = useState('requested')

  const visibleRequests = requests.filter((_, i) => !confirmedRequests?.includes(i))
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
          onClick={() => setTab('requested')}
          style={{
            flex: 1,
            paddingBottom: 12,
            borderBottom: tab === 'requested' ? `1.5px solid ${colors.primaryText}` : '1.5px solid transparent',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              fontFamily: fonts.pretendard,
              fontSize: 14,
              fontWeight: tab === 'requested' ? 700 : 400,
              lineHeight: '21px',
              color: tab === 'requested' ? colors.primaryText : colors.lightText,
            }}
          >
            요청받은 회의
          </span>
        </div>
        <div
          onClick={() => setTab('mine')}
          style={{
            flex: 1,
            paddingBottom: 12,
            borderBottom: tab === 'mine' ? `1.5px solid ${colors.primaryText}` : '1.5px solid transparent',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              fontFamily: fonts.pretendard,
              fontSize: 14,
              fontWeight: tab === 'mine' ? 700 : 400,
              lineHeight: '21px',
              color: tab === 'mine' ? colors.primaryText : colors.lightText,
            }}
          >
            내가 만든 회의
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tab === 'requested' ? (
          visibleRequests.map((req) => {
            const reqIndex = requests.indexOf(req)
            return (
            <div
              key={reqIndex}
              onClick={() => onNavigate('meeting-confirm', { requestId: reqIndex })}
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
          )
        })
      ) : myMeetings.length > 0 ? myMeetings.map((mtg, i) => (
          <div
            key={i}
            onClick={() => onNavigate('calendar', { _viewOnly: mtg.date })}
            style={{
              border: `1px solid ${colors.primaryText}`,
              borderRadius: 16,
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                backgroundColor: colors.primaryText,
                padding: '14px 16px',
              }}
            >
              <div
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: '23.4px',
                  color: colors.white,
                  marginBottom: 6,
                }}
              >
                {mtg.title}
              </div>
              {mtg.date && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="schedule" size={16} color={colors.lightText} />
                  <span
                    style={{
                      fontFamily: fonts.pretendard,
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: '21px',
                      color: colors.border,
                    }}
                  >
                    {formatDate(mtg.date)}{mtg.duration ? ` ${mtg.duration}` : ''}
                  </span>
                </div>
              )}
            </div>
            {mtg.participants && mtg.participants.length > 0 && (
              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="group" size={16} color={colors.lightText} />
                  <span
                    style={{
                      fontFamily: fonts.pretendard,
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: '21px',
                      color: colors.tertiaryText,
                    }}
                  >
                    참석자 {mtg.participants.length}명
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {mtg.participants.slice(0, 5).map((name, j) => (
                    <div
                      key={j}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: colors.borderLight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: fonts.pretendard,
                          fontSize: 11,
                          fontWeight: 500,
                          lineHeight: '16.5px',
                          color: colors.tertiaryText,
                        }}
                      >
                        {name[0]}
                      </span>
                    </div>
                  ))}
                  {mtg.participants.length > 5 && (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: colors.border,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: fonts.pretendard,
                          fontSize: 11,
                          fontWeight: 500,
                          lineHeight: '16.5px',
                          color: colors.tertiaryText,
                        }}
                      >
                        +{mtg.participants.length - 5}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
              아직 만든 회의가 없습니다.
            </span>
          </div>
        )}
      </div>

      <BottomNav activeTab="meetings" onTabClick={(key) => onNavigate(key)} />
    </div>
  )
}
