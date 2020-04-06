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
import TakeerIcon from "../components/TakeerIcon";
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import CategoryList from "../components/CategoryList";
import { connect } from "react-redux";
import Experties from "../components/Adds";
const { width, height } = Dimensions.get("screen");

export class Home extends Component {
  state = {
    category: "",
    num_in_cart: 3,
    items: [],
    sub_items: [],
    items_by_cat: [],
    filterModal: null,
    removeModal: null,
    store_name: "",
    stores: [],
    sub_cats: []
  };

  static navigationOptions={
    headerShown:false
  }

  keyExtractor = item => item.id.toString();
  keyExtractor_exp = item => item.id.toString();
  keyExtractorStore = item => item.id.toString();

  showStoreModal = category => {
    ///filter items by category
    const items = this.props.items;
    var new_items = (items || []).filter(function(item) {
      return item.cat_name.includes(category);
    });

   

    //console.log("new itemsssssssssssssssssssssssssssssss", new_items);
    ////filter category names per items
    var uniq = {};
    var stores = new_items.filter(
      obj => !uniq[obj.store] && (uniq[obj.store] = true)
    );
    //console.log("stooooooooooooooooooooooooooooooooooooooo", stores);
    ///setstates

    this.setState(
      {
        category,
        items: new_items,
        stores,
        sub_items: new_items
      },
      () => {
        this.setState({ filterModal: 1 });
      }
    );
  };

  filterByStore = sname => {
    const items = this.state.items;
    var store_cat_items = (items || []).filter(function(item) {
      return item.store.includes(sname);
    });

    ///sub categolt
    const category = this.state.category;
    const categories = this.props.categories;
    var cat_data = (categories || []).filter(function(cat) {
      return cat.name.includes(category);
    });

    ////setdata to be sent
    dataz = {
      store_cat_items: store_cat_items, 
      category: category,
      storename: sname,
      sub_cats: cat_data[0].sub_cats
    };
    this.setState({ filterModal: null }, () => {
      this.props.navigation.navigate("ProductList", { dataz: dataz });
    });
  };

  filterByName = sname => {
   

    //let itemsc=this.props.items.findIndex(obj => obj.cat_name === sname);
    let itemsc = this.props.items.filter((v) => v.cat_name == sname);
    let categorysc = this.props.categories.filter((v) => v.name == sname);
    //let categorysc=this.props.categories.findIndex(obj => obj.name === sname);
      console.log("itemsc",itemsc)
      console.log("categorysc",categorysc)

     let dataz = {
        items: itemsc, 
        category: categorysc,
      };
      this.props.navigation.navigate("ProductList", { dataz:dataz });
  };


  renderView = ({ item }) => {
    console.log("item",item)
    return (
      <View>
        <CategoryList
       
          showStoreModal={(v)=>this.filterByName(v)}
          navigation={this.props.navigation}
          name={item.name}
          image={item.image}
          id={item.id}
        />
      </View>
    );
  };

  renderStore = ({ item }) => {
    return (
      <View style={{ paddingBottom: 6 }}>
        <TouchableWithoutFeedback
          onPress={() => this.filterByStore(item.store)}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                alignSelf: "center",
                textTransform: "capitalize"
              }}
            >
              {item.store}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  topHeader = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1
        }}
      >
        <Image
          source={require("../../assets/icon.png")}
          style={{
            width: "20%",
            height: "100%"
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  adsView = () => {
    const adds = this.props.adds;
    return (
      <View style={{ paddingHorizontal: 20, borderRadius: 10 }}>
        <Swiper style={styles.wrapper} autoplay={true}>
          {adds &&
            adds.map(add => (
              <ImageBackground
                imageStyle={{ borderRadius: 10 }}
                style={{
                  width: "100%",
                  height: "96%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                source={{ uri: add.image }}
              >
                <Text style={styles.text}>{add.name}</Text>
              </ImageBackground>
            ))}
        </Swiper>
      </View>
    );
  };

  listFooter = () => {
    return (
      <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate("DriverRating")}
        >
          <View
            style={{
              alignItems: "center"
            }}
          >
            <View
              style={{
                borderRadius: 10,
                borderColor: "#000",
                borderWidth: 1,
                padding: 6,
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../assets/images/btn.png")}
                style={{
                  width: 30,
                  height: 26
                }}
                resizeMode="contain"
              />
            </View>

            <Text>Order</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  render() {
    console.log("props",this.props.categories);
    console.log("props1",this.props.items);
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar hidden={false} />
        <View
          style={{
            flex: 1.5,
            paddingTop: 24,
            paddingHorizontal: 20
          }}
        >
          {this.topHeader()}
        </View>
        <View style={{ flex: 7.5 }}>
          <FlatList
            data={this.props.categories}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderView}
            numColumns={3}
            ListHeaderComponent={this.adsView}
            //stickyHeaderIndices={[0]}
            //ListFooterComponent={this.listFooter}
            showsVerticalScrollIndicator={false}
            style={{ padding: 1 }}
          />
        </View>
        <View style={{ flex: 1 }}>{this.listFooter()}</View>

        <Modal
          //coverScreen={false}
          onBackdropPress={() => this.setState({ filterModal: null })}
          isVisible={this.state.filterModal === 1}
          style={{
            width: width,
            margin: 0
          }}
        >
          <View style={{ height: height }}>
            <View
              style={{
                backgroundColor: "#fff",
                height: height / 2,
                paddingTop: 20,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                marginTop: height / 2.5,
                paddingHorizontal: 20,
                flex: 1
              }}
            >
              <View
                style={{
                  height: 40,
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 20,
                  flexDirection: "row",
                  paddingHorizontal: 10
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => alert(this.state.store_name)}
                >
                  <View
                    style={{
                      flex: 1.5,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <TakeerIcon
                      iconName="ios-search"
                      iconType="Ionicon"
                      iconSize={30}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <View
                  style={{
                    flex: 8.5,

                    justifyContent: "center"
                  }}
                >
                  <TextInput
                    onChangeText={store_name => this.setState({ store_name })}
                    placeholder="Search store"
                    backgroundColor="#fff"
                    style={{ fontSize: 18 }}
                  />
                </View>
              </View>
              <Text
                style={{ color: "#ecf0f1", fontSize: 18, alignSelf: "center" }}
              >
                We don't be limited
              </Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <FlatList
                  data={this.state.stores}
                  keyExtractor={this.keyExtractorStore}
                  renderItem={this.renderStore}
                  numColumns={1}
                  //ListHeaderComponent={this.catHeader}
                  //stickyHeaderIndices={[0]}
                  showsVerticalScrollIndicator={false}
                  style={{ padding: 1 }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: { height: 110, borderRadius: 10 },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "#10ac84",
    paddingHorizontal: 2
  }
});
const mapStateToProps = state => {
  //console.log(state.dataz.service_type);
  return {
    categories: state.dataz.categories,
    items: state.dataz.items,
    adds: state.dataz.adds
  };
};

export default connect(mapStateToProps)(Home);
