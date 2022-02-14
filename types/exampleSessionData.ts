import { SessionAgendaProps } from "../models/efSessionAgenda"
import { EfTicketType } from "../models/efTicketInterface"
import { EfTimeFormat } from "../models/formElementQuestionInterface"

export const exampleSessionData: SessionAgendaProps = {
  displayProperties: {
    dateFormat: "MM/dd/yyyy",
    timeFormat: EfTimeFormat.Twelve
  },
  settings: {
    showLocationInAgenda: true,
    showPresentersInAgenda: true
  },
  agendaDays: [
    {
      dayNumber: 1,
      date: "2020-07-17",
      dayName: "First day"
    },
    {
      dayNumber: 2,
      date: "2020-07-18",
      dayName: "Day 2"
    },
    {
      dayNumber: 3,
      date: "2020-07-19",
      dayName: "Third day"
    }
  ],
  presenters: [
    {
      identifier: "1",
      title: "Mr",
      firstname: "Frank",
      lastname: "Macloud",
      email: "f.macloud@test.tes",
      jobtitle: "Careers Advisor",
      company: "Infinite Wealth",
      photographUrl:
        "https://47ddc71556b359d028bd-d91a48d103994bcfc502e0439b859d74.ssl.cf3.rackcdn.com/ef-iij5tpq56zja/noevent/personal/679/wvBcFJAn5jU0wAzmq3g6553149064133/avatar_people_person_business_.jpg",
      biography:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      identifier: "2",
      title: "Ms",
      firstname: "Cynthia",
      lastname: "O'Connor",
      email: "c.o'connor@test.tes",
      jobtitle: "Marketing Manager",
      company: "Scaffolding Solutions Ltd",
      biography: ""
    }
  ],
  labels: [
    {
      identifier: "1",
      name: "important",
      className: "ef-agenda-label-206"
    },
    {
      identifier: "2",
      name: "not so important",
      className: "ef-agenda-label-207"
    }
  ],
  locations: [
    {
      identifier: "1",
      name: "The Atrium"
    },
    {
      identifier: "2",
      name: "Main Hall"
    }
  ],
  sessions: [
    {
      identifier: "1",
      name: "session with presenters and labels",
      summary: "This is a session with both presenters and labels",
      dayNumber: 1,
      allowBooking: true,
      startDateTimeLocal: "2020-08-03 13:00:00",
      endDateTimeLocal: "2020-08-03 13:30:00",
      presenterIdentifiers: ["1", "2"],
      labelIdentifiers: ["1", "2"],
      locationIdentifier: "1",
      liveVideoUrl: "https://us02web.zoom.us/j/1234",
      recordedVideoUrl: "https://www.youtube.com/watch?v=21X5lGlDOfg",
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: true
      },
      price: {
        currency: "USD",
        amount: 923.0
      }
    },
    {
      identifier: "2",
      name: "session at same time other session with presenters and labels",
      summary: "",
      dayNumber: 1,
      allowBooking: true,
      startDateTimeLocal: "2020-08-03 13:00:00",
      endDateTimeLocal: "2020-08-03 13:30:00",
      presenterIdentifiers: [],
      labelIdentifiers: [],
      locationIdentifier: "2",
      liveVideoUrl: "",
      recordedVideoUrl: "",
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: true
      }
    },
    {
      identifier: "3",
      name: "Session on day 2 limited capacity, no waiting list",
      summary: "",
      dayNumber: 2,
      allowBooking: true,
      startDateTimeLocal: "2020-08-04 09:00:00",
      endDateTimeLocal: "2020-08-04 09:30:00",
      presenterIdentifiers: [],
      labelIdentifiers: [],
      locationIdentifier: "2",
      liveVideoUrl: "",
      recordedVideoUrl: "",
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: false,
        remainingPlaces: 3,
        isWaitingListAvailable: false
      }
    },
    {
      identifier: "4",
      name: "Session on day 2 limited capacity, has waiting list",
      summary: "",
      dayNumber: 2,
      allowBooking: true,
      startDateTimeLocal: "2020-08-04 10:00:00",
      endDateTimeLocal: "2020-08-04 10:30:00",
      presenterIdentifiers: [],
      labelIdentifiers: [],
      locationIdentifier: "2",
      liveVideoUrl: "",
      recordedVideoUrl: "",
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: false,
        remainingPlaces: 3,
        isWaitingListAvailable: true
      }
    },
    {
      identifier: "6",
      name: "Session on day 2 full, has waiting list",
      summary: "",
      dayNumber: 2,
      allowBooking: true,
      startDateTimeLocal: "2020-08-04 11:00:00",
      endDateTimeLocal: "2020-08-04 11:30:00",
      presenterIdentifiers: [],
      labelIdentifiers: [],
      locationIdentifier: "2",
      liveVideoUrl: "",
      recordedVideoUrl: "",
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: false,
        remainingPlaces: 0,
        isWaitingListAvailable: true
      }
    },
    {
      identifier: "7",
      name: "Session on day 2 restricted to attendee category",
      summary: "",
      dayNumber: 2,
      allowBooking: true,
      startDateTimeLocal: "2020-08-04 11:00:00",
      endDateTimeLocal: "2020-08-04 11:30:00",
      presenterIdentifiers: [],
      labelIdentifiers: [],
      locationIdentifier: "2",
      liveVideoUrl: "",
      recordedVideoUrl: "",
      restrictToAttendeeCategories: ["1"],
      capacity: {
        isUnlimited: true
      }
    },
    {
      identifier: "8",
      name: "Session with no location, labels or presenters ",
      summary: "",
      dayNumber: 2,
      allowBooking: true,
      startDateTimeLocal: "2020-08-04 11:00:00",
      endDateTimeLocal: "2020-08-04 11:30:00",
      presenterIdentifiers: [],
      labelIdentifiers: [],
      liveVideoUrl: "",
      recordedVideoUrl: "",
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: true
      }
    },
    {
      identifier: "9",
      name: "A session that cannot be booked",
      summary: "",
      dayNumber: 2,
      allowBooking: false,
      startDateTimeLocal: "2020-08-04 11:00:00",
      endDateTimeLocal: "2020-08-04 11:30:00",
      presenterIdentifiers: [],
      labelIdentifiers: [],
      liveVideoUrl: "",
      recordedVideoUrl: "",
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: true
      }
    },
    {
      identifier: "10",
      name: "Session with waiting list enabled and 4 remaining waiting list places",
      summary: "",
      dayNumber: 2,
      allowBooking: true,
      startDateTimeLocal: "2020-08-04 12:00:00",
      endDateTimeLocal: "2020-08-04 12:30:00",
      presenterIdentifiers: [],
      labelIdentifiers: [],
      liveVideoUrl: "",
      recordedVideoUrl: "",
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: false,
        remainingPlaces: 0,
        isWaitingListAvailable: true,
        waitingListRemainingPlaces: 4
      }
    },
    {
      identifier: "11",
      name: "Session with waiting list enabled but no remaining waiting list places",
      summary: "",
      dayNumber: 2,
      allowBooking: true,
      startDateTimeLocal: "2020-08-04 12:00:00",
      endDateTimeLocal: "2020-08-04 12:30:00",
      presenterIdentifiers: [],
      labelIdentifiers: [],
      liveVideoUrl: "",
      recordedVideoUrl: "",
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: false,
        remainingPlaces: 0,
        isWaitingListAvailable: true,
        waitingListRemainingPlaces: 0
      }
    }
  ],

  attendees: [
    {
      bookedTicketIdentifier: "1",
      name: "Mr Frank Smith",
      attendeeCategoryIdentifier: "1",
      bookedDays: [1, 2],
      bookedSessions: [],
      waitingListSessions: []
    },
    {
      bookedTicketIdentifier: "2",
      name: "Mrs Penelope O'Connor",
      attendeeCategoryIdentifier: "2",
      bookedDays: [2],
      bookedSessions: [],
      waitingListSessions: []
    },
    {
      bookedTicketIdentifier: "3",
      name: "Dr Lucy Jones",
      attendeeCategoryIdentifier: "1",
      bookedDays: [1, 2],
      bookedSessions: ["1", "3", "5"],
      waitingListSessions: []
    },
    {
      bookedTicketIdentifier: "5",
      name: "Regular Attendee in group",
      attendeeCategoryIdentifier: "1",
      bookedDays: [1, 2],
      bookedSessions: [],
      waitingListSessions: []
    },
    {
      bookedTicketIdentifier: "6",
      name: "VIP in group",
      attendeeCategoryIdentifier: "1",
      bookedDays: [1, 2],
      bookedSessions: [],
      waitingListSessions: []
    }
  ],
  bookedTickets: [
    { identifier: "1", ticketIdentifier: "34" },
    { identifier: "2", ticketIdentifier: "37" },
    { identifier: "3", ticketIdentifier: "37" },
    {
      identifier: "4",
      ticketIdentifier: "39",
      bookedSubTickets: [{ identifier: "5", ticketIdentifier: "34" }, { identifier: "6", ticketIdentifier: "37" }]
    }
  ],
  tickets: [
    {
      ticketType: EfTicketType.Person,
      identifier: "34",
      name: "Regular Attendee",
      displayOrder: 1
    },
    {
      ticketType: EfTicketType.Person,
      identifier: "37",
      name: "VIP",
      displayOrder: 2
    },
    {
      ticketType: EfTicketType.Group,
      identifier: "39",
      name: "Group",
      displayOrder: 3
    }
  ]
}
