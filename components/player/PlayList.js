import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
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
            <PlayListItem
              key={item.key}
              num={item.key}
              item={item}
              name={item.name}
              fileName={item.fileName}
              favoriteSong={props.favoriteSong}
              storeFavorite={song => props.storeFavorite(song)}
              duration={item.duration}
              playing={props.playing}
              currentSong={props.currentSong}
              playThisSong={item => props.playThisSong(item)}
            />
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
    height: "50%",
    overflow: "scroll",
    marginTop: 20
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
