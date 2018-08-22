import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Mountain from "./assets/images/mountain.jpeg";
import Player from "./components/Player";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import BottomNavigation from "./components/BottomNavigation";
import { createStackNavigator } from "react-navigation";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
    title: "White Noise Smart",
    headerStyle: {
      backgroundColor: "rgba(3, 218, 198, 1)",
      borderBottomColor: "transparent"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "100"
    }
  };

  render() {
    return (
      <View style={styles.main}>
        <ImageBackground source={Mountain} style={styles.backgroundImage}>
          <View style={styles.container}>
            <LinearGradient
              colors={["rgba(3, 218, 198, 0.8)", "rgba(98, 0, 238, 0.5)"]}
              start={{ x: 0, y: 0.1 }}
              end={{ x: 0.1, y: 1.0 }}
              locations={[0, 1]}
              style={styles.linearGradient}
            >
              <Player />
              <BottomNavigation routes={this.props.navigation} />
            </LinearGradient>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: Home,
    Settings: Settings,
    Profile: Profile
  },
  {
    initialRouteName: "Home"
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    height: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  main: {
    height: "100%"
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    width: "100%",
    zIndex: 1,
    alignSelf: "center",
    justifyContent: "space-between"
  },
  linearGradient: {
    flex: 1,
    width: "100%",
    zIndex: 2,
    position: "absolute",
    height: "100%",
    alignSelf: "stretch",
    alignItems: "center"
  },
  textStyle: {
    color: "#fff",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    top: 3
  }
});
