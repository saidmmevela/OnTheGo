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
  TextInput,
  ScrollView
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Theme from "../../src/constants/Theme";
import TakeerIcon from "../components/TakeerIcon";
import BigBtn from "../components/BigBtn";
import Modal from "react-native-modal";
import _ from "lodash";
import { connect } from "react-redux";
import { pickedLocation } from "../../actions/orderAction";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getPreciseDistance } from "geolib";

const { width, height } = Dimensions.get("screen");

const GOOGLE_MAPS_APIKEY = "AIzaSyCCICTojAyP00waR-c5-oPUv7qQxddB_Xk";
export class Destination extends Component {
  state = {
    origin: { latitude: -6.82941, longitude: 39.219825 },
    ontheway: { latitude: -6.826059, longitude: 39.22845 },
    opoint: {}
  };

  static navigationOptions={
    headerShown:false
  }
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
      //  let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ locationResult: JSON.stringify(location) });
      // Center the map on the location we just fetched.
      this.setState({
        opoint: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      });
    } else {
      alert("Location permission not granted");
    }
  };

  chooseLocation = () => {
    return (
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder="choose location"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            console.log(details);
            console.log(
              "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            );
            const location = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng
            };

            const dist = getPreciseDistance(this.state.origin, location);

            const distance = Math.round(dist/1000);
            const price = distance * 400;
            //console.log(details.geometry.location.lat);
            //console.log(details.geometry.location.lng);
            //console.log(details.name);
            this.props.pickedLocation(
              location,
              this.state.opoint,
              details.name,price,distance
            );
          }}
          getDefaultValue={() => {
            return ""; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_MAPS_APIKEY,
            language: "en", // language of the results
            location: "-6.8222976,39.2462336", //dal es salaam onyl
            radius: "5"
            //types: "(dar es salaam)" // default: 'geocode'
          }}
          styles={{
            description: {
              fontWeight: "bold"
            },
            textInputContainer: {
              backgroundColor: "#fff",
              borderTopWidth: 0,
              borderBottomWidth: 0,
              height: 38
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              height: 38,
              color: "#5d5d5d",
              fontSize: 16
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
              backgroundColor: "#fff"
            }
          }}
          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={
            {
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }
          }
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: "distance"
            //types: "food"
          }}
          filterReverseGeocodingByTypes={[
            "locality",
            "administrative_area_level_3"
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          //predefinedPlaces={[homePlace, workPlace]}
          debounce={200}
        />
      </View>
    );
  };

  setLocation = () => {
    if (this.props.destination_name == "") {
      return (
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate("DeliveryPoint")}
        >
          <View
            style={{
              width: "80%",
              height: 50,
              backgroundColor: "#222f3e",
              alignSelf: "center",

              borderRadius: 60,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10
            }}
          >
            <TakeerIcon
              iconName="md-time"
              iconType="Ionicon"
              iconSize={30}
              iconColor="#fff"
            />
            <Text style={{ color: "#fff", fontSize: 18 }}>?</Text>
            <TakeerIcon
              iconName="rightcircleo"
              iconType="AntDesign"
              iconSize={30}
              iconColor="#fff"
            />
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate("DeliveryPoint")}
        >
          <View
            style={{
              width: "80%",
              height: 50,
              backgroundColor: "#222f3e",
              alignSelf: "center",

              borderRadius: 60,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10
            }}
          >
            <TakeerIcon
              iconName="md-time"
              iconType="Ionicon"
              iconSize={30}
              iconColor="#fff"
            />
            <Text style={{ color: "#fff", fontSize: 18 }}>
              {this.props.destination_name}
            </Text>
            <TakeerIcon
              iconName="rightcircleo"
              iconType="AntDesign"
              iconSize={30}
              iconColor="#fff"
            />
          </View>
        </TouchableWithoutFeedback>
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 24, backgroundColor: "#fff" }}>
       
        <View style={{ flex: 1 }}>
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
                coordinate={this.state.ontheway}
                title={"Delivery"}
                description={"You are here"}
              >
                <Image
                  source={require("../../assets/images/hea.png")}
                  style={{ height: 30, width: 30 }}
                />
              </MapView.Marker>
            </MapView>
            <View style={{ position: "absolute", top: 10, left: 10 }}>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.goBack()}
              >
                <View
                  style={{
                    width: 45,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10
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
          <View
            style={{
              position: "absolute",
              top: 90,
              alignSelf: "center"
            }}
          >
            {this.setLocation()}
          </View>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderColor: "#000",
            //borderWidth: 1,
            //borderBottomColor: "#fff",
            elevation: 10,
            paddingBottom: 20,
            paddingTop: 20,
            paddingHorizontal: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          <View
            style={{
              borderBottomColor: "#000",
              borderBottomWidth: 1,
              paddingBottom: 10,
              marginBottom: 10
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 4
              }}
            >
              Where would you like to pickup your order?
            </Text>

            <View
              style={{
                borderColor: "#000",
                borderWidth: 1,
                borderRadius: 10,
                flexDirection: "row",
                paddingHorizontal: 10
              }}
            >
              <View
                style={{
                  flex: 1.5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TakeerIcon
                  iconName="location-pin"
                  iconType="Entypo"
                  iconSize={30}
                />
              </View>

              <View
                style={{
                  flex: 8.5
                }}
              >
                {this.chooseLocation()}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 6,
                justifyContent: "space-between"
              }}
            >
              <Text style={{ fontSize: 16 }}>Distatnce</Text>
              <Text style={{ fontSize: 16 }}>{this.props.distance} KM</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 6,
                justifyContent: "space-between"
              }}
            >
              <Text style={{ fontSize: 16 }}>Store</Text>
              <Text style={{ fontSize: 16 }}>?</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 6,
                justifyContent: "space-between"
              }}
            >
              <Text style={{ fontSize: 16 }}>Destination</Text>
              <Text style={{ fontSize: 16 }}>
                {this.props.destination_name}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Delivery Fee
              </Text>
            </View>
            <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{this.props.price}/=</Text>
            </View>
          </View>
          <View style={{ paddingTop: 10 }}>
            <BigBtn
              btnColor={Theme.COLORS.MAIN}
              btnText="PROCEED"
              btnTextColor="#fff"
              btnBorderColor={Theme.COLORS.MAIN}
              iconColor=""
              iconName=""
              iconSize={0}
              onPress={() => this.props.navigation.navigate("CheckOut")}
              btnStyle={{ padding: 0, width: "40%" }}
            />
          </View>
        </View>
       
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pickedLocation: (location, opoint, destination_name,price,distance) =>
      dispatch(pickedLocation(location, opoint, destination_name,price,distance))
  };
};

const mapStateToProps = state => {
  return {
    dpoint: state.dataz.dpoint,
    opoint: state.dataz.opoint,
    destination_name: state.dataz.destination_name,
    distance: state.dataz.distance,
    price: state.dataz.price
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Destination);
