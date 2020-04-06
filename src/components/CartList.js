import React, { Component } from "react";
import { Text, View, Image, TouchableWithoutFeedback } from "react-native";
import Theme from "../../src/constants/Theme";
import TakeerIcon from "../components/TakeerIcon";
import { connect } from "react-redux";
import { createOrder, removeCartItem } from "../../actions/orderAction";

export class CartList extends Component {
  removeItem = itemid => {
    this.props.removeCartItem(itemid);
  };

  render() {
    const odata = {
      id: Math.floor(Math.random() * 220),
      qty: 1,
      itemid: this.props.id,
      price: this.props.price,
      name: this.props.name
    };
    return (
      <View
        style={{
          height: 80,
          width: "100%",
          backgroundColor: "#dfe6e9",
          marginBottom: 10,
          borderTopLeftRadius: 40,
          borderBottomLeftRadius: 40,
          flexDirection: "row"
        }}
      >
        <Image
          style={{ width: 80, height: 80, borderRadius: 40 }}
          source={{ uri: this.props.image }}
        />
        <View style={{ flex: 4, justifyContent: "center", paddingLeft: 10 }}>
          <Text
            style={{
              fontSize: 20,
              textTransform: "capitalize"
            }}
          >
            {this.props.name}
          </Text>
          <Text style={{}}>TZS {this.props.price}</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => this.removeItem(this.props.itemid)}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TakeerIcon
              iconName="delete-forever"
              iconType="MaterialCommunityIcons"
              iconSize={30}
              iconColor="red"
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createOrder: odata => dispatch(createOrder(odata)),
    removeCartItem: itemid => dispatch(removeCartItem(itemid))
  };
};

export default connect(null, mapDispatchToProps)(CartList);
