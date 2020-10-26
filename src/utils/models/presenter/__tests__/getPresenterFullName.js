import { getPresenterFullName } from '../getPresenterFullName'
import { Presenter } from 'SVModels/presenter'

describe('getPresenterFullName', () => {
  it('should return full name "{title} {firstname} {lastname}" if they exist', () => {
    const presenter = new Presenter({
      identifier: 1,
      title: 'Mr',
      firstname: 'Bob',
      lastname: 'Foo',
    })
    const fullName = getPresenterFullName(presenter)
    expect(fullName).toEqual('Mr Bob Foo')
  })

  it('should return "{firstname} {lastname}" if "title" DNE', () => {
    const presenter = new Presenter({
      identifier: 1,
      firstname: 'Bob',
      lastname: 'Foo',
    })
    const fullName = getPresenterFullName(presenter)
    expect(fullName).toEqual('Bob Foo')
  })

  it('should return "{title} {lastname}" if "firstname" DNE', () => {
    const presenter = new Presenter({
      identifier: 1,
      title: 'Mr',
      lastname: 'Foo',
    })
    const fullName = getPresenterFullName(presenter)
    expect(fullName).toEqual('Mr Foo')
  })

  it('should return empty string if title,firstname,lastname DNE', () => {
    const presenter = new Presenter({ identifier: 1 })
    const fullName = getPresenterFullName(presenter)
    expect(fullName).toEqual('')
  })
})
