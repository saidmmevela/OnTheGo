import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TextInput
} from "react-native";
import BigBtn from "../components/BigBtn";
import Theme from "../constants/Theme";
import Swiper from "react-native-swiper";

import { connect } from "react-redux";
const { width, height } = Dimensions.get("screen");
export class Wellcom extends Component {
  
  static navigationOptions={
    headerShown:false
  }
  render() {
    const adds = this.props.adds;
    return (
      <View style={{ flex: 1, backgroundColor: Theme.COLORS.MAIN }}>
        <StatusBar hidden={true} />
        <View style={{ flex: 1 }}>
          <Swiper style={styles.wrapper} autoplay={true}>
            {adds &&
              adds.map(add => (
                <ImageBackground
                  imageStyle={{}}
                  style={{
                    width: "100%",
                    height: "96%",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  source={{ uri: add.image }}
                >
                  <Text style={{ color: "blue", fontSize: 18 }}>
                    {add.name}
                  </Text>
                </ImageBackground>
              ))}
          </Swiper>
        </View>

        <View
          style={{
            height: 150,
            width: "100%",
            paddingHorizontal: 40,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: Theme.COLORS.MAIN,
            position: "absolute",
            bottom: 0
          }}
        >
          <View style={{ paddingTop: 20 }}>
            <BigBtn
              btnColor="#FFF"
              btnText="SIGN UP"
              btnTextColor="#000"
              btnBorderColor={Theme.COLORS.MAIN}
              iconColor=""
              iconName=""
              iconSize={0}
              onPress={() => this.props.navigation.navigate("Signup")}
              btnStyle={{ padding: 3, width: "60%" }}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <BigBtn
              btnColor={Theme.COLORS.MAIN}
              btnText="SIGN IN"
              btnTextColor="#fff"
              btnBorderColor="#fff"
              iconColor=""
              iconName=""
              iconSize={0}
              onPress={() => this.props.navigation.navigate("Signin")}
              btnStyle={{ padding: 3, width: "60%" }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  //console.log(state.dataz.service_type);
  return {
    adds: state.dataz.adds
  };
};
export default connect(mapStateToProps)(Wellcom);
