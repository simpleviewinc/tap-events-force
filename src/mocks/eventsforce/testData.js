import { longText } from '../text'

export default {
  agendaDays: [
    {
      dayNumber: 1,
      date: '2020-07-17',
    },
    {
      dayNumber: 2,
      date: '2020-07-18',
    },
    {
      dayNumber: 3,
      date: '2020-07-19',
    },
  ],
  settings: {
    showLocationInAgenda: true,
    showPresentersInAgenda: true,
  },
  presenters: [
    {
      identifier: '1',
      title: 'Mr',
      firstname: 'Frank',
      lastname: 'Macloud',
      email: 'f.macloud@test.tes',
      jobtitle: 'Careers Advisor',
      company: 'Infinite Wealth',
      photographUrl:
        'https://47ddc71556b359d028bd-d91a48d103994bcfc502e0439b859d74.ssl.cf3.rackcdn.com/ef-iij5tpq56zja/noevent/personal/679/wvBcFJAn5jU0wAzmq3g6553149064133/avatar_people_person_business_.jpg',
      biography:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      identifier: '2',
      title: 'Ms',
      firstname: 'Cynthia',
      lastname: "O'Connor",
      email: "c.o'connor@test.tes",
      jobtitle: 'Marketing Manager',
      company: 'Scaffolding Solutions Ltd',
      biography: '',
    },
    {
      identifier: '3',
      title: 'Mrs',
      firstname: 'Franky',
      lastname: 'Macloudy',
      email: 'f.macloud@test.tes',
      jobtitle: 'Careers Advisor',
      company: 'Infinite Wealth',
      photographUrl:
        'https://47ddc71556b359d028bd-d91a48d103994bcfc502e0439b859d74.ssl.cf3.rackcdn.com/ef-iij5tpq56zja/noevent/personal/679/wvBcFJAn5jU0wAzmq3g6553149064133/avatar_people_person_business_.jpg',
      biography: longText,
    },
  ],
  labels: [
    {
      identifier: '1',
      name: 'Important',
      className: 'ef-agenda-label-201',
    },
    {
      identifier: '2',
      name: 'Big Data',
      className: 'ef-agenda-label-202',
    },
    {
      identifier: '3',
      name: 'Popular',
      className: 'ef-agenda-label-203',
    },
    {
      identifier: '4',
      name: 'Analytics',
      className: 'ef-agenda-label-204',
    },
    {
      identifier: '5',
      name: 'Machine Learning',
      className: 'ef-agenda-label-205',
    },
    {
      identifier: '6',
      name: 'Breaks',
      className: 'ef-agenda-label-206',
    },
  ],
  locations: [
    {
      identifier: '1',
      name: 'The Atrium',
    },
    {
      identifier: '2',
      name: 'Main Hall',
    },
  ],
  sessions: [
    {
      identifier: '1',
      name:
        'session with presenters and labels session with presenters and labels session with presenters and labels session with presenters and labels',
      summary: 'This is a session with both presenters and labels',
      dayNumber: 1,
      startDateTimeLocal: '2020-08-03 09:00:00',
      endDateTimeLocal: '2020-08-03 13:30:00',
      presenterIdentifiers: [ '1', '2' ],
      labelIdentifiers: [ '1', '2' ],
      locationIdentifier: '1',
      liveVideoUrl: 'https://us02web.zoom.us/j/1234',
      recordedVideoUrl: 'https://www.youtube.com/watch?v=21X5lGlDOfg',
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: true,
      },
      price: {
        currency: 'USD',
        amount: 923.0,
      },
    },
    {
      identifier: '2',
      name: 'session at same time other session with presenters and labels',
      summary: '',
      dayNumber: 1,
      startDateTimeLocal: '2020-08-03 13:00:00',
      endDateTimeLocal: '2020-08-03 13:30:00',
      presenterIdentifiers: [],
      labelIdentifiers: [],
      locationIdentifier: '2',
      liveVideoUrl: '',
      recordedVideoUrl: '',
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: true,
      },
    },
    {
      identifier: '3',
      name: 'Session on day 2 limited capacity, no waiting list',
      summary: '',
      dayNumber: 2,
      startDateTimeLocal: '2020-08-04 09:00:00',
      endDateTimeLocal: '2020-08-04 09:30:00',
      presenterIdentifiers: [],
      labelIdentifiers: [],
      locationIdentifier: '2',
      liveVideoUrl: '',
      recordedVideoUrl: '',
      restrictToAttendeeCategories: [ '1', '2' ],
      capacity: {
        isUnlimited: false,
        remainingPlaces: 2,
        isWaitingListAvailable: true,
      },
    },
    {
      identifier: '3a',
      name: 'Session on day 2 limited capacity, no waiting list',
      summary: '',
      dayNumber: 2,
      startDateTimeLocal: '2020-08-04 09:15:00',
      endDateTimeLocal: '2020-08-04 09:30:00',
      presenterIdentifiers: [],
      labelIdentifiers: [],
      locationIdentifier: '2',
      liveVideoUrl: '',
      recordedVideoUrl: '',
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: false,
        remainingPlaces: 3,
        isWaitingListAvailable: false,
      },
    },
    {
      identifier: '4',
      name: 'Session on day 2 limited capacity, has waiting list',
      summary: '',
      dayNumber: 2,
      startDateTimeLocal: '2020-08-04 10:00:00',
      endDateTimeLocal: '2020-08-04 10:30:00',
      presenterIdentifiers: [],
      labelIdentifiers: [],
      locationIdentifier: '2',
      liveVideoUrl: '',
      recordedVideoUrl: '',
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: false,
        remainingPlaces: 3,
        isWaitingListAvailable: true,
      },
    },
    {
      identifier: '5',
      name: 'Session on day 2 full, has waiting list',
      summary: '',
      dayNumber: 2,
      startDateTimeLocal: '2020-08-04 11:00:00',
      endDateTimeLocal: '2020-08-04 11:30:00',
      presenterIdentifiers: [],
      labelIdentifiers: [],
      locationIdentifier: '2',
      liveVideoUrl: '',
      recordedVideoUrl: '',
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: false,
        remainingPlaces: 0,
        isWaitingListAvailable: true,
      },
    },
    {
      identifier: '6',
      name: 'Session on day 2 restricted to attendee category',
      summary: '',
      dayNumber: 2,
      startDateTimeLocal: '2020-08-04 11:00:00',
      endDateTimeLocal: '2020-08-04 11:30:00',
      presenterIdentifiers: [],
      labelIdentifiers: [],
      locationIdentifier: '2',
      liveVideoUrl: '',
      recordedVideoUrl: '',
      restrictToAttendeeCategories: ['1'],
      capacity: {
        isUnlimited: true,
      },
    },
    {
      identifier: '7',
      name: 'Session on day 2 Demo 1',
      summary: '',
      dayNumber: 2,
      startDateTimeLocal: '2020-08-04 11:00:00',
      endDateTimeLocal: '2020-08-04 11:45:00',
      presenterIdentifiers: [],
      labelIdentifiers: [],
      locationIdentifier: '2',
      liveVideoUrl: '',
      recordedVideoUrl: '',
      restrictToAttendeeCategories: ['1'],
      capacity: {
        isUnlimited: false,
        remainingPlaces: 1,
        isWaitingListAvailable: false,
      },
    },
    {
      identifier: '8',
      name:
        'Session on day 2 Demo 2: super long name. Something different that is very complicated to describe',
      summary: '',
      dayNumber: 2,
      startDateTimeLocal: '2020-08-04 11:00:00',
      endDateTimeLocal: '2020-08-04 11:30:00',
      presenterIdentifiers: [],
      labelIdentifiers: [],
      locationIdentifier: '2',
      liveVideoUrl: '',
      recordedVideoUrl: '',
      restrictToAttendeeCategories: ['1'],
      capacity: {
        isUnlimited: true,
      },
    },
    {
      identifier: '9',
      name: 'Session on day 2 Demo 3',
      summary: '',
      dayNumber: 2,
      startDateTimeLocal: '2020-08-04 15:00:00',
      endDateTimeLocal: '2020-08-04 16:30:00',
      presenterIdentifiers: [],
      labelIdentifiers: [],
      locationIdentifier: '2',
      liveVideoUrl: '',
      recordedVideoUrl: '',
      restrictToAttendeeCategories: ['1'],
      capacity: {
        isUnlimited: true,
      },
    },
    {
      identifier: '10',
      name: 'Test session day 3',
      summary: 'This is a session with both presenters and labels',
      dayNumber: 3,
      startDateTimeLocal: '2020-08-03 09:00:00',
      endDateTimeLocal: '2020-08-03 13:30:00',
      presenterIdentifiers: [ '1', '2' ],
      labelIdentifiers: [ '1', '2' ],
      locationIdentifier: '1',
      liveVideoUrl: 'https://us02web.zoom.us/j/1234',
      recordedVideoUrl: 'https://www.youtube.com/watch?v=21X5lGlDOfg',
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: true,
      },
      price: {
        currency: 'USD',
        amount: 923.0,
      },
    },
    {
      identifier: '11',
      name: 'Zerista session day 3',
      summary: 'This is a session with both presenters and labels',
      dayNumber: 3,
      startDateTimeLocal: '2020-08-03 09:00:00',
      endDateTimeLocal: '2020-08-03 13:30:00',
      presenterIdentifiers: [ '1', '2' ],
      labelIdentifiers: [ '1', '2' ],
      locationIdentifier: '1',
      liveVideoUrl: 'https://us02web.zoom.us/j/1234',
      recordedVideoUrl: 'https://www.youtube.com/watch?v=21X5lGlDOfg',
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: true,
      },
      price: {
        currency: 'USD',
        amount: 923.0,
      },
    },
  ],
  attendees: [
    {
      bookedTicketIdentifier: '1',
      name: 'Mr Frank Smith',
      attendeeCategoryIdentifier: '1',
      bookedDays: [ 1, 2 ],
      bookedSessions: [],
    },
    {
      bookedTicketIdentifier: '2',
      name: "Mrs Penelope O'Connor",
      attendeeCategoryIdentifier: '2',
      bookedDays: [2],
      bookedSessions: [],
      waitingListSessions: ['3'],
    },
    {
      bookedTicketIdentifier: '3',
      name: 'Dr Lucy Jones',
      attendeeCategoryIdentifier: '1',
      bookedDays: [ 1, 2 ],
      bookedSessions: [ '1', '3', '5' ],
    },
    {
      bookedTicketIdentifier: '4',
      name: 'Pepe Silvia',
      attendeeCategoryIdentifier: '1',
      bookedDays: [],
      bookedSessions: [],
    },
    {
      bookedTicketIdentifier: '5',
      name: 'Vic Vinegar',
      attendeeCategoryIdentifier: '3',
      bookedDays: [3],
      bookedSessions: [],
    },
    {
      bookedTicketIdentifier: '6',
      name: 'Hugh Honey',
      attendeeCategoryIdentifier: '3',
      bookedDays: [3],
      bookedSessions: [],
    },
    {
      bookedTicketIdentifier: '7',
      attendeeCategoryIdentifier: '1',
      bookedDays: [ 1, 2 ],
      bookedSessions: [ '3', '5' ],
    },
    {
      bookedTicketIdentifier: '8',
      attendeeCategoryIdentifier: '1',
      bookedDays: [ 1, 2 ],
      bookedSessions: [ '3', '5' ],
    },
  ],
  bookedTickets: [
    { identifier: '1', ticketIdentifier: '34' },
    { identifier: '2', ticketIdentifier: '34' },
    { identifier: '3', ticketIdentifier: '37' },
    { identifier: '4', ticketIdentifier: '38' },
    { identifier: '7', ticketIdentifier: '38' },
    { identifier: '8', ticketIdentifier: '37' },
    {
      identifier: '9',
      ticketIdentifier: '39',
      bookedSubTickets: [
        { identifier: '5', ticketIdentifier: '38' },
        { identifier: '6', ticketIdentifier: '37' },
      ],
    },
  ],
  tickets: [
    {
      ticketType: 'person',
      identifier: '34',
      name: 'Regular Attendee',
      displayOrder: 1,
    },
    {
      ticketType: 'person',
      identifier: '37',
      name: 'VIP',
      displayOrder: 4,
    },
    {
      ticketType: 'group',
      identifier: '38',
      name: 'Group',
      displayOrder: 3,
    },
    {
      ticketType: 'group',
      identifier: '40',
      name: 'Family Ticket',
      displayOrder: 2,
    },
  ],
}
