const defOpts = {
  offset: 0,
  animated: true,
}

/**
 * Helper method to scroll to an item in a list in a **NATIVE ENVIRONMENT**
 * @function
 * @param {object} props
 * @param {object} [props.offset=0] - Offset the final scroll position
 * @param {object} [props.left] - Horizontal scroll to position (Web Only)
 * @param {object} [props.position=0] - Not valid on web platform
 * @param {object} [props.behavior=smooth] - Type of scrolling ( auto | smooth )
 */
export const scrollList = ({ listRef, layout, ...options }) => {
  const { offset, position, ...scrollOpts } = { ...defOpts, ...options }

  return listRef?.current?.scrollTo({
    ...scrollOpts,
    y: layout.y,
    x: layout.x,
  })
}
