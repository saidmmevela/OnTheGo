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

import Theme from "../../src/constants/Theme";
import TakeerIcon from "../components/TakeerIcon";
import Modal from "react-native-modal";
import _ from "lodash";

import ItemList from "../components/ItemList";
import CartList from "../components/CartList";

import { connect } from "react-redux";

const { width, height } = Dimensions.get("screen");

export class ProductList extends Component {
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
  keyExtractorStore = item => item.id.toString();
  keyExtractorCart = item => item.id.toString();
  keyExtractorSub_Cat = item => item.name.toString();

  componentDidMount = () => {
    ///receive category name from props
    const { navigation } = this.props;
    const dataz = navigation.getParam("dataz");
    ///setstates
    
    console.log("params props", dataz);
    console.log("params props items", dataz.items[0]);
   // console.log("sub_items",dataz.category[0].sub_cats);
    this.state.sub_cats.push(dataz.items[0]);
    this.setState({
      category: dataz.category,
      items: dataz.items,
     // storename: dataz.storename,
      sub_items: dataz.items,
     // sub_cats:  dataz.items,
    });
  };

  filterSubCat = sub_name => {
    ///filter items by category
    const items = this.state.items;
    let sub_cats = items.filter((v) => v.store == sub_name);
    
    this.setState({ sub_cats });
  };

  filterStore = store => {
    this.setState({ filterModal: null });

    const items = this.state.items;
    var new_items = (items || []).filter(function(item) {
      return item.store.includes(store);
    });

    this.setState({ sub_items: new_items });
  };

  renderStore = ({ item }) => {
    return (
      <View style={{ paddingBottom: 6 }}>
        <TouchableWithoutFeedback onPress={() => this.filterStore(item.store)}>
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

  ListEmpty = () => {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <TakeerIcon
          iconName="shopping-cart"
          iconType="FontAwesome"
          iconSize={100}
        />
        <Text>Empty</Text>
      </View>
    );
  };

  renderCart = ({ item }) => {
    if(item.name != "Delivery Cost"){
      return (
        <View style={{ paddingBottom: 6 }}>
          <CartList
            navigation={this.props.navigation}
            name={item.name}
            itemid={item.itemid}
            image={item.image}
            id={item.id}
            price={item.price}
          />
        </View>
      );
    }
  };

  renderView = ({ item }) => {
    console.log("before item",item)
    return (
      <View>
        <ItemList
          navigation={this.props.navigation}
          name={item.name}
          cat_name={item.cat_name}
          image={item.image}
          id={item.id}
          price={item.price}
        />
      </View>
    );
  };

  searchBar = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          alignItems:'center',
          marginBottom:15
        }}
      >
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}
          >
            <View
              style={{
                //width: 45,
                alignItems: "center"
              }}
            >
              <TakeerIcon
                iconName="chevron-thin-left"
                iconType="Entypo"
                iconSize={30}
                iconColor="black"
              />
            </View>
          </TouchableWithoutFeedback>
       
        <View
          style={{
            flex: 1,
            height: 35,
            borderColor: "#000",
            borderWidth: 1,
            borderRadius: 20,
            flexDirection: "row",
            paddingHorizontal:10,
           // marginBottom: 10,
            alignItems:'center'
          }}
        >
          
              <TakeerIcon
                iconName="ios-search"
                iconType="Ionicon"
                iconSize={30}
              />
          
            <TextInput
              onChangeText={store_name => this.setState({ store_name })}
              placeholder="Search store"
              backgroundColor="#fff"
              style={{ fontSize: 15,marginLeft:10,width:'90%',height:30, }}
            />
        </View>
      </View>
    );
  };

  renderSub_Cat = ({ item }) => {
   // console.log("sub_items",item);
   if(item == this.state.sub_cats[0]){
        return (
          <TouchableWithoutFeedback onPress={() => this.filterSubCat(item.store)}>
            <View
              style={{
                height: "70%",
                width: width / 3,
                marginRight: 8,
                backgroundColor:"#dfe6e9",
                borderRadius: 10,
                justifyContent: "center",
                paddingHorizontal:10,
              }}
            >
              <Text
                style={{
                  textTransform: "capitalize",
                  fontSize: 16,
                  textAlign: "center",
                  color: "black"
                }}
              >
                {item.store}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
    }
    else{
      return (
        <TouchableWithoutFeedback onPress={() => this.filterSubCat(item.store)}>
          <View
            style={{
              height: "70%",
              width: width / 3,
              marginRight: 8,
              backgroundColor: Theme.COLORS.MAIN,
              borderRadius: 10,
              justifyContent: "center",
              paddingHorizontal:10,
            }}
          >
            <Text
              style={{
                textTransform: "capitalize",
                fontSize: 16,
                textAlign: "center",
                color: "#fff"
              }}
            >
              {item.store}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  };
  render() {
    console.log("item2",this.props.item_nump)
    return (
      <View style={{ marginTop: 24, flex: 1, backgroundColor: "#fff" }}>
        <StatusBar hidden={false} />

        {/*this filter item modal////////////////////////*/}
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
                      iconColor="black"
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

        {/*remove item in cart modal////////////////////////*/}
        <Modal
          //coverScreen={false}
          onBackdropPress={() => this.setState({ removeModal: null })}
          isVisible={this.state.removeModal === 1}
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
                paddingHorizontal: 10,
                flex: 1
              }}
            >
              <View
                style={{
                  paddingHorizontal: 10
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 10
                  }}
                >
                  Items in Cart({this.props.item_num -1})
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <FlatList
                  data={this.props.order_items}
                  keyExtractor={this.keyExtractorCart}
                  renderItem={this.renderCart}
                  numColumns={1}
                  //ListHeaderComponent={this.catHeader}
                  //stickyHeaderIndices={[0]}
                  ListEmptyComponent={this.ListEmpty}
                  showsVerticalScrollIndicator={false}
                  style={{ padding: 1 }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <View
          style={{
            flex: 2,
            flexDirection: "row",
            paddingTop: "5%"
          }}
        >
          <View style={{ flex: 1 }}>
            {this.searchBar()}
           {/* <View style={{ flex: 1, marginLeft: 40 }}>*/}
              <FlatList
                data={this.state.sub_items}
                keyExtractor={this.keyExtractorSub_Cat}
                renderItem={this.renderSub_Cat}
                horizontal={true}
                // ListHeaderComponent={this.searchBar}
                //stickyHeaderIndices={0}
                showsHorizontalScrollIndicator={false}
                style={{ paddingLeft:15}}
                contentContainerStyle={{paddingRight:10}}
              />
           {/* </View>*/}
          </View>
        </View>

        <View
          style={{
            flex: 8,
            backgroundColor: "#fff"
          }}
        >
         {/* <View
            style={{
              flex: 8.5,
              marginLeft: 40,
              marginRight: 10
            }}
          >*/}
            <FlatList
              data={this.state.sub_cats}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderView}
              numColumns={1}
              //ListHeaderComponent={this.catHeader}
              //stickyHeaderIndices={[0]}
              showsVerticalScrollIndicator={false}
              style={{ paddingHorizontal:15}}
            />
         {/* </View>*/}
          
        </View>
        
          
        <View
            style={{
              position:'absolute',
              bottom:20,
              right:20,
              flexDirection: "row",
              //justifyContent: "flex-end",
             // marginRight: 15
            }}
          >
            <TouchableWithoutFeedback
              //onPress={() => this.setState({ removeModal: 1 })}
            >
              <View style={[styles.bottomBtn,{borderColor:Theme.COLORS.CALL}]}>
                <TakeerIcon
                  iconName="call"
                  iconType="MaterialIcons"
                  iconSize={22}
                  iconColor={Theme.COLORS.CALL}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ removeModal: 1 })}
            >
              <View style={styles.bottomBtn}>
                <TakeerIcon
                  iconName="shopping-cart"
                  iconType="FontAwesome"
                  iconSize={22}
                  iconColor="black"
                />
                <Text style={styles.num_cart}>
                  {this.props.item_nump.findIndex(obj => obj.id === 1000) == -1? this.props.item_num:this.props.item_num -1}</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate("CheckOut")}
            >
              <View style={styles.btnCheckout}>
                <Text style={styles.checkout}>Checkout</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomBtn: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 15,
    height: 45,
    width: 45
  },
  btnCheckout: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginLeft: 15,
    height: 45,
    paddingHorizontal: 8,
    backgroundColor: Theme.COLORS.MAIN
  },
  checkout: {
    color: "#fff",
    fontSize: 18
  },
  num_cart: {
    position: "absolute",
    top: 0,
    right: 4,
    color: "#000",
    fontWeight: "bold"
  }
});

const mapStateToProps = state => {
  //console.log(state.dataz.service_type);
  return {
    items: state.dataz.items,
    order_items: state.dataz.order_items,
    item_num: state.dataz.order_items.length,
    item_nump: state.dataz.order_items,
    categories: state.dataz.categories
  };
};

export default connect(mapStateToProps)(ProductList);
