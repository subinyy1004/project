import { fonts, colors } from '../designTokens'
import Icon from './Icon'

export default function AttendanceStatus() {
  return (
    <div style={{ padding: '0 16px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SectionLabel text="내 참석 상태" />

      <div
        style={{
          border: `1px solid ${colors.cardStroke}`,
          borderRadius: 16,
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.blueLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="check_circle" size={20} color={colors.blue} />
          </div>
          <div>
            <div
              style={{
                fontFamily: fonts.pretendard,
                fontSize: 12,
                fontWeight: 400,
                lineHeight: '18px',
                color: colors.accent,
              }}
            >
              내 오늘 상태
            </div>
            <div
              style={{
                fontFamily: fonts.pretendard,
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '21px',
                color: colors.primaryText,
              }}
            >
              편하게 가능
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span
            style={{
              fontFamily: fonts.pretendard,
              fontSize: 12,
              fontWeight: 400,
              lineHeight: '18px',
              color: colors.accent,
            }}
          >
            변경
          </span>
          <Icon name="chevron_right" size={16} color={colors.accent} />
        </div>
      </div>
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
