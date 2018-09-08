import React from "react";
import { StyleSheet, View, ImageBackground, AsyncStorage } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Mountain from "./assets/images/mountain.jpeg";
import Player from "./components/Player";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import BottomNavigation from "./components/BottomNavigation";
import { createStackNavigator } from "react-navigation";
import { settings, favorite } from "./config";

let settingsClone;

class Home extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
  }
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
              <Player
                favoriteSong={this.props.screenProps.favoriteSong}
                settingsClone={this.props.screenProps.settingsClone}
                storeSettings={data =>
                  this.props.screenProps.storeSettings(data)
                }
                storeFavorite={data =>
                  this.props.screenProps.storeFavorite(data)
                }
              />
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
    Home: {
      screen: props => <Home {...props} />,
      navigationOptions: {
        title: "White Noise: Smart Sleep",
        headerStyle: {
          backgroundColor: "rgba(3, 218, 198, 1)",
          borderBottomColor: "transparent"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {}
      }
    },
    Settings: {
      screen: props => <Settings {...props} />,
      navigationOptions: {
        title: "Settings",
        headerStyle: {
          backgroundColor: "rgba(3, 218, 198, 1)",
          borderBottomColor: "transparent"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff"
        }
      }
    },
    Profile: Profile
  },
  {
    initialRouteName: "Home"
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsClone: settings
    };
  }
  componentDidMount() {
    this.retrieveSettings();
  }

  storeSettings = setting => {
    console.log("========clone=========");
    console.log(this.state.settingsClone);
    console.log(setting);
    settingsClone = this.state.settingsClone.map(item => {
      item.setting === setting ? (item.value = !item.value) : "";
      return item;
    });

    AsyncStorage.setItem("settings", JSON.stringify(settingsClone)).then(() => {
      this.setState({
        settingsClone: settingsClone
      });
    });
  };

  retrieveSettings = () => {
    AsyncStorage.getItem("settings").then(data => {
      const value = JSON.parse(data);

      if (value !== null) {
        // We have data!!
        console.log("===============Get settings ============");
        console.log(value);
        this.setState({
          settingsClone: value
        });
      } else {
        this.setState({
          settingsClone: settings
        });
      }
    });
  };

  render() {
    return (
      <RootStack
        screenProps={{
          settingsClone: this.state.settingsClone,
          storeSettings: data => this.storeSettings(data)
        }}
      />
    );
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
