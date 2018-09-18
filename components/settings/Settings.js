import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { settings } from "../../config";
import SettingsItem from "./SettingsItem";
import { AsyncStorage } from "react-native";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(update) {
    console.log("did update from settings", update);
  }

  render() {
    return (
      <View style={styles.containerTransparent}>
        {this.props.settingsClone.map(item => {
          return (
            <SettingsItem
              key={item.key}
              item={item}
              name={item.name}
              setting={item.setting}
              value={item.value}
              iconName={item.icon.name}
              type={item.icon.type}
              storeSettings={data => this.props.storeSettings(data)}
              storeSliderSettings={data => this.props.storeSliderSettings(data)}
              showSlider={item.setting === "autoStop"}
            />
          );
        })}
        <SettingsItem
          item={{ duration: 0 }}
          name="Continuous play"
          setting="autoStop"
          value={!this.props.settingsClone[1].value}
          iconName="500px"
          type="entypo"
          storeSettings={data => this.props.storeSettings(data)}
          storeSliderSettings={data => this.props.storeSliderSettings(data)}
          showSlider={false}
        />
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
