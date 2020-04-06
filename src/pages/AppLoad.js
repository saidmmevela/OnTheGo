import React, { Component } from "react";
import { Text, View, Image, StatusBar } from "react-native";
import Theme from "../../src/constants/Theme";

export class AppLoad extends Component {
  static navigationOptions={
    headerShown:false
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Theme.COLORS.MAIN
        }}
      >
        <StatusBar hidden={true} />
        <Image
          source={require("../../assets/images/logo1.png")}
          style={{
            width: "40%",
            height: "30%"
          }}
          //resizeMode="contain"
        />
        <Image
          source={require("../../assets/images/onthego.png")}
          style={{
            width: "35%",
            height: 30,
            position: "absolute",
            bottom: 30
          }}
          //resizeMode="contain"
        />
      </View>
    );
  }
}

export default AppLoad;
