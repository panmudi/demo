import React , {Component} from 'react';
import { StyleSheet,
    Text,
    View,
    Button,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    TouchableNativeFeedback,
    TextInput,
    NetInfo

} from 'react-native';

import {setSpText,scaleSize} from '../util/px2dp';
import NavigationBarM from '../common/NavigationBarM';

import NetWorkTool from "../util/NetWorkTool";


import Picker from 'react-native-picker';
import area from '../../res/data/area.json';

import SplashScreen from "rn-splash-screen";




export default class Demo extends Component{

    constructor(props) {
        super(props);
        NetWorkTool.checkNetworkState((isConnected)=>{
            if(!isConnected){
                alert(NetWorkTool.NOT_NETWORK);
            }else{
                alert('有网络');
            }
        });
    }

    handleMethod(isConnected){
    }

    componentDidMount(){
        SplashScreen.hide();
        // NetInfo.fetch().done((reach) => {
        //       alert(reach);
        // });
        this.handleMethod();
    }

    componentWillMount() {
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    }

    componentWillUnmount() {
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    }


    render() {
        return (
            <View >

               <Text>11</Text>
                <Image  source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                        style={{width: 400, height: 400}} />
            </View>

        );
    }
}


















// export default class Demo extends Component{
//     // static navigationOptions = {
//     //     title: '关于我们',
//     //     headerTintColor: '#333',
//     //     headerTitleStyle: {
//     //         fontWeight: 'normal',
//     //         fontSize:scaleSize(32),
//     //     },
//     // };
//     constructor(props){
//         super(props);
//         this.state = {
//             isLoading: true
//         };
//     }
//
//     componentDidMount(){
//         SplashScreen.hide();
//         NetInfo.fetch().done((reach) => {
//               alert(reach);
//         });
//     }
//
//     renderButton(image){
//         return <TouchableOpacity
//             style={{padding: 8}}
//             onPress={()=>{
//                 NavigatorUtil.goBack(this.props.navigation);
//             }}>
//             <Image
//                 style={{width:scaleSize(36), height:scaleSize(34)}}
//                 source={image}/>
//         </TouchableOpacity>;
//     }
//
//     _createAreaData() {
//         let data = [];
//         let len = area.length;
//         for(let i=0;i<len;i++){
//             let city = [];
//             for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
//                 let _city = {};
//                 _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
//                 city.push(_city);
//             }
//
//             let _data = {};
//             _data[area[i]['name']] = city;
//             data.push(_data);
//         }
//         return data;
//     }
//
//     _showAreaPicker() {
//         console.log(this._createAreaData());
//         Picker.init({
//             pickerData: this._createAreaData(),
//             pickerConfirmBtnText:'保存',
//             pickerCancelBtnText:'取消',
//             pickerTitleText:'',
//             pickerConfirmBtnColor:[51,51,51,1],
//             pickerCancelBtnColor:[51,51,51,1],
//             selectedValue: ['河北', '唐山', '古冶区'],
//             pickerToolBarFontSize:14,
//             onPickerConfirm: pickedValue => {
//                 console.log('area', pickedValue);
//             },
//             onPickerCancel: pickedValue => {
//                 // console.log('area', pickedValue);
//             },
//             onPickerSelect: pickedValue => {
//                 //Picker.select(['山东', '青岛', '黄岛区'])
//                 // console.log('area', pickedValue);
//             }
//         });
//         Picker.show();
//     }
//
//     _createDateData() {
//         let date = [];
//         for(let i=1970;i<2020;i++){
//             let month = [];
//             for(let j = 1;j<13;j++){
//                 month.push(j+'月');
//             }
//             let _date = {};
//             _date[i+'年'] = month;
//             date.push(_date);
//         }
//         return date;
//     }
//
//     _showDatePicker() {
//         console.log(this._createDateData());
//         Picker.init({
//             pickerData: this._createDateData(),
//             pickerConfirmBtnText:'保存',
//             pickerCancelBtnText:'取消',
//             pickerTitleText:'',
//             pickerConfirmBtnColor:[51,51,51,1],
//             pickerCancelBtnColor:[51,51,51,1],
//             pickerToolBarFontSize:14,
//             onPickerConfirm: (pickedValue, pickedIndex) => {
//                 console.log('date', pickedValue, pickedIndex);
//             },
//             onPickerCancel: (pickedValue, pickedIndex) => {
//                 console.log('date', pickedValue, pickedIndex);
//             },
//             onPickerSelect: (pickedValue, pickedIndex) => {
//                 console.log('date', pickedValue, pickedIndex);
//             }
//         });
//         Picker.show();
//     }
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <NavigationBarM
//                     title='关于我们'
//                     style={{backgroundColor:'#FFF'}}
//
//                 />
//                <Text>11</Text>
//
//                 <TouchableOpacity style={{marginTop: 10, marginLeft: 20}} onPress={this._showAreaPicker.bind(this)}>
//                     <Text>AreaPicker</Text>
//                 </TouchableOpacity>
//
//                 <TouchableOpacity style={{marginTop: 40, marginLeft: 20}} onPress={this._showDatePicker.bind(this)}>
//                     <Text>DatePicker</Text>
//                 </TouchableOpacity>
//
//                 <Image  source={{uri: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2409907048,3191312919&fm=27&gp=0.jpg'}}
//                         style={{width: 400, height: 400}} />
//             </View>
//
//         );
//     }
// }
//
const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'#f5f5f5',
        },
        aboutBox:{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
        },
    }
)


//
// import SplashScreen from "rn-splash-screen";
// import React, {Component} from 'react';
// import QRScannerView from "../util/QRScanner";
// import {Text,Image,View} from 'react-native';
//
// export default class DefaultScreen extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoading: true
//         };
//     }
//
//     componentDidMount() {
//         global.setTimeout(() => {
//             this.setState({isLoading: false});
//         }, 1000);
//     }
//
//     componentDidUpdate() {
//         if (!this.state.isLoading) {
//             // Hide splash screen
//             SplashScreen.hide();
//         }
//     }
//
//     render() {
//         return (
//             <QRScannerView
//                 onScanResultReceived={this.barcodeReceived.bind(this)}
//
//                 renderTopBarView={() => this._renderTitleBar()}
//
//                 renderBottomMenuView={() => this._renderMenu()}
//             />
//
//         )
//     }
//
//     _renderTitleBar() {
//         return (
//             <View>
//                 <Text
//                     style={{color: 'white', textAlignVertical: 'center', textAlign: 'center', font: 20, padding: 12}}
//                 >Here is title bar</Text>
//
//             </View>
//
//         );
//     }
//
//     _renderMenu() {
//         return (
//             <Text
//                 style={{color: 'white', textAlignVertical: 'center', textAlign: 'center', font: 20, padding: 12}}
//             >Here is bottom menu</Text>
//         )
//     }
//
//     barcodeReceived(e) {
//         alert('Type: ' + e.type + '\nData: ' + e.data);
//
//     }
// }

