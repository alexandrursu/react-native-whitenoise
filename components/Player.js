import React from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import Switch from "react-native-switch-pro";

import Sound from "react-native-sound";
import PlayList from "./player/PlayList";
import PlayButton from "./player/PlayButton";
import { Icon } from "react-native-elements";

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      paused: false,
      checkedA: false,
      checkedB: true,
      sounds: [
        {
          key: 1,
          fileName: "okean-elzy-obiymy.mp3",
          name: "Okean Elzy Obiymy",
          duration: 239.65
        },
        {
          key: 2,
          fileName: "white-noise.mp3",
          name: "White Noise",
          duration: 601
        },
        {
          key: 3,
          fileName: "spring-river.mp3",
          name: "Spring River",
          duration: 60.53
        },
        {
          key: 4,
          fileName: "white-noise.mp3",
          name: "White Noise",
          duration: 601
        },
        {
          key: 5,
          fileName: "spring-river.mp3",
          name: "Spring River",
          duration: 60.53
        },
        {
          key: 6,
          fileName: "white-noise.mp3",
          name: "White Noise",
          duration: 601
        },
        {
          key: 7,
          fileName: "spring-river.mp3",
          name: "Spring River",
          duration: 60.53
        }
      ],
      percentage: 0,
      currentSong: "white-noise.mp3",
      sound: null,
      canvasAnimating: false,
      spinValue: new Animated.Value(0) // Initial value for opacity: 0
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
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

  getCurrentPercentage = () => {
    console.log("precentage started");
    let duration = this.state.sounds[0].duration;
    let onePercent = Math.round(duration / 100);
    let counter = 0;

    setInterval(
      function() {
        this.setState({
          percentage: counter++
        });
      }.bind(this),
      onePercent * 1000
    );
  };

  playThisSong = song => {
    return new Promise((resolve, reject) => {
      if (typeof song === "undefined") {
        return reject("undefined");
      }
      if (song === this.state.currentSong && this.state.playing) {
        this.pause();
        return resolve("paused");
      } else if (song === this.state.currentSong && this.state.paused) {
        this.resume();
        if (!this.state.canvasAnimating) {
          this.animateInfinite();
        }
      } else if (song !== this.state.currentSong && this.state.playing) {
        this.stop(song);
      } else {
        if (!this.state.canvasAnimating) {
          this.animateInfinite();
        }
        this.playSound(song);

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
      this.playSound(song);
    });
  };

  // Method which triggers play action
  playSound = item => {
    this.state.sound = new Sound(item, Sound.MAIN_BUNDLE, error => {
      if (error !== null) {
        console.log(error);
      }
    });

    if (!this.state.playing) {
      setTimeout(() => {
        console.log(item);

        this.state.sound.play(success => {
          console.log(success);
        });

        this.setState({
          playing: true,
          currentSong: item
        });
        this.state.sound.getCurrentTime(seconds =>
          console.log("at " + seconds)
        );
        this.getCurrentPercentage();
      }, 100);
    } else if (item !== this.state.currentSong && this.state.playing) {
      this.setState({
        currentSong: item
      });
      console.log("new song!");
      setTimeout(() => {
        console.log(item);

        this.state.sound.play(success => {
          console.log(success);
        });
      }, 100);
    }
  };

  render() {
    return (
      <View style={styles.player}>
        {/*<View style={styles.smartFeature}>*/}
        {/*<Text style={styles.textStyle}>Smart: </Text>*/}
        {/*<Switch value={this.state.checkedA} />*/}
        {/*</View>*/}
        {/*<Icon name="voice" type="material-community" color="#ffffff" />*/}
        <PlayButton
          currentSong={this.state.sounds[0].fileName}
          playSound={this.playSound.bind(this)}
          playing={this.state.playing}
          percentage={this.state.percentage}
          spinValue={this.state.spinValue}
          playThisSong={this.playThisSong.bind(this)}
        />
        {/*<Icon name="magic" type="font-awesome" color="#ffffff" />*/}
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
    paddingTop: 0
  }
});
