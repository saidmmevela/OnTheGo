import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import BigBtn from "../components/BigBtn";
import Theme from "../../src/constants/Theme";
import { connect } from "react-redux";
import * as actions from '../../actions';
import TakeerIcon from "../components/TakeerIcon";
import { Input } from "galio-framework";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");
const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from "graphql-tag";
const link = new HttpLink({
  uri: 'http://192.168.43.221:4122/v1/api/onthego/graphql'
  //cache: new InMemoryCache({addTypename:false})
})


const client = new ApolloClient({
  link,
  cache: new InMemoryCache({addTypename:false})
})

export class Signin extends Component {
  state = {
    username:"",
    phonenumber:""
  };

  static navigationOptions={
    headerShown:false
  }
  validating=()=>{
    let {username,phonenumber} = this.state;
    if(username =="" ||phonenumber ==""){
          Alert.alert("","Please fill space")
    }
    else{
      this.setState({looding:true});
          let variable = {
            "username":username,
            "phone":phonenumber
          }
        client
        .query({
          query: gql`
            query {
              user(
                where: { 
                  Phone_No:$phone,
                  username:$username
                }
              ) @mysql {
                id
                Names
                username
              }
            }
          `,
          variables:variable
        })
        .then(result => {
          this.setState({looding:false});
          console.log("data return ",result.data.user);
          console.log("data return1 ",result.data);
          console.log("data user",username,phonenumber);
          let user=result.data.user;
          let user1=user[0];
          console.log("user1",user1);
          if(user.length > 0){
            //this.props.navigation.navigate("Home",{user1});
           // Alert.alert("","Pass")
           this.props.isConnected(user1);
           
          }
          else{
            Alert.alert("","Wrong username or phone number")
          }
        })
        .catch(error =>{
          this.setState({looding:false});
            console.log("error",error);
          });
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
          btnText="Log in"
          btnTextColor="#fff"
          btnBorderColor={Theme.COLORS.MAIN}
          iconColor=""
          iconName=""
          iconSize={0}
          //onPress={() => this.props.navigation.navigate("Home")}
          onPress={this.validating}
          btnStyle={{ padding: 4, width: "60%" }}
        />
      )
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, backgroundColor: "#fff" }}
      >
        <View style={{ flex: 4 }}>
          <StatusBar hidden={true} />
          <Image
            source={require("../../assets/images/shoo.png")}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: -85,
              left: -20
            }}
            //resizeMode="contain"
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
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 25 }}>
              welcome back
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 4,
            paddingHorizontal: 60
          }}
        >
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
                onChangeText={username => this.setState({ username })}
                placeholder="user name"
                style={{ fontSize: 14, textAlign: "center" }}
              />

              <Text style={styles.btnLabel}>USER NAME</Text>
            </View>
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
                onChangeText={phonenumber => this.setState({ phonenumber })}
                placeholder="+255768234354"
                style={{ fontSize: 14, textAlign: "center" }}
              />
              <Text style={styles.btnLabel}>PHONE NUMBER</Text>
            </View>
          </View>

          <View style={{ paddingBottom: 15, flex: 1 }}>
           {this.loodingData()}
          </View>
        </View>
      </KeyboardAvoidingView>
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

const mapStateToProps = (state) => ({
  app: state.app
});
export default connect(mapStateToProps,actions)(Signin);
