import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'
import { fonts, colors, frame } from '../designTokens'

const chats = [
  {
    type: 'group',
    name: '디자인팀 채팅',
    people: ['김디자인', '박시안', '이미소', '최보라'],
    lastMsg: '네, 그럼 내일 회의 때 뵙겠습니다',
    time: '오전 10:15',
    color: '#3182F6',
  },
  {
    type: 'dm',
    name: '김민석',
    lastMsg: '회의실 예약했어요!',
    time: '오전 9:30',
    color: '#10B981',
  },
  {
    type: 'group',
    name: '프로젝트 A',
    people: ['김민석', '이수진', '박준호', '정다은', '최영호'],
    lastMsg: '이 부분은 내일까지 검토해올게요',
    time: '어제',
    color: '#F59E0B',
  },
]

const teams = [
  {
    name: '디자인팀',
    color: '#3182F6',
    members: ['김디자인', '박시안', '이미소', '최보라', '한지민', '강수정', '오세진', '윤다영'],
  },
  {
    name: '개발팀',
    color: '#10B981',
    members: ['김민석', '이수진', '박준호', '정다은', '최영호', '송지우', '임현수', '권태영', '조유진', '백승훈', '문지환', '양세영'],
  },
  {
    name: '마케팅팀',
    color: '#F59E0B',
    members: ['홍지영', '김나래', '이동훈', '박세희', '최윤서'],
  },
  {
    name: '기획팀',
    color: '#8B5CF6',
    members: ['정우진', '강민수', '송혜진', '배지원', '임소영', '한상혁'],
  },
]

export default function TeamsPage({ onNavigate }) {
  const [search, setSearch] = useState('')
  const [expandedTeam, setExpandedTeam] = useState(null)

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
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, padding: '12px 16px 48px', overflow: 'auto' }}>
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
          {chats.map((chat, i) => (
            <div
              key={i}
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
                  backgroundColor: chat.color,
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
                  {chat.name[0]}
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      fontFamily: fonts.pretendard,
                      fontSize: 14,
                      fontWeight: 600,
                      lineHeight: '21px',
                      color: colors.primaryText,
                    }}
                  >
                    {chat.name}
                  </span>
                  {chat.type === 'group' && (
                    <span
                      style={{
                        fontFamily: fonts.pretendard,
                        fontSize: 11,
                        fontWeight: 400,
                        lineHeight: '16.5px',
                        color: colors.mutedText,
                      }}
                    >
                      {chat.people.join(', ')}
                    </span>
                  )}
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
                  {chat.lastMsg}
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
                {chat.time}
              </span>
            </div>
          ))}
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
            {teams.filter(t => t.name.includes(search)).map((team, i) => {
              const expanded = expandedTeam === i
              return (
              <div key={i} style={{ borderRadius: 12, overflow: 'hidden' }}>
                <div
                  onClick={() => setExpandedTeam(expanded ? null : i)}
                  style={{
                    backgroundColor: '#F8F8F8',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    cursor: 'pointer',
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
                      멤버 {team.members.length}명
                    </div>
                  </div>
                  <Icon name={expanded ? 'expand_less' : 'chevron_right'} size={20} color={colors.lightText} />
                </div>
                {expanded && (
                  <div style={{ backgroundColor: '#F0F0F0', padding: '10px 16px 10px 68px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {team.members.map((name, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                            backgroundColor: team.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <span style={{ fontFamily: fonts.pretendard, fontSize: 10, fontWeight: 500, color: colors.white }}>
                            {name[0]}
                          </span>
                        </div>
                        <span style={{ fontFamily: fonts.pretendard, fontSize: 13, fontWeight: 400, lineHeight: '19.5px', color: colors.tertiaryText }}>
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )})}
          </div>
        </div>
      </div>
      <BottomNav activeTab="teams" onTabClick={(key) => onNavigate(key)} />
    </div>
  )
}
