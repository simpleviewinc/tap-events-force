#! /bin/bash

# Usage: yarn build:theme
# Description: Builds the theme file for the global events force style objects, derived from css 

SOURCE="scripts/eventsForce.css"
DESTINATION="src/theme/eventsForce.js"
NAME="eventsForce"

node scripts/transformCSS.js "$SOURCE" "$DESTINATION" "$NAME"