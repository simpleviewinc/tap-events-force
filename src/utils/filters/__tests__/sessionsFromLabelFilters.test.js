import { sessionsFromLabelFilters } from '../sessionsFromLabelFilters'
import testData from '../../../mocks/eventsforce/testData'
import { Label } from '../../../models/label'

describe('sessionsFromLabelFilters', () => {
  it('should return 5 results when filtering by `important` label', () => {
    const labels = [testData.labels[0]] // 'important' label
    const filteredSessions = sessionsFromLabelFilters(labels, testData.sessions)
    expect(filteredSessions.length).toEqual(6)
  })

  it('should return no results when filtering by an unused label', () => {
    const labels = [ 'z', 'y', 'x' ].map(str => new Label({ name: str }))

    const filteredSessions = sessionsFromLabelFilters(labels, testData.sessions)
    expect(filteredSessions.length).toEqual(0)
  })
})
