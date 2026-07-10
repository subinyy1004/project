import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'
import { fonts, colors, frame } from '../designTokens'

const badgeColor = (s) => s === 'login' ? '#22C55E' : s === 'working' ? '#F59E0B' : '#FFFFFF'

const initialMessages = {
  '디자인팀 채팅': [
    { from: '김디자인', text: '내일 회의 자료 준비되었나요?', time: '오전 9:45' },
    { from: '박시안', text: '네 준비됐습니다!', time: '오전 9:47' },
    { from: '이미소', text: '저도 다 했어요', time: '오전 9:50' },
    { from: '최보라', text: '회의실 예약 완료했습니다', time: '오전 10:00' },
    { from: '김디자인', text: '네, 그럼 내일 회의 때 뵙겠습니다', time: '오전 10:15' },
  ],
  '김민석': [
    { from: '김민석', text: '혹시 회의실 예약하셨나요?', time: '오전 9:20' },
    { from: '나', text: '아직이에요. 지금 할게요!', time: '오전 9:25' },
    { from: '김민석', text: '회의실 예약했어요!', time: '오전 9:30' },
  ],
  '프로젝트 A': [
    { from: '김민석', text: '프로젝트 일정 협의 필요합니다', time: '어제 오후 2:00' },
    { from: '이수진', text: '내일 오후 어떠세요?', time: '어제 오후 2:10' },
    { from: '박준호', text: '저는 가능합니다', time: '어제 오후 2:15' },
    { from: '나', text: '이 부분은 내일까지 검토해올게요', time: '어제 오후 2:30' },
  ],
}

const chats = [
  {
    type: 'group',
    name: '디자인팀 채팅',
    people: ['김디자인', '박시안', '이미소', '최보라'],
    lastMsg: '네, 그럼 내일 회의 때 뵙겠습니다',
    time: '오전 10:15',
    color: '#3182F6',
    status: 'login',
  },
  {
    type: 'dm',
    name: '김민석',
    lastMsg: '회의실 예약했어요!',
    time: '오전 9:30',
    color: '#10B981',
    status: 'login',
  },
  {
    type: 'group',
    name: '프로젝트 A',
    people: ['김민석', '이수진', '박준호', '정다은', '최영호'],
    lastMsg: '이 부분은 내일까지 검토해올게요',
    time: '어제',
    color: '#F59E0B',
    status: 'logout',
  },
]

const teams = [
  {
    name: '디자인팀',
    color: '#3182F6',
    members: [
      { name: '김디자인', status: 'login' },
      { name: '박시안', status: 'working' },
      { name: '이미소', status: 'login' },
      { name: '최보라', status: 'working' },
      { name: '한지민', status: 'login' },
      { name: '강수정', status: 'logout' },
      { name: '오세진', status: 'working' },
      { name: '윤다영', status: 'login' },
    ],
  },
  {
    name: '개발팀',
    color: '#10B981',
    members: [
      { name: '김민석', status: 'login' },
      { name: '이수진', status: 'working' },
      { name: '박준호', status: 'login' },
      { name: '정다은', status: 'working' },
      { name: '최영호', status: 'logout' },
      { name: '송지우', status: 'login' },
      { name: '임현수', status: 'working' },
      { name: '권태영', status: 'login' },
      { name: '조유진', status: 'working' },
      { name: '백승훈', status: 'logout' },
      { name: '문지환', status: 'login' },
      { name: '양세영', status: 'working' },
    ],
  },
  {
    name: '마케팅팀',
    color: '#F59E0B',
    members: [
      { name: '홍지영', status: 'login' },
      { name: '김나래', status: 'working' },
      { name: '이동훈', status: 'working' },
      { name: '박세희', status: 'login' },
      { name: '최윤서', status: 'logout' },
    ],
  },
  {
    name: '기획팀',
    color: '#8B5CF6',
    members: [
      { name: '정우진', status: 'login' },
      { name: '강민수', status: 'working' },
      { name: '송혜진', status: 'login' },
      { name: '배지원', status: 'working' },
      { name: '임소영', status: 'logout' },
      { name: '한상혁', status: 'login' },
    ],
  },
]

function MessengerView({ target, onBack }) {
  const [messages, setMessages] = useState(initialMessages[target] || [])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    const now = new Date()
    const h = now.getHours()
    const m = now.getMinutes()
    const ampm = h < 12 ? '오전' : '오후'
    const hour = h % 12 || 12
    setMessages(prev => [...prev, { from: '나', text: input, time: `${ampm} ${hour}:${String(m).padStart(2, '0')}` }])
    setInput('')
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: `1px solid ${colors.borderLight}` }}>
        <div onClick={onBack} style={{ cursor: 'pointer' }}>
          <Icon name="arrow_back" size={24} color={colors.primaryText} />
        </div>
        <span style={{ fontFamily: fonts.pretendard, fontSize: 16, fontWeight: 600, lineHeight: '24px', color: colors.primaryText }}>
          {target}
        </span>
      </div>
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 8, overflow: 'auto' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.from === '나' ? 'flex-end' : 'flex-start' }}>
            <div
              style={{
                maxWidth: '80%',
                backgroundColor: msg.from === '나' ? colors.primaryText : '#F0F0F0',
                color: msg.from === '나' ? colors.white : colors.primaryText,
                borderRadius: 16,
                borderBottomRightRadius: msg.from === '나' ? 4 : 16,
                borderBottomLeftRadius: msg.from === '나' ? 16 : 4,
                padding: '10px 14px',
                fontFamily: fonts.pretendard,
                fontSize: 14,
                fontWeight: 400,
                lineHeight: '21px',
              }}
            >
              {msg.text}
            </div>
            <span style={{ fontFamily: fonts.pretendard, fontSize: 10, fontWeight: 400, lineHeight: '15px', color: colors.mutedText, marginTop: 2, marginLeft: msg.from === '나' ? 0 : 4, marginRight: msg.from === '나' ? 4 : 0 }}>
              {msg.from !== '나' && `${msg.from} · `}{msg.time}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '12px 16px', borderTop: `1px solid ${colors.borderLight}` }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
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
          onClick={send}
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
  )
}

export default function TeamsPage({ onNavigate }) {
  const [search, setSearch] = useState('')
  const [expandedTeam, setExpandedTeam] = useState(null)
  const [messaging, setMessaging] = useState(null)

  if (messaging) {
    return <MessengerView target={messaging} onBack={() => setMessaging(null)} />
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
              onClick={() => setMessaging(chat.name)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                backgroundColor: '#F8F8F8',
                borderRadius: 12,
                padding: '12px 16px',
                cursor: 'pointer',
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
                    backgroundColor: badgeColor(chat.status),
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
                    {team.members.map((member, j) => (
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
                                backgroundColor: badgeColor(member.status),
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
