import { AppRegistry } from "react-native";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
  "Module AudioRecorderManager"
]);
import App from "./App";

AppRegistry.registerComponent("whitenoise", () => App);
