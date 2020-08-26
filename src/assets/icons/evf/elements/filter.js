import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Filter(props) {
  return (
    <Svg
      width={23}
      height={21}
      viewBox='0 0 23 21'
      fill='none'
      {...props}
    >
      <Path
        d='M5.27 17.182v1.909H0v-1.91h5.27zm5.272-1.91c.26 0 .484.095.674.284.19.189.284.413.284.671v3.819a.915.915 0 01-.284.67.923.923 0 01-.674.284H6.708a.923.923 0 01-.673-.283.915.915 0 01-.285-.671v-3.819c0-.258.095-.482.285-.67a.923.923 0 01.673-.284h3.834zm2.396-5.727v1.91H0v-1.91h12.938zM3.354 1.91v1.91H0v-1.91h3.354zM23 17.182v1.909H11.98v-1.91H23zM8.625 0c.26 0 .484.094.674.283.19.19.284.413.284.672v3.818a.916.916 0 01-.284.67.923.923 0 01-.674.284H4.792a.923.923 0 01-.674-.283.916.916 0 01-.285-.671V.955c0-.259.095-.483.285-.672A.923.923 0 014.792 0h3.833zm9.583 7.636c.26 0 .485.095.674.284.19.189.285.412.285.67v3.82a.916.916 0 01-.285.67.923.923 0 01-.674.284h-3.833a.923.923 0 01-.674-.284.916.916 0 01-.284-.67V8.59c0-.258.095-.481.284-.67a.923.923 0 01.674-.284h3.833zM23 9.546v1.909h-3.354v-1.91H23zm0-7.637v1.91H10.062v-1.91H23z'
        fill={props.fill || '#fff'}
      />
    </Svg>
  )
}
