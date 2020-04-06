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
    origin: {}
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
        <View style={{ height: height * 0.65 }}>
          <View style={{ flex: 1 }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: -6.82941,
                longitude: 39.219825,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0121
              }}
            >
              <MapView.Marker
                coordinate={origin}
                title={"Delivery"}
                description={"You are here"}
              >
                <Image
                  source={require("../../assets/images/maka1.png")}
                  style={{ height: 30, width: 30 }}
                />
              </MapView.Marker>
              <MapView.Marker
                coordinate={this.props.dpoint}
                title={"Delivery"}
                description={"You are here"}
              >
                <Image
                  source={require("../../assets/images/dest.gif")}
                  style={{ height: 30, width: 30 }}
                />
              </MapView.Marker>
              <MapView.Marker
                coordinate={ontheway}
                title={"Delivery"}
                description={"You are here"}
              >
                <Image
                  source={require("../../assets/images/hea.png")}
                  style={{ height: 30, width: 30 }}
                />
              </MapView.Marker>

              <MapViewDirections
                style={{ flex: 1 }}
                origin={origin}
                destination={this.props.dpoint}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="green"
              />

              <MapViewDirections
                style={{ flex: 1 }}
                origin={origin}
                destination={ontheway}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={6}
                strokeColor="#2f4995"
              ></MapViewDirections>
            </MapView>
            <View style={{ position: "absolute", top: 10, left: 10 }}>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.goBack()}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    backgroundColor: "#fff"
                  }}
                >
                  <TakeerIcon
                    iconName="ios-arrow-back"
                    iconType="Ionicons"
                    iconColor="#000"
                    iconSize={25}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>

        <View
          style={{
            height: height * 0.35,
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
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            TRACKING ORDER
          </Text>

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
              borderWidth: 1
            }}
          />
          <StarRating
            disabled={true}
            emptyStar={"ios-star-outline"}
            fullStar={"ios-star"}
            halfStar={"ios-star-half"}
            iconSet={"Ionicons"}
            maxStars={3}
            starSize={25}
            rating={this.state.starCount}
            selectedStar={rating => this.onStarRatingPress(rating)}
            fullStarColor={Theme.COLORS.MAIN}
            starStyle={{ paddingHorizontal: 10 }}
          />

          <Text style={{ fontSize: 16 }}>Juma on the way</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10
            }}
          >
            <TouchableWithoutFeedback onPress={() => alert("call man")}>
              <View
                style={{
                  borderRadius: 10,
                  borderColor:Theme.COLORS.CALL,
                  borderWidth: 1,
                  padding: 6,
                  alignItems: "center"
                }}
              >
                <TakeerIcon
                  iconName="call"
                  iconType="MaterialIcons"
                  iconColor={Theme.COLORS.CALL}
                  iconSize={30}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate("DriverRating")}
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
                <Image
                  source={require("../../assets/images/btn.png")}
                  style={{
                    width: 31,
                    height: 27
                  }}
                  //resizeMode="contain"
                />
              </View>
            </TouchableWithoutFeedback>
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
