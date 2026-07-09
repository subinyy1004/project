import { fonts, colors } from '../designTokens'

const iconStyle = {
  fontFamily: fonts.icons,
  fontSize: 16,
  lineHeight: '16px',
  color: colors.primaryText,
}

export default function StatusBar() {
  return (
    <div
      style={{
        height: 48,
        paddingTop: 12,
        paddingLeft: 32,
        paddingRight: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span
        style={{
          fontFamily: fonts.inter,
          fontSize: 16,
          fontWeight: 700,
          lineHeight: '24px',
          color: colors.primaryText,
        }}
      >
        9:41
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={iconStyle}>signal_cellular_alt</span>
        <span style={iconStyle}>wifi</span>
        <span style={iconStyle}>battery_full</span>
      </div>
    </div>
  )
}
