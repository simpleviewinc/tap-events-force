const { When } = require('HerkinParkin')
const { clickElement } = require('HerkinSteps')

const selectAttendeeCheckbox = id => {
  return clickElement(`.modal-body input[data-testid="${id}"]`)
}

When('I select checkbox for attendee with id {num}', selectAttendeeCheckbox)

module.exports = {
  selectAttendeeCheckbox
}