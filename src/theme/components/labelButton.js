const contentStyle = {
  fontSize: 12,
}
const mainStyle = {
  $xsmall: {
    margin: 0,
    width: 'fit-content',
    height: 'fit-content',
    borderRadius: 2,
  },
  $small: {
    marginTop: 8,
    marginRight: 8,
  },
}

const defaultStyle = {
  main: mainStyle,
  content: contentStyle,
}

export const labelButton = {
  $web: {
    default: defaultStyle,
    hover: defaultStyle,
    active: defaultStyle,
  },
}
