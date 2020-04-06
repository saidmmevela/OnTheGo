import React, { Component } from 'react';


/*
<TakeerIcon
iconType=""
iconName=""
iconSize={20}
iconColor=""
/>
*/

//importing icons
import I from 'react-native-vector-icons/Ionicons';
import En from 'react-native-vector-icons/Entypo';
import Ev from 'react-native-vector-icons/EvilIcons';
import F from 'react-native-vector-icons/FontAwesome';
import F5 from 'react-native-vector-icons/FontAwesome5';
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import M from 'react-native-vector-icons/MaterialIcons';
import S from 'react-native-vector-icons/SimpleLineIcons';
import Z from 'react-native-vector-icons/Zocial';
import O from 'react-native-vector-icons/Octicons';
import A from 'react-native-vector-icons/AntDesign';
import Fe from 'react-native-vector-icons/Feather';
import Fa from 'react-native-vector-icons/Foundation';
import { View } from 'react-native';

class TakeerIcon extends Component {
    constructor(props){
        super(props)
    }

    iconName(){
        return this.props.iconName;
    }

    iconSize(){
        return this.props.iconSize;
    }

    iconColor(){
        return this.props.iconColor;
    }

    renderIcon(){
        if(this.props.iconType == "Ionicons"
        || this.props.iconType == "Entypo"
        || this.props.iconType == "EvilIcons"
        || this.props.iconType == "FontAwesome"
        || this.props.iconType == "MaterialCommunityIcons"
        || this.props.iconType == "MaterialIcons"
        || this.props.iconType == "Octicons"
        || this.props.iconType == "SimpleLineIcons"
        || this.props.iconType == "Feather"
        || this.props.iconType == "Foundation"
        || this.props.iconType == "FontAwesome5"
        || this.props.iconType === "AntDesign"
        || this.props.iconType == "Zocial"){
            if(this.props.iconType == "Ionicons"){
                return (
                    <I name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )
            }
            else if(this.props.iconType == "Octicons"){
                return (
                    <O name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )                
            }
            else if(this.props.iconType == "FontAwesome5"){
                return (
                    <F5 name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )  
            }
            else if(this.props.iconType == "EvilIcons"){
                return (
                    <Ev name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )                
            }
            else if(this.props.iconType == "Entypo"){
                return (
                    <En name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )    
            }
            else if(this.props.iconType == "FontAwesome"){
                return (
                    <F name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )    
            }
            else if(this.props.iconType == "MaterialCommunityIcons"){
                return (
                    <Mc name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                ) 
            }
            else if(this.props.iconType == "MaterialIcons"){
                return (
                    <M name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )  
            }
            else if(this.props.iconType == "SimpleLineIcons"){
                return (
                    <S name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )   
            }

            else if(this.props.iconType == "Feather"){
                return (
                    <Fe name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )   
            }
            else if(this.props.iconType == "Foundation"){
                return (
                    <Fa name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )   
            }

            else if(this.props.iconType == "Zocial"){
                return (
                    <Z name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                ) 
            }

            else if(this.props.iconType == "AntDesign"){
                return (
                    <A name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                ) 
            }

            else {
                return null;
            }
        }else{
            //fall back to Ionicons
            return (
                <I name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
            )
        }
    }

    render() {
        return (
           
            this.renderIcon()
          
        );
    }
}

export default TakeerIcon;
