import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  FlatList,
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  Image,
  ImageBackground
} from "react-native";
import { Text, Icon } from "galio-framework";
import LinearGradient from 'react-native-linear-gradient';

/*
     <KeyboardAvoiding
              iconcolor="white"
              bgcolor='black'
              inputbgcolor='rgba(255,255,255,0.4)'
              placeholderTextColor='white'
              color='white'
              gradient={false}
    />
*/

export default class keyboardavoiding extends Component {
  send = item => {
    if (item == true) {
      return (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#CB4335", "#EDBB99"]}
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            borderRadius: 25,
            justifyContent: "center"
          }}
        >
          <Icon
            name="send"
            family="MaterialIcons"
            color={this.props.iconcolor}
            size={25}
            style={{}}
          />
        </LinearGradient>
      );
    } else {
      return (
        <Icon
          name="send"
          family="MaterialIcons"
          color={this.props.iconcolor}
          size={25}
          style={{}}
        />
      );
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="position"
        enabled
        style={[
          {
            flexDirection: "row",
            height: "9%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
          },
          this.props.containerStyle
        ]}
      >
        <View
          style={[
            {
              backgroundColor: this.props.bgcolor,
              paddingHorizontal: 30,
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flex: 1
            },
            this.props.avoidingStyle
          ]}
        >
          <TextInput
            style={[
              {
                width: "90%",
                height: "60%",
                borderRadius: 25,
                backgroundColor: this.props.inputbgcolor,
                color: this.props.color,
                paddingHorizontal: "5%",
                marginRight: 10
              },
              this.props.inputStyle
            ]}
            placeholder={"Write a comment ..."}
            placeholderTextColor={this.props.placeholderTextColor}
            underLineColorAndroid="transparent"
          />

          {this.send(this.props.gradient)}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: 50,
    height: 50
  }
});
