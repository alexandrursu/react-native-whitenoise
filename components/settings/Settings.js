import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { settings } from "../../config";
import SettingsItem from "./SettingsItem";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.containerTransparent}>
        {settings.map(item => {
          return (
            <SettingsItem
              key={item.key}
              name={item.name}
              setting={item.setting}
              value={item.value}
              iconName={item.icon.name}
              type={item.icon.type}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerTransparent: {
    display: "flex",
    flex: 1,
    width: "84%",
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0)",
    borderRadius: 5,
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  }
});
