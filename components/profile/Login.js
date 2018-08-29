import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <View style={styles.containerWhite}>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.email}
          placeholder="example@example.com"
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.password}
          placeholder="******"
          placeholderTextColor="#fff"
        />
        <Button
          onPress={() => console.log("pressed")}
          title="Login"
          color="#73f8c9"
          accessibilityLabel="Login to White Noise"
          style={styles.button}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "rgba(0,0,0,0)",
    borderBottomColor: "#fff",
    borderWidth: 0.5,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    color: "#fff"
  },
  button: {
    backgroundColor: "#fff"
  },
  containerWhite: {
    display: "flex",
    flex: 1,
    width: "84%",
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 5,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: 20
  },
  containerTransparent: {
    display: "flex",
    flex: 1,
    width: "84%",
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 5,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: 20
  }
});
