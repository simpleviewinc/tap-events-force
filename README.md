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
*The steps below document how to deploy updates for the Eventsforce sessions component from your local machine.* 
- Link to tap-events-force : https://github.com/simpleviewinc/tap-events-force
- Link to keg-test-consumer : https://github.com/simpleviewinc/keg-test-consumer 

###### Step 1 : Build app/ tap
*Note: Build tool used is Rollup*
- Download latest changes from tap-events-force project
- Clean using `yarn clean:full`
- Build using `yarn build`
- This would create build files under the build folder in tap-events-force
###### Step 2: Test app on Keg-test-consumer
*Note 1 : The reason we are testing with keg-test-consumer is to test in an environment that more closely simulates/matches the consumption of this component in the production environment*
*Note 2 : More extensive testing is required when dependencies are updated*
- Make sure you're in the tap-events-force, build directory
- Go into build directory and run `yarn link`
- Go to keg-test-consumer and run `yarn link @keg-hub/tap-evf-sessions`
- In keg-test-consumer run `yarn start`
- Go to local host site and test your changes (you may need to update mocks/testdata.js under keg-test-consumer if you changed that data in tap-events-force)
###### Step 3: Increment version
*Note: We use the SemVer versioning strategy*
- Under tap-events-force project in root package.json increment the ‘version’ field
###### Step 4: Publish build to NPM
- Move to build folder under tap-events-force
- Run the command `npm publish`
- Verify latest package version has been uploaded under https://www.npmjs.com/package/@keg-hub/tap-evf-sessions
###### Step 5: Verify the app works from the updated npm package
*Note: This is the NPM package that is downloaded and used by the main EventsForce application in the production environment*
- Stop keg-test-consumer process
- Run `yarn unlink @keg-hub/tap-evf-sessions` to stop symlinking
- Under keg-test-consumer  package.json update the dependency version to the latest
- Under keg-test-consumer run `yarn install --force` to force test consumer to download latest package from npm
- Run `yarn start` to start keg-test-consumer again and verify your changes are there
###### Step 6: Commit and push latest changes to keg-test-consumer and update live demo site
- Commit and push latest changes to master branch of keg-test-consumer 
- Deploy test consumer app to https://simpleviewinc.github.io/keg-test-consumer using `yarn deploy`
- Check live site has your latest changes by looking at the version in the bottom right
###### Step 7: Create release notes for the version you released
- Go to https://github.com/simpleviewinc/tap-events-force and click on the release section on the right
- Create the right tag based on the ‘v{VersionNumber}’ format
- Click ‘Draft a new release’ and create release notes following similar steps like previous releases
- Verify the link on the bottom right of the live site links to the release notes
###### Step 8: Announcement on Transatlantic-tech-channel 
- Please announce to the slack channel Transatlantic-tech-channel that there has been a release. Review previous announcement formats and follow the same (At a minimum include details on latest version number and Link to github readme notes)



