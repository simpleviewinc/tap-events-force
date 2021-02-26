const { When } = require('HerkinParkin')
const { clickElement } = require('HerkinSteps')

When(
  'I open the filter modal', 
  async () => clickElement('.ef-sessions-filter-button')
)
