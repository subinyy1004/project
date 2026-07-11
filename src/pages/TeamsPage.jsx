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

const initialChats = [
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
      { name: '김디자인', status: 'login', meeting: '편하게 가능' },
      { name: '박시안', status: 'working', meeting: '조정 가능' },
      { name: '이미소', status: 'login', meeting: '편하게 가능' },
      { name: '최보라', status: 'working', meeting: '조정 가능' },
      { name: '한지민', status: 'login', meeting: '편하게 가능' },
      { name: '강수정', status: 'logout', meeting: '어렵습니다' },
      { name: '오세진', status: 'working', meeting: '조정 가능' },
      { name: '윤다영', status: 'login', meeting: '편하게 가능' },
    ],
  },
  {
    name: '개발팀',
    color: '#10B981',
    members: [
      { name: '김민석', status: 'login', meeting: '편하게 가능' },
      { name: '이수진', status: 'working', meeting: '조정 가능' },
      { name: '박준호', status: 'login', meeting: '편하게 가능' },
      { name: '정다은', status: 'working', meeting: '조정 가능' },
      { name: '최영호', status: 'logout', meeting: '어렵습니다' },
      { name: '송지우', status: 'login', meeting: '편하게 가능' },
      { name: '임현수', status: 'working', meeting: '조정 가능' },
      { name: '권태영', status: 'login', meeting: '편하게 가능' },
      { name: '조유진', status: 'working', meeting: '조정 가능' },
      { name: '백승훈', status: 'logout', meeting: '어렵습니다' },
      { name: '문지환', status: 'login', meeting: '편하게 가능' },
      { name: '양세영', status: 'working', meeting: '조정 가능' },
    ],
  },
  {
    name: '마케팅팀',
    color: '#F59E0B',
    members: [
      { name: '홍지영', status: 'login', meeting: '편하게 가능' },
      { name: '김나래', status: 'working', meeting: '조정 가능' },
      { name: '이동훈', status: 'working', meeting: '조정 가능' },
      { name: '박세희', status: 'login', meeting: '편하게 가능' },
      { name: '최윤서', status: 'logout', meeting: '어렵습니다' },
    ],
  },
  {
    name: '기획팀',
    color: '#8B5CF6',
    members: [
      { name: '정우진', status: 'login', meeting: '편하게 가능' },
      { name: '강민수', status: 'working', meeting: '조정 가능' },
      { name: '송혜진', status: 'login', meeting: '편하게 가능' },
      { name: '배지원', status: 'working', meeting: '조정 가능' },
      { name: '임소영', status: 'logout', meeting: '어렵습니다' },
      { name: '한상혁', status: 'login', meeting: '편하게 가능' },
    ],
  },
]

function meetingStyle(m) {
  if (m === '편하게 가능') return { bg: '#E8F1FF', iconColor: '#3182F6', iconName: 'check_circle' }
  if (m === '조정 가능') return { bg: '#FEE685', iconColor: '#E17100', iconName: 'radio_button_checked' }
  return { bg: '#FEF2F2', iconColor: '#EF4444', iconName: 'cancel' }
}

function findMember(name) {
  for (const team of teams) {
    const m = team.members.find(m => m.name === name)
    if (m) return { ...m, teamColor: team.color }
  }
  return null
}

function MessengerView({ target, onBack, onNewChat }) {
  const [messages, setMessages] = useState(() => initialMessages[target] || [])
  const [input, setInput] = useState('')

  const send = () => {
    const text = input.trim()
    if (!text) return
    const now = new Date()
    const h = now.getHours()
    const m = now.getMinutes()
    const ampm = h < 12 ? '오전' : '오후'
    const hour = h % 12 || 12
    setMessages(prev => [...prev, { from: '나', text, time: `${ampm} ${hour}:${String(m).padStart(2, '0')}` }])
    setInput('')
    onNewChat?.(target, text, `${ampm} ${hour}:${String(m).padStart(2, '0')}`)
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
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              {msg.from !== '나' && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: '#3182F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontFamily: fonts.pretendard, fontSize: 11, fontWeight: 600, color: colors.white }}>
                    {msg.from[0]}
                  </span>
                </div>
              )}
              <div
                style={{
                  maxWidth: msg.from === '나' ? 240 : 204,
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
            </div>
            <span style={{ fontFamily: fonts.pretendard, fontSize: 10, fontWeight: 400, lineHeight: '15px', color: colors.mutedText, marginTop: 2, marginLeft: msg.from === '나' ? 0 : 36, marginRight: msg.from === '나' ? 4 : 0 }}>
              {msg.from !== '나' && `${msg.from} · `}{msg.time}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '12px 16px', borderTop: `1px solid ${colors.borderLight}` }}>
        <form onSubmit={e => { e.preventDefault(); send() }} style={{ flex: 1, display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
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
          <button
            type="submit"
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: colors.primaryText,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: 'none',
              padding: 0,
            }}
          >
            <Icon name="send" size={18} color={colors.white} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default function TeamsPage({ onNavigate }) {
  const [search, setSearch] = useState('')
  const [expandedTeam, setExpandedTeam] = useState(null)
  const [messaging, setMessaging] = useState(null)
  const [chatList, setChatList] = useState(initialChats)
  const [selectedMember, setSelectedMember] = useState(null)

  const handleNewChat = (name, text, time) => {
    const member = findMember(name)
    if (member && !chatList.some(c => c.name === name)) {
      setChatList(prev => [{
        type: 'dm',
        name,
        lastMsg: text,
        time,
        color: member.teamColor,
        status: member.status,
      }, ...prev])
    } else {
      setChatList(prev => {
        const filtered = prev.filter(c => c.name !== name)
        const existing = prev.find(c => c.name === name)
        return [{ ...existing, lastMsg: text, time }, ...filtered]
      })
    }
  }

  if (messaging) {
    return <MessengerView target={messaging} onBack={() => setMessaging(null)} onNewChat={handleNewChat} />
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
        position: 'relative',
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
          {chatList.map((chat, i) => (
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
                    <>
                      <span
                        style={{
                          fontFamily: fonts.pretendard,
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: '18px',
                          color: colors.mutedText,
                          marginLeft: 4,
                        }}
                      >
                        {chat.people.length}
                      </span>
                      <span
                        style={{
                          fontFamily: fonts.pretendard,
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: '18px',
                          color: colors.mutedText,
                        }}
                      >
                        {chat.people.slice(0, 3).join(', ')}{chat.people.length > 3 ? ', ...' : ''}
                      </span>
                    </>
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
                          <span
                            onClick={e => { e.stopPropagation(); setSelectedMember(member) }}
                            style={{ flex: 1, fontFamily: fonts.pretendard, fontSize: 15, fontWeight: 500, lineHeight: '22.5px', color: colors.tertiaryText, cursor: 'pointer' }}>
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
      {selectedMember && (
        <div
          onClick={() => setSelectedMember(null)}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.30)',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: 300,
              backgroundColor: colors.white,
              borderRadius: 20,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: (() => {
                    const t = teams.find(t => t.members.some(m => m.name === selectedMember.name))
                    return t ? t.color : '#3182F6'
                  })(),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontFamily: fonts.pretendard, fontSize: 20, fontWeight: 600, color: colors.white }}>
                  {selectedMember.name[0]}
                </span>
              </div>
              <div>
                <div style={{ fontFamily: fonts.pretendard, fontSize: 12, fontWeight: 400, lineHeight: '18px', color: colors.accent }}>
                  {selectedMember.name}
                </div>
                <div style={{ fontFamily: fonts.pretendard, fontSize: 14, fontWeight: 500, lineHeight: '21px', color: colors.primaryText }}>
                  {selectedMember.meeting}
                </div>
              </div>
            </div>
            <div style={{ height: 1, backgroundColor: colors.borderLight }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: fonts.pretendard, fontSize: 12, fontWeight: 600, lineHeight: '18px', color: colors.lightText }}>
                내 오늘 상태
              </span>
              <div
                style={{
                  border: `1px solid ${colors.cardStroke}`,
                  borderRadius: 12,
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  backgroundColor: meetingStyle(selectedMember.meeting).bg,
                }}
              >
                <Icon
                  name={meetingStyle(selectedMember.meeting).iconName}
                  size={20}
                  color={meetingStyle(selectedMember.meeting).iconColor}
                />
                <span style={{ fontFamily: fonts.pretendard, fontSize: 14, fontWeight: 500, lineHeight: '21px', color: colors.primaryText }}>
                  {selectedMember.meeting}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <BottomNav activeTab="teams" onTabClick={(key) => onNavigate(key)} />
    </div>
  )
}
