const path = require('path')

const manifest = tapPath => ({
  short_name: 'Events Force',
  name: 'Events Force: Proof of Concept',
  description: 'A progressive web app demonstrating what\'s possible for Events Force',
  icon: [
    {
      src: path.resolve(tapPath, 'assets/events_force.png'),
      type: 'image/png',
      sizes: [ 144, 192, 256, 512 ]
    },
  ],
  start_url: '/',
  background_color: '#3367D6',
  display: 'standalone',
  scope: '/',
  theme_color: '#3367D6'
})

module.exports = manifest