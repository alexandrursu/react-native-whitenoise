import React from "react";
import { AsyncStorage } from "react-native";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import InfoMenu from "./components/InfoMenu";
import { createStackNavigator } from "react-navigation";
import { settings, favorite } from "./config";

let settingsClone;

const RootStack = createStackNavigator(
  {
    Home: {
      screen: props => <Home {...props} />,
      navigationOptions: {
        title: "",
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
    Profile: Profile,
    InfoMenu: {
      screen: props => <InfoMenu {...props} />,
      navigationOptions: {
        title: "Icons Guide",
        headerStyle: {
          backgroundColor: "rgba(3, 218, 198, 1)",
          borderBottomColor: "transparent"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {}
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //disabling yellow warning box
    console.disableYellowBox = true;
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

  storeSliderSettings = sliderValue => {
    settingsClone = this.state.settingsClone.map(item => {
      if (item.setting === "autoStop") {
        item.duration = Math.floor(sliderValue * 100) / 100;
      }
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
          storeSettings: data => this.storeSettings(data),
          storeSliderSettings: data => this.storeSliderSettings(data)
        }}
      />
    );
  }
}
