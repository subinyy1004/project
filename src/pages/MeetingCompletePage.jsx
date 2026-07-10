import { fonts, colors, frame } from '../designTokens'
import Icon from '../components/Icon'
import BottomNav from '../components/BottomNav'
import StatusBar from '../components/StatusBar'

export default function MeetingCompletePage({ onNavigate, meetingForm }) {
  const title = meetingForm?.title || '스프린트 회고'
  const dateLabel = meetingForm?.startDate
    ? (() => { const p = meetingForm.startDate.split('-'); return `${parseInt(p[1])}월 ${parseInt(p[2])}일` })()
    : '7월 19일'
  const selectedTime = meetingForm?.selectedRec?.time || '15:00 – 16:00'
  const dur = meetingForm?.selectedTime || 60
  const durLabel = dur >= 60 ? `${dur / 60}시간` : '30분'
  const participants = [...(meetingForm?.mandatory || []), ...(meetingForm?.optional || [])]
  const participantCount = participants.length || 6
  const requestId = meetingForm?.requestId
  const startDate = meetingForm?.startDate || '2026-07-19'
  const timeSlot = meetingForm?.selectedRec?.time || '15:00 – 16:00'
  const selectedOption = meetingForm?.selectedOption
  const isDecline = selectedOption === 'decline'
  const calendarData = isDecline
    ? {}
    : { _confirmComplete: requestId, _date: startDate, _time: timeSlot.split(' – ')[0], _duration: timeSlot }

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

      {/* Spacer for nav header area */}
      <div style={{ height: 56 }} />

      {/* Body */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        {/* check_circle icon */}
        <Icon name="check_circle" size={48} color="#22C559" />
        <div style={{ height: 16 }} />

        {/* Title */}
        <div
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 24,
            fontWeight: 700,
            lineHeight: '31.2px',
            color: '#111111',
            textAlign: 'center',
          }}
        >
          {isDecline ? '참석 여부를 전달했습니다' : '회의가 확정되었습니다'}
        </div>
        <div style={{ height: 8 }} />

        {/* Description */}
        <div
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '21px',
            color: '#AAAAAA',
            textAlign: 'center',
          }}
        >
          {isDecline ? '회의 불참 의사를 전달했습니다.' : '참석자 모두에게 알림을 보냈습니다'}
        </div>
        <div style={{ height: 24 }} />

        {/* Meeting info card */}
        {!isDecline && (
        <div
          style={{
            width: '100%',
            borderRadius: 12,
            border: `1px solid #E4E4E4`,
            overflow: 'hidden',
          }}
        >
          {/* Title - gray bg */}
          <div
            style={{
              backgroundColor: '#F8F8F8',
              padding: '14px 20px',
            }}
          >
            <span
              style={{
                fontFamily: fonts.pretendard,
                fontSize: 18,
                fontWeight: 700,
                lineHeight: '23.4px',
                color: '#111111',
              }}
            >
              {title}
            </span>
          </div>

          {/* Content - white bg */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px' }}>
            {/* Time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="schedule" size={20} color="#AAAAAA" />
              <span
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 15,
                  fontWeight: 400,
                  lineHeight: '22.5px',
                  color: '#333333',
                }}
              >
                {dateLabel} {selectedTime} ({durLabel})
              </span>
            </div>

            <div style={{ height: 1, backgroundColor: '#E4E4E4', marginTop: 12, marginBottom: 12 }} />

            {/* Participant count */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="group" size={20} color="#AAAAAA" />
              <span
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 15,
                  fontWeight: 400,
                  lineHeight: '22.5px',
                  color: '#333333',
                }}
              >
                {participantCount}명 참석 확정
              </span>
            </div>

            <div style={{ height: 1, backgroundColor: '#E4E4E4', marginTop: 12, marginBottom: 12 }} />

            {/* Organizer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="person" size={20} color="#AAAAAA" />
              <span
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 15,
                  fontWeight: 400,
                  lineHeight: '22.5px',
                  color: '#333333',
                }}
              >
                주최: 최PM
              </span>
            </div>

            <div style={{ height: 1, backgroundColor: '#E4E4E4', marginTop: 12, marginBottom: 12 }} />

            {/* Avatars */}
            <div style={{ display: 'flex', gap: 4 }}>
              {['김', '박', '이', '최', '정'].map((init, i) => (
                <div
                  key={i}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: '#E4E4E4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.pretendard,
                      fontSize: 12,
                      fontWeight: 500,
                      lineHeight: '18px',
                      color: '#555555',
                    }}
                  >
                    {init}
                  </span>
                </div>
              ))}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#D4D4D4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: '18px',
                    color: '#555555',
                  }}
                >
                  +{participantCount > 5 ? participantCount - 5 : 1}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA area */}
      <div
        style={{
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <button
          onClick={() => onNavigate('meetings', calendarData)}
          style={{
            width: '100%',
            height: 56,
            backgroundColor: '#111111',
            borderRadius: 12,
            border: 'none',
            cursor: 'pointer',
            fontFamily: fonts.pretendard,
            fontSize: 16,
            fontWeight: 600,
            lineHeight: '20.8px',
            color: '#FFFFFF',
          }}
        >
          완료
        </button>
        <button
          onClick={() => onNavigate('calendar', isDecline ? {} : { viewDate: startDate, ...calendarData })}
          style={{
            width: '100%',
            height: 56,
            backgroundColor: 'transparent',
            borderRadius: 12,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            fontFamily: fonts.pretendard,
            fontSize: 16,
            fontWeight: 600,
            lineHeight: '20.8px',
            color: '#333333',
          }}
        >
          <Icon name="event_available" size={18} color="#555555" />
          캘린더에서 보기
        </button>
      </div>

      <BottomNav activeTab="meetings" onTabClick={(key) => onNavigate(key)} />
    </div>
  )
}
