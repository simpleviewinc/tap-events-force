import { unstable_createElement as createElement } from 'react-native-web'

export const Label = props => {
  const { for: htmlFor, ...rest } = props
  return createElement('label', { htmlFor, ...rest })
}
