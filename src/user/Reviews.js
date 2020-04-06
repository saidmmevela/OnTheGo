import React, { Component } from "react";
import { Text, View, FlatList, SafeAreaView, Image } from "react-native";
import Theme from "../constants/Theme";
import StarRating from "react-native-star-rating";
import ProgressBar from "react-native-progress/Bar";
import { connect } from "react-redux";

const rating_data = [
  { id: 1, people: "18", rating: 5 },
  { id: 2, people: "13", rating: 4 },
  { id: 3, people: "20", rating: 3 },
  { id: 4, people: "8", rating: 2 },
  { id: 5, people: "11", rating: 1 }
];

export class Reviews extends Component {
  keyExtractor = item => item.id.toString();

  state = {
    starCount: 0,
    numz: 2,
    servicer: {}
  };

  onStarRatingPress = rating => {
    this.setState({
      starCount: rating
    });
    alert(rating);
  };

  averageRating = num => {
    var numT = 0;
    numT += num;
    //alert(numT);
  };

  barRating = ({ item }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text>{item.rating}</Text>
        </View>
        {this.averageRating(item.rating)}
        <View style={{ flex: 9 }}>
          <ProgressBar
            progress={item.rating / 5}
            unfilledColor="#E6E6FA"
            borderColor={Theme.COLORS.WHITE}
            width={190}
            height={8}
            color={Theme.COLORS.MAIN}
            animationConfig={{ bounciness: 5 }}
            animationType="spring"
            animated={true}
          />
        </View>
      </View>
    );
  };

  ratingPart = () => {
    return (
      <View style={{ borderBottomColor: "silver", borderBottomWidth: 1 }}>
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Image
            source={{
              uri:
                "https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png"
            }}
            style={{ width: 50, height: 50, borderRadius: 60 / 2 }}
          />
          <Text style={{ fontSize: 18 }}>Rate & review</Text>
          <Text style={{ fontSize: 16, color: Theme.COLORS.FIFIA }}>
            Share your experience to help others
          </Text>
          <View style={{ paddingTop: 10 }}>
            <StarRating
              disabled={false}
              emptyStar={"ios-star-outline"}
              fullStar={"ios-star"}
              halfStar={"ios-star-half"}
              iconSet={"Ionicons"}
              maxStars={5}
              starSize={30}
              rating={this.state.starCount}
              selectedStar={rating => this.onStarRatingPress(rating)}
              fullStarColor={Theme.COLORS.MAIN}
              starStyle={{ paddingHorizontal: 10 }}
            />
          </View>
        </View>
      </View>
    );
  };

  displayRating = () => {
    return (
      <View
        style={{
          borderBottomColor: "silver",
          borderBottomWidth: 1
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            paddingVertical: 10
          }}
        >
          <View style={{ flex: 7, paddingTop: 15 }}>
            <FlatList
              data={rating_data}
              keyExtractor={this.keyExtractor}
              renderItem={this.barRating}
              numColumns={1}
              //ListHeaderComponent={this.carHeader}
              //stickyHeaderIndices={[0]}
              showsVerticalScrollIndicator={false}
              style={{}}
            />
          </View>

          <View style={{ flex: 3, alignItems: "center" }}>
            <Text style={{ textAlign: "right", fontSize: 60 }}>4.4</Text>
            <View style={{}}>
              <StarRating
                disabled={true}
                emptyStar={"ios-star-outline"}
                fullStar={"ios-star"}
                halfStar={"ios-star-half"}
                iconSet={"Ionicons"}
                maxStars={5}
                starSize={16}
                rating={this.state.numz}
                fullStarColor={Theme.COLORS.MAIN}
                starStyle={{ paddingHorizontal: 1 }}
              />
            </View>
            <Text style={{ textAlign: "center", fontSize: 16 }}>(645)</Text>
          </View>
        </View>
      </View>
    );
  };

  theHeader = () => {
    return <View>{this.displayRating()}</View>;
  };
  reviewList = ({ item }) => {
    return (
      <View
        style={{
          borderBottomColor: "silver",
          borderBottomWidth: 1
        }}
      >
        <View style={{ marginHorizontal: 15, paddingVertical: 10 }}>
          {/*use details goes hia*/}
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1.8 }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
              />
            </View>
            <View style={{ flex: 8.2, paddingTop: 4 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.name}
              </Text>
              <Text style={{ color: Theme.COLORS.FIFIA }}>{item.location}</Text>
            </View>
          </View>
          {/*time and starsssssss */}
          <View style={{ flexDirection: "row", paddingTop: 10 }}>
            <View style={{ flex: 2.5 }}>
              <View style={{ alignItems: "flex-start" }}>
                <StarRating
                  disabled={true}
                  emptyStar={"ios-star-outline"}
                  fullStar={"ios-star"}
                  halfStar={"ios-star-half"}
                  iconSet={"Ionicons"}
                  maxStars={5}
                  starSize={16}
                  rating={item.rate}
                  fullStarColor={Theme.COLORS.MAIN}
                  starStyle={{ paddingHorizontal: 1 }}
                />
              </View>
            </View>
            <View style={{ flex: 7.5 }}>
              <Text>{item.time} months ago</Text>
            </View>
          </View>
          <View style={{ paddingTop: 8, marginBottom: 5 }}>
            <Text>{item.texts}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1
          //marginTop: 70
        }}
      >
        <FlatList
          data={this.props.reviews}
          keyExtractor={this.keyExtractor}
          renderItem={this.reviewList}
          numColumns={1}
          ListHeaderComponent={this.theHeader}
          //stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          style={{}}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.dataz.reviews
  };
};

export default connect(mapStateToProps)(Reviews);
