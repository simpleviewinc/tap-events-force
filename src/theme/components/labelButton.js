const contentStyle = {
  fontSize: 12,
  fontWeight: 500,
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
