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

const mandatoryParticipants = [
  { initial: '김', name: '김디자이너' },
  { initial: '박', name: '박엔지니어' },
  { initial: '이', name: '이PM' },
]

const optionalParticipants = [
  { initial: '최', name: '최QA' },
  { initial: '정', name: '정디자이너' },
  { initial: '한', name: '한엔지니어' },
]

export default function CreateMeetingPage({ onNavigate }) {
  const [selectedTime, setSelectedTime] = useState(60)
  const [showSheet, setShowSheet] = useState(false)

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
              <span
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: '20.8px',
                  color: colors.primaryText,
                }}
              >
                스프린트 회고
              </span>
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
                    필수 참석자 3명
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {mandatoryParticipants.map((p) => (
                    <ParticipantChip
                      key={p.name}
                      initial={p.initial}
                      name={p.name}
                      variant="mandatory"
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
                    선택 참석자 3명
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {optionalParticipants.map((p) => (
                    <ParticipantChip
                      key={p.name}
                      initial={p.initial}
                      name={p.name}
                      variant="optional"
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
              <DateChip date="7월 19일" />
              <Icon name="arrow_forward" size={16} color={colors.lightText} />
              <DateChip date="7월 19일" />
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div style={{ padding: '16px' }}>
          <button
            onClick={() => onNavigate('recommend-time')}
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
              cursor: 'pointer',
            }}
          >
            추천 시간 보기
          </button>
        </div>
      </div>

      <BottomNav />

      {showSheet && (
        <AddParticipantsSheet onClose={() => setShowSheet(false)} />
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

function ParticipantChip({ initial, name, variant }) {
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
      <Icon
        name="close"
        size={14}
        color={isMandatory ? colors.mutedText : colors.lightText}
      />
    </div>
  )
}

function DateChip({ date }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 16px',
        backgroundColor: colors.white,
        border: `1px solid ${colors.borderLight}`,
        borderRadius: 8,
      }}
    >
      <Icon name="calendar_today" size={16} color={colors.mutedText} />
      <span
        style={{
          fontFamily: fonts.pretendard,
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '21px',
          color: colors.secondaryText,
        }}
      >
        {date}
      </span>
    </div>
  )
}
