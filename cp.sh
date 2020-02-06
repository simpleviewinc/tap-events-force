# When developing on the sv-keg
# rm -rf node_modules/sv-keg/App.js
# rm -rf node_modules/sv-keg/app.json
# rm -rf node_modules/sv-keg/babel.config.js
# rm -rf node_modules/sv-keg/core
# cp -Rf ~/zerista/repos/sv-keg/App.js node_modules/sv-keg/App.js
# cp -Rf ~/zerista/repos/sv-keg/app.json node_modules/sv-keg/app.json
# cp -Rf ~/zerista/repos/sv-keg/babel.config.js node_modules/sv-keg/babel.config.js
# cp -Rf ~/zerista/repos/sv-keg/core node_modules/sv-keg/core

# When developing on the sv-tap-resolver
# rm -rf node_modules/sv-keg/node_modules/tap-resolver/src
# rm -rf node_modules/sv-keg/node_modules/tap-resolver/babel.config.js
# cp -Rf ~/zerista/repos/sv-tap-resolver/src node_modules/sv-keg/node_modules/tap-resolver/src
# cp -Rf ~/zerista/repos/sv-tap-resolver/babel.config.js node_modules/sv-keg/node_modules/tap-resolver/babel.config.js

# When developing on the re-theme
# rm -rf ~/zerista/repos/sv-keg/node_modules/re-theme/build
# cp -Rf ~/zerista/repos/sv-re-theme/build ~/zerista/repos/sv-keg/node_modules/re-theme/build

# When developing on the jsutils
# rm -rf ~/zerista/repos/sv-keg/node_modules/jsutils/cjs
# rm -rf ~/zerista/repos/sv-keg/node_modules/jsutils/esm
# cp -Rf ~/zerista/repos/jsUtils/cjs ~/zerista/repos/sv-keg/node_modules/jsutils/cjs
# cp -Rf ~/zerista/repos/jsUtils/esm ~/zerista/repos/sv-keg/node_modules/jsutils/esm