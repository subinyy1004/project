import { fonts, colors, frame } from '../designTokens'
import Icon from '../components/Icon'
import StatusBar from '../components/StatusBar'

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

export default function MeetingCompletePage({ onNavigate, meetingForm }) {
  const title = meetingForm?.title || '스프린트 회의'
  const dateLabel = formatDate(meetingForm?.startDate)
  const selectedTime = meetingForm?.selectedRec?.time || ''
  const dur = durationLabel(meetingForm?.selectedTime)
  const participants = [...(meetingForm?.mandatory || []), ...(meetingForm?.optional || [])]

  return (
    <div
      style={{
        width: frame.width,
        minHeight: frame.height,
        backgroundColor: '#F7F8F9',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 40,
        overflow: 'hidden',
      }}
    >
      <StatusBar />

      {/* NavHeader */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px',
          height: 56,
          backgroundColor: colors.white,
          borderBottom: `1px solid ${colors.borderLight}`,
          position: 'relative',
        }}
      >
        <div
          onClick={() => onNavigate('meeting-confirm')}
          style={{
            position: 'absolute',
            left: 16,
            cursor: 'pointer',
            display: 'flex',
          }}
        >
          <Icon name="arrow_back" size={24} color={colors.secondaryText} />
        </div>
        <span
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 16,
            fontWeight: 700,
            lineHeight: '20.8px',
            color: colors.primaryText,
          }}
        >
          회의가 확정되었습니다
        </span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        {/* Meeting info card */}
        <div
          style={{
            border: `1px solid ${colors.primaryText}`,
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: 24,
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
              {title}
            </div>
            {(dateLabel || selectedTime) && (
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
                  {dateLabel}{selectedTime ? ` ${selectedTime}` : ''}{dur ? ` (${dur})` : ''}
                </span>
              </div>
            )}
          </div>

          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="person" size={16} color={colors.lightText} />
              <span
                style={{
                  fontFamily: fonts.inter,
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: '21px',
                  color: colors.tertiaryText,
                }}
              >
                주최
              </span>
            </div>
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
                참석자 {participants.length}명
              </span>
            </div>
            {participants.length > 0 && (
              <div style={{ display: 'flex', gap: 6 }}>
                {participants.slice(0, 5).map((name, i) => (
                  <div
                    key={i}
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
                {participants.length > 5 && (
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
                      +{participants.length - 5}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* CTA buttons */}
        <button
          onClick={() => onNavigate('meetings')}
          style={{
            width: '100%',
            height: 56,
            backgroundColor: colors.primaryText,
            borderRadius: 12,
            border: 'none',
            cursor: 'pointer',
            fontFamily: fonts.pretendard,
            fontSize: 16,
            fontWeight: 600,
            lineHeight: '20.8px',
            color: colors.white,
            marginBottom: 8,
          }}
        >
          완료
        </button>
        <button
          onClick={() => onNavigate('calendar', { viewDate: meetingForm?.startDate })}
          style={{
            width: '100%',
            height: 56,
            backgroundColor: colors.white,
            borderRadius: 12,
            border: `1px solid ${colors.borderLight}`,
            cursor: 'pointer',
            fontFamily: fonts.pretendard,
            fontSize: 16,
            fontWeight: 600,
            lineHeight: '20.8px',
            color: colors.secondaryText,
          }}
        >
          캘린더에서 보기
        </button>
      </div>
    </div>
  )
}
