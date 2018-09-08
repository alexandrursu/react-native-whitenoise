import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { constants } from "../helpers/const";

export default class BottomNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.routes.state.routeName
    };
  }

  changeRoute = route => {
    this.props.routes.navigate(route);
  };
  render() {
    return (
      <View style={styles.navigation}>
        <Icon
          onPress={() => this.changeRoute("Home")}
          name="home"
          color={this.state.active === "Home" ? "#00ffbf" : "#ffffff"}
          underlayColor={"rgba(0,0,0,0)"}
        />
        <Icon
          onPress={() => this.changeRoute("Settings")}
          name="settings"
          color={this.state.active === "Settings" ? "#00ffbf" : "#ffffff"}
          underlayColor={"rgba(0,0,0,0)"}
        />
        <Icon
          onPress={() => this.changeRoute("Profile")}
          name="info-circle"
          type="font-awesome"
          color={
            this.state.active === "Profile" ? constants.mainColor : "#ffffff"
          }
          underlayColor={"rgba(0,0,0,0)"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigation: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 15
  }
});
