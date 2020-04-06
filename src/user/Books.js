import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
  StatusBar,
  Button,
  TouchableWithoutFeedback
} from "react-native";
import Theme from "../constants/Theme";
import TakeerIcon from "../components/TakeerIcon";
import Receive from "../components/Receive";
import Sentb from "../components/Sentb";

import { connect } from "react-redux";
///imports some files
///dimensions
const { height, width } = Dimensions.get("screen");

class Books extends Component {
  state = {
    rbwidth: 0,
    sbwidth: 2,
    btype: "out"
  };

  keyExtractor = item => item.id.toString();

  renderView = ({ item }) => {
    if (this.state.btype == "out") {
      if (!item.mine) {
        return (
          <View style={{ paddingHorizontal: 10 }}>
            <Receive
              id={item.id}
              name={item.name}
              image={item.image}
              location={item.location}
              rate={item.rate}
              days={item.days}
              stime={item.stime}
              etime={item.etime}
              mine={item.mine}
              contact={item.contact}
              navigation={this.props.navigation}
            />
          </View>
        );
      }
    } else {
      if (item.mine) {
        return (
          <View style={{ paddingHorizontal: 10 }}>
            <Sentb
              id={item.id}
              name={item.name}
              image={item.image}
              location={item.location}
              rate={item.rate}
              days={item.days}
              stime={item.stime}
              etime={item.etime}
              mine={item.mine}
              contact={item.contact}
              navigation={this.props.navigation}
            />
          </View>
        );
      }
    }
  };

  activeBooking = typ => {
    if (typ == "out") {
      this.setState({ rbwidth: 0, sbwidth: 2, btype: typ });
    } else if (typ == "in") {
      this.setState({ rbwidth: 2, sbwidth: 0, btype: typ });
    }
  };

  topHeader = () => {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
          height: 40
        }}
      >
        <View
          style={{
            flex: 5,
            alignItems: "center",
            justifyContent: "center",
            borderRightWidth: 2,
            borderRightColor: "silver",
            borderBottomColor: "silver",
            borderBottomWidth: this.state.rbwidth
          }}
        >
          <TouchableWithoutFeedback onPress={() => this.activeBooking("out")}>
            <View style={{ flexDirection: "row" }}>
              <TakeerIcon
                iconName="arrow-down-left"
                iconType="Feather"
                iconSize={25}
              />
              <Text>Received</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flex: 5,
            alignItems: "center",
            justifyContent: "center",
            borderBottomColor: "silver",
            borderBottomWidth: this.state.sbwidth
          }}
        >
          <TouchableWithoutFeedback onPress={() => this.activeBooking("in")}>
            <View style={{ flexDirection: "row" }}>
              <TakeerIcon
                iconName="arrow-up-right"
                iconType="Feather"
                iconSize={25}
              />
              <Text>Sent</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff"
        }}
      >
        <View>{this.topHeader()}</View>
        <FlatList
          data={this.props.bookings}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderView}
          numColumns={1}
          //ListHeaderComponent={this.topHeader}
          //stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          style={{ padding: 1 }}
        />
      </View>
    );
  }
}
const styles = {
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  info_one: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 14,
    fontWeight: "bold"
  },
  info_two: {
    backgroundColor: "#f59f00",
    padding: 12,
    borderRadius: 4,
    fontStyle: "italic"
  }
};

const mapStateToProps = state => {
  return {
    bookings: state.dataz.bookings
  };
};

export default connect(mapStateToProps)(Books);
