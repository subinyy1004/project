import { fonts, colors, frame } from '../designTokens'
import Icon from '../components/Icon'

export default function MeetingCompletePage({ onNavigate }) {
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
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 48px',
        }}
      >
        <Icon name="check_circle" size={64} color="#3CCF8E" />
        <div
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 22,
            fontWeight: 700,
            lineHeight: '28.6px',
            color: colors.primaryText,
            marginTop: 24,
          }}
        >
          참석 여부 확인 완료
        </div>
        <div
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '21px',
            color: colors.tertiaryText,
            marginTop: 12,
            textAlign: 'center',
          }}
        >
          확인해 주셔서 감사합니다.
          <br />
          회의가 원활히 진행될 수 있도록 준비하겠습니다.
        </div>

        <div style={{ width: '100%', marginTop: 40, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={() => onNavigate('calendar')}
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
            캘린더에서 보기
          </button>
          <button
            onClick={() => onNavigate('meetings')}
            style={{
              width: '100%',
              height: 56,
              backgroundColor: 'transparent',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              fontFamily: fonts.pretendard,
              fontSize: 16,
              fontWeight: 600,
              lineHeight: '20.8px',
              color: colors.lightText,
            }}
          >
            회의 목록으로
          </button>
        </div>
      </div>
    </div>
  )
}
