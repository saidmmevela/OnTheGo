import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Button,
  Image
} from "react-native";
import TakeerIcon from "../components/TakeerIcon";
import TakeerButton from "../components/TakeerButton";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
////pages
import Books from "./Books";
import Reviews from "./Reviews";
import Follower from "./Followers";
import Settings from "./Settings";
import Theme from "../constants/Theme";

const { height, width } = Dimensions.get("screen");

export default class TabViewExample extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    index: 0,
    routes: [
      { key: "books", title: "BOOKINGS" },
      { key: "review", title: "REVIEWS" },
      { key: "setting", title: "SETTINGS" }
    ]
  };

  topHeader = () => {
    return (
      <View style={{ paddingVertical: 4 }}>
        <View
          style={{
            flexDirection: "row",
            height: height / 14,
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              flex: 8.5,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.goBack()}
            >
              <View
                style={{
                  borderRadius: 20,
                  width: 35,
                  height: 35,

                  alignItems: "center",
                  justifyContent: "center",
                  //elevation: 5,
                  borderColor: "#f4f2f2",
                  borderWidth: 3
                }}
              >
                <TakeerIcon
                  iconName="ios-arrow-back"
                  iconType="Ionicons"
                  iconSize={22}
                  iconColor="#000"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Image
            style={{
              flex: 1.5,
              width: "100%",
              height: "100%",
              borderRadius: 4,
              alignSelf: "flex-end"
            }}
            source={{
              uri:
                "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            }}
          />
        </View>
      </View>
    );
  };

  render() {
    const FirstRoute = () => (
      <View style={[styles.scene, { backgroundColor: "#ffffff" }]}>
        <Books navigation={this.props.navigation} />
      </View>
    );

    const SecondRoute = () => (
      <View style={[styles.scene, { backgroundColor: "#ffffff" }]}>
        <Reviews />
      </View>
    );

    const ThirdRoute = () => (
      <View style={[styles.scene, { backgroundColor: "#ffffff" }]}>
        <View>
          <Settings />
        </View>
      </View>
    );

    return (
      <>
        {/* <StatusBar backgroundColor={"#054d44"} />*/}
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 24,
            backgroundColor: "#fff"
          }}
        >
          {this.topHeader()}
        </View>
        {/* <StatusBar backgroundColor={"#054d44"} />*/}
        <TabView
          animationEnabled={false}
          swipeEnabled={false}
          navigationState={this.state}
          renderScene={SceneMap({
            books: FirstRoute,
            review: SecondRoute,
            setting: ThirdRoute
          })}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: Theme.COLORS.MAIN_PINK }}
              style={{ backgroundColor: Theme.COLORS.MAIN }}
            />
          )}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get("window").width }}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  follo: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 0,
    paddingHorizontal: 8,
    borderRadius: 10
  },
  follname: { fontSize: 17, color: "#000" },
  follonum: { fontSize: 14, color: "#000", textAlign: "center" }
});
