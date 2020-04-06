import React, { Component } from "react";
import { Text, View } from "react-native";
import Userfollow from "../components/Userfollow";
import Theme from "../constants/Theme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import TakeerIcon from "../components/TakeerIcon";

let pro = [
  {
    id: 1,
    name: "Blanche Hall",
    username: "@jorgecutis",
    avatar: "http://i.pravatar.cc/100?id=skater"
  },
  {
    id: 2,
    name: "Blanche Hall",
    username: "@jorgecutis",
    avatar: "http://i.pravatar.cc/100?id=skater"
  }
];

class Followers extends Component {
  renderHeader = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 24,
            paddingVertical: 5,
            backgroundColor: Theme.COLORS.MAIN
          }}
        >
          <View style={{ flex: 3 }}>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.goBack()}
            >
              <View style={{ flexDirection: "row" }}>
                <TakeerIcon
                  iconType="MaterialIcons"
                  iconName="arrow-back"
                  iconSize={20}
                  iconColor="#fff"
                />
                <Text
                  style={{
                    paddingHorizontal: 10,
                    color: "#FFF",
                    fontWeight: "bold"
                  }}
                >
                  {this.props.navigation.state.params.follo}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={{ flex: 7 }}></View>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View>
        {this.renderHeader()}
        <Userfollow data={pro} />
      </View>
    );
  }
}

export default Followers;
