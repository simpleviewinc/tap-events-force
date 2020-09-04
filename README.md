# Tap Eventsforce
* Eventsforce app

## Dev
* `yarn install`
* `yarn test` - run unit tests
* `yarn web` - run locally on web. 
    * uses `/apps/Main.js` as entry point

### Sessions component build
* Builds and packages the `Sessions` component for the Eventsforce team to consume in their own React app
    * [package link](https://www.npmjs.com/package/@keg-hub/tap-evf-sessions)
* `yarn test:build` - starts up dev server that uses the Session component build itself
    * uses `/app/BuildTest.js` as entry point
