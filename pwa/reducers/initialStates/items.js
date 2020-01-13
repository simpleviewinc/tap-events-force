import { uuid } from 'jsutils'

const personalMessage = data => ({
  type: 'text',
  group: 'personal',
  title: null,
  id: uuid(),
  ...data,
})

export const itemsState = {
  messages: [
    personalMessage({
      from: 'Superman',
      to: 'Batman',
      content: 'Hey, what-cha doin?',
    }),
    personalMessage({
      from: 'Batman',
      to: 'Superman',
      content: `I'm busy!`,
    }),
    personalMessage({
      from: 'Superman',
      to: 'Batman',
      content: `Can I help?`,
    }),
    personalMessage({
      from: 'Batman',
      to: 'Superman',
      content: `NO!`,
    }),
    personalMessage({
      from: 'Superman',
      to: 'Batman',
      content: `Seriously, I can help!`,
    }),
    personalMessage({
      from: 'Batman',
      to: 'Superman',
      content: `Go away!`,
    }),
    personalMessage({
      from: 'Superman',
      to: 'Batman',
      content: `Cool, be there in a sec! 😊`,
    }),
    personalMessage({
      from: 'Batman',
      to: 'Superman',
      content: `I hate you!`,
    }),
  ]
}
