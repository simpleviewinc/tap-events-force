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

## Deploy Instructions
*The steps below document how to deploy updates for the Eventsforce sessions component from your local machine. This process hands over changes to the UK based team in a prior agreed upon format* 
###### Step 1 : Build app/ tap
*Note: Tool used is RollUp*
- Download latest changes from tap-events-force project
- Clean using `yarn clean:full`
- Build using `yarn build`
- This would create build files under the build folder in tap-events-force
###### Step 2: Test app on Keg-test-consumer
*Note : More extensive testing is required when dependencies are updated*
- Move to project keg-test-consumer 
- Go into build directory and run `yarn link`
- Go to keg-test-consumer and run `yarn link @keg-hub/tap-evf-sessions`
- In keg-test-consumer run `yarn start`
- Go to local host site and test your changes (you may need to change mocks/testdata.js under keg-test-consumer)
###### Step 3: Increment version
- Under tap-events-force project in root package.json increment the ‘version’ field
###### Step 4: Publish build to NPM
- Move to build folder under tap-events-force
- Run the command `npm publish`
- Verify latest package version has been uploaded under https://www.npmjs.com/package/@keg-hub/tap-evf-sessions
###### Step 5: Verify the app works from the updated npm package
- Go to keg-test-consumer and stop container
- Run `yarn unlink @keg-hub/tap-evf-sessions` to stop simlinking
- Under keg-test-consumer  package.json update the dependency version to the latest
- Under keg-test-consumer run `yarn install –force` to force test consumer to download latest package from npm
- Run `yarn start` to start keg-test-consumer again and verify your changes are there
###### Step 6: Commit latest changes to keg-test-consumer and update live demo site
- Commit latest changes to master branch of keg-test-consumer 
- Deploy test consumer app to https://simpleviewinc.github.io/keg-test-consumer using `yarn deploy`
- Check live site has your latest changes by looking at the version in the bottom right
###### Step 7: Create release notes for the version you released
- Go to https://github.com/simpleviewinc/tap-events-force and click on the release section on the right
- Create the right tag based on the ‘v{VersionNumber}’ format
- Click ‘Draft a new release’ and create release notes following similar steps like previous releases
- Verify the link on the bottom right of the live site links to the release notes
###### Step 8: Announcement on Transatlantic-tech-channel 
- Please announce to the slack channel Transatlantic-tech-channel that there has been a release. Review previous announcement formats and follow the same (At a minimum include details on latest version number and Link to github readme notes)



