import testData from '../testData'

export const emptyDay = {
  ...testData,
  sessions: testData.sessions.filter(session => session.dayNumber !== 2),
}
