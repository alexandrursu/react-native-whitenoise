import React from "react";
import {
  Animated,
  AsyncStorage,
  Easing,
  StyleSheet,
  View,
  Text
} from "react-native";
import Sound from "react-native-sound";
// Enable playback in silence mode
// Sound.setCategory("Playback");
import PlayList from "./player/PlayList";
import PlayButton from "./player/PlayButton";
import { defaultCurrent, defaultFavorite, songs } from "../config";
import { fancyTimeFormat } from "../helpers/helpers";
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
      currentSong: defaultCurrent,
      favoriteSong: defaultFavorite,
      sound: null,
      canvasAnimating: false,
      spinValue: new Animated.Value(0)
    };
    console.log("========current from favorite==========");
    console.log(this.state.currentSong);
  }
  componentDidMount() {
    this.retrieveFavorite();
    RNSoundLevel.start();
    RNSoundLevel.onNewFrame = data => {
      // see "Returned data" section below
      // console.log("Sound level info", data);
      if (
        data.value > 0 &&
        !this.state.playing &&
        this.props.settingsClone[0].value
      ) {
        this.play(this.state.currentSong);
      }
    };

    // Auto start when starting application, as retrieveSettings is async method we need to put
    setTimeout(() => {
      if (
        this.props.settingsClone[2].value &&
        this.state.currentSong.fileName !== ""
      ) {
        console.log("fire auto play");
        this.play(this.state.currentSong);
      }
    }, 2000);
  }

  componentWillReceiveProps() {}

  // don't forget to stop it
  componentWillUnmount() {
    RNSoundLevel.stop();
  }

  retrieveFavorite = () => {
    AsyncStorage.getItem("favorite").then(data => {
      const value = JSON.parse(data);
      if (value !== null) {
        // We have data!!
        console.log("===============Get favorite ============");
        console.log(value);
        this.setState({
          currentSong: value,
          favoriteSong: value
        });
      } else {
        this.setState({
          currentSong: defaultFavorite
        });
      }
    });
  };
  storeFavorite = song => {
    console.log("========favorite=========");
    console.log(this.state.settingsClone);
    console.log(song);

    AsyncStorage.setItem("favorite", JSON.stringify(song)).then(() => {
      console.log("favorite song changed");
      this.setState({
        favoriteSong: song
      });
    });
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

  setNumberOfLoops() {
    setTimeout(() => {
      let num = this.props.settingsClone[3].value ? -1 : 0;
      // If -1 will loop indefinitely until stop() is called
      if (this.state.playing) {
        this.state.sound.setNumberOfLoops(num);
        console.log("=========Loops========");
        console.log(num);
      }
    });
  }

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

  totalStop = song => {
    console.log("total stop!");
    this.state.sound.stop(() => {
      this.setState({
        playing: false
      });
    });
  };

  // Method which triggers play action
  play = song => {
    console.log("=======play song========" + song.fileName);
    this.state.sound = new Sound(song.fileName, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    console.log(this.state.sound);

    if (!this.state.playing) {
      this.tickInterval = setInterval(() => {
        this.tick();
      }, 1000);
      setTimeout(() => {
        this.state.sound.play(success => {
          if (success) {
            console.log("successfully finished playing");
            this.totalStop();
            if (this.tickInterval) {
              clearInterval(this.tickInterval);
              this.tickInterval = null;
            }
          } else {
            if (this.tickInterval) {
              clearInterval(this.tickInterval);
              this.tickInterval = null;
            }
            console.log("error1");
          }
        });

        this.setState({
          playing: true,
          currentSong: song
        });
        this.setNumberOfLoops();

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
            console.log("successfully finished playing");
            this.totalStop();

            if (this.tickInterval) {
              clearInterval(this.tickInterval);
              this.tickInterval = null;
            }
          } else {
            if (this.tickInterval) {
              clearInterval(this.tickInterval);
              this.tickInterval = null;
            }
            console.log("error2");
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
        // if (this.state.currentPercentage >= 100) {
        //   this.playNext();
        // }
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
          {/*<Icon*/}
          {/*name="stopwatch"*/}
          {/*type="entypo"*/}
          {/*color={this.props.settingsClone[1].value ? "#00ffd1" : "#fff"}*/}
          {/*onPress={() => this.props.storeSettings("autoStop")}*/}
          {/*underlayColor={"rgba(0,0,0,0)"}*/}
          {/*/>*/}
        </View>
        <PlayButton
          currentSong={this.state.currentSong}
          play={this.play.bind(this)}
          playing={this.state.playing}
          percentage={this.state.currentPercentage}
          spinValue={this.state.spinValue}
          storeSettings={data => this.props.storeSettings(data)}
          setNumberOfLoops={() => this.setNumberOfLoops()}
          settingsClone={this.props.settingsClone}
          playThisSong={this.playThisSong.bind(this)}
        />
        <Text style={styles.countDown}>
          {fancyTimeFormat(
            this.state.favoriteSong.duration - this.state.currentTime
          )}
        </Text>
        <PlayList
          sounds={this.state.sounds}
          currentSong={this.state.currentSong}
          playing={this.state.playing}
          favoriteSong={this.state.favoriteSong}
          storeFavorite={song => this.storeFavorite(song)}
          playThisSong={this.playThisSong.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  countDown: {
    color: "#fff",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    top: 3,
    fontSize: 30,
    fontWeight: "200"
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
  }
});
