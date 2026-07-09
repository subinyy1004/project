import { useMemo } from 'react'
import { fonts, colors, frame } from '../designTokens'
import Icon from '../components/Icon'
import BottomNav from '../components/BottomNav'
import StatusBar from '../components/StatusBar'

const baseRecommendations = [
  {
    rank: 1,
    start: '15:00',
    stars: 5,
    mandatoryAvail: 3,
    optionalAvail: 2,
    title: '스프린트 회고',
    mandatoryParticipants: [
      { name: '김디자이너', role: '디자이너', status: '편하게 가능', icon: 'check_circle', iconColor: '#3182F6', badgeBg: '#E8F1FF', textColor: '#0050C3' },
      { name: '박엔지니어', role: '엔지니어', status: '편하게 가능', icon: 'check_circle', iconColor: '#3182F6', badgeBg: '#E8F1FF', textColor: '#0050C3' },
      { name: '이PM', role: 'PM', status: '편하게 가능', icon: 'check_circle', iconColor: '#3182F6', badgeBg: '#E8F1FF', textColor: '#0050C3' },
    ],
    optionalParticipants: [
      { name: '최QA', role: 'QA', status: '편하게 가능', icon: 'check_circle', iconColor: '#3182F6', badgeBg: '#E8F1FF', textColor: '#0050C3' },
      { name: '정디자이너', role: '디자이너', status: '조정 가능', icon: 'radio_button_checked', iconColor: '#E17100', badgeBg: '#FEE685', textColor: '#E17100' },
      { name: '한엔지니어', role: '엔지니어', status: '어렵습니다', icon: 'cancel', iconColor: '#EF4444', badgeBg: '#FEF2F2', textColor: '#991B1B' },
    ],
  },
  {
    rank: 2,
    start: '10:00',
    stars: 4,
    mandatoryAvail: 2,
    optionalAvail: 1,
    title: '스프린트 회고',
    mandatoryParticipants: [
      { name: '김디자이너', role: '디자이너', status: '편하게 가능', icon: 'check_circle', iconColor: '#3182F6', badgeBg: '#E8F1FF', textColor: '#0050C3' },
      { name: '박엔지니어', role: '엔지니어', status: '편하게 가능', icon: 'check_circle', iconColor: '#3182F6', badgeBg: '#E8F1FF', textColor: '#0050C3' },
      { name: '이PM', role: 'PM', status: '어렵습니다', icon: 'cancel', iconColor: '#EF4444', badgeBg: '#FEF2F2', textColor: '#991B1B' },
    ],
    optionalParticipants: [
      { name: '최QA', role: 'QA', status: '조정 가능', icon: 'radio_button_checked', iconColor: '#E17100', badgeBg: '#FEE685', textColor: '#E17100' },
      { name: '정디자이너', role: '디자이너', status: '어렵습니다', icon: 'cancel', iconColor: '#EF4444', badgeBg: '#FEF2F2', textColor: '#991B1B' },
      { name: '한엔지니어', role: '엔지니어', status: '어렵습니다', icon: 'cancel', iconColor: '#EF4444', badgeBg: '#FEF2F2', textColor: '#991B1B' },
    ],
  },
  {
    rank: 3,
    start: '16:30',
    stars: 2,
    mandatoryAvail: 1,
    optionalAvail: 2,
    title: '스프린트 회고',
    mandatoryParticipants: [
      { name: '김디자이너', role: '디자이너', status: '편하게 가능', icon: 'check_circle', iconColor: '#3182F6', badgeBg: '#E8F1FF', textColor: '#0050C3' },
      { name: '박엔지니어', role: '엔지니어', status: '어렵습니다', icon: 'cancel', iconColor: '#EF4444', badgeBg: '#FEF2F2', textColor: '#991B1B' },
      { name: '이PM', role: 'PM', status: '어렵습니다', icon: 'cancel', iconColor: '#EF4444', badgeBg: '#FEF2F2', textColor: '#991B1B' },
    ],
    optionalParticipants: [
      { name: '최QA', role: 'QA', status: '편하게 가능', icon: 'check_circle', iconColor: '#3182F6', badgeBg: '#E8F1FF', textColor: '#0050C3' },
      { name: '정디자이너', role: '디자이너', status: '편하게 가능', icon: 'check_circle', iconColor: '#3182F6', badgeBg: '#E8F1FF', textColor: '#0050C3' },
      { name: '한엔지니어', role: '엔지니어', status: '어렵습니다', icon: 'cancel', iconColor: '#EF4444', badgeBg: '#FEF2F2', textColor: '#991B1B' },
    ],
  },
]

function addMinutes(time, minutes) {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + minutes
  const nh = Math.floor(total / 60)
  const nm = total % 60
  return `${String(nh).padStart(2, '0')}:${String(nm).padStart(2, '0')}`
}

export default function RecommendTimePage({ onNavigate, meetingForm }) {
  const totalPeople = (meetingForm?.mandatory?.length || 0) + (meetingForm?.optional?.length || 0)
  const mTotal = meetingForm?.mandatory?.length || 3
  const oTotal = meetingForm?.optional?.length || 3
  const duration = meetingForm?.selectedTime || 60

  const recommendations = useMemo(() =>
    baseRecommendations.map(r => ({
      ...r,
      time: `${r.start} – ${addMinutes(r.start, duration)}`,
    })),
  [duration])
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

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '0 16px',
          height: 56,
          backgroundColor: colors.white,
          borderBottom: `1px solid ${colors.borderLight}`,
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
          onClick={() => onNavigate('create-meeting')}
        >
          <Icon name="arrow_back" size={24} color={colors.secondaryText} />
          <span
            style={{
              fontFamily: fonts.pretendard,
              fontSize: 16,
              fontWeight: 700,
              lineHeight: '20.8px',
              color: colors.primaryText,
            }}
          >
            추천 시간
          </span>
        </div>
      </div>

      {/* Notice bar */}
      <div
        style={{
          backgroundColor: '#F8F8F8',
          borderBottom: `1px solid ${colors.borderLight}`,
          padding: '12px 16px',
        }}
      >
        <span
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '21px',
            color: colors.primaryText,
          }}
        >
          {totalPeople}명
        </span>
        <span
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '21px',
            color: colors.lightText,
          }}
        >
          참석 상황 분석 완료
        </span>
      </div>

      {/* Recommendation cards */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          padding: '16px',
          backgroundColor: '#F8F8F8',
        }}
      >
        {recommendations.map((rec, i) => (
          <div
            key={i}
            onClick={() => onNavigate('recommend-detail', { selectedRec: rec })}
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${i === 0 ? colors.primaryText : colors.borderLight}`,
              borderRadius: 12,
              padding: 16,
              cursor: 'pointer',
            }}
          >
            {/* Top row: rank badge + stars */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: i === 0 ? colors.primaryText : colors.borderLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.pretendard,
                      fontSize: 12,
                      fontWeight: 700,
                      lineHeight: '18px',
                      color: i === 0 ? colors.white : colors.primaryText,
                    }}
                  >
                    {rec.rank}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 11,
                    fontWeight: 400,
                    lineHeight: '16.5px',
                    color: colors.lightText,
                  }}
                >
                  추천
                </span>
              </div>

              <div style={{ display: 'flex', gap: 1 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Icon
                    key={s}
                    name={s <= rec.stars ? 'star' : 'star_border'}
                    size={16}
                    color={s <= rec.stars ? colors.primaryText : colors.border}
                  />
                ))}
              </div>
            </div>

            {/* Time */}
            <div
              style={{
                fontFamily: fonts.pretendard,
                fontSize: 24,
                fontWeight: 700,
                lineHeight: '31.2px',
                color: colors.primaryText,
                marginBottom: 8,
              }}
            >
              {rec.time}
            </div>

            {/* Attendance badges */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <div
                style={{
                  padding: '4px 12px',
                  backgroundColor: '#F8F8F8',
                  border: `1px solid ${colors.borderLight}`,
                  borderRadius: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: '18px',
                    color: colors.primaryText,
                  }}
                >
                  필수 {rec.mandatoryAvail}/{mTotal}명 가능
                </span>
              </div>
              <div
                style={{
                  padding: '4px 12px',
                  backgroundColor: '#F8F8F8',
                  border: `1px solid ${colors.borderLight}`,
                  borderRadius: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: '18px',
                    color: colors.primaryText,
                  }}
                >
                  선택 {rec.optionalAvail}/{oTotal}명 가능
                </span>
              </div>
            </div>

            {/* View attendees link */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
              <span
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: '18px',
                  color: colors.lightText,
                }}
              >
                참석자 보기
              </span>
              <Icon name="expand_more" size={16} color={colors.lightText} />
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeTab="calendar" onTabClick={(key) => onNavigate(key)} />
    </div>
  )
}
