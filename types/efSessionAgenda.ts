// import { EfTicketInterface } from "./efTicketInterface"
// import { EfBookedTicketInterface } from "./efBookedTicketInterface"
// import { EfDateFormat, EfTimeFormat } from "./formElementQuestionInterface"

export interface EfSessionAgenda {
  agendaDays: EfAgendaDay[]
  sessions: EfSession[]
  locations: EfLocation[]
  labels?: EfLabel[]
  presenters?: EfPresenter[]
}

export interface SessionAgendaProps {
  displayProperties?: EfAgendaDisplayProperties
  settings: EfAgendaSettings
  agendaDays: EfAgendaDay[]
  presenters: EfPresenter[]
  labels: EfLabel[]
  locations: EfLocation[]
  sessions: EfSession[]
  attendees: EfSessionAttendee[]
  bookedTickets?: EfBookedTicketInterface[] // Used to link the bookedTicketIdentifier for the attendee to the actual ticket
  tickets?: EfTicketInterface[] //Used to get the name of the tickets

  onSessionBookingRequest?: (
    sessionIdentifer: EfSessionIdentifier,
    attendeeBookedTicketIdentifiers: EfBookedTicketIdentifier[]
  ) => Promise<null> // Resolved when the request is successfully completed or throws Error with reason for failure

  onSessionWaitingListRequest?: (
    sessionIdentifer: EfSessionIdentifier,
    attendeeBookedTicketIdentifiers: EfBookedTicketIdentifier[]
  ) => Promise<null> // Resolved when the request is successfully completed or throws Error with reason for failure

  alert?: EfAlert // passes any messages from event handlers to component
}

export interface EfAgendaDisplayProperties {
  dateFormat: EfDateFormat
  timeFormat: EfTimeFormat
}

export interface EfAlert {
  title?: string
  message?: string
  type: "error"
}

export interface EfAgendaDay {
  dayNumber: number
  date: string
  dayName: string
}

export interface EfPresenter {
  identifier: EfPresenterIdentifier
  title: string //Mr, mrs, Dr, etc max 50 characters
  firstname: string //Max 50 characters
  lastname: string //Max 50 characters
  email: string //email address
  jobtitle: string
  company: string
  photographUrl?: string // Url of presenters photo
  biography: string // Max 10,000 characters
}

export interface EfAgendaSettings {
  showLocationInAgenda: boolean
  showPresentersInAgenda: boolean
}

export interface EfLabel {
  identifier: EfLabelIdentifier
  name: string
  className: string
}
export interface EfLocation {
  identifier: EfLocationIdentifier
  name: string
}

export interface EfSession {
  identifier: EfSessionIdentifier
  name: string
  summary: string
  dayNumber: EfDayNumber
  startDateTimeLocal: string // In the time zone of the event E.g. "2020-08-03 14:40:00"
  endDateTimeLocal: string // In the time zone of the event E.g. "2020-08-03 15:40:00"
  allowBooking?: boolean
  presenterIdentifiers?: EfPresenterIdentifier[]
  labelIdentifiers?: EfLabelIdentifier[]
  locationIdentifier?: EfLocationIdentifier
  liveVideoUrl?: string // Url for the live stream
  recordedVideoUrl?: string // Url for the recorded video
  price?: {
    currency: string // ISO 4217
    amount: number
  }
  restrictToAttendeeCategories?: EfAttendeeCategoryIdentifier[]
  capacity?: {
    isUnlimited: boolean
    remainingPlaces?: number // Only populated if isUnlimited = false
    isWaitingListAvailable?: boolean // Only populated if isUnlimited = false
    waitingListRemainingPlaces?: number
  }
}

export interface EfSessionAttendee {
  bookedTicketIdentifier: EfBookedTicketIdentifier
  name: string
  attendeeCategoryIdentifier: EfAttendeeCategoryIdentifier
  bookedDays: EfDayNumber[]
  bookedSessions: EfSessionIdentifier[]
  waitingListSessions: EfSessionIdentifier[]
}

export type EfAttendeeCategoryIdentifier = string

export type EfBookedTicketIdentifier = string

export type EfDayNumber = number

export type EfPresenterIdentifier = string

export type EfLocationIdentifier = string

export type EfLabelIdentifier = string

export type EfSessionIdentifier = string
