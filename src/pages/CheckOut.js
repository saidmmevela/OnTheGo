import React, { Component } from "react";
import {
  Text,
  View,
  Alert,
  ImageBackground,
  Dimensions,
  FlatList,
  Button,
  TouchableWithoutFeedback,
  CheckBox,
  ActivityIndicator,
  Image,
  Timer,
} from "react-native";
import MapView from "react-native-maps";
import NumericInput from "react-native-numeric-input";
import Theme from "../../src/constants/Theme";
import TakeerIcon from "../components/TakeerIcon";
import BigBtn from "../components/BigBtn";
import Modal from "react-native-modal";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import _ from "lodash";
import { connect } from "react-redux";
import { changeQty, completeOrder,createOrder,filterOrder} from "../../actions/orderAction";
import LinearGradient from 'react-native-linear-gradient';
import {Calendar, CalendarList, Agenda,Arrow} from 'react-native-calendars';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { width, height } = Dimensions.get("screen");

let dayName=[
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
]

let monthName=[
  "Jan",
 "Feb",
"Mar",
"Apr",
 "May",
 "Jun",
"Jul",
"Aug",
 "Sept",
 "Oct",
 "Nov",
"Dec",
]

export class CheckOut extends Component {
  state = {
    order_items: [],
    opoint: { latitude: "", longitude: "" },
    dprice: 1500,
    location: {},
    pickPoint:false,
    date:new Date().getDay(),
    tar:new Date().getDate(),
    month:new Date().getMonth(),
    calendar:false,
    currentDate:'',
    timer:false,
    hour:new Date().getHours(),
    minutes:new Date().getMinutes(),
    pickTime:false,
    pickTimeValue:{},
  };

  static navigationOptions={
    headerShown:false
  }
  keyExtractor = item => item.id.toString();

  itemQtyPiker = (qty, oid) => {
    //alert(qty + " its id" + oid);
    const qdata = { qty: qty, oid: oid };
    this.props.changeQty(qdata);
  };

  complete = () => {
    if (this.props.dpoint.longitude == "") {
      Alert.alert("", "Set Delivery Point First");
    }
    else if(this.state.pickTime == false){
      Alert.alert("", "Set Pick Up Time");
    } else {
      if (this.props.order_items.length > 1) {
        //alert("am empy");
        //this.props.navigation.navigate("TrackDerivery");
        this.props.completeOrder();
        this.props.navigation.navigate("TrackDerivery");
      } else {
        //alert("do int");
       // Alert.alert("", "Your have no product to order");
        this.props.navigation.navigate("TrackDerivery");
      }
    }
  };

  ChangeUsafiri=async(item)=>{
    let itemd=this.props.order_items;
    if(item == "boda"){
      console.log("check")
      let dev={
        id:1000,
        qty: 1,
        price: 2500,
        name: "Delivery Cost",
        for:"Boda fee"
      };
     //await itemd.filter(itemd => itemd.id !== dev.id);
    this.props.filterOrder(dev);
   //  itemd.push(dev);

    }
    else{
       console.log("logcheck")
      let dev={
        id:1000,
        qty: 1,
        price: 1500,
        name: "Delivery Cost",
        for:"Baiskeli fee"
      };

     // await itemd.filter(itemd => itemd.id !== dev.id);
     this.props.filterOrder(dev);
     // itemd.push(dev);

    }

  }

  setPickTime=()=>{
    let picker={
      day:dayName[this.state.date],
      date:this.state.tar,
      month:monthName[this.state.month],
      hour:this.state.hour,
      minute:this.state.minutes
    }
    this.setState({pickTimeValue:picker,pickTime:true,pickPoint:false})
  }

  componentDidMount = () => {
    let dev={
      id:1000,
      qty: 1,
      price: 2500,
      name: "Delivery Cost",
      for:"Boda fee"
    };
    let itemd=this.props.order_items;
    const objIndex = itemd.findIndex(
      obj => obj.id === dev.id
    );

    if(objIndex == -1){
      const order_items = this.props.order_items.push(dev);
      this.setState({ order_items });
    }

    
    this._getLocationAsync();
  };

  _getLocationAsync = async () => {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status, permissions } = await Permissions.askAsync(
      Permissions.LOCATION
    );

    if (status === "granted") {
      this.setState({ hasLocationPermissions: true });
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true
      });
      //let location = await Location.getCurrentPositionAsync({});
      //this.setState({ locationResult: JSON.stringify(location) });
      // Center the map on the location we just fetched.

      this.setState({
        opoint: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        },
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      });
    } else {
      alert("Location permission not granted");
    }
  };

  showAdd=(item)=>{
    if(item.name != "Delivery Cost"){
      return(
        <NumericInput
                value={item.qty}
                onChange={qty => this.itemQtyPiker(qty, item.id)}
                totalWidth={100}
                totalHeight={30}
                iconSize={25}
                step={1}
                valueType="real"
                rounded
                textColor="#B0228C"
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor={Theme.COLORS.MAIN}
                leftButtonBackgroundColor={Theme.COLORS.MAIN}
              />
      )
    }
    else{
      return(
        <View style={{ width: 100 }} />
      )
    }
  }

  renderView = ({ item }) => {
    console.log("item new",item);
    const nam = item.name;
    if(this.props.order_items.length > 1){
        return (
          <View
            style={{
              paddingTop: 4,
              //backgroundColor: "#dfe6e9",
              paddingHorizontal: 10,
              paddingVertical: 10
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View style={{ flex: 2 }}>
              {item.name != "Delivery Cost" && <Text style={{ fontSize: 15 }}>{item.name}</Text>}
              {item.name == "Delivery Cost" && <Text style={{ fontSize: 15 }}>{item.for}</Text>}
              </View>
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                {this.showAdd(item)}
                <Text style={{ fontSize: 15, alignSelf: "flex-end" }}>
                  {item.price * item.qty}/=
                </Text>
              </View>
            </View>
          </View>
        );
     }
  };

  setPoint = () => {
    if (this.props.dpoint.longitude == "") {
      return (
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate("DeliveryPoint")}
       
        >
          <View
            style={{
              width: "80%",
              height: 50,
              backgroundColor: "#222f3e",
              alignSelf: "center",
              position: "absolute",
              top: 150,
              borderRadius:15,
              justifyContent:'flex-end',
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 15
            }}
          >
            
            <Text style={{ color: "#fff", fontSize: 18 }}>
              Set your pickup point
            </Text>
            <TouchableWithoutFeedback
               onPress={()=>this.setState({pickPoint:true})}
            >
            <View
              style={{
                padding: 3,
                backgroundColor: "#fff",
                flexDirection: "row",
                alignItems:'center',
                borderRadius:15,
                height:50,
                paddingHorizontal:5,
                marginLeft:10
              }}
            >
             <TakeerIcon
              iconName="md-time"
              iconType="Ionicon"
              iconSize={27}
              iconColor="black"
            /> 
              <Text style={{paddingLeft:5,fontSize:20}}>Now</Text>
              <TakeerIcon
                iconName="chevron-down"
                iconType="Entypo"
                iconSize={30}
                iconColor="black"
              />
            </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (

        <TouchableWithoutFeedback
          onPress={() =>
            this.props.order_items.length == 0
              ? this.props.navigation.navigate("TrackDerivery")
              : Alert.alert("", "Complete Order below")
          }
        >
          <View
            style={{
              width: "80%",
              height: 50,
              backgroundColor: "#222f3e",
              alignSelf: "center",
              position: "absolute",
              top: 150,
              borderRadius:15,
              justifyContent:'flex-end',
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 15
            }}
          >
            
            <Text style={{ color: "#fff", fontSize: 18 }}>
              Track Delivery
            </Text>
            <TouchableWithoutFeedback
              onPress={()=>this.setState({pickPoint:true})}
            >
            <View
              style={{
                padding: 3,
                backgroundColor: "#fff",
                flexDirection: "row",
                alignItems:'center',
                borderRadius:15,
                height:50,
                paddingHorizontal:5,
                marginLeft:30
              }}
            >
            <TakeerIcon
              iconName="md-time"
              iconType="Ionicon"
              iconSize={27}
              iconColor="black"
            /> 
              <Text style={{paddingLeft:5,fontSize:20}}>Now</Text>
              <TakeerIcon
                iconName="chevron-down"
                iconType="Entypo"
                iconSize={30}
                iconColor="black"
              />
            </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  };

  topMap = () => {
    
    return (
      <View>
        {this.state.opoint.latitude != "" && (
          <View style={{ height: height / 2.5, width}}>
            <MapView
              initialRegion={{
                latitude: this.state.opoint.latitude,
                longitude: this.state.opoint.longitude,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0121
              }}
              style={{ flex: 1 }}
            >
              <MapView.Marker
                coordinate={this.state.opoint}
                title={"Delivery"}
                description={"You are here"}
              />
            </MapView>
          </View>
        )}
        {this.state.opoint.latitude == "" && (
          <View style={{ height: height / 2.5, width,alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicator size={50} color="#009738" />
          </View>
        )}
        {this.setPoint()}
        <Text style={{color:'#AAA',fontSize:20,alignSelf:'center',marginTop:10}}>Changua usafiri</Text>
        <View
            style={{
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'center',
              width:'100%'
            }}
        >
             <View
                style={{
                  width: width / 3 - 8,
                  height: width / 3 - 8,
                  paddingLeft: 20,
                  paddingVertical: 10,
                  borderRadius: 10
                }}
              >
                <TouchableWithoutFeedback
                  //onPress={() => this.props.showStoreModal(this.props.name)}
                  onPress={()=>this.ChangeUsafiri("baiskeli")}
                >
                  <LinearGradient
                    colors={["#0FB47C", "#0FB47C"]}
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5
                    }}
                  >
                    <View
                      style={{
                        height: "25%",
                        width: "100%",
                        backgroundColor: "#fff",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        justifyContent:'center',
                        alignItems:'center'
                      }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 17,
                          //alignSelf: "center",
                          paddingVertical: 0,
                          fontWeight: "bold"
                        }}
                      >
                        baiskel
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        position: "absolute",
                        bottom: "20%",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Image
                        style={{ width: 70, height: 70,}}
                        source={require("../../assets/images/byc.png")}
                      />
                    </View>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>

              <View
                style={{
                  width: width / 3 - 8,
                  height: width / 3 - 8,
                  paddingLeft: 20,
                  paddingVertical: 10,
                  borderRadius: 10
                }}
              >
                <TouchableWithoutFeedback
                  //onPress={() => this.props.showStoreModal(this.props.name)}
                  onPress={()=>this.ChangeUsafiri("boda")}
                >
                  <LinearGradient
                    colors={["#0FB47C", "#0FB47C"]}
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5
                    }}
                  >
                    <View
                      style={{
                        height: "25%",
                        width: "100%",
                        backgroundColor: "#fff",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        justifyContent:'center',
                        alignItems:'center'
                      }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 17,
                          //alignSelf: "center",
                          paddingVertical: 0,
                          fontWeight: "bold"
                        }}
                      >
                        boda
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        position: "absolute",
                        bottom: "20%",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Image
                        style={{ width: 70, height: 70,}}
                        source={require("../../assets/images/motor.png")}
                        resizeMode="contain"
                      />
                    </View>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>

        </View>
        <View
          style={{
            paddingTop: 4,
            //backgroundColor: "#dfe6e9",
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginTop: 20,
            borderBottomColor: "#000",
            borderBottomWidth: 1
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Items</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Amounts</Text>
          </View>
        </View>
      </View>
    );
  };
  bottomPart = () => {
    return (
      <View>
        <View
          style={{
            paddingTop: 4,

            //backgroundColor: "#dfe6e9",
            paddingHorizontal: 10,
            borderColor: "#000",
            borderWidth: 1,
            paddingVertical: 10
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Total</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {this.props.order_items.length > 1? this.props.total:0}/=
            </Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: 15,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 22 }}>
            Cash on delivery
          </Text>
          <CheckBox value={true} disabled={true} />
        </View>
        <View style={{ paddingBottom: 15 }}>
          <BigBtn
            btnColor={Theme.COLORS.MAIN}
            btnText="ORDER"
            btnTextColor="#fff"
            btnBorderColor={Theme.COLORS.MAIN}
            iconColor=""
            iconName=""
            iconSize={0}
            onPress={() => this.complete()}
            btnStyle={{ padding: 0, width: "40%" }}
          />
        </View>
      </View>
    );
  };

  showCalender=()=>{
    if(this.state.calendar==true){
     
      return(
       
        <View
            style={{
              position:'absolute',
              top:0,
              bottom:0,
              right:0,
              left:0,
             // alignItems:'center',
              //justifyContent:'center',
             // padding:20,
              backgroundColor:'rgba(0,0,0,0.5)'
            }}
        >
           <TouchableWithoutFeedback
            onPress={()=>this.setState({calendar:false,pickPoint:true})}
            >
            <View
                style={{flex:1}}
            />
            </TouchableWithoutFeedback>
            <Calendar
              // Initially visible month. Default = Date()
              //current={'2012-03-01'}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
             // minDate={'2012-05-10'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
             // maxDate={'2012-05-30'}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={(day) => this.setState({
                tar:day.day,
                month:day.month -1,
                calendar:false,
                pickPoint:true,
                date:new Date(day.dateString).getDay(),
              },()=>{
                console.log("day.day",day.day);
                console.log("day.month",day.month);
              })}
              // Handler which gets executed on day long press. Default = undefined
              onDayLongPress={(day) => {console.log('selected day', day)}}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat={'yyyy MM'}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={(month) => {console.log('month changed', month)}}
              // Hide month navigation arrows. Default = false
              hideArrows={false}
              // Replace default arrows with custom ones (direction can be 'left' or 'right')
              //renderArrow={(direction) => (<Arrow/>)}
             
              
               renderArrow={(direction) => (
              <TakeerIcon
                iconName={direction}
                iconType="AntDesign"
                iconSize={27}
                iconColor="black"
              /> )}
             
              // Do not show days of other months in month page. Default = false
              hideExtraDays={true}
              // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              disableMonthChange={false}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
              firstDay={1}
              // Hide day names. Default = false
              hideDayNames={false}
              // Show week numbers to the left. Default = false
              showWeekNumbers={false}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={substractMonth => substractMonth()}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
              // Disable left arrow. Default = false
              disableArrowLeft={false}
              // Disable right arrow. Default = false
              disableArrowRight={false}
              style={{
                width
              }}

            />
            <TouchableWithoutFeedback
            onPress={()=>this.setState({calendar:false,pickPoint:true})}
            >
            <View
                style={{flex:1}}
            />
            </TouchableWithoutFeedback>
        </View>
      )
    }
  }

  handleConfirm = (time) => {
    console.log("hours: ", time.getHours());
    console.log("minutes: ", time.getMinutes());
    this.setState({hour:time.getHours(),minutes:time.getMinutes()})
    this.hideDatePicker();
  };
 
  showDatePicker = () => {
    this.setState({timer:true})
  };
 
  hideDatePicker = () => {
    this.setState({timer:false})
  };

  

  render() {
    return (
      <View style={{ marginTop: 24, flex: 1, backgroundColor: "#fff" }}>
         <Modal
          //coverScreen={false}
          onBackdropPress={() => this.setState({ pickPoint: false })}
          isVisible={this.state.pickPoint}
          style={{
            width: width,
            margin: 0
          }}
        >
         <View style={{ height }}>
           <TouchableWithoutFeedback
              onPress={()=>this.setState({pickPoint:false})}
           >
           <View
              style={{
                height:height/2
              }}
           />
           </TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: "#fff",
                flex:1
              }}
            >
              <View
                style={{
                  height:(height/2)/4.5,
                  borderBottomWidth: 1,
                  borderBottomColor:'rgba(0,0,0,0.05)',
                  alignItems:'center',
                  justifyContent:'center'
                }}
              >
                <Text style={{fontSize:25,color:'black',}}>Shedule a delivery</Text>
              </View>
              <TouchableWithoutFeedback
                  onPress={()=>this.setState({calendar:true,})}
              >
              <View
                style={{
                  height:(height/2)/4.5,
                  borderBottomWidth: 1,
                  borderBottomColor:'rgba(0,0,0,0.05)',
                  alignItems:'center',
                  justifyContent:'center'
                }}
              >
                <Text style={{fontSize:20,color:'black',}}>{dayName[this.state.date]} {this.state.tar} {monthName[this.state.month]}</Text>
              </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={()=>this.setState({timer:true})}
              >
              <View
                style={{
                  height:(height/2)/4.5,
                  borderBottomWidth: 1,
                  borderBottomColor:'rgba(0,0,0,0.05)',
                  alignItems:'center',
                  justifyContent:'center'
                }}
              >
                <Text style={{fontSize:20,color:'black',}}>{this.state.hour}:{this.state.minutes}</Text>
              </View>
              </TouchableWithoutFeedback>
              <View
                style={{
                  flex:1,
                  alignItems:'center',
                  justifyContent:'center'
                }}
              >
                <TouchableWithoutFeedback
                   onPress={this.setPickTime}
                >
                <View
                   style={{
                     width:'85%',
                     height:50,
                     alignItems:'center',
                     justifyContent:'center',
                     backgroundColor:'black',
                     borderRadius:2

                   }}
                >
                    <Text style={{fontSize:20,color:'white',}}>SET PICK-UP TIME</Text>
                </View>
                </TouchableWithoutFeedback>
              </View>
              
              
            </View>
          </View>
        </Modal>

        <Modal
          //coverScreen={false}
          onBackdropPress={() => this.setState({ calendar: false })}
          isVisible={this.state.calendar}
          style={{
            width: width,
            margin: 0
          }}
        >
            <TouchableWithoutFeedback
            onPress={()=>this.setState({calendar:false})}
            >
            <View
                style={{flex:1}}
            />
            </TouchableWithoutFeedback>
            <Calendar
              // Initially visible month. Default = Date()
              //current={'2012-03-01'}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
             // minDate={'2012-05-10'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
             // maxDate={'2012-05-30'}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={(day) => this.setState({
                tar:day.day,
                month:day.month -1,
                calendar:false,
                date:new Date(day.dateString).getDay(),
              },()=>{
                console.log("day.day",day.day);
                console.log("day.month",day.month);
              })}
              // Handler which gets executed on day long press. Default = undefined
              onDayLongPress={(day) => {console.log('selected day', day)}}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat={'yyyy MM'}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={(month) => {console.log('month changed', month)}}
              // Hide month navigation arrows. Default = false
              hideArrows={false}
              // Replace default arrows with custom ones (direction can be 'left' or 'right')
              //renderArrow={(direction) => (<Arrow/>)}
             
              
               renderArrow={(direction) => (
              <TakeerIcon
                iconName={direction}
                iconType="AntDesign"
                iconSize={27}
                iconColor="black"
              /> )}
             
              // Do not show days of other months in month page. Default = false
              hideExtraDays={true}
              // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              disableMonthChange={false}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
              firstDay={1}
              // Hide day names. Default = false
              hideDayNames={false}
              // Show week numbers to the left. Default = false
              showWeekNumbers={false}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={substractMonth => substractMonth()}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
              // Disable left arrow. Default = false
              disableArrowLeft={false}
              // Disable right arrow. Default = false
              disableArrowRight={false}
              style={{
                width
              }}

            />
            <TouchableWithoutFeedback
            onPress={()=>this.setState({calendar:false,})}
            >
            <View
                style={{flex:1}}
            />
            </TouchableWithoutFeedback>
        </Modal>
          
         <DateTimePickerModal
          isVisible={this.state.timer}
          mode="time"
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
        />


        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              height: "100%",
              alignItems: "center"
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.goBack()}
            >
              <View
                style={{
                  width: 45,
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TakeerIcon
                  iconName="ios-arrow-back"
                  iconType="Ionicons"
                  iconColor="#000"
                  iconSize={25}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text style={{ paddingLeft: 30, fontSize: 20 }}>
              Complete Your Order
            </Text>
          </View>
        </View>
        <View style={{ flex: 9, paddingHorizontal: 10 }}>
          <View style={{}}>
            <FlatList
              data={this.props.order_items}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderView}
              numColumns={1}
              ListHeaderComponent={this.topMap()}
              ListFooterComponent={this.bottomPart}
              //stickyHeaderIndices={[0]}
              showsVerticalScrollIndicator={false}
              style={{ padding: 1 }}
            />
          </View>
        </View>
        
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeQty: qdata => dispatch(changeQty(qdata)),
    completeOrder: () => dispatch(completeOrder()),
    filterOrder: (dev) => dispatch(filterOrder(dev)),
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
