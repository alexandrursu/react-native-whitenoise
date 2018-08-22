import React from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";
import CanvasImage from "./CanvasImage";
import ProgressCircle from "react-native-progress-circle";

export default class PlayButton extends React.Component {
  constructor(props) {
    super(props);
  }

  spinCanvas() {
    this.props.playThisSong(this.props.currentSong);
  }

  render() {
    const skewX = this.props.spinValue.interpolate({
      inputRange: [0, 1, 2, 3, 4],
      outputRange: ["5deg", "3deg", "0deg", "3deg", "5deg"]
    });

    const skewY = this.props.spinValue.interpolate({
      inputRange: [0, 1, 2, 3, 4],
      outputRange: ["0deg", "3deg", "5deg", "3deg", "0deg"]
    });

    const scaleX = this.props.spinValue.interpolate({
      inputRange: [0, 1, 2, 3, 4],
      outputRange: [1, 1.05, 1.1, 1.05, 1]
    });

    return (
      <View style={styles.playerTop}>
        <Icon
          name="favorite-border"
          color="#ffffff"
          type="material"
          iconStyle={styles.icon}
        />
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => {
            this.spinCanvas();
          }}
        >
          <Animated.View style={styles.playBtn}>
            <Animated.View
              style={{
                position: "absolute",
                zIndex: 0,
                transform: [
                  { skewX },
                  { skewY },
                  { scaleX },
                  { scaleY: scaleX }
                ]
              }}
            >
              <CanvasImage />
            </Animated.View>
            <View style={styles.progressBar}>
              <ProgressCircle
                percent={this.props.percentage}
                radius={40}
                borderWidth={3}
                color="#a1dfdc"
                shadowColor="#73f8c9"
                bgColor="#a1dfdc"
              >
                <View style={styles.playIcon}>
                  <Icon
                    name={this.props.playing ? "pause" : "play-arrow"}
                    color="#ffffff"
                  />
                </View>
              </ProgressCircle>
            </View>
          </Animated.View>
        </TouchableOpacity>
        <Icon name="replay" color="#ffffff" type="material-community" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  playerTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: "50%"
  },
  playBtn: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.7)",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  icon: {},
  textStyle: {
    color: "#fff",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    top: 3
  },
  touchableOpacity: {
    display: "flex",
    width: "50%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  progressBar: {
    padding: 6,
    backgroundColor: "#a1dfdc",
    borderRadius: 50
  },
  playIcon: {
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 35,
    height: 35,
    width: 35
  }
});
