Fix for ViewPropTypes Bug in Release mode
npm install -g jscodeshift
cd react-codemod
jscodeshift -t transforms/ReactNative-View-propTypes.js ../whitenoise/

# First Build

1. npm install
1. npm run start (builds project runs Metro Builder)
1. npm install -g react-native-cli

# Last time

1. npm install
2. npm audit fix
3. react-native run-ios (could be optional: npm run start (builds project runs Metro Builder))

# Known Issues and Fixes

Issue: Could not find iPhone 6 simulator
Fix: What fixed it for me was manually updating our node_modules/react-native/local-cli/runIOS/findMatchingSimulator.js from

if (!version.startsWith('iOS') && !version.startsWith('tvOS'))
to

if (!version.startsWith('com.apple.CoreSimulator.SimRuntime.iOS') && !version.startsWith('com.apple.CoreSimulator.SimRuntime.tvOS'))

- react-native-audio (to unlink run: "react-native unlink react-native-audio")
- react-native-linear-gradient (to unlink run: "react-native unlink react-native-linear-gradient")
- react-native-sound-level (to unlink run: "react-native unlink react-native-sound-level")
- react-native-vector-icons (to unlink run: "react-native unlink react-native-vector-icons")
- react-native-sound (to unlink run: "react-native unlink react-native-sound")

Unable to resolve module `react-native-canvas` from `/Users/alexursu/Documents/workspace/whitenoise/components/player/CanvasImage.js`: Module `react-native-canvas` does not exist in the Haste module map This might be related to https://github.com/facebook/react-native/issues/4968 To resolve try the following:

1. Clear watchman watches: `watchman watch-del-all`.
2. Delete the `node_modules` folder: `rm -rf node_modules && npm install`.
3. Reset Metro Bundler cache: `rm -rf /tmp/metro-bundler-cache-*` or `npm start -- --reset-cache`. 4. Remove haste cache: `rm -rf /tmp/haste-map-react-native-packager-*`
