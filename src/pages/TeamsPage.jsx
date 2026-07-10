import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'
import { fonts, colors, frame } from '../designTokens'

const teams = [
  { name: '디자인팀', members: 8, color: '#3182F6' },
  { name: '개발팀', members: 12, color: '#10B981' },
  { name: '마케팅팀', members: 5, color: '#F59E0B' },
  { name: '기획팀', members: 6, color: '#8B5CF6' },
]

export default function TeamsPage({ onNavigate }) {
  const [search, setSearch] = useState('')
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
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, padding: '12px 16px 48px' }}>
        <span
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 20,
            fontWeight: 700,
            lineHeight: '26px',
            color: colors.primaryText,
          }}
        >
          Teams
        </span>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            padding: '0 12px',
          }}
        >
          <Icon name="search" size={20} color={colors.lightText} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="팀 검색..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontFamily: fonts.pretendard,
              fontSize: 14,
              fontWeight: 400,
              lineHeight: '21px',
              color: colors.primaryText,
              padding: '10px 0',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span
            style={{
              fontFamily: fonts.pretendard,
              fontSize: 14,
              fontWeight: 700,
              lineHeight: '21px',
              color: colors.lightText,
            }}
          >
            최근 대화
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              backgroundColor: '#F8F8F8',
              borderRadius: 12,
              padding: '12px 16px',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#3182F6',
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
                  color: colors.white,
                }}
              >
                디
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: '21px',
                  color: colors.primaryText,
                }}
              >
                디자인팀
              </div>
              <div
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: '18px',
                  color: colors.lightText,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                네, 그럼 내일 회의 때 뵙겠습니다
              </div>
            </div>
            <span
              style={{
                fontFamily: fonts.pretendard,
                fontSize: 11,
                fontWeight: 400,
                lineHeight: '16.5px',
                color: colors.mutedText,
                flexShrink: 0,
              }}
            >
              오전 10:15
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span
            style={{
              fontFamily: fonts.pretendard,
              fontSize: 14,
              fontWeight: 700,
              lineHeight: '21px',
              color: colors.lightText,
            }}
          >
            팀
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {teams.filter(t => t.name.includes(search)).map((team, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#F8F8F8',
                borderRadius: 12,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: team.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 16,
                    fontWeight: 600,
                    lineHeight: '24px',
                    color: colors.white,
                  }}
                >
                  {team.name[0]}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 15,
                    fontWeight: 600,
                    lineHeight: '22.5px',
                    color: colors.primaryText,
                  }}
                >
                  {team.name}
                </div>
                <div
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 13,
                    fontWeight: 400,
                    lineHeight: '19.5px',
                    color: colors.lightText,
                  }}
                >
                  멤버 {team.members}명
                </div>
              </div>
              <Icon name="chevron_right" size={20} color={colors.lightText} />
            </div>
          ))}
        </div>
      </div>
      </div>
      <BottomNav activeTab="teams" onTabClick={(key) => onNavigate(key)} />
    </div>
  )
}
