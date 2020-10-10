import { useThemeHover, useThemeActive } from '@keg-hub/re-theme'
import { useRef } from 'react'
const themeStates = {
  default: { default: true },
  hover: { hover: true },
  active: { active: true },
}

export const useThemeState = ref => {
  const themeRef = ref || useRef()

  const [ hoverRef, hoverState ] = useThemeHover(
    themeStates.default,
    themeStates.hover,
    { ref: themeRef }
  )

  const [ currentRef, activeState ] = useThemeActive(
    themeStates.default,
    themeStates.active,
    { ref: hoverRef }
  )

  return {
    ref: currentRef,
    isHovered: Boolean(hoverState.hover),
    isActive: Boolean(activeState.active),
  }
}
