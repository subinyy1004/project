import { fonts, colors } from '../designTokens'
import Icon from './Icon'

const tabs = [
  { icon: 'calendar_month', label: 'Calendar', active: true },
  { icon: 'event_available', label: 'Meetings', active: false },
  { icon: 'groups', label: 'Teams', active: false },
  { icon: 'person', label: 'Profile', active: false },
]

const GroupsIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-.62c0-1.17.68-2.25 1.76-2.73 1.17-.51 2.61-.9 4.24-.9zm0-2c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
      fill={colors.lightText}
    />
  </svg>
)

export default function BottomNav() {
  return (
    <div
      style={{
        borderTop: `1px solid ${colors.borderLight}`,
        backgroundColor: colors.white,
      }}
    >
      <div style={{ display: 'flex' }}>
        {tabs.map((tab, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              padding: '4px 0',
              height: 56,
            }}
          >
            {tab.icon === 'groups' ? (
              GroupsIcon
            ) : (
              <Icon
                name={tab.icon}
                size={24}
                color={tab.active ? colors.primaryText : colors.lightText}
              />
            )}
            <span
              style={{
                fontFamily: fonts.pretendard,
                fontSize: 12,
                fontWeight: tab.active ? 600 : 400,
                lineHeight: '18px',
                textAlign: 'center',
                color: tab.active ? colors.primaryText : colors.lightText,
              }}
            >
              {tab.label}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
        <div
          style={{
            width: 128,
            height: 4,
            borderRadius: 100,
            backgroundColor: colors.homeIndicator,
          }}
        />
      </div>
    </div>
  )
}
