import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";

export default class BottomNavigator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.navigation}>
        <Icon
          onPress={() => this.props.routes.navigate("Home")}
          name="home"
          color="#ffffff"
          underlayColor={"rgba(0,0,0,0)"}
        />
        <Icon
          onPress={() => this.props.routes.navigate("Settings")}
          name="settings"
          color="#ffffff"
          underlayColor={"rgba(0,0,0,0)"}
        />
        <Icon
          onPress={() => this.props.routes.navigate("Profile")}
          name="user-circle-o"
          type="font-awesome"
          color="#ffffff"
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
    paddingBottom: 20
  }
});
