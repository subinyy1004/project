import { fonts, colors } from '../designTokens'
import Icon from './Icon'

export default function CalendarHeader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 16px 8px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 20,
            fontWeight: 700,
            lineHeight: '26px',
            color: colors.primaryText,
          }}
        >
          7월 2026
        </span>
        <Icon name="expand_more" size={20} color={colors.mutedText} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div
          style={{
            border: `1px solid ${colors.border}`,
            borderRadius: 20,
            padding: '4px 12px',
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
              color: colors.tertiaryText,
            }}
          >
            오늘
          </span>
        </div>
        <Icon name="chevron_left" size={24} color={colors.mutedText} />
        <Icon name="chevron_right" size={24} color={colors.mutedText} />
      </div>
    </div>
  )
}
