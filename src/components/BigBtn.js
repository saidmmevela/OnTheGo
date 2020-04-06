import React, { Component } from "react";
import { Text, View } from "react-native";
import TakeerButton from "./TakeerButton";
import TakeerIcon from "./TakeerIcon";


export class bigBtn extends Component {
  /*
    props
      btnColor
      btnText
      btnTextColor
      iconColor
      iconName
      iconSize
button must be of ionicon
      <BigBtn
            btnColor="#4ccfee"
            btnText="Jelusalem"
            btnTextColor="#fff"
            btnBorderColor=""
            iconColor=""
            iconName=""
            iconSize={0}
            iconType=""
            clicked={0}/>
            btnStyle={}

            button must be of ionicon button must be of ionicon
      

    */
  render() {
    return (
      <View style={{ marginTop: 5, marginBottom: 2, alignItems: "center" }}>
        <TakeerButton
          onPress={this.props.onPress}
          style={[
            {
              flexDirection: "row",
              justifyContent: "center",
              backgroundColor: this.props.btnColor,
              padding: 10,
              width: "100%",
              borderRadius: 18,
              borderWidth: 1,
              alignItems: "center",
              borderColor: this.props.btnBorderColor
            },
            this.props.btnStyle
          ]}
        >
          <TakeerIcon
            iconName={this.props.iconName}
            iconSize={this.props.iconSize}
            iconColor={this.props.iconColor}
            iconType={this.props.iconType}
          />
          <Text
            style={{
              color: this.props.btnTextColor,
              fontWeight: "bold",
              paddingVertical: 5,
              marginLeft: 5
            }}
          >
            {this.props.btnText}
          </Text>
        </TakeerButton>
      </View>
    );
  }
}

export default bigBtn;
