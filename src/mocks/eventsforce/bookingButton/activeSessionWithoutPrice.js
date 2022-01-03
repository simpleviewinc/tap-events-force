import testData from 'SVEvfMocks/eventsforce/testData.js'

export default {
  ...testData,
  sessions: [
    {
      allowBooking: true,
      identifier: '2',
      name: 'session at same time other session with presenters and labels',
      summary: '',
      dayNumber: 1,
      startDateTimeLocal: '2020-08-03 13:00:00',
      endDateTimeLocal: '2020-08-03 13:30:00',
      presenterIdentifiers: [],
      labelIdentifiers: ['3'],
      locationIdentifier: '2',
      liveVideoUrl: '',
      recordedVideoUrl: '',
      restrictToAttendeeCategories: [],
      capacity: {
        isUnlimited: true,
      },
    },
  ],
}
