const contentStyle = {
  fontSize: 12,
  fontWeight: 500,
}
const mainStyle = {
  $web: {
    $xsmall: {
      width: 'fit-content',
    }
  },
  $all: {
    $xsmall: {
      minHeight: 30,
      height: 30,
      borderRadius: 2,
      justifyContent: 'center',
      margin: 0,
      flexDirection: 'row',
      alignSelf: 'flex-start',
      borderRadius: 2,
    },
    $small: {
      marginTop: 8,
      marginRight: 8,
    },
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
    default: styleWithOpacity(),
    hover: styleWithOpacity(),
    active: styleWithOpacity(),
  },
  unselected: {
    default: styleWithOpacity(0.4),
    hover: styleWithOpacity(0.4),
    active: styleWithOpacity(0.4),
  },
}
