Fix for ViewPropTypes Bug in Release mode
npm install -g jscodeshift
cd react-codemod
jscodeshift -t transforms/ReactNative-View-propTypes.js ../whitenoise/

## Build Project
react-native run-ios

## Issues & Fixes
Issue: Invariant Violation: requireNativeComponent: "RNCWebView" was not found in the UIManager
Fix: react-native link react-native-webview

npm install -g ios-deploy
