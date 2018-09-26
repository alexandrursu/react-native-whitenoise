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
import { constants } from "../../helpers/const";
import { settings } from "../../config";

export default class PlayButton extends React.Component {
  constructor(props) {
    super(props);
  }

  spinCanvas() {
    this.props.playThisSong(this.props.currentSong);
  }

  continuousPlay() {
    this.props.setNumberOfLoops();
    this.props.storeSettings("autoStop");
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
          name="md-infinite"
          type="ionicon"
          iconStyle={styles.iconInfinite}
          color={
            !this.props.settingsClone[1].value ? constants.mainColor : "#fff"
          }
          onPress={() => this.continuousPlay()}
          underlayColor={"rgba(0,0,0,0)"}
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
                shadowColor={constants.mainColor}
                bgColor="#a1dfdc"
              >
                <View style={styles.playIcon}>
                  <Icon
                    name={this.props.playing ? "pause" : "play-arrow"}
                    type={this.props.playing ? "ionicons" : ""}
                    color="#fff"
                    iconStyle={{ fontSize: 28 }}
                  />
                </View>
              </ProgressCircle>
            </View>
          </Animated.View>
        </TouchableOpacity>
        <View style={styles.smartIconPlaceholder}>
          <Icon
            name="wifi"
            type="FontAwesome5"
            color={
              this.props.settingsClone[0].value ? constants.mainColor : "#fff"
            }
            iconStyle={styles.iconSignal}
            underlayColor={"rgba(0,0,0,0)"}
          />
          <Icon
            name="baby-buggy"
            type="material-community"
            color={
              this.props.settingsClone[0].value ? constants.mainColor : "#fff"
            }
            iconStyle={styles.iconBaby}
            onPress={() => this.props.storeSettings("smartFeature")}
            underlayColor={"rgba(0,0,0,0)"}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smartIconPlaceholder: {
    display: "flex",
    height: 30,
    alignSelf: "center",
    marginRight: 5
  },
  iconSignal: {
    fontSize: 11,
    height: 11,
    position: "absolute",
    top: -2,
    left: 4,
    transform: [{ rotate: "-45deg" }],
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0.1, height: 0.1 },
    textShadowRadius: 1
  },
  playerTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "32%"
  },
  playBtn: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.7)",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginRight: 5,
    marginBottom: 10
  },
  iconBaby: {
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0.1, height: 0.1 },
    textShadowRadius: 1,
    fontSize: 28,
    fontWeight: "bold",
    top: -3
  },
  iconInfinite: {
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0.1, height: 0.1 },
    textShadowRadius: 1,
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 6
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
    borderColor: "rgba(255,255,255,0.75)",
    borderRadius: 40,
    height: 35,
    width: 35
  }
});
