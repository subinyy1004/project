import { fonts, colors, frame } from '../designTokens'
import Icon from '../components/Icon'
import BottomNav from '../components/BottomNav'
import StatusBar from '../components/StatusBar'

const personLookup = [
  { initial: '김', name: '김디자이너', role: '디자이너' },
  { initial: '박', name: '박엔지니어', role: '엔지니어' },
  { initial: '이', name: '이PM', role: 'PM' },
  { initial: '최', name: '최QA', role: 'QA' },
  { initial: '정', name: '정디자이너', role: '디자이너' },
  { initial: '한', name: '한엔지니어', role: '엔지니어' },
]

function findPerson(name) {
  return personLookup.find(p => p.name === name) || { initial: name[0], name, role: '' }
}

export default function CompletionPage({ onNavigate, meetingForm, selectedRec }) {
  const rec = selectedRec
  const title = meetingForm?.title || rec?.title || '스프린트 회의'
  const time = rec?.time || '15:00 – 16:00'
  const dur = meetingForm?.selectedTime || 60
  const durLabel = dur >= 60 ? `${dur / 60}시간` : '30분'

  const mandatoryNames = meetingForm?.mandatory || []
  const optionalNames = meetingForm?.optional || []
  const allNames = [...mandatoryNames, ...optionalNames]
  const participantList = allNames.map(findPerson)
  const totalPeople = participantList.length

  const dateStr = meetingForm?.startDate
    ? (() => {
        const p = meetingForm.startDate.split('-')
        return `${parseInt(p[1])}월 ${parseInt(p[2])}일`
      })()
    : '7월 19일'

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

      {/* Close button area */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: 56,
          padding: '0 16px',
        }}
      >
        <div
          onClick={() => onNavigate('calendar')}
          style={{ cursor: 'pointer', display: 'flex' }}
        >
          <Icon name="close" size={24} color={colors.tertiaryText} />
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px' }}>
        {/* Success icon */}
        <div style={{ marginTop: 20, marginBottom: 16 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: colors.primaryText,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="check" size={40} color={colors.white} />
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 22,
            fontWeight: 700,
            lineHeight: '33px',
            color: colors.primaryText,
            textAlign: 'center',
            marginBottom: 4,
          }}
        >
          회의 요청을 보냈습니다
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '22.4px',
            color: colors.mutedText,
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          참석자들이 확인하면
          <br />
          알림으로 알려드릴게요
        </div>

        {/* Meeting info card */}
        <div
          style={{
            width: '100%',
            border: `1px solid ${colors.borderLight}`,
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: 12,
          }}
        >
          {/* Black header */}
          <div
            style={{
              backgroundColor: colors.primaryText,
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                fontFamily: fonts.pretendard,
                fontSize: 17,
                fontWeight: 700,
                lineHeight: '25.5px',
                color: colors.white,
                marginBottom: 4,
              }}
            >
              {title}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
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
                {dateStr} {time} ({durLabel})
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="group" size={16} color={colors.lightText} />
              <span
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: '21px',
                  color: colors.border,
                }}
              >
                참석자 {totalPeople}명
              </span>
            </div>
          </div>

          {/* Response status */}
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${colors.borderLighter}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: '19.5px',
                  color: colors.secondaryText,
                }}
              >
                응답 현황
              </span>
              <span
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: '18px',
                  color: colors.lightText,
                }}
              >
                0 / {totalPeople}명 응답
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: 6,
                backgroundColor: colors.borderLight,
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: 0,
                  height: '100%',
                  backgroundColor: colors.primaryText,
                  borderRadius: 3,
                }}
              />
            </div>
          </div>

          {/* Participant list */}
          <div>
            {participantList.map((p, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 16px',
                  borderBottom: i < participantList.length - 1 ? `1px solid #F8F8F8` : 'none',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: colors.borderLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.inter,
                      fontSize: 12,
                      fontWeight: 600,
                      lineHeight: '18px',
                      color: colors.tertiaryText,
                    }}
                  >
                    {p.initial}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: fonts.pretendard,
                      fontSize: 14,
                      fontWeight: 500,
                      lineHeight: '21px',
                      color: colors.primaryText,
                    }}
                  >
                    {p.name}
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
                    {p.role}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Icon name="hourglass_empty" size={12} color={colors.mutedText} />
                  <span
                    style={{
                      fontFamily: fonts.pretendard,
                      fontSize: 11,
                      fontWeight: 400,
                      lineHeight: '16.5px',
                      color: colors.mutedText,
                    }}
                  >
                    대기 중
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info notice */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#F8F8F8',
            borderRadius: 12,
            padding: '12px 16px',
            display: 'flex',
            gap: 8,
            marginBottom: 16,
            boxSizing: 'border-box',
          }}
        >
          <Icon name="info_outline" size={16} color={colors.lightText} style={{ flexShrink: 0, marginTop: 2 }} />
          <span
            style={{
              fontFamily: fonts.inter,
              fontSize: 12,
              fontWeight: 400,
              lineHeight: '18px',
              color: colors.mutedText,
            }}
          >
            참석자가 조정을 요청하면 알림을 받습니다. 그 전까지 회의는 임시 확정 상태입니다.
          </span>
        </div>

        {/* Spacer for CTA */}
        <div style={{ height: 16 }} />
      </div>

      {/* CTA area */}
      <div
        style={{
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <button
          onClick={() => onNavigate('calendar', { _saveMeeting: true })}
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
          }}
        >
          홈으로 돌아가기
        </button>
        <button
          onClick={() => onNavigate('calendar', { viewDate: meetingForm?.startDate })}
          style={{
            width: '100%',
            height: 56,
            backgroundColor: colors.white,
            border: `1px solid ${colors.borderLight}`,
            borderRadius: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            fontFamily: fonts.pretendard,
            fontSize: 16,
            fontWeight: 600,
            lineHeight: '20.8px',
            color: colors.secondaryText,
          }}
        >
          <Icon name="event_available" size={18} color={colors.tertiaryText} />
          회의 목록에서 보기
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
