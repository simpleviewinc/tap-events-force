import { sortAttendeeIntoSections } from '../sortAttendeeIntoSections'

const bookedTickets = [
  { identifier: '1', ticketIdentifier: '2' },
  {
    identifier: '2',
    ticketIdentifier: '3',
  },
]

const tickets = [
  {
    ticketType: 'person',
    identifier: '1',
    name: 'Regular Attendee',
  },
  {
    ticketType: 'person',
    identifier: '2',
    name: 'VIP',
  },
  {
    ticketType: 'group',
    identifier: '3',
    name: 'Group',
  },
  {
    ticketType: 'group',
    identifier: '4',
    name: 'Family Ticket',
  },
  {
    ticketType: 'group',
    identifier: '5',
    name: 'Special Ticket',
  },
  {
    ticketType: 'group',
    identifier: '6',
    name: 'Amazing Ticket',
  },
]

describe('sortAttendeeIntoSections', () => {
  const orig = console.warn

  beforeAll(() => {
    console.warn = jest.fn()
  })

  afterAll(() => {
    console.warn = orig
  })

  const sectionData = {
    tickets,
    bookedTickets,
    attendeeIdsByTicket: {
      '2': [],
    },
  }

  it('should place the attendee into a section', () => {
    const attendee = {
      bookedTicketIdentifier: '1',
    }
    const result = sortAttendeeIntoSections(sectionData, attendee)
    expect(result.attendeeIdsByTicket['2']).toEqual(
      expect.arrayContaining([attendee.bookedTicketIdentifier])
    )
  })

  it('should return the section data unchanged when no section is found for the attendee', () => {
    const attendee = {
      bookedTicketIdentifier: Symbol(),
    }
    const result = sortAttendeeIntoSections(sectionData, attendee)
    Object.values(result.attendeeIdsByTicket).map(section => {
      expect(section).toEqual(
        expect.not.arrayContaining([attendee.bookedTicketIdentifier])
      )
    })
  })

  it('should init the array if it does not exist', () => {
    expect(sectionData.attendeeIdsByTicket['3']).toBeUndefined()

    const attendee = {
      bookedTicketIdentifier: '2',
    }

    const result = sortAttendeeIntoSections(sectionData, attendee)

    expect(result.attendeeIdsByTicket['3']).toEqual(
      expect.arrayContaining([attendee.bookedTicketIdentifier])
    )
  })
})
