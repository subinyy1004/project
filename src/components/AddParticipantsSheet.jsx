import { useState, useMemo } from 'react'
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

export default function AddParticipantsSheet({ existingMandatory = [], existingOptional = [], onClose }) {
  const [query, setQuery] = useState('')
  const [assignment, setAssignment] = useState({})

  const existingMap = useMemo(() => {
    const m = {}
    existingMandatory.forEach(p => { m[p.name] = 'mandatory' })
    existingOptional.forEach(p => { m[p.name] = 'optional' })
    return m
  }, [existingMandatory, existingOptional])

  const filtered = useMemo(() => {
    if (!query.trim()) return people
    const q = query.trim().toLowerCase()
    return people.filter(p => p.name.includes(q) || p.dept.includes(q))
  }, [query])

  const setRole = (name, role) => {
    setAssignment((prev) => {
      const next = { ...prev }
      if (next[name] === role) delete next[name]
      else next[name] = role
      return next
    })
  }

  const allAssignments = { ...existingMap }
  for (const [name, role] of Object.entries(assignment)) {
    if (role === 'mandatory' || role === 'optional') {
      allAssignments[name] = role
    }
  }

  const pendingMandatory = Object.entries(assignment)
    .filter(([, v]) => v === 'mandatory')
    .map(([k]) => k)
  const pendingOptional = Object.entries(assignment)
    .filter(([, v]) => v === 'optional')
    .map(([k]) => k)

  const totalPending = pendingMandatory.length + pendingOptional.length

  const submit = () => {
    onClose({
      mandatory: pendingMandatory,
      optional: pendingOptional,
    })
  }

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
      onClick={() => onClose(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: colors.white,
          borderRadius: '20px 20px 0 0',
          maxHeight: '85%',
          minHeight: '85%',
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
            onClick={() => onClose(null)}
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
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="이름 또는 부서 검색"
              style={{
                flex: 1,
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

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: colors.borderLighter }} />

        {/* Participant list */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {filtered.map((p, i) => {
            const role = allAssignments[p.name] || null
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 20px',
                  borderBottom: i < filtered.length - 1 ? `1px solid ${colors.borderLighter}` : 'none',
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

                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => setRole(p.name, 'mandatory')}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 20,
                      border: 'none',
                      backgroundColor: role === 'mandatory' ? colors.primaryText : colors.white,
                      fontFamily: fonts.pretendard,
                      fontSize: 12,
                      fontWeight: role === 'mandatory' ? 600 : 400,
                      lineHeight: '18px',
                      color: role === 'mandatory' ? colors.white : colors.secondaryText,
                      cursor: 'pointer',
                    }}
                  >
                    필수
                  </button>
                  <button
                    onClick={() => setRole(p.name, 'optional')}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 20,
                      border: `1px solid ${role === 'optional' ? colors.primaryText : colors.borderLight}`,
                      backgroundColor: role === 'optional' ? colors.primaryText : colors.white,
                      fontFamily: fonts.pretendard,
                      fontSize: 12,
                      fontWeight: role === 'optional' ? 600 : 400,
                      lineHeight: '18px',
                      color: role === 'optional' ? colors.white : colors.secondaryText,
                      cursor: 'pointer',
                    }}
                  >
                    선택
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom action button */}
        <div
          style={{
            borderTop: `1px solid ${colors.borderLighter}`,
            padding: 16,
          }}
        >
          <button
            disabled={totalPending === 0}
            onClick={submit}
            style={{
              width: '100%',
              padding: '18px 16px',
              backgroundColor: totalPending > 0 ? colors.primaryText : colors.borderLight,
              border: 'none',
              borderRadius: 12,
              fontFamily: fonts.pretendard,
              fontSize: 16,
              fontWeight: 600,
              lineHeight: '20.8px',
              color: totalPending > 0 ? colors.white : colors.lightText,
              cursor: totalPending > 0 ? 'pointer' : 'not-allowed',
            }}
          >
            추가하기
          </button>
        </div>
      </div>
    </div>
  )
}
