import { AgendaDay } from 'SVModels/agendaDay'

const { getCurrentDay } = require('../agendaDays/getCurrentDay')
const { getLatestDay } = require('../agendaDays/getLatestDay')
const { isLatestDay } = require('../agendaDays/isLatestDay')

const dayNums = [ 1, 2, 4, 3 ]
const makeMockAgendaDays = () =>
  dayNums.map(dayNumber => new AgendaDay({ dayNumber }))

describe('AgendaDays', () => {
  afterAll(() => jest.clearAllMocks())

  let agendaDays
  beforeEach(() => {
    agendaDays = makeMockAgendaDays()
  })

  describe('getCurrentDay', () => {
    it('should return the AgendaDay object that matches the active day number', () => {
      const agendaDay = getCurrentDay(agendaDays, 1)
      expect(agendaDay).toEqual(agendaDays[0])
    })

    it('should return null if no agenda day is found with a matching day number', () => {
      let agendaDay = getCurrentDay(agendaDays, -1)
      expect(agendaDay).toBe(null)

      agendaDay = getCurrentDay(agendaDays, Math.max(...dayNums) + 1)
      expect(agendaDay).toBe(null)
    })

    it('should return null if agenda day array is empty', () => {
      let agendaDay = getCurrentDay([], 1)
      expect(agendaDay).toBe(null)
    })
  })

  describe('getLatestDay', () => {
    it('should return the latest day in the agenda days list', () => {
      const latest = getLatestDay(agendaDays)
      expect(latest).toEqual(agendaDays[2])
    })

    it('should return null if the agenda list is empty', () => {
      const latest = getLatestDay([])
      expect(latest).toEqual(null)
    })
  })

  describe('isLatestDay', () => {
    it('should return true if the passed-in day number is the latest day in the agenda days list', () => {
      let isLatest = isLatestDay(Math.max(...dayNums), agendaDays)
      expect(isLatest).toBe(true)

      isLatest = isLatestDay(-1, agendaDays)
      expect(isLatest).toBe(false)
    })
  })
})
