import { fonts, colors, frame } from '../designTokens'
import Icon from '../components/Icon'
import BottomNav from '../components/BottomNav'
import StatusBar from '../components/StatusBar'

const recommendations = [
  {
    rank: 1,
    time: '15:00 – 16:00',
    stars: 5,
    mandatory: '3/3명 가능',
    optional: '2/3명 가능',
  },
  {
    rank: 2,
    time: '10:00 – 11:00',
    stars: 4,
    mandatory: '2/3명 가능',
    optional: '1/3명 가능',
  },
  {
    rank: 3,
    time: '16:30 – 17:30',
    stars: 2,
    mandatory: '1/3명 가능',
    optional: '2/3명 가능',
  },
]

export default function RecommendTimePage({ onNavigate }) {
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
          추천 시간
        </span>
      </div>

      {/* Notice bar */}
      <div
        style={{
          backgroundColor: '#F8F8F8',
          borderBottom: `1px solid ${colors.borderLight}`,
          padding: '12px 16px',
        }}
      >
        <span
          style={{
            fontFamily: fonts.pretendard,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '21px',
            color: colors.primaryText,
          }}
        >
          6명 참석 상황 분석 완료
        </span>
      </div>

      {/* Recommendation cards */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          padding: '16px',
          backgroundColor: '#F8F8F8',
        }}
      >
        {recommendations.map((rec, i) => (
          <div
            key={i}
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${i === 0 ? colors.primaryText : colors.borderLight}`,
              borderRadius: 12,
              padding: 16,
            }}
          >
            {/* Top row: rank badge + stars */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: colors.primaryText,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.pretendard,
                      fontSize: 12,
                      fontWeight: 700,
                      lineHeight: '18px',
                      color: colors.white,
                    }}
                  >
                    {rec.rank}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 11,
                    fontWeight: 400,
                    lineHeight: '16.5px',
                    color: colors.lightText,
                  }}
                >
                  추천
                </span>
              </div>

              <div style={{ display: 'flex', gap: 1 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Icon
                    key={s}
                    name={s <= rec.stars ? 'star' : 'star_border'}
                    size={16}
                    color={s <= rec.stars ? colors.primaryText : colors.border}
                  />
                ))}
              </div>
            </div>

            {/* Time */}
            <div
              style={{
                fontFamily: fonts.pretendard,
                fontSize: 24,
                fontWeight: 700,
                lineHeight: '31.2px',
                color: colors.primaryText,
                marginBottom: 8,
              }}
            >
              {rec.time}
            </div>

            {/* Attendance badges */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <div
                style={{
                  padding: '4px 12px',
                  backgroundColor: '#F8F8F8',
                  border: `1px solid ${colors.borderLight}`,
                  borderRadius: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: '18px',
                    color: colors.primaryText,
                  }}
                >
                  필수 {rec.mandatory}
                </span>
              </div>
              <div
                style={{
                  padding: '4px 12px',
                  backgroundColor: '#F8F8F8',
                  border: `1px solid ${colors.borderLight}`,
                  borderRadius: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.pretendard,
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: '18px',
                    color: colors.primaryText,
                  }}
                >
                  선택 {rec.optional}
                </span>
              </div>
            </div>

            {/* View attendees link */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <span
                style={{
                  fontFamily: fonts.pretendard,
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: '18px',
                  color: colors.lightText,
                }}
              >
                참석자 보기
              </span>
              <Icon name="expand_more" size={16} color={colors.lightText} />
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
