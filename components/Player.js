import React from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import Switch from "react-native-switch-pro";
import Sound from "react-native-sound";
import PlayList from "./player/PlayList";
import PlayButton from "./player/PlayButton";
import { Icon } from "react-native-elements";
import { songs } from "../config";
import RNSoundLevel from "react-native-sound-level";

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      paused: false,
      checkedA: false,
      checkedB: true,
      sounds: songs,
      currentTime: 0,
      currentPercentage: 0,
      counter: 0,
      currentSong: {
        key: 2,
        fileName: "white-noise.mp3",
        name: "White Noise",
        duration: 601
      },
      sound: null,
      canvasAnimating: false,
      spinValue: new Animated.Value(0)
    };
  }
  componentDidMount() {
    RNSoundLevel.start();
    RNSoundLevel.onNewFrame = data => {
      // see "Returned data" section below
      console.log("Sound level info", data);
      if (data.value > 0 && !this.state.playing) {
        this.play(this.state.currentSong);
      }
    };
  }
  // don't forget to stop it
  componentWillUnmount() {
    RNSoundLevel.stop();
  }
  animateInfinite = () => {
    this.state.spinValue.setValue(0);

    Animated.timing(this.state.spinValue, {
      useNativeDriver: false, // <- with 'false' the correct value is returned in the callback
      toValue: 4,
      duration: 2000,
      easing: Easing.linear()
    }).start(() => {
      this.state.playing
        ? this.animateInfinite()
        : () => {
            this.stopAnimation();
          };
    }); // start the sequence group
  };

  stopAnimation = () => {
    this.state.spinValue.stopAnimation(value => console.warn(value));
    this.setState({
      canvasAnimating: false
    });
  };

  playThisSong = song => {
    return new Promise((resolve, reject) => {
      let fileName = song.fileName;
      if (typeof fileName === "undefined") {
        console.log("======== fired udefined ========");
        return reject("undefined");
      }
      if (fileName === this.state.currentSong.fileName && this.state.playing) {
        console.log("======== fired pause ========");
        this.pause();
        return resolve("paused");
      } else if (
        fileName === this.state.currentSong.fileName &&
        this.state.paused
      ) {
        console.log("======== fired resume ========");
        this.resume();
        if (!this.state.canvasAnimating) {
          this.animateInfinite();
        }
      } else if (
        fileName !== this.state.currentSong.fileName &&
        this.state.playing
      ) {
        console.log("======== fired stop ========");
        this.stop(song);
        // Stop Percentage
      } else {
        if (!this.state.canvasAnimating) {
          // Reset percentage
          this.animateInfinite();
        }
        console.log("======== fired play ========");
        this.play(song);
        return Promise.resolve("good");
      }
    }).catch(err => {
      console.log(err);
    });
  };

  pause = () => {
    console.log("same song, so pause it!");
    this.state.sound.pause();
    this.setState({
      playing: false,
      paused: true
    });
  };

  resume = () => {
    console.log("same song, so pause it!");
    this.state.sound.play();
    this.setState({
      playing: true
    });
  };

  stop = song => {
    console.log("stop song!");
    this.state.sound.stop(() => {
      this.play(song);
    });
  };

  // Method which triggers play action
  play = song => {
    console.log("=======play song========");
    console.log(song.fileName);
    this.state.sound = new Sound(song.fileName, Sound.MAIN_BUNDLE, error => {
      if (error !== null) {
        console.log(error);
      }
    });

    if (!this.state.playing) {
      this.tickInterval = setInterval(() => {
        this.tick();
      }, 1000);
      setTimeout(() => {
        console.log(song);

        this.state.sound.play(success => {
          if (success) {
            console.log("here");
            if (this.tickInterval) {
              clearInterval(this.tickInterval);
              this.tickInterval = null;
            }
          } else {
            if (this.tickInterval) {
              clearInterval(this.tickInterval);
              this.tickInterval = null;
            }
            console.log("error");
          }
        });

        this.setState({
          playing: true,
          currentSong: song
        });

        // this.getCurrentPercentage();
      }, 100);
      // this.state.sound.getCurrentTime(seconds => console.log("at " + seconds));
    } else if (
      song.fileName !== this.state.currentSong.fileName &&
      this.state.playing
    ) {
      this.tickInterval = setInterval(() => {
        this.tick();
      }, 1000);

      this.setState({
        currentSong: song,
        percentage: 0
      });
      console.log("new song!");
      setTimeout(() => {
        this.state.sound.play(success => {
          if (success) {
            console.log("here");
            if (this.tickInterval) {
              clearInterval(this.tickInterval);
              this.tickInterval = null;
            }
          } else {
            if (this.tickInterval) {
              clearInterval(this.tickInterval);
              this.tickInterval = null;
            }
            console.log("error");
          }
        });
      }, 100);
    }
  };
  tick() {
    this.state.sound.getCurrentTime(seconds => {
      if (this.tickInterval) {
        this.setState({
          currentTime: seconds,
          currentPercentage: Math.round(
            Math.ceil(seconds) * (100 / this.state.currentSong.duration)
          )
        });
        if (this.state.currentPercentage >= 100) {
          this.playNext();
        }
      }
    });
  }

  playNext = () => {
    this.state.sound.stop(() => {
      console.log("play next");
    });
    this.setState({
      playing: false,
      currentSong: {},
      currentPercentage: 0
    });
  };
  render() {
    return (
      <View style={styles.player}>
        <View style={styles.layerTop}>
          <Icon name="wifi" type="FontAwesome5" iconStyle={styles.iconSignal} />
          <Icon name="child-friendly" color="#fff" iconStyle={styles.icon} />
        </View>
        <PlayButton
          currentSong={this.state.sounds[0]}
          play={this.play.bind(this)}
          playing={this.state.playing}
          percentage={this.state.currentPercentage}
          spinValue={this.state.spinValue}
          playThisSong={this.playThisSong.bind(this)}
        />
        <Icon name="stopwatch" type="entypo" color="#ffffff" />
        <PlayList
          sounds={this.state.sounds}
          currentSong={this.state.currentSong}
          playing={this.state.playing}
          playThisSong={this.playThisSong.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smartFeature: {
    display: "flex",
    flexDirection: "row",
    height: "10%",
    marginBottom: -45,
    alignSelf: "flex-end",
    paddingRight: 10
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

  player: {
    display: "flex",
    flex: 1,
    width: "84%",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 5,
    alignItems: "center",
    alignContent: "center",
    padding: 20,
    paddingTop: 20
  },
  iconSignal: {
    fontSize: 11,
    height: 11,
    position: "absolute",
    top: 1,
    left: 3,
    transform: [{ rotate: "-45deg" }],
    color: "rgba(255,255,255,0.7)"
  }
});
