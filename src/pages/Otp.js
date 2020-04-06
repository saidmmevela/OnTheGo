import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import BigBtn from "../components/BigBtn";
import Theme from "../../src/constants/Theme";
import TakeerIcon from "../components/TakeerIcon";
import { Input } from "galio-framework";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from "graphql-tag";
const link = new HttpLink({
  uri: 'http://192.168.43.221:4122/v1/api/onthego/graphql'
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export class Otp extends Component {
  state = {
    otp1:"",
    otp: "",
    looding:false,
  };

  static navigationOptions={
    headerShown:false
  }

  componentDidMount=()=>{
      let otp =this.props.navigation.state.params.otp;
      console.log("otp",otp);
      this.setState({otp1:otp})

  }

  sendSignup=()=>{
    let {otp1,otp}=this.state;
    if(otp == otp1){
        this.props.navigation.navigate("Naming",{num:this.props.navigation.state.params.phonenumber});
    }
    else{
        Alert.alert("","Wrong otp");
    }
  }

  loodingData=()=>{
    if(this.state.looding==true){
        return(
          <ActivityIndicator size="large" color={Theme.COLORS.MAIN} />
        )
    }
    else{
      return(
        <BigBtn
            btnColor={Theme.COLORS.MAIN}
            btnText="Verify"
            btnTextColor="#fff"
            btnBorderColor={Theme.COLORS.MAIN}
            iconColor=""
            iconName=""
            iconSize={0}
            //onPress={() => this.props.navigation.navigate("Welcome")}
            onPress={this.sendSignup}
            btnStyle={{ padding: 4, width: "60%" }}
        />
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 4 }}>
          <StatusBar hidden={true} />
          <Image
            source={require("../../assets/images/shoo.png")}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: -70,
              left: -20
            }}
            resizeMode="contain"
          />
          <View
            style={{
              position: "absolute",
              top: "20%",
              left: 50
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              HELLO,
            </Text>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 30 }}>
              Verify!
            </Text>
          </View>
        </View>
        <View style={{ flex: 4, paddingHorizontal: 60 }}>
          <View style={{ flex: 3 }}>
            
            <View
              style={{
                borderColor: "silver",
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 4,
                marginBottom: 20
              }}
            >
              <TextInput
                onChangeText={otp => this.setState({ otp })}
                placeholder="code to verify"
                style={{ fontSize: 14, textAlign: "center" }}
              />
              <Text style={styles.btnLabel}>FILL OTP</Text>
            </View>
          </View>
          <View style={{ paddingBottom: 15, flex: 1 }}>
            {this.loodingData()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnLabel: {
    position: "absolute",
    top: -12,
    left: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    fontSize: 12,
    fontWeight: "bold"
  }
});

export default Otp;
