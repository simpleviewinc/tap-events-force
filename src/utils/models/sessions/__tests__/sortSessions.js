import { sortSessions } from '../sortSessions'
import { Session } from 'SVModels/session'
const sessions = [
  new Session({ name: 'abe' }),
  new Session({ name: 'bob' }),
  new Session({ name: 'Adam' }),
  new Session({ name: 'Ryan' }),
  new Session({ name: 'Daniel' }),
]
describe('sortSessions', () => {
  it('should sort sessions name ascending by default', () => {
    const sortedSessions = sortSessions(sessions)
    expect(sortedSessions[0].name).toEqual('abe')
    expect(sortedSessions[1].name).toEqual('Adam')
    expect(sortedSessions[2].name).toEqual('bob')
    expect(sortedSessions[3].name).toEqual('Daniel')
    expect(sortedSessions[4].name).toEqual('Ryan')
  })

  it('should sort sessions name descending', () => {
    const sortedSessions = sortSessions(sessions, false)
    expect(sortedSessions[0].name).toEqual('Ryan')
    expect(sortedSessions[1].name).toEqual('Daniel')
    expect(sortedSessions[2].name).toEqual('bob')
    expect(sortedSessions[3].name).toEqual('Adam')
    expect(sortedSessions[4].name).toEqual('abe')
  })

  it('should return empty array if sessions is empty or null', () => {
    expect(sortSessions([])).toEqual([])
    expect(sortSessions()).toEqual([])
    expect(sortSessions(null)).toEqual([])
    expect(sortSessions('not an array')).toEqual([])
  })
})
