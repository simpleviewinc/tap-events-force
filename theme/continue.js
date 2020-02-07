import { padding, margin } from 'SVTheme/layout'


export const continueStyle = {
  container: {
    width: '100%',
    position: 'absolute',
    bottom: padding.size * 4,
    paddingLeft: padding.size * 4,
    paddingRight: padding.size * 4,
  },
  button: {
    backgroundColor: '#666666',
    width: '100%',
    borderRightColor: '#000000',
    borderBottomColor: '#000000',
    borderWidth: 2,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderStyle: 'solid',
    borderRadius: 5,
    ...padding(padding.size),
  },
  text: {
    color: "#FFFFFF",
    textAlign: 'center',
    width: '100%',
    fontWeight: '700',
  }
}
