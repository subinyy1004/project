import { useState } from 'react'
import { fonts, colors, frame } from '../designTokens'
import Icon from '../components/Icon'
import BottomNav from '../components/BottomNav'
import StatusBar from '../components/StatusBar'

const options = [
  { key: 'attend', icon: 'check_circle', label: '참석합니다' },
  { key: 'decline', icon: 'cancel', label: '불참합니다' },
  { key: 'adjust', icon: 'swap_horiz', label: '조정 부탁드립니다' },
]

const avatars = ['김', '박', '이', '최', '정']

export default function ConfirmationPage({ onNavigate, meetingForm }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [memo, setMemo] = useState('')

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
      }}
    >
      <StatusBar />

      {/* NavHeader */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px',
          height: 56,
          backgroundColor: colors.white,
          borderBottom: `1px solid ${colors.borderLight}`,
          position: 'relative',
        }}
      >
        <div
          onClick={() => onNavigate('meetings')}
          style={{
            position: 'absolute',
            left: 16,
            cursor: 'pointer',
            display: 'flex',
          }}
        >
          <Icon name="arrow_back" size={24} color={colors.secondaryText} />
        </div>
        <span
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 16,
            fontWeight: 700,
            lineHeight: '20.8px',
            color: colors.primaryText,
          }}
        >
          회의 확인 요청
        </span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        {/* Meeting info card */}
        <div
          style={{
            border: `1px solid ${colors.primaryText}`,
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: 24,
          }}
        >
          {/* Black header */}
          <div
            style={{
              backgroundColor: colors.primaryText,
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                fontFamily: fonts.pretendard,
                fontSize: 18,
                fontWeight: 700,
                lineHeight: '23.4px',
                color: colors.white,
                marginBottom: 6,
              }}
            >
              스프린트 회고
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="schedule" size={16} color={colors.lightText} />
              <span
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: '21px',
                  color: colors.border,
                }}
              >
                7월 19일 15:00 – 16:00 (1시간)
              </span>
            </div>
          </div>

          {/* Info section */}
          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="person" size={16} color={colors.lightText} />
              <span
                style={{
                  fontFamily: fonts.inter,
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: '21px',
                  color: colors.tertiaryText,
                }}
              >
                주최: 최PM
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="group" size={16} color={colors.lightText} />
              <span
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: '21px',
                  color: colors.tertiaryText,
                }}
              >
                참석자 6명
              </span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {avatars.map((a, i) => (
                <div
                  key={i}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: colors.borderLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.pretendard,
                      fontSize: 11,
                      fontWeight: 500,
                      lineHeight: '16.5px',
                      color: colors.tertiaryText,
                    }}
                  >
                    {a}
                  </span>
                </div>
              ))}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: colors.border,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 11,
                    fontWeight: 500,
                    lineHeight: '16.5px',
                    color: colors.tertiaryText,
                  }}
                >
                  +1
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 참석 여부 */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontFamily: fonts.pretendard,
              fontSize: 14,
              fontWeight: 700,
              lineHeight: '21px',
              color: colors.lightText,
              marginBottom: 12,
              letterSpacing: '0.88px',
            }}
          >
            참석 여부
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {options.map((opt) => {
              const isSelected = selectedOption === opt.key
              return (
                <div
                  key={opt.key}
                  onClick={() => setSelectedOption(opt.key)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    padding: '14px 4px',
                    backgroundColor: isSelected ? colors.primaryText : colors.white,
                    border: `1px solid ${isSelected ? colors.primaryText : colors.borderLight}`,
                    borderRadius: 12,
                    cursor: 'pointer',
                  }}
                >
                  <Icon
                    name={opt.icon}
                    size={28}
                    color={isSelected ? colors.white : colors.border}
                  />
                  <span
                    style={{
                      fontFamily: fonts.pretendard,
                      fontSize: 13,
                      fontWeight: 500,
                      lineHeight: '19.5px',
                      color: isSelected ? colors.white : colors.tertiaryText,
                      textAlign: 'center',
                    }}
                  >
                    {opt.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 메모 */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontFamily: fonts.pretendard,
              fontSize: 14,
              fontWeight: 700,
              lineHeight: '21px',
              color: colors.lightText,
              marginBottom: 12,
              letterSpacing: '0.88px',
            }}
          >
            메모 (선택)
          </div>
          <div
            style={{
              backgroundColor: '#F8F8F8',
              border: `1px solid ${colors.borderLight}`,
              borderRadius: 8,
              padding: '12px 16px',
            }}
          >
            <input
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="한 줄 메모를 남겨보세요."
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontFamily: fonts.pretendard,
                fontSize: 14,
                fontWeight: 400,
                lineHeight: '21px',
                color: colors.primaryText,
              }}
            />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            if (!selectedOption) return
            onNavigate('meeting-complete', { requestId: meetingForm?.requestId })
          }}
          style={{
            width: '100%',
            height: 56,
            backgroundColor: selectedOption ? colors.primaryText : colors.borderLight,
            borderRadius: 12,
            border: 'none',
            cursor: selectedOption ? 'pointer' : 'not-allowed',
            fontFamily: fonts.pretendard,
            fontSize: 16,
            fontWeight: 600,
            lineHeight: '20.8px',
            color: selectedOption ? colors.white : colors.lightText,
          }}
        >
          확인 완료
        </button>
      </div>

      <BottomNav activeTab="meetings" onTabClick={(key) => onNavigate(key)} />
    </div>
  )
}
