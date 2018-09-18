import React from "react";
import { StyleSheet, View, ImageBackground, AsyncStorage } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Mountain from "../assets/images/mountain.jpeg";
import Player from "./Player";
import BottomNavigation from "./BottomNavigation";

export default class Home extends React.Component {
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
                style={styles.player}
                settingsClone={this.props.screenProps.settingsClone}
                storeSettings={data =>
                  this.props.screenProps.storeSettings(data)
                }
                storeSliderSettings={data =>
                  this.props.screenProps.storeSliderSettings(data)
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

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    height: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 1
  },
  main: {
    height: "100%"
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    width: "100%",
    zIndex: 0,
    alignSelf: "center",
    justifyContent: "space-between"
  },
  linearGradient: {
    flex: 1,
    width: "100%",
    zIndex: 0,
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
