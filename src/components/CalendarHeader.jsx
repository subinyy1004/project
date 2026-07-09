import { fonts, colors } from '../designTokens'
import Icon from './Icon'

const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

export default function CalendarHeader({ year, month, onPrevMonth, onNextMonth, onToday }) {
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
          {MONTHS[month]} {year}
        </span>
        <Icon name="expand_more" size={20} color={colors.mutedText} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div
          onClick={onToday}
          style={{
            border: `1px solid ${colors.border}`,
            borderRadius: 20,
            padding: '4px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
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
        <div onClick={onPrevMonth} style={{ cursor: 'pointer', display: 'flex' }}>
          <Icon name="chevron_left" size={24} color={colors.mutedText} />
        </div>
        <div onClick={onNextMonth} style={{ cursor: 'pointer', display: 'flex' }}>
          <Icon name="chevron_right" size={24} color={colors.mutedText} />
        </div>
      </div>
    </div>
  )
}
