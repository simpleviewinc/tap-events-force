import { text } from '../text'

export const evfButton = {
  $web: {
    default: {
      main: {
        width: 120,
        height: 45,
      },
      content: {
        svg: {
          main: {
            fill: '#22B3C4',
          },
          content: {
            textView: {
              main: {
                alignItems: 'center',
                height: '100%',
                width: '100%',
                justifyContent: 'center',
              },
              content: {
                ...text,
                fontSize: 15,
                lineHeight: '18px',
                letterSpacing: '0.105em',
                fontWeight: 'bold',
                color: '#FFFFFF',
                paddingHorizontal: 19,
              },
            },
          },
        },
      },
    },
  },
}
