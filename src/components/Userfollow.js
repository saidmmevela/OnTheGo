import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  ImageBackground
} from "react-native";
import { Text } from "galio-framework";
import LinearGradient from 'react-native-linear-gradient';
import Theme from "../constants/Theme";
/*
    profile={id:1,name:'Blanche Hall',username:'@jorgecutis',avatar:'http://i.pravatar.cc/100?id=skater'}
 
    <Userfollow
      avatar={profile.avatar}
      name={profile.name}
      username={profile.username}
      gradient={true}
      buttonTextColor='white'
      gradientColor={['#CB4335', '#EDBB99']}
    />
 
*/

export default class Userfollow extends Component {
  keyExtractor = item => item.id.toString();
  renderView = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 10,
          alignItems: "center",
          paddingHorizontal: "3%"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",

            alignItems: "center"
          }}
        >
          <Image
            style={{
              height: 60,
              width: 60,
              borderRadius: 30
            }}
            source={{ uri: item.avatar }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              marginLeft: "5%"
            }}
          >
            <Text h5 color="black" size={16}>
              {item.name}
            </Text>
            <Text
              muted

              // color='#AAA'
            >
              {item.username}
            </Text>
          </View>
        </View>
        <View
          //colors={['#CB4335', '#EDBB99']}
          style={{
            marginTop: "1%",
            width: 90,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            backgroundColor: Theme.COLORS.MAIN
          }}
        >
          <Text
            style={{
              // fontSize:RFPercentage(2.1),
              color: "white",
              marginLeft: "5%",
              marginBottom: "3%"
            }}
          >
            FOLLOW
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderView}
        numColumns={1}
        //ListHeaderComponent={this.carHeader}
        //stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        style={{ padding: 1 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center"
  }
});
