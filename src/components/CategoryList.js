import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import TakeerIcon from "./TakeerIcon";

const { width, height } = Dimensions.get("screen");

export class CategoryList extends Component {
  render() {
    return (
      <View
        style={{
          width: width / 3 - 8,
          height: width / 3,
          paddingLeft: 20,
          paddingVertical: 10,
          borderRadius: 10
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => this.props.showStoreModal(this.props.name)}
        >
          <LinearGradient
            colors={["#0FB47C", "#0FB47C"]}
            style={{
              flex: 1,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5
            }}
          >
            <View
              style={{
                height: "30%",
                width: "100%",
                backgroundColor: "#fff",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,

                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: 17,
                  alignSelf: "center",
                  paddingVertical: 0,
                  fontWeight: "bold"
                }}
              >
                {this.props.name}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                position: "absolute",
                bottom: "10%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                style={{ width: 100, height: 100, tintColor: "#fff" }}
                source={this.props.image}
              />
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default CategoryList;
