import { sortLabels } from '../sortLabels'
import { Label } from '../../../models/label'

describe('sortLabels', () => {
  const labels = [ 'z', 'y', 'x' ].map(str => new Label({ name: str }))

  it('should sort the labels alphabetically by name', () => {
    const sorted = sortLabels(labels)
    const expected = [ 'x', 'y', 'z' ]
    expect(sorted.map(label => label.name)).toEqual(expected)
  })
})
