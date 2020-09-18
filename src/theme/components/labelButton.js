const contentStyle = {
  fontSize: 12,
  fontWeight: '500',
}
const mainStyle = {
  $xsmall: {
    margin: 0,
    width: 'fit-content',
    minHeight: 30,
    height: 30,
    borderRadius: 2,
    justifyContent: 'center',
  },
  $small: {
    marginTop: 8,
    marginRight: 8,
  },
}

const styleWithOpacity = opacity => {
  return {
    main: {
      ...mainStyle,
      opacity,
    },
    content: contentStyle,
  }
}

export const labelButton = {
  selected: {
    $web: {
      default: styleWithOpacity(),
      hover: styleWithOpacity(),
      active: styleWithOpacity(),
    },
  },
  unselected: {
    $web: {
      default: styleWithOpacity(0.4),
      hover: styleWithOpacity(0.4),
      active: styleWithOpacity(0.4),
    },
  },
}
