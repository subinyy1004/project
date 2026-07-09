import { fonts, colors } from '../designTokens'

export default function Icon({ name, size = 20, color = colors.mutedText, style: extStyle = {} }) {
  return (
    <span
      style={{
        fontFamily: fonts.icons,
        fontSize: size,
        lineHeight: `${size}px`,
        color,
        display: 'inline-block',
        ...extStyle,
      }}
    >
      {name}
    </span>
  )
}
