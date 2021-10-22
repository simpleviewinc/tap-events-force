import { getPresenterProfession } from '../getPresenterProfession'
import { Presenter } from 'SVModels/presenter'

describe('getPresenterProfession', () => {
  it('should return the job title when company is not present', () => {
    const presenter = new Presenter({
      identifier: 1,
      jobtitle: 'engineer',
      company: null,
    })
    const profession = getPresenterProfession(presenter)
    expect(profession).toEqual('engineer')
  })

  it('should return the Company when job title is not present', () => {
    const presenter = new Presenter({
      identifier: 1,
      jobtitle: null,
      company: 'Simpleview',
    })
    const profession = getPresenterProfession(presenter)
    expect(profession).toEqual('Simpleview')
  })

  it('should return "jobTitle - Company" if both exists', () => {
    const presenter = new Presenter({
      identifier: 1,
      jobtitle: 'engineer',
      company: 'Simpleview',
    })
    const profession = getPresenterProfession(presenter)
    expect(profession).toEqual('engineer - Simpleview')
  })

  it('should return empty string if neither jobTitle and Company exists', () => {
    const presenter = new Presenter({ identifier: 1 })
    const profession = getPresenterProfession(presenter)
    expect(profession).toEqual('')
  })
})
