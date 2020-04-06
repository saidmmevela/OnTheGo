import React, { Component } from "react";
import { Constants } from "expo";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const homePlace = {
  description: "Home",
  geometry: { location: { lat: -6.82941, lng: 39.219825 } }
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: -6.826059, lng: 39.22845 } }
};

export default class mapTry extends Component {
  static navigationOptions={
    headerShown:false
  }
  render() {
    return (
      <View style={{ paddingTop: 24, flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            //console.log(data);
            console.log(
              "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            );
            console.log(details.geometry.location.lat);
            console.log(details.geometry.location.lng);
            console.log(details.address_components[0].long_name);
          }}
          getDefaultValue={() => {
            return ""; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: "AIzaSyCCICTojAyP00waR-c5-oPUv7qQxddB_Xk",
            language: "en", // language of the results
            location: "-6.8222976,39.2462336",
            radius: "5"
            //types: "(dar es salaam)" // default: 'geocode'
          }}
          styles={{
            description: {
              fontWeight: "bold"
            },
            predefinedPlacesDescription: {
              color: "#1faadb"
            }
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
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
  }
}
