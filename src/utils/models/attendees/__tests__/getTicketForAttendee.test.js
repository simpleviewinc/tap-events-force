import { getTicketForAttendee } from '../getTicketForAttendee'

const bookedTickets = {
  '1': { identifier: '1', ticketIdentifier: '2' },
  '2': {
    identifier: '2',
    ticketIdentifier: '3',
  },
}

const tickets = {
  '1': {
    ticketType: 'person',
    identifier: '1',
    name: 'Regular Attendee',
  },
  '2': {
    ticketType: 'person',
    identifier: '2',
    name: 'VIP',
  },
  '3': {
    ticketType: 'group',
    identifier: '3',
    name: 'Group',
  },
  '4': {
    ticketType: 'group',
    identifier: '4',
    name: 'Family Ticket',
  },
  '5': {
    ticketType: 'group',
    identifier: '5',
    name: 'Special Ticket',
  },
  '6': {
    ticketType: 'group',
    identifier: '6',
    name: 'Amazing Ticket',
  },
}

describe('getTicketForAttendee', () => {
  it('should return the ticket associated with the attendee', () => {
    const attendee = {
      bookedTicketIdentifier: '1',
    }
    const ticket = getTicketForAttendee(
      attendee,
      Object.values(bookedTickets),
      Object.values(tickets)
    )

    expect(ticket.identifier).toEqual(tickets['2'].identifier)
  })

  it('should return null for no-match', () => {
    const attendee = {
      bookedTicketIdentifier: '17',
    }
    const ticket = getTicketForAttendee(
      attendee,
      Object.values(bookedTickets),
      Object.values(tickets)
    )

    expect(ticket).toEqual(null)
  })
})
