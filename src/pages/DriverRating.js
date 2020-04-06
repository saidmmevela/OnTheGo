import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableHighlight,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Theme from "../../src/constants/Theme";
import TakeerIcon from "../components/TakeerIcon";
import BigBtn from "../components/BigBtn";
import StarRating from "react-native-star-rating";
import Modal from "react-native-modal";
import _ from "lodash";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("screen");
const origin = { latitude: -6.82941, longitude: 39.219825 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const ontheway = { latitude: -6.826059, longitude: 39.22845 };
const GOOGLE_MAPS_APIKEY = "AIzaSyCCICTojAyP00waR-c5-oPUv7qQxddB_Xk";
export class TrackDerivery extends Component {
  state = {
    ontheway: { latitude: -6.826059, longitude: 39.22845 },
    origin: {},
    starCount: 0
  };

  static navigationOptions={
    headerShown:false
  }
  aacomponentDidMount = () => {
    this.setState({ origin: this.props.opoint });
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 24, backgroundColor: "#fff" }}>
        <View
          style={{
            height: height * 0.4,
            alignItems: "center",
            paddingTop: 20
          }}
        >
          <View
            style={{
              alignItems:'center',
              flexDirection:'row',
              justifyContent:'space-between',
              marginBottom:10,
              width,
              paddingHorizontal:10
            }}
          >
            <TouchableWithoutFeedback
                onPress={()=>this.props.navigation.goBack()}
            >
              <View>
                  <TakeerIcon
                    iconName="left"
                    iconType="AntDesign"
                    iconColor="#000"
                    iconSize={25}
                  />
              </View>
            </TouchableWithoutFeedback>
            <Text style={{ fontSize: 20, }}>
              Rate your driver
            </Text>
            <View>
                <TakeerIcon
                  iconName="right"
                  iconType="AntDesign"
                  iconColor="white"
                  iconSize={30}
                />
            </View>
          </View>

          <Image
            source={{
              uri:
                "https://images.unsplash.com/photo-1513659982161-852cd3fe914b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              borderColor: "#000",
              borderWidth: 1,
              marginBottom: 10
            }}
          />
          <StarRating
            disabled={false}
            emptyStar={"ios-star-outline"}
            fullStar={"ios-star"}
            halfStar={"ios-star-half"}
            iconSet={"Ionicons"}
            maxStars={5}
            starSize={20}
            rating={this.state.starCount}
            selectedStar={rating => this.setState({ starCount: rating })}
            fullStarColor={Theme.COLORS.MAIN}
            starStyle={{ paddingHorizontal: 6 }}
          />
        </View>

        <View
          style={{
            height: height * 0.55,
            backgroundColor: "#fff",
            borderColor: "#000",
            //borderWidth: 1,
            //borderBottomColor: "#fff",
            elevation: 10,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 20
          }}
        >
          <View style={{ flex: 4 }}>
            <Text
              style={{ fontSize: 20, marginVertical: 10, textAlign: "center" }}
            >
              Your order history
            </Text>
            <View
              style={{
                width: "100%",
                height: 30,
                borderColor: "#000",
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent:'center',
                marginBottom: 10
              }}
            >
              <Text style={{ fontSize: 16 }}>set date</Text>
            </View>
            <Text style={{ fontSize: 18 }}>Makange</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <View
                style={{
                  borderRadius: 10,
                  borderColor: "#000",
                  borderWidth: 1,
                  padding: 6,
                  alignItems: "center",
                  marginLeft: 15
                }}
              >
                <TakeerIcon
                  iconName="home"
                  iconType="MaterialIcons"
                  iconColor="#000"
                  iconSize={30}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //pickedLocation: location => dispatch(pickedLocation(location))
  };
};

const mapStateToProps = state => {
  return {
    dpoint: state.dataz.dpoint,
    opoint: state.dataz.opoint
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackDerivery);
