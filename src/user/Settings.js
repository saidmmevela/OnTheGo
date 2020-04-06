import React, { Component } from "react";
import { View, Image, TextInput, Dimensions, ScrollView } from "react-native";

import TakeerIcon from "../components/TakeerIcon";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Theme from "../constants/Theme";
import { Block, NavBar, Text, Icon, Button } from "galio-framework";

import Bigbtn from "../components/bigBtn";
const { height, width } = Dimensions.get("screen");
export class Settings extends Component {
  constructor() {
    super();
    this.state = {
      name: "andy core",
      email: "coreandy2gmail.com",
      phone_no: "+2557868765",
      password: "",
      location: "",
      job: "",
      datas: {
        sample: "mfano"
      }
    };
  }
  renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingTop: 8,
          flex: 1,
          paddingHorizontal: 5,
          height: 50,
          backgroundColor: Theme.COLORS.MAIN
        }}
      >
        <View style={{ flex: 2 }}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}
          >
            <View style={{ flexDirection: "row" }}>
              <TakeerIcon
                iconType="MaterialIcons"
                iconName="arrow-back"
                iconSize={22}
                iconColor="#fff"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 6 }}>
          <Text
            style={{
              // fontSize:RFPercentage(2.1),
              color: "white",
              fontSize: 18,
              textAlign: "center"
            }}
          >
            Settings
          </Text>
        </View>
        <View style={{ flex: 2, alignItems: "flex-end" }}></View>
      </View>
    );
  };

  changeImage = () => {
    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: Theme.COLORS.WHITE,
          paddingVertical: 20
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 3 }}></View>
          <View style={{ flex: 4 }}>
            <Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 75
              }}
              source={{ uri: "http://placeimg.com/640/480/any" }}
            />
            <View
              style={{
                backgroundColor: Theme.COLORS.MAIN_PINK,
                width: 40,
                height: 40,
                borderRadius: 30,
                position: "absolute",
                left: 70,
                top: 70,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TakeerIcon
                iconType="Entypo"
                iconName="camera"
                iconSize={25}
                iconColor="#fff"
              />
            </View>
          </View>
          <View style={{ flex: 3 }}></View>
        </View>
      </View>
    );
  };

  updateForm = () => {
    return (
      <View style={{ backgroundColor: "#fff", padding: 15 }}>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#DCDCDC",
            borderBottomWidth: 1
          }}
        >
          <Text style={styles.label}>Name</Text>
          <TextInput
            onChange={{}}
            autoFocus={true}
            keyboardType="default"
            value={this.state.name}
            style={{ paddingHorizontal: 10, padding: 5 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#DCDCDC",
            borderBottomWidth: 1
          }}
        >
          <Text style={styles.label}>Email</Text>
          <TextInput
            keyboardType="email-address"
            value={this.state.email}
            style={{ paddingHorizontal: 10, padding: 5 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#DCDCDC",
            borderBottomWidth: 1
          }}
        >
          <Text style={styles.label}>Phone no</Text>
          <TextInput
            keyboardType="phone-pad"
            value={this.state.phone_no}
            style={{ paddingHorizontal: 10, padding: 5 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#DCDCDC",
            borderBottomWidth: 1
          }}
        >
          <Text style={styles.label}>Location</Text>
          <TextInput
            value={this.state.location}
            style={{ paddingHorizontal: 10, padding: 5 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#DCDCDC",
            borderBottomWidth: 1
          }}
        >
          <Text style={styles.label}>Occupation</Text>
          <TextInput
            value={this.state.job}
            style={{ paddingHorizontal: 10, padding: 5 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#DCDCDC",
            borderBottomWidth: 1,
            marginBottom: 12
          }}
        >
          <Text style={styles.label}>New Password</Text>
          <TextInput
            value={this.state.password}
            style={{ paddingHorizontal: 10, padding: 5 }}
          />
        </View>

        <Bigbtn
          btnColor={Theme.COLORS.MAIN_PINK}
          btnText="UPDATE PROFILE"
          btnTextColor="#fff"
          btnBorderColor={Theme.COLORS.MAIN_PINK}
          iconColor=""
          iconName=""
          iconSize={0}
          onPress={() => alert("Welcome")}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={{ backgroundColor: "silver" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.changeImage()}
          {this.updateForm()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  label: {
    marginTop: 8,
    color: Theme.COLORS.FIFIA
  }
};

export default Settings;
