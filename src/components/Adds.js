import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TextInput
} from "react-native";
import BigBtn from "./BigBtn";
import Theme from "../constants/Theme";
import TakeerIcon from "./TakeerIcon";
import { Radio } from "galio-framework";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");

export class Adds extends Component {
  render() {
    const dataz = [
      {
        name: this.props.name,
        id: this.props.id,
        img: this.props.img,
        price: this.props.price,
        rating: this.props.rating,
        users: this.props.users,
        exp: this.props.exp,
        category: this.props.category
      }
    ];
    return (
      <View
        style={{
          width: width / 1 - 40,
          height: width / 4,
          paddingLeft: 10,
          paddingVertical: 5,
          borderRadius: 10
        }}
      >
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.navigate("Booking", { dataz: dataz })
          }
        >
          <ImageBackground
            imageStyle={{ borderRadius: 6 }}
            style={{
              width: "100%",
              height: "100%"
            }}
            source={{ uri: this.props.img }}
          >
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                bottom: 5,
                right: 5,
                backgroundColor: "#fff",
                paddingHorizontal: 4,
                borderRadius: 4
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {this.props.rating}
              </Text>
              <TakeerIcon
                iconType="FontAwesome"
                iconSize={18}
                iconColor="yellow"
                iconName="star"
              />
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default Adds;
