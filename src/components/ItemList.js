import React, { Component } from "react";
import { Text, View, Image, TouchableWithoutFeedback } from "react-native";
import Theme from "../../src/constants/Theme";
import TakeerIcon from "../components/TakeerIcon";
import { connect } from "react-redux";
import { createOrder } from "../../actions/orderAction";

export class ItemList extends Component {
  addOrder = odata => {
    this.props.createOrder(odata);
  };

  showAdd=(odata)=>{
    let itemd=this.props.order_items;
    const objIndex = itemd.findIndex(
      obj => obj.itemid === odata.itemid
    );
    console.log("check if",objIndex);
    //console.log("check itemd",itemd);
    console.log("check odata",odata);
    if(objIndex == -1){
      return(
        <TouchableWithoutFeedback onPress={() => this.addOrder(odata)}>
            <View
                style={{
                  alignItems:'center',
                }}
            >
              <Text
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius:3,
                  paddingHorizontal: 20,
                }}
              >
                Add
              </Text>
            </View>
          </TouchableWithoutFeedback>
      )
    }
    else{
      return(
        
            <View
                style={{
                  alignItems:'center',
                }}
            >
              <Text
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius:3,
                  paddingHorizontal: 20,
                }}
              >
                <TakeerIcon
                  iconName="md-checkmark"
                  iconType="Ionicons"
                  iconColor="#000"
                  iconSize={20}
                />
              </Text>
            </View>
        
      )
    }
  }

  render() {
    const odata = {
      id: Math.floor(Math.random() * 220),
      qty: 1, 
      itemid: this.props.id,
      price: this.props.price,
      name: this.props.name,
      image: this.props.image
    };
    return (
      <View
        style={{
          height: 80,
          width: "100%",
          backgroundColor: "#dfe6e9",
          marginBottom: 10,
          borderRadius: 10,
          flexDirection: "row",
          paddingRight: 6,
          alignItems: "center",
          elevation: 5
        }}
      >
        <Image
          style={{ width: 80, height: 80, borderRadius: 10 }}
          source={{ uri: this.props.image }}
        />
        <View
           style={{
             flexDirection:'row',
             justifyContent:'space-between',
             paddingHorizontal:10,
             width:'80%',
           }}
        >
          <View>
            <Text
              style={{
                fontSize: 20,
                textTransform: "capitalize"
              }}
            >
              {this.props.name}
            </Text>
            <Text style={{color:'#AAA'}}>TZS {this.props.price}/=</Text>
          </View>
          {this.showAdd(odata)}
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createOrder: odata => dispatch(createOrder(odata))
  };
};

const mapStateToProps = state => {
  return {
    order_items: state.dataz.order_items,
    total: state.dataz.order_items.reduce(
      (prev, cur) => prev + cur.qty * cur.price,
      0
    ),
    dpoint: state.dataz.dpoint
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);

{/*
const mapStateToProps = (state) => ({
  app: state.app
});
export default connect(mapStateToProps,createOrder)(ItemList);
*/}