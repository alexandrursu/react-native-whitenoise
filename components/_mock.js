import React from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import Sound from "react-native-sound";
import PlayList from "./player/PlayList";
import PlayButton from "./player/PlayButton";

export default class Mock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View style={styles.containerWhite}>Mock</View>;
  }
}

const styles = StyleSheet.create({
  containerWhite: {
    display: "flex",
    flex: 1,
    width: "84%",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 5,
    alignItems: "center",
    alignContent: "center",
    padding: 20
  },
  containerTransparent: {
    display: "flex",
    flex: 1,
    width: "84%",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 5,
    alignItems: "center",
    alignContent: "center",
    padding: 20
  }
});
