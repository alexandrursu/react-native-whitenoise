Fix for ViewPropTypes Bug in Release mode
npm install -g jscodeshift
cd react-codemod
jscodeshift -t transforms/ReactNative-View-propTypes.js ../whitenoise/

## Build Project

react-native run-ios

## Build project on Xcode

Could not find iPhone 6 simulator

What fixed it for me was manually updating
our
node_modules/react-native/local-cli/runIOS/findMatchingSimulator.js from
if (!version.startsWith('iOS') && !version.startsWith('tvOS')) {
to
if (!version.startsWith('com.apple.CoreSimulator.SimRuntime.iOS') &&
!version.startsWith('com.apple.CoreSimulator.SimRuntime.tvOS')) {

https://github.com/facebook/react-native/issues/21498#issuecomment-476621627

cd node_modules/react-native/third-party/glog-0.3.4/
./configure
