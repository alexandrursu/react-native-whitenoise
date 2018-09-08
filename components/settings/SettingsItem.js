import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

export default class SettingsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    console.log(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.placeholder}
        onPress={data => this.props.storeSettings(this.props.setting)}
      >
        <View style={styles.layerTop}>
          {this.props.setting === "smartFeature" ? (
            <Icon
              name="wifi"
              type="FontAwesome5"
              iconStyle={styles.iconSignal}
            />
          ) : (
            ""
          )}
          <Icon
            name={this.props.iconName}
            type={this.props.type}
            color="#fff"
            iconStyle={styles.icon}
          />
        </View>
        <View style={styles.layerMiddle}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "600",
              textAlign: "center"
            }}
          >
            {this.props.name}
          </Text>
        </View>
        <View style={styles.layerBottom}>
          <Text
            style={{
              color: this.props.value ? "#73f8c9" : "#fff",
              fontWeight: this.props.value ? "900" : "100"
            }}
          >
            {this.props.value ? "On" : "Off"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  placeholder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 5,
    alignItems: "center",
    alignContent: "center",
    margin: "5%",
    width: "40%",
    height: 150,
    paddingRight: 10,
    paddingLeft: 10
  },
  icon: {
    fontSize: 40,
    width: "100%",
    marginTop: 10
  },

  textStyle: {},
  layerTop: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    height: 60
  },
  layerMiddle: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    height: 60
  },
  layerBottom: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    height: 20
  },
  iconSignal: {
    fontSize: 15,
    height: 15,
    position: "absolute",
    top: 13,
    right: -2,
    transform: [{ rotate: "-45deg" }],
    color: "rgba(255,255,255,0.7)"
  }
});
