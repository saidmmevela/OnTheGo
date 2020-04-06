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
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { getPreciseDistance } from "geolib";
import Theme from "../../src/constants/Theme";
import TakeerIcon from "../components/TakeerIcon";
import BigBtn from "../components/BigBtn";
import Modal from "react-native-modal";
import _ from "lodash";
import { connect } from "react-redux";
import { pickedLocation } from "../../actions/orderAction";

const { width, height } = Dimensions.get("screen");
const origin = { latitude: -6.82941, longitude: 39.219825 };
const ontheway = { latitude: -6.826059, longitude: 39.22845 };
const GOOGLE_MAPS_APIKEY = "AIzaSyCCICTojAyP00waR-c5-oPUv7qQxddB_Xk";
export class DeliveryPoint extends Component {
  state = {
    origin: { latitude: -6.82941, longitude: 39.219825 },
    location: { latitude: -6.82941, longitude: 39.219825 },
    opoint: { latitude: "", longitude: "" }
  };

  static navigationOptions={
    headerShown:false
  }
  setLocation = () => {
    console.log(this.state.location);

    ///////sampleeeee
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        this.state.location.latitude +
        "," +
        this.state.location.longitude +
        "&key=" +
        GOOGLE_MAPS_APIKEY
    )
      .then(response => response.json())
      .then(responseJson => {
        //console.log(JSON.stringify(responseJson));
        let street_name =
          responseJson.results[0].address_components[0].long_name;
        let road_name = responseJson.results[0].address_components[1].long_name;
        let area_name = responseJson.results[0].address_components[3].long_name;

        let checkNo = isNaN(parseInt(street_name));
        ///////distance and plice/////////////////////////////////////////////
        const dist = getPreciseDistance(this.state.origin, this.state.location);

        const distance = dist / 1000;
        const price = distance * 400;

        //console.log("name", street_name);
        if (checkNo) {
          //alert("am stiiit" + street_name + checkNo);
          this.props.pickedLocation(
            this.state.location,
            this.state.opoint,
            street_name,
            price,
            distance
          );
        } else {
          this.props.pickedLocation(
            this.state.location,
            this.state.opoint,
            road_name,
            price,
            distance
          );
          // alert("am number" + road_name + area_name + checkNo);
        }
      });

    //////////end sampleeeeee///

    // this.props.pickedLocation(this.state.location,this.state.opoint,destination_name);
    this.props.navigation.navigate("CheckOut");
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status, permissions } = await Permissions.askAsync(
      Permissions.LOCATION
    );

    if (status === "granted") {
      this.setState({ hasLocationPermissions: true });
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true
      });
      //let location = await Location.getCurrentPositionAsync({});
      //this.setState({ locationResult: JSON.stringify(location) });
      // Center the map on the location we just fetched.
      //console.log(location);
      this.setState({
        opoint: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        },
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      });
    } else {
      alert("Location permission not granted");
    }
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 24, backgroundColor: "#fff" }}>
        {this.state.opoint.latitude != "" && (
          <View style={{ flex: 1 }}>
            <MapView
              initialRegion={{
                latitude: this.state.opoint.latitude,
                longitude: this.state.opoint.longitude,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0121
              }}
              //onRegionChangeComplete={val => console.log(val)}
              onPress={val =>
                this.setState({ location: val.nativeEvent.coordinate })
              }
              style={{ flex: 1 }}
            >
              <MapView.Marker
                coordinate={this.state.opoint}
                title={"Delivery"}
                description={"You are here"}
              />
            </MapView>
            <View style={{ position: "absolute", top: 10, left: 10 }}>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.goBack()}
              >
                <View
                  style={{
                    width: 40,
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
        )}
        <View
          style={{
            position: "absolute",
            bottom: 50,
            width: "100%"
          }}
        >
          <BigBtn
            btnColor="#FFF"
            btnText="DONE"
            btnTextColor="#000"
            btnBorderColor="#fff"
            iconColor=""
            iconName=""
            iconSize={0}
            onPress={() => this.setLocation()}
            btnStyle={{ padding: 3, width: "50%", elevation: 6 }}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pickedLocation: (location, opoint, destination_name, price, distance) =>
      dispatch(
        pickedLocation(location, opoint, destination_name, price, distance)
      )
  };
};

const mapStateToProps = state => {
  return {
    dpoint: state.dataz.dpoint
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryPoint);
