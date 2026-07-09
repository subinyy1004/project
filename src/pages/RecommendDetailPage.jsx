import { fonts, colors, frame } from '../designTokens'
import Icon from '../components/Icon'
import BottomNav from '../components/BottomNav'
import StatusBar from '../components/StatusBar'

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
              {rec.title}
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
              필수 참석자 {rec.mandatoryParticipants.length}명
            </span>
          </div>

          <div>
            {rec.mandatoryParticipants.map((p, i) => (
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
              선택 참석자 {rec.optionalParticipants.length}명
            </span>
          </div>

          <div>
            {rec.optionalParticipants.map((p, i) => (
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
            onClick={() => {/* 06_Calendar placeholder */}}
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
