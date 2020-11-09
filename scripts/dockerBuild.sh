#!/bin/bash
# 
# Command to build the keg-sessions component with in the tap docker container, then copy to the host build folder
# This ensures a consistent environment when compiling the component
# At somepoint we could also automate pushing the component to NPM / Github / etc..
# 

if [[ -z "$KEG_CLI_PATH" ]]; then
  echo "[ KEG ERROR ] Keg-CLI path not set! Ensure the env \"KEG_CLI_PATH\" is set before running this command!" >&2
  exit 1
fi

# Ensure the keg-cli is loaded
source $KEG_CLI_PATH/keg

TAP_NAME=tap

# Move to the events-force directory
keg evf

# Path to the taps local build folder
LOCAL_BUILD_DIR=$(pwd)/build

# Remove the local build folder if it exists
if [[ -d "$LOCAL_BUILD_DIR" ]]; then
  rm -rf $LOCAL_BUILD_DIR
fi

# Command to build keg-component, and copy it from the docker container
# This is just to test building keg-components to ensure changes are reflected in that build
# keg d cp context=tap tap=$TAP_NAME source=docker remote=/keg/tap/node_modules/keg-core/node_modules/@keg-hub/keg-components/build local=$(pwd)/componentsBuild

# Run the build command in the tap docker container
keg d ex context=tap tap=$TAP_NAME cmd=\"yarn build\"

# Copy the build to the host machine
keg d cp context=tap tap=$TAP_NAME source=docker remote=/keg/tap/build local=$LOCAL_BUILD_DIR
