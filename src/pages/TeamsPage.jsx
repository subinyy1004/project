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
    messenger: true,
  },
  {
    type: 'dm',
    name: '김민석',
    lastMsg: '회의실 예약했어요!',
    time: '오전 9:30',
    color: '#10B981',
    messenger: true,
  },
  {
    type: 'group',
    name: '프로젝트 A',
    people: ['김민석', '이수진', '박준호', '정다은', '최영호'],
    lastMsg: '이 부분은 내일까지 검토해올게요',
    time: '어제',
    color: '#F59E0B',
    messenger: false,
  },
]

const teams = [
  {
    name: '디자인팀',
    color: '#3182F6',
    members: [
      { name: '김디자인', status: 'online' },
      { name: '박시안', status: 'busy' },
      { name: '이미소', status: 'online' },
      { name: '최보라', status: 'away' },
      { name: '한지민', status: 'online' },
      { name: '강수정', status: 'offline' },
      { name: '오세진', status: 'busy' },
      { name: '윤다영', status: 'online' },
    ],
  },
  {
    name: '개발팀',
    color: '#10B981',
    members: [
      { name: '김민석', status: 'online' },
      { name: '이수진', status: 'busy' },
      { name: '박준호', status: 'online' },
      { name: '정다은', status: 'away' },
      { name: '최영호', status: 'offline' },
      { name: '송지우', status: 'online' },
      { name: '임현수', status: 'busy' },
      { name: '권태영', status: 'online' },
      { name: '조유진', status: 'away' },
      { name: '백승훈', status: 'offline' },
      { name: '문지환', status: 'online' },
      { name: '양세영', status: 'busy' },
    ],
  },
  {
    name: '마케팅팀',
    color: '#F59E0B',
    members: [
      { name: '홍지영', status: 'online' },
      { name: '김나래', status: 'busy' },
      { name: '이동훈', status: 'away' },
      { name: '박세희', status: 'online' },
      { name: '최윤서', status: 'offline' },
    ],
  },
  {
    name: '기획팀',
    color: '#8B5CF6',
    members: [
      { name: '정우진', status: 'online' },
      { name: '강민수', status: 'busy' },
      { name: '송혜진', status: 'online' },
      { name: '배지원', status: 'away' },
      { name: '임소영', status: 'offline' },
      { name: '한상혁', status: 'online' },
    ],
  },
]

export default function TeamsPage({ onNavigate }) {
  const [search, setSearch] = useState('')
  const [expandedTeam, setExpandedTeam] = useState(null)
  const [messaging, setMessaging] = useState(null)

  if (messaging) {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: `1px solid ${colors.borderLight}` }}>
          <div onClick={() => setMessaging(null)} style={{ cursor: 'pointer' }}>
            <Icon name="arrow_back" size={24} color={colors.primaryText} />
          </div>
          <span style={{ fontFamily: fonts.pretendard, fontSize: 16, fontWeight: 600, lineHeight: '24px', color: colors.primaryText }}>
            {messaging}
          </span>
        </div>
        <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', borderTop: `1px solid ${colors.borderLight}`, paddingTop: 12 }}>
            <input
              placeholder="메시지 입력..."
              style={{
                flex: 1,
                border: `1px solid ${colors.borderLight}`,
                borderRadius: 20,
                padding: '10px 14px',
                fontFamily: fonts.pretendard,
                fontSize: 14,
                outline: 'none',
                backgroundColor: '#F8F8F8',
              }}
            />
            <div
              onClick={() => alert('메시지 전송!')}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: colors.primaryText,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Icon name="send" size={18} color={colors.white} />
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                alignItems: 'flex-start',
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
                  marginTop: 2,
                  position: 'relative',
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
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    border: `2px solid white`,
                    backgroundColor: chat.messenger ? '#22C55E' : '#FFFFFF',
                  }}
                />
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
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: '18px',
                        color: colors.mutedText,
                      }}
                    >
                      {chat.people.length}
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
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginTop: 2,
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
                  <div style={{ backgroundColor: '#F0F0F0' }}>
                    {team.members.map((member, j) => {
                      const statusColor = member.status === 'online' ? '#22C55E' : member.status === 'busy' ? '#EF4444' : member.status === 'away' ? '#F59E0B' : '#D4D4D4'
                      return (
                      <div key={j}>
                        {j > 0 && <div style={{ height: 1, backgroundColor: colors.borderLight }} />}
                        <div style={{ padding: '14px 16px 14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 16,
                              backgroundColor: team.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              position: 'relative',
                            }}
                          >
                            <span style={{ fontFamily: fonts.pretendard, fontSize: 13, fontWeight: 600, color: colors.white }}>
                              {member.name[0]}
                            </span>
                            <div
                              style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                border: `2px solid #F0F0F0`,
                                backgroundColor: member.status === 'online' || member.status === 'busy' ? '#22C55E' : '#FFFFFF',
                              }}
                            />
                          </div>
                          <span style={{ flex: 1, fontFamily: fonts.pretendard, fontSize: 15, fontWeight: 500, lineHeight: '22.5px', color: colors.tertiaryText }}>
                            {member.name}
                          </span>
                          <div
                            onClick={e => { e.stopPropagation(); setMessaging(member.name) }}
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          >
                            <Icon name="chat_bubble_outline" size={20} color={colors.mutedText} />
                          </div>
                        </div>
                      </div>
                    )})}
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
