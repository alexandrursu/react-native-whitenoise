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
      stopped: true,
      checkedA: false,
      checkedB: true,
      sounds: songs,
      currentTime: 0,
      currentPercentage: 0,
      tickInterval: null,
      tickNumber: 0, // used to for countdown
      counter: 0,
      previousDurationValue: 0,
      secondsLeftAfterNextLoop: 30,
      loopsLeft: null,
      currentSong: defaultCurrent,
      favoriteSong: defaultFavorite,
      sound: null,
      canvasAnimating: false,
      spinValue: new Animated.Value(0)
    };
    console.log("========current from favorite==========");
    console.log(this.state.currentSong);
  }

  checkSmartFeature() {
    if (this.props.settingsClone[0].value) {
      RNSoundLevel.start();
      RNSoundLevel.onNewFrame = data => {
        // see "Returned data" section below
        console.log("Sound level info", data);
        if (data.value > -5 && !this.state.playing) {
          this.play(this.state.currentSong);
        }
      };
    } else {
      RNSoundLevel.stop();
    }
  }

  //TODO debug here seems that here is stack overflow also debug baby cry feature
  componentDidUpdate(update) {
    console.log("did update from player", update);
    console.log(this.props.settingsClone[1].duration);
    console.log(this.state.previousDurationValue);
    this.checkSmartFeature();

    //Fix - check if song in paused state and slider auto stop is changed then reset song to stop state
    if (
      this.state.paused &&
      this.props.settingsClone[1].duration !== this.state.previousDurationValue
    ) {
      this.setState({
        previousDurationValue: this.props.settingsClone[1].duration
      });
      this.totalStop();
    }

    if(this.props.settingsClone[1].duration !== this.state.previousDurationValue){
        this.setNumberOfLoops()
    }

    if(this.props.settingsClone[1].value && this.state.secondsLeftAfterNextLoop < 0) {
        console.log('wrong, stop everything')
        // this.setState({
        //     // TODO - move value to constants
        //     secondsLeftAfterNextLoop: 0
        // })
        // this.setNumberOfLoops()
        this.resetLoopCounters()
        this.totalStop()
      }
  }

  componentDidMount() {
    this.retrieveFavorite();
    this.checkSmartFeature();

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

  //TODO: Fix - timer not showing correct countdown when multiple loops
  setNumberOfLoops() {
    setTimeout(() => {
      let num = !this.props.settingsClone[1].value
        ? -1
        : Math.ceil((this.props.settingsClone[1].duration * 60) / 30) - 1;

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
      // Each time new song is played we update previous duration value otherwise total stop will be
      // triggered due to different values between settingsClone[1].duration and previousDurationValue
      this.setState({
        previousDurationValue: this.props.settingsClone[1].duration
      });
      let fileName = song.fileName;
      if (typeof fileName === "undefined") {
        console.log("======== fired undefined ========");
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
        stopped: false,
      paused: true
    });
    clearInterval(this.state.tickInterval);
    this.setState({
      tickInterval: null
    });
  };

  resume = () => {
    console.log("same song, so resume it!");
    this.state.sound.play();
    this.setState({
      playing: true,
      stopped: false
    });
    //
    this.setState({
      tickInterval: setInterval(() => {
        this.tick(false);
      }, 1000)
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

    clearInterval(this.state.tickInterval);
    this.setState({
      tickInterval: null
    });
    this.state.sound.stop(() => {
      this.setState({
        stopped: true,
        playing: false,
        currentPercentage: 0,
        tickNumber: 0
      });
    });
  };

  resetLoopCounters = () => {
    this.setState({
      secondsLeftAfterNextLoop: 30,
      loopsLeft: null
    });
  };

  // Method which triggers play action
  play = song => {
    console.log("=======play song========" + song.fileName);
    // Stop song as we do not need to listen for 'cry' when song is playing.
    RNSoundLevel.stop();
    // Reset loop helper counters as new song was fired
    this.resetLoopCounters();

    this.state.sound = new Sound(song.fileName, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    console.log(this.state.sound);
    clearInterval(this.state.tickInterval);
    this.setState({
      tickInterval: null
    });
    this.setState({
      stopped: false,
      currentPercentage: 0,
      percentage: 0,
      tickNumber: 0,
      tickInterval: setInterval(() => {
        this.tick(true);
      }, 1000)
    });
    if (!this.state.playing) {
      this.setState({
        playing: true,
        currentSong: song
      });
      setTimeout(() => {
        this.state.sound.play(success => {
          if (success) {
            console.log("successfully finished playing");
            this.totalStop();
            if (this.state.tickInterval) {
              clearInterval(this.state.tickInterval);
              this.setState({
                tickInterval: null
              });
            }
          } else {
            if (this.state.tickInterval) {
              clearInterval(this.state.tickInterval);
              this.setState({
                tickInterval: null
              });
            }
            console.log("error1");
          }
        });
        this.setNumberOfLoops();
      }, 300);
    } else if (
      song.fileName !== this.state.currentSong.fileName &&
      this.state.playing
    ) {
      console.log("new song!");
      this.setState({
        currentSong: song
      });

      setTimeout(() => {
        this.state.sound.play(success => {
          if (success) {
            console.log("successfully finished playing");
            this.totalStop();

            if (this.state.tickInterval) {
              clearInterval(this.state.tickInterval);
              this.setState({
                tickInterval: null
              });
            }
          } else {
            if (this.state.tickInterval) {
              clearInterval(this.state.tickInterval);
              this.setState({
                tickInterval: null
              });
            }
            console.log("error2");
          }
        });
        this.setNumberOfLoops();
      }, 100);
    }
  };
  tick(newSong) {
    this.state.sound.getCurrentTime(seconds => {
      if (this.state.tickInterval) {
        if (this.state.loopsLeft === null) {
          this.setState({
            loopsLeft: this.state.sound.getNumberOfLoops()
          });
        }

        let loops = this.state.loopsLeft;
        let loopsLeft = loops;
        let tickNumber = this.state.tickNumber;
        let secondsLeftAfterNextLoop = this.state.secondsLeftAfterNextLoop;

        tickNumber++;
        secondsLeftAfterNextLoop--;

        this.setState({
          tickNumber: tickNumber
        });

        if (loopsLeft !== 0 && secondsLeftAfterNextLoop === 0) {
          loopsLeft--;

          this.setState({
            loopsLeft: loopsLeft,
            secondsLeftAfterNextLoop: 30 //TODO: Check - maybe 29?
          });
          secondsLeftAfterNextLoop = this.state.secondsLeftAfterNextLoop;
        }

        console.log("loops " + loops);
        console.log("seconds " + seconds);
        console.log("loops left: " + this.state.loopsLeft);
        console.log(
          "this.state.secondsLeftAfterNextLoop: " +
            this.state.secondsLeftAfterNextLoop
        );
        this.setState({
          secondsLeftAfterNextLoop,
          currentTime: ~~seconds,
          currentPercentage: Math.round(
            100 -
              (this.props.settingsClone[1].duration * 60 -
                this.state.tickNumber) *
                (100 / (this.props.settingsClone[1].duration * 60))
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
          <Text style={styles.title}>{this.state.currentSong.name}</Text>
          <Text style={styles.titleSmall}>
            {this.state.stopped
              ? "stopped"
              : this.state.playing
                ? "playing"
                : "paused"}
          </Text>
        </View>
        <PlayButton
          currentSong={this.state.currentSong}
          play={this.play.bind(this)}
          playing={this.state.playing}
          percentage={this.props.settingsClone[1].value ? this.state.currentPercentage : 0}
          spinValue={this.state.spinValue}
          storeSettings={data => this.props.storeSettings(data)}
          setNumberOfLoops={() => this.setNumberOfLoops()}
          settingsClone={this.props.settingsClone}
          playThisSong={this.playThisSong.bind(this)}
        />
        <Text style={styles.countDown}>
          {!this.props.settingsClone[1].value
            ? "--:--"
            : fancyTimeFormat(
                this.props.settingsClone[1].duration * 60 -
                  this.state.tickNumber
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
    top: 0,
    fontSize: 20,
    fontWeight: "300"
  },
  title: {
    color: "#fff",
    zIndex: 5,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    top: 0,
    fontSize: 18,
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 10
  },
  titleSmall: {
    color: "rgba(255,255,255,0.8)",
    zIndex: 5,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    top: 0,
    fontSize: 13,
    fontWeight: "500"
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
