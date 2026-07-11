import { useState } from 'react'
import { fonts, colors, frame } from '../designTokens'
import Icon from '../components/Icon'
import BottomNav from '../components/BottomNav'
import StatusBar from '../components/StatusBar'
import AddParticipantsSheet from '../components/AddParticipantsSheet'

const timeOptions = [
  { label: '30분', value: 30 },
  { label: '1시간', value: 60 },
  { label: '1시간 30분', value: 90 },
  { label: '2시간', value: 120 },
]

const allPeople = [
  {initial: '윤', name: '윤운영', dept: '운영'},
  {initial: '강', name: '강기획', dept: '기획'},
  {initial: '서', name: '서마케팅', dept: '마케팅'},
  {initial: '조', name: '조엔지니어', dept: '개발'},
  {initial: '류', name: '류디자이너', dept: '디자인'},
  {initial: '문', name: '문QA', dept: 'QA'},
]

export default function CreateMeetingPage({ onNavigate }) {
  const [selectedTime, setSelectedTime] = useState(30)
  const [showSheet, setShowSheet] = useState(false)
  const [title, setTitle] = useState('')
  const [mandatory, setMandatory] = useState([])
  const [optional, setOptional] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [openDropdown, setOpenDropdown] = useState(null)

  const removeMandatory = (name) => setMandatory(mandatory.filter(p => p.name !== name))
  const removeOptional = (name) => setOptional(optional.filter(p => p.name !== name))

  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const daysInMonth = new Date(2026, 7, 0).getDate()
  const dateList = Array.from({ length: daysInMonth }, (_, i) => {
    const d = new Date(2026, 6, i + 1)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const iso = `${yyyy}-${mm}-${dd}`
    const weekday = ['일','월','화','수','목','금','토'][d.getDay()]
    const label = `${d.getMonth() + 1}월 ${d.getDate()}일 (${weekday})`
    return { iso, label }
  }).filter(d => d.iso >= todayStr)

  const formatDate = (iso) => {
    if (!iso) return ''
    const parts = iso.split('-')
    return `${parseInt(parts[1])}월 ${parseInt(parts[2])}일`
  }

  const isFormValid =
    title.trim() !== '' &&
    (mandatory.length + optional.length > 0) &&
    startDate !== '' &&
    endDate !== ''

  return (
    <div
      style={{
        width: frame.width,
        minHeight: frame.height,
        backgroundColor: '#F7F8F9',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 40,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <StatusBar />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '0 16px',
          height: 56,
          backgroundColor: colors.white,
          borderBottom: `1px solid ${colors.borderLight}`,
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
          onClick={() => onNavigate('calendar')}
        >
          <Icon name="arrow_back" size={24} color={colors.secondaryText} />
          <span
            style={{
              fontFamily: fonts.pretendard,
              fontSize: 16,
              fontWeight: 700,
              lineHeight: '20.8px',
              color: colors.primaryText,
            }}
          >
            새 회의
          </span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <div
              style={{
                flex: 1,
                height: 4,
                backgroundColor: colors.primaryText,
                borderRadius: 2,
              }}
            />
            <div
              style={{
                flex: 1,
                height: 4,
                backgroundColor: colors.borderLight,
                borderRadius: 2,
              }}
            />
            <div
              style={{
                flex: 1,
                height: 4,
                backgroundColor: colors.borderLight,
                borderRadius: 2,
              }}
            />
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            padding: '16px',
          }}
        >
          {/* 회의 제목 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SectionLabel text="회의 제목" />
            <div
              style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.primaryText}`,
                borderRadius: 8,
                padding: '12px 16px',
              }}
            >
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="회의 제목 입력"
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontFamily: fonts.pretendard,
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: '20.8px',
                  color: colors.primaryText,
                  background: 'transparent',
                }}
              />
            </div>
          </div>

          {/* 참석자 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <SectionLabel text="참석자" />
              <div
                onClick={() => setShowSheet(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 20,
                  padding: '4px 12px',
                  cursor: 'pointer',
                }}
              >
                <Icon name="person_add" size={14} color={colors.secondaryText} />
                <span
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: '19.5px',
                    color: colors.secondaryText,
                  }}
                >
                  추가
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.borderLight}`,
                borderRadius: 12,
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      fontFamily: fonts.pretendard,
                      fontSize: 12,
                      fontWeight: 600,
                      lineHeight: '18px',
                      color: colors.secondaryText,
                    }}
                  >
                    필수 참석자 {mandatory.length}명
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {mandatory.map((p) => (
                    <ParticipantChip
                      key={p.name}
                      initial={p.initial}
                      name={p.name}
                      variant="mandatory"
                      onRemove={() => removeMandatory(p.name)}
                    />
                  ))}
                </div>
              </div>

              <div style={{ height: 1, backgroundColor: colors.borderLighter, margin: '12px 0' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      fontFamily: fonts.pretendard,
                      fontSize: 12,
                      fontWeight: 600,
                      lineHeight: '18px',
                      color: colors.mutedText,
                    }}
                  >
                    선택 참석자 {optional.length}명
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {optional.map((p) => (
                    <ParticipantChip
                      key={p.name}
                      initial={p.initial}
                      name={p.name}
                      variant="optional"
                      onRemove={() => removeOptional(p.name)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 예상 소요시간 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SectionLabel text="예상 소요시간" />
            <div style={{ display: 'flex', gap: 8 }}>
              {timeOptions.map((opt) => {
                const isActive = opt.value === selectedTime
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedTime(opt.value)}
                    style={{
                      flex: 1,
                      padding: '10px 4px',
                      backgroundColor: isActive ? colors.primaryText : colors.white,
                      border: `1px solid ${isActive ? colors.primaryText : colors.borderLight}`,
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontFamily: fonts.pretendard,
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 400,
                      lineHeight: '19.5px',
                      color: isActive ? colors.white : colors.tertiaryText,
                      textAlign: 'center',
                    }}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 날짜 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SectionLabel text="날짜" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <DateChip
                  date={formatDate(startDate)}
                  placeholder="시작일 선택"
                  onClick={() => setOpenDropdown(openDropdown === 'start' ? null : 'start')}
                />
                {openDropdown === 'start' && (
                  <DateDropdown
                    dateList={dateList}
                    selected={startDate}
                    todayStr={todayStr}
                    onSelect={(iso) => { setStartDate(iso); if (endDate && iso > endDate) setEndDate(''); setOpenDropdown(null) }}
                  />
                )}
              </div>
              <Icon name="arrow_forward" size={16} color={colors.lightText} />
              <div style={{ flex: 1, position: 'relative' }}>
                <DateChip
                  date={formatDate(endDate)}
                  placeholder="종료일 선택"
                  onClick={() => setOpenDropdown(openDropdown === 'end' ? null : 'end')}
                />
                {openDropdown === 'end' && (
                  <DateDropdown
                    dateList={dateList}
                    selected={endDate}
                    todayStr={todayStr}
                    onSelect={(iso) => { setEndDate(iso); if (startDate && iso < startDate) setStartDate(''); setOpenDropdown(null) }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div style={{ padding: '16px' }}>
          <button
            onClick={() => {
              if (!isFormValid) return
              onNavigate('recommend-time', {
                title,
                mandatory: mandatory.map(p => p.name),
                optional: optional.map(p => p.name),
                selectedTime,
                startDate,
                endDate,
              })
            }}
            style={{
              width: '100%',
              padding: '18px 16px',
              backgroundColor: colors.primaryText,
              color: colors.white,
              border: 'none',
              borderRadius: 12,
              fontFamily: fonts.pretendard,
              fontSize: 16,
              fontWeight: 600,
              lineHeight: '20.8px',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              opacity: isFormValid ? 1 : 0.3,
            }}
          >
            추천 시간 보기
          </button>
        </div>
      </div>

      <BottomNav activeTab="calendar" onTabClick={(key) => onNavigate(key)} />

      {showSheet && (
        <AddParticipantsSheet
          existingMandatory={mandatory}
          existingOptional={optional}
          onClose={(result) => {
            setShowSheet(false)
            if (result) {
              const toItems = (names) => names.map(name =>
                allPeople.find(p => p.name === name) || { initial: name[0], name }
              )
              setMandatory(prev => [...prev, ...toItems(result.mandatory)])
              setOptional(prev => [...prev, ...toItems(result.optional)])
            }
          }}
        />
      )}
    </div>
  )
}

function SectionLabel({ text }) {
  return (
    <span
      style={{
        fontFamily: fonts.pretendard,
        fontSize: 14,
        fontWeight: 700,
        lineHeight: '21px',
        letterSpacing: '0.88px',
        color: colors.lightText,
      }}
    >
      {text}
    </span>
  )
}

function ParticipantChip({ initial, name, variant, onRemove }) {
  const isMandatory = variant === 'mandatory'
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 10px 6px 6px',
        backgroundColor: isMandatory ? colors.primaryText : colors.white,
        border: `1px solid ${isMandatory ? colors.primaryText : colors.borderLight}`,
        borderRadius: 20,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: colors.borderLight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 10,
            fontWeight: 500,
            lineHeight: '15px',
            color: colors.tertiaryText,
          }}
        >
          {initial}
        </span>
      </div>
      <span
        style={{
          fontFamily: fonts.pretendard,
          fontSize: 13,
          fontWeight: 400,
          lineHeight: '19.5px',
          color: isMandatory ? colors.white : colors.secondaryText,
        }}
      >
        {name}
      </span>
      <div style={{ cursor: 'pointer', display: 'flex' }} onClick={onRemove}>
        <Icon
          name="close"
          size={14}
          color={isMandatory ? colors.mutedText : colors.lightText}
        />
      </div>
    </div>
  )
}

function DateChip({ date, placeholder, onClick }) {
  const display = date || placeholder
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 16px',
        backgroundColor: colors.white,
        border: `1px solid ${colors.borderLight}`,
        borderRadius: 8,
        cursor: 'pointer',
      }}
    >
      <Icon name="calendar_today" size={16} color={colors.mutedText} />
      <span
        style={{
          fontFamily: fonts.pretendard,
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '21px',
          color: date ? colors.secondaryText : colors.lightText,
        }}
      >
        {display}
      </span>
    </div>
  )
}

function DateDropdown({ dateList, selected, todayStr, onSelect }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        marginTop: 4,
        backgroundColor: colors.white,
        border: `1px solid ${colors.borderLight}`,
        borderRadius: 8,
        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
        zIndex: 50,
        maxHeight: 186,
        overflowY: 'auto',
      }}
    >
      {dateList.map((d) => {
        const isPast = d.iso < todayStr
        return (
          <div
            key={d.iso}
            onClick={() => { if (!isPast) onSelect(d.iso) }}
            style={{
              padding: '10px 16px',
              fontFamily: fonts.pretendard,
              fontSize: 14,
              fontWeight: d.iso === selected ? 600 : 400,
              lineHeight: '21px',
              color: isPast ? colors.border : colors.primaryText,
              backgroundColor: d.iso === selected ? colors.borderLighter : 'transparent',
              cursor: isPast ? 'not-allowed' : 'pointer',
            }}
          >
            {d.label}
          </div>
        )
      })}
    </div>
  )
}
