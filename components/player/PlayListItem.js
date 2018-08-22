import React from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, Animated } from "react-native";
import { Icon } from "react-native-elements";
import { fancyTimeFormat } from "../../helpers/helpers";

export default class PlayListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  isThisActive = item => {
    console.log(item === this.props.currentSong);
    return item === this.props.currentSong && this.props.playing ? "true" : "";
  };
  render() {
    return (
      <View
        style={
          this.isThisActive(this.props.fileName)
            ? styles.songActive
            : styles.song
        }
      >
        <View style={styles.leftContent}>
          <View
            style={
              this.isThisActive(this.props.fileName)
                ? styles.iconPause
                : styles.iconPlay
            }
          >
            <Icon
              size={18}
              name={
                this.isThisActive(this.props.fileName) ? "pause" : "play-arrow"
              }
              color={
                this.isThisActive(this.props.fileName) ? "#73f8c9" : "#fff"
              }
            />
          </View>
          <Text style={styles.textStyle}>{this.props.name}</Text>
        </View>

        <Text style={styles.duration}>
          {fancyTimeFormat(this.props.duration)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: "#fff",
    zIndex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingRight: 10
  },
  duration: {
    color: "#fff",
    zIndex: 1,
    alignItems: "center",
    alignContent: "center",
    fontSize: 12
  },
  song: {
    display: "flex",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 0,
    height: 50
  },
  songActive: {
    display: "flex",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 0,
    height: 50
  },
  iconPlay: {
    marginTop: 0,
    alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: 20,
    height: 20,
    width: 20,
    borderColor: "#fff",
    marginRight: 15
  },

  iconPause: {
    marginTop: 0,
    alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: 20,
    height: 20,
    width: 20,
    borderColor: "#73f8c9",
    marginRight: 15
  },
  iconsFavorite: {
    paddingLeft: 20
  },
  leftContent: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center"
  }
});

PlayListItem.propTypes = {
  name: PropTypes.string.isRequired
};
