import { devLog } from 'SVUtils/logs'

export const scrollList = (listRef, section) => {
  return devLog.warn('Native scroll method has not been implemented!')
}

// const getScrollResponder = listRef => {
//   return listRef.current &&
//     listRef.current.getScrollResponder &&
//     listRef.current.getScrollResponder()
// }

// export const scrollList = (listRef, section) => {
//   const scrollResponder = getScrollResponder(listRef)

//   section &&
//     section.offset &&
//     scrollResponder &&
//     scrollResponder.scrollTo &&
//     scrollResponder.scrollTo({
//       x: 0,
//       y: section.offset,
//       behavior: 'smooth',
//     })
// }
