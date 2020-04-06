import React, { Component } from 'react';
import {
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    View
} from 'react-native';

/*

<TakeerBotton
  rippleColor="rgba(1,1,1, 0.1)"
  style={{}}
  onPress={}
  >
</TakeerBotton>
*/

class Button extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if(Platform.OS === 'ios'){
            return (
                <TouchableOpacity 
                onPress={this.props.onPress}
                >
                    <View style={this.props.style}>
                        {this.props.children}
                    </View>
                </TouchableOpacity>
            )
        }else{
            return (
                <TouchableNativeFeedback
                onPress={this.props.onPress} 
                background={TouchableNativeFeedback.Ripple(this.props.rippleColor)}
                >
                    <View style={this.props.style}>
                        {this.props.children}
                    </View>
                </TouchableNativeFeedback>
            );
        }
    }
}
export default Button;