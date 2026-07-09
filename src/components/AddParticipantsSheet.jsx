import { fonts, colors } from '../designTokens'
import Icon from './Icon'

const people = [
  { initial: '윤', name: '윤운영', dept: '운영' },
  { initial: '강', name: '강기획', dept: '기획' },
  { initial: '서', name: '서마케팅', dept: '마케팅' },
  { initial: '조', name: '조엔지니어', dept: '개발' },
  { initial: '류', name: '류디자이너', dept: '디자인' },
  { initial: '문', name: '문QA', dept: 'QA' },
]

export default function AddParticipantsSheet({ onClose }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.48)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: colors.white,
          borderRadius: '20px 20px 0 0',
          maxHeight: '85%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 8px' }}>
          <div
            style={{
              width: 36,
              height: 4,
              backgroundColor: colors.border,
              borderRadius: 2,
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: fonts.pretendard,
              fontSize: 16,
              fontWeight: 700,
              lineHeight: '20.8px',
              color: colors.primaryText,
            }}
          >
            참석자 추가
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="close" size={20} color={colors.tertiaryText} />
          </button>
        </div>

        {/* Search bar */}
        <div style={{ padding: '0 16px', marginBottom: 12 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              backgroundColor: colors.borderLighter,
              borderRadius: 10,
            }}
          >
            <Icon name="search" size={18} color={colors.lightText} />
            <span
              style={{
                fontFamily: fonts.pretendard,
                fontSize: 14,
                fontWeight: 400,
                lineHeight: '21px',
                color: colors.lightText,
              }}
            >
              이름 또는 부서 검색
            </span>
          </div>
        </div>

        {/* Toggle buttons */}
        <div style={{ padding: '0 16px', marginBottom: 12 }}>
          <div
            style={{
              display: 'flex',
              gap: 8,
              padding: 4,
              backgroundColor: '#F7F8F9',
              borderRadius: 8,
            }}
          >
            <button
              style={{
                flex: 1,
                padding: '9px 16px',
                backgroundColor: colors.primaryText,
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontFamily: fonts.pretendard,
                fontSize: 12,
                fontWeight: 600,
                lineHeight: '18px',
                color: colors.white,
              }}
            >
              필수 참석자로 추가
            </button>
            <button
              style={{
                flex: 1,
                padding: '9px 16px',
                backgroundColor: '#F7F8F9',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontFamily: fonts.pretendard,
                fontSize: 12,
                fontWeight: 400,
                lineHeight: '18px',
                color: colors.tertiaryText,
              }}
            >
              선택 참석자로 추가
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: colors.borderLighter }} />

        {/* Participant list */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {people.map((p, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 20px',
                borderBottom: i < people.length - 1 ? `1px solid ${colors.borderLighter}` : 'none',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.borderLight,
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
                    lineHeight: '22.5px',
                    color: colors.tertiaryText,
                  }}
                >
                  {p.initial}
                </span>
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: '22.5px',
                    color: colors.primaryText,
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: '18px',
                    color: colors.lightText,
                  }}
                >
                  {p.dept}
                </div>
              </div>

              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.white,
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom action button */}
        <div
          style={{
            borderTop: `1px solid ${colors.borderLighter}`,
            padding: 16,
          }}
        >
          <button
            disabled
            style={{
              width: '100%',
              padding: '18px 16px',
              backgroundColor: colors.borderLight,
              border: 'none',
              borderRadius: 12,
              fontFamily: fonts.pretendard,
              fontSize: 16,
              fontWeight: 600,
              lineHeight: '20.8px',
              color: colors.lightText,
              cursor: 'not-allowed',
            }}
          >
            추가하기
          </button>
        </div>
      </div>
    </div>
  )
}
