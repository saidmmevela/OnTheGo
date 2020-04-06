import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";
import StarRating from "react-native-star-rating";
import Theme from "../constants/Theme";
import BigBtn from "./bigBtn";

export class Sentb extends Component {
  render() {
    const dataz = {
      img: this.props.image,
      name: this.props.name,
      rating: this.props.rate,
      users: 132
    };
    return (
      <View
        style={{
          paddingBottom: 20,
          borderBottomColor: "silver",
          borderBottomWidth: 1
        }}
      >
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.navigate("Reviews", { servicer: dataz })
          }
        >
          <View
            style={{
              flexDirection: "row",
              height: 70,
              backgroundColor: "#fff",
              marginTop: 10
            }}
          >
            <View style={{ flex: 2 }}>
              <ImageBackground
                imageStyle={{}}
                style={{
                  width: "100%",
                  height: "100%"
                }}
                source={{
                  uri: this.props.image
                }}
              ></ImageBackground>
            </View>
            <View
              style={{
                flex: 8,
                paddingHorizontal: 10,
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 18 }}>{this.props.name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text>{this.props.contact}</Text>
                <StarRating
                  disabled={true}
                  emptyStar={"ios-star-outline"}
                  fullStar={"ios-star"}
                  halfStar={"ios-star-half"}
                  iconSet={"Ionicons"}
                  maxStars={5}
                  starSize={20}
                  rating={this.props.rate}
                  //selectedStar={rating => this.onStarRatingPress(rating)}
                  fullStarColor={Theme.COLORS.YLIKE}
                  starStyle={{ paddingHorizontal: 1 }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 15,
                flex: 2.5,
                fontWeight: "bold"
              }}
            >
              Location
            </Text>
            <Text style={{ fontSize: 15, flex: 7.5 }}>
              {this.props.location}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                flex: 2.5
              }}
            >
              Days
            </Text>
            <Text style={{ fontSize: 15, flex: 7.5 }}>{this.props.days}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                flex: 2.5
              }}
            >
              Time
            </Text>
            <Text style={{ fontSize: 15, flex: 7.5 }}>
              {this.props.stime}AM - {this.props.etime}PM
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 3 }}></View>
            <View style={{ flex: 3.5 }}></View>
            <View style={{ flex: 3.5 }}>
              <BigBtn
                btnColor={Theme.COLORS.MAIN_PINK}
                btnText="DELETE"
                btnTextColor="#fff"
                btnBorderColor={Theme.COLORS.MAIN_PINK}
                iconColor=""
                iconName=""
                iconSize={0}
                onPress={() => alert("Deny")}
                btnStyle={{ height: 35 }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Sentb;
