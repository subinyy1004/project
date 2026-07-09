import { fonts, colors, frame } from '../designTokens'
import Icon from '../components/Icon'
import BottomNav from '../components/BottomNav'
import StatusBar from '../components/StatusBar'

const personLookup = [
  { name: '김디자이너', role: '디자이너' },
  { name: '박엔지니어', role: '엔지니어' },
  { name: '이PM', role: 'PM' },
  { name: '최QA', role: 'QA' },
  { name: '정디자이너', role: '디자이너' },
  { name: '한엔지니어', role: '엔지니어' },
  { name: '윤운영', role: '운영' },
  { name: '강기획', role: '기획' },
  { name: '서마케팅', role: '마케팅' },
  { name: '조엔지니어', role: '개발' },
  { name: '류디자이너', role: '디자인' },
  { name: '문QA', role: 'QA' },
]

const defaultStatus = { status: '편하게 가능', icon: 'check_circle', iconColor: '#3182F6', badgeBg: '#E8F1FF', textColor: '#0050C3' }

function buildParticipants(names, recParticipants) {
  return names.map(name => {
    const person = personLookup.find(p => p.name === name)
    const matched = recParticipants.find(p => p.name === name)
    return {
      name,
      role: person?.role || '',
      ...(matched || defaultStatus),
    }
  })
}

function ParticipantRow({ p }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '14px 0',
        margin: '0 16px',
        borderBottom: `1px solid #F0F0F0`,
        gap: 12,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#E4E4E4',
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
            color: colors.primaryText,
          }}
        >
          {p.name[0]}
        </span>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 15,
            fontWeight: 500,
            lineHeight: '22.5px',
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

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '4px 8px',
          backgroundColor: p.badgeBg,
          borderRadius: 100,
          flexShrink: 0,
        }}
      >
        <Icon name={p.icon} size={14} color={p.iconColor} />
        <span
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 12,
            fontWeight: 500,
            lineHeight: '18px',
            color: p.textColor,
          }}
        >
          {p.status}
        </span>
      </div>
    </div>
  )
}

export default function RecommendDetailPage({ onNavigate, meetingForm, selectedRec }) {
  const rec = selectedRec
  if (!rec) return null

  const mandatoryParticipants = buildParticipants(meetingForm?.mandatory || [], mandatoryParticipants || [])
  const optionalParticipants = buildParticipants(meetingForm?.optional || [], optionalParticipants || [])

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

      {/* NavHeader */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '0 16px',
          height: 56,
          backgroundColor: colors.white,
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
          onClick={() => onNavigate('recommend-time')}
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
            추천 상세
          </span>
        </div>
      </div>

      {/* Content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header card (black bg) */}
        <div
          style={{
            backgroundColor: '#111111',
            padding: '16px 16px 20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {/* Stars + rank label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Icon key={s} name="star" size={14} color="#FFFFFF" />
            ))}
            <span
              style={{
                fontFamily: fonts.pretendard,
                fontSize: 12,
                fontWeight: 400,
                lineHeight: '18px',
                color: '#AAAAAA',
                marginLeft: 2,
              }}
            >
              {rec.rank}위 추천
            </span>
          </div>

          {/* Time */}
          <div
            style={{
              fontFamily: fonts.pretendard,
              fontSize: 24,
              fontWeight: 700,
              lineHeight: '31.2px',
              color: '#FFFFFF',
            }}
          >
            {rec.time}
          </div>

          {/* Title container */}
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: '6px 12px',
              alignSelf: 'flex-start',
            }}
          >
            <span
              style={{
                fontFamily: fonts.pretendard,
                fontSize: 13,
                fontWeight: 400,
                lineHeight: '19.5px',
                color: '#D4D4D4',
              }}
            >
              {meetingForm?.title || rec.title}
            </span>
          </div>
        </div>

        {/* Participant list (scrollable) */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {/* Mandatory section */}
          <div
            style={{
              backgroundColor: '#F8F8F8',
              borderBottom: '1px solid #E4E4E4',
              borderTop: `1px solid ${colors.borderLight}`,
              padding: '8px 16px',
            }}
          >
            <span
              style={{
                fontFamily: fonts.pretendard,
                fontSize: 14,
                fontWeight: 700,
                lineHeight: '21px',
                color: colors.secondaryText,
              }}
            >
              필수 참석자 {mandatoryParticipants.length}명
            </span>
          </div>

          <div>
            {mandatoryParticipants.map((p, i) => (
              <ParticipantRow key={i} p={p} />
            ))}
          </div>

          {/* Optional section */}
          <div
            style={{
              backgroundColor: '#F8F8F8',
              borderBottom: '1px solid #E4E4E4',
              borderTop: `1px solid ${colors.borderLight}`,
              padding: '8px 16px',
            }}
          >
            <span
              style={{
                fontFamily: fonts.pretendard,
                fontSize: 14,
                fontWeight: 700,
                lineHeight: '21px',
                color: colors.secondaryText,
              }}
            >
              선택 참석자 {optionalParticipants.length}명
            </span>
          </div>

          <div>
            {optionalParticipants.map((p, i) => (
              <ParticipantRow key={i} p={p} />
            ))}
          </div>
        </div>

        {/* CTA area */}
        <div
          style={{
            padding: 16,
            borderTop: `1px solid ${colors.borderLight}`,
          }}
        >
          <button
            onClick={() => onNavigate('completion')}
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
            이 시간으로 회의 생성
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
