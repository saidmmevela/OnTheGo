import React, { Component } from "react";
import { Text, View, StatusBar,ActivityIndicator } from "react-native";

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

/////////////////redux settings////////////////////////
import { Provider, connect } from "react-redux";

import store from "./Store";
///pages goes here
//import Theme from "./src/constants/Theme";
import Signup from "./src/pages/Signup.js";
import Otp from "./src/pages/Otp.js";
import Naming from "./src/pages/Naming.js";
import Signin from "./src/pages/Signin.js";
import Welcome from "./src/pages/Welcome.js";
import Destination from "./src/pages/Destination.js";
import Home from "./src/pages/Home.js";
//import MapTry from "./src/pages/mapTry.js";
import ProductList from "./src/pages/ProductList";
import CheckOut from "./src/pages/CheckOut";
import AppLoad from "./src/pages/AppLoad";
import TrackDerivery from "./src/pages/TrackDerivery";
import DeliveryPoint from "./src/pages/DeliveryPoint";
import DriverRating from "./src/pages/DriverRating";

/////constants
//import Theme from "./src/constants/Theme.js";

/////////////// main nav to kava alll



const LogApp = createStackNavigator({
 
  Welcome,
  Signup,
  Signin,
  Otp,
  Naming,
},
{
  initialRouteName: 'Welcome',
},
{
   navigationOptions:{
    headerShown:false
  }
}

);

const AppNavigator = createStackNavigator({
  Home,
  AppLoad,
  TrackDerivery,
  DriverRating,
  CheckOut,
  Destination,
  DeliveryPoint,
  ProductList
  
},
{
  initialRouteName: 'Home',
},
{
   navigationOptions:{
    headerShown:false
  }
}
);

const Appnavigation = createAppContainer(LogApp);
const Appnavigation1 = createAppContainer(AppNavigator);


/*
const Appnavigation = createStackNavigator(
  {
    Welcome: { screen: Welcome },
    AppLoad: { screen: AppLoad },
    Signin: { screen: Signin },
    Otp: { screen: Otp },
    Naming: { screen: Naming },
    Signup: { screen: Signup },
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

const Appnavigation1 = createStackNavigator(
  {
    Home: { screen: Home },
    AppLoad: { screen: AppLoad },
    TrackDerivery: { screen: TrackDerivery },
   // Destination: { screen: Destination },
    DriverRating: { screen: DriverRating },
    ProductList: { screen: ProductList },
   // CheckOut: { screen: CheckOut },
   // DeliveryPoint: { screen: DeliveryPoint },
   // MapTry: { screen: MapTry }
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

*/

///////////// MAIN CLASS /////////////////////////
const Start = ({ settings, rehydrate }) => {
  //ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
  console.log("setting",settings);
  console.log("rehydrate",rehydrate);
  if(rehydrate){
    if (settings.userLoggedIn) {
      return <Appnavigation1/>;
    } else {
      return <Appnavigation/>;
    }
  }
  else{
    return(
      <View 
        style={{
          flex:1,
          alignItems:'center',
          justifyContent:'center'
         }}
      >
         <ActivityIndicator size="large" color="black" />
      </View>
     )
  }
};
const mapStateToProps = (state) => ({
  settings: state.settings,
  rehydrate: state.rehydrate
});
StartApp = connect(mapStateToProps)(Start);

////////////////////////////////////////////////
////////// EXPORT ROOT APP /////////////////////
const Root = () => (
  <Provider store={store}>
    <View style={{ flex:1 }}>
      <StatusBar barStyle="dark-content"/> 
    <StartApp />
    </View>
  </Provider>
);
export default Root;
