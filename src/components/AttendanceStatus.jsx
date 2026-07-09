import { useState } from 'react'
import { fonts, colors } from '../designTokens'
import Icon from './Icon'

const statusOptions = ['편하게 가능', '어렵습니다', '조정 가능']

const statusStyle = {
  '편하게 가능': { bg: colors.blueLight, iconColor: colors.blue, iconName: 'check_circle', accent: colors.accent },
  '어렵습니다': { bg: '#FEF2F2', iconColor: '#EF4444', iconName: 'cancel', accent: '#EF4444' },
  '조정 가능': { bg: '#FEE685', iconColor: '#E17100', iconName: 'radio_button_checked', accent: '#E17100' },
}

export default function AttendanceStatus() {
  const [status, setStatus] = useState('편하게 가능')
  const [open, setOpen] = useState(false)
  const s = statusStyle[status]

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
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: s.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={s.iconName} size={20} color={s.iconColor} />
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
              {status}
            </div>
          </div>
        </div>

        <div
          onClick={() => setOpen(!open)}
          style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
        >
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

        {open && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 16,
              backgroundColor: colors.white,
              border: `1px solid ${colors.borderLight}`,
              borderRadius: 12,
              boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
              zIndex: 10,
              minWidth: 140,
              overflow: 'hidden',
            }}
          >
            {statusOptions.map((opt) => (
              <div
                key={opt}
                onClick={() => { setStatus(opt); setOpen(false) }}
                style={{
                  padding: '10px 16px',
                  fontFamily: fonts.pretendard,
                  fontSize: 13,
                  fontWeight: opt === status ? 600 : 400,
                  lineHeight: '19.5px',
                  color: colors.primaryText,
                  backgroundColor: opt === status ? colors.borderLighter : 'transparent',
                  cursor: 'pointer',
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
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
