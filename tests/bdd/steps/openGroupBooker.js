const { When } = require('HerkinParkin')
const { isAncestor, isAncestorTo, clickDescendent, isVisible } = require('HerkinSteps')

const clickModalButton = async (world) => {
  try {
    // regular button
    await clickDescendent('.ef-action-button-select', world)
  }
  catch (err) {
    // waiting list button
    await clickDescendent('.ef-action-button-on', world)
  }
}

When('I open the group booker for session with text {string}', async (text, world) => {
  await isAncestorTo('.ef-grid-container', 'descendent', `text=${text}`, world)
  await clickModalButton(world)
  await isVisible('.ef-modal-group-body', world)
})

When('I open the group booker for session with id {int}', async (id, world) => {
  await isAncestor(`[data-testid="${id}"]`, world)
  await clickModalButton(world)
  await isVisible('.ef-modal-group-body', world)
})
