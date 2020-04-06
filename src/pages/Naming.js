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
import { connect } from "react-redux";
import * as actions from '../../actions';
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

export class Naming extends Component {
  state = {
    username: "",
    names:"",
    phonenumber: "",
    looding:false,
  };

  static navigationOptions={
    headerShown:false
  }
  componentDidMount=()=>{
    let num =this.props.navigation.state.params.num;
    this.setState({phonenumber:num})

    }

  sendSignup=()=>{
    let {username,names,phonenumber,otp}=this.state;
    this.setState({looding:true});
    let variable = {
        "username":username,
      }
    client
    .query({
      query: gql`
        query {
          user(
            where: { username:$username}
          ) @mysql {
            id
            Names
            username
          }
        }
      `,
      variables:variable
    })
    .then(data => {  
        console.log("data return",data.data.user);
        let user=data.data.user;
        if(user.length == 0){
              let variable={
                "names":names,
                "username":username,
                "phone":phonenumber,
              }
               client.mutate({
                 mutation: gql`
                 mutation {
                   insert_user(
                     docs: [
                       {
                         Names:$names,
                         username:$username,
                         Phone_No:$phone,
                       }
                     ]
                   ) @mysql {
                     status
                     error
                     returning {
                       id
                     }
                   }
                 }`,
                 variables:variable
               })
               .then(data => {
                this.setState({looding:false});
                 console.log('data sent',data.data.insert_user.returning)
                 this.props.navigation.navigate("Signin")
               })
               .catch(error =>{
                this.setState({looding:false});
                  console.log("error",error);
                });
            }
            else{
                this.setState({looding:false});
                Alert.alert("","Username Already exist")
            }

        })
        .catch(error =>{
            this.setState({looding:false});
                console.log("error",error);
            });
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
        btnText="Sign Up"
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
              Sign up!
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
                onChangeText={names => this.setState({ names })}
                placeholder="sambokile kindeki"
                style={{ fontSize: 14, textAlign: "center" }}
              />
              <Text style={styles.btnLabel}>NAMES</Text>
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
                onChangeText={username => this.setState({ username })}
                placeholder="sambokile"
                style={{ fontSize: 14, textAlign: "center" }}
              />
              <Text style={styles.btnLabel}>USER NAME</Text>
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
const mapStateToProps = (state) => ({
    app: state.app
  });
export default connect(mapStateToProps,actions)(Naming);

