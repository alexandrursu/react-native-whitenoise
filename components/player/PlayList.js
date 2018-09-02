import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import PlayListItem from "./PlayListItem";

const PlayList = props => {
  return (
    <View style={styles.musicList}>
      <View style={styles.separator}>
        <View style={styles.separatorBar} />
      </View>
      <ScrollView>
        {props.sounds.map(item => {
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => props.playThisSong(item)}
            >
              <PlayListItem
                key={item.key}
                num={item.key}
                name={item.name}
                fileName={item.fileName}
                duration={item.duration}
                playing={props.playing}
                currentSong={props.currentSong}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  musicList: {
    display: "flex",
    width: "100%",
    height: "60%",
    overflow: "scroll",
    marginTop: 25
  },
  separator: {
    marginTop: 0,
    height: "3%",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.3)",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  separatorBar: {
    marginTop: 0,
    height: 2,
    width: "15%",
    backgroundColor: "rgba(255,255,255,0.8)"
  }
});

export default PlayList;
