import testData from 'SVEvfMocks/eventsforce/testData.js'

export default {
  ...testData,
  sessions: [
    {
      allowBooking: true,
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
        isUnlimited: false,
        isWaitingListAvailable: true,
        remainingPlaces: 0,
      },
      price: {
        currency: 'USD',
        amount: 923.0,
      },
    },
  ],
}
