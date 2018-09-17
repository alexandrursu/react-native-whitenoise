import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Mountain from "../assets/images/mountain.jpeg";
import LinearGradient from "react-native-linear-gradient";
import BottomNavigation from "./BottomNavigation";
import Login from "./profile/Login";

export default class Profile extends React.Component {
  static navigationOptions = {
    title: "Profile",
    headerStyle: {
      backgroundColor: "rgba(3, 218, 198, 1)",
      borderBottomColor: "transparent"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      color: "#fff"
    }
  };

  render() {
    return (
      <View style={styles.main}>
        <ImageBackground source={Mountain} style={styles.backgroundImage}>
          <View style={styles.container}>
            <LinearGradient
              colors={["rgba(3, 218, 198, 0.7)", "rgba(98, 0, 238, 0.5)"]}
              start={{ x: 0, y: 0.1 }}
              end={{ x: 0.1, y: 1.0 }}
              locations={[0, 1]}
              style={styles.linearGradient}
            >
              <Login />
              <BottomNavigation routes={this.props.navigation} />
            </LinearGradient>
          </View>
        </ImageBackground>
      </View>
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    zIndex: 1,
    alignSelf: "center"
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
