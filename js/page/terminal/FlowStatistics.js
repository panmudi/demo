import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    TouchableNativeFeedback,
    TextInput, Platform
} from 'react-native';

import {setSpText,scaleSize} from '../../util/px2dp';
import NavigatorUtil from "../../util/NavigatorUtil";
import NavigationBarM from '../../common/NavigationBarM';
import {API, VERSION} from "../../common/Const";
import {Toast} from "antd-mobile-rn/lib/index.native";
import HttpUtil from "../../util/HttpUtil";
import {Button,List,ListItem} from 'react-native-elements';
import Picker from "react-native-picker/index";
import moment from "moment/moment";

const {width,height}=Dimensions.get('window');
const list = [
    {
        name: '普通收款',
        subtitle: '2018-06-20',
        price:'+1300.00',
        labelIcon:require('../../../res/images/count/count_10.png'),
    },
    {
        name: '花呗收款',
        subtitle: '2018-06-20',
        price:'+130.00',
        labelIcon:require('../../../res/images/count/huabei.png'),
    },
    {
        name: '储蓄卡收款',
        subtitle: '2018-06-20',
        price:'+1250.00',
        labelIcon:require('../../../res/images/count/bank.png'),
    },
]

moment().format('YYYY-MM-DD HH:mm:ss')
let now   = new Date();
var navigation = null;
export default class FlowStatistics extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
        navigation = this.props.navigation;  //调用组件
    }
    renderButton(image){
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={()=>{
                NavigatorUtil.goBack(this.props.navigation);
            }}>
            <Image
                style={{width:scaleSize(36), height:scaleSize(34)}}
                source={image}/>
        </TouchableOpacity>;
    }

    componentDidMount() {
        this.setState({
            year:now.getUTCFullYear()+'年',
            month:(now.getMonth()+1)+'月',
        });
    }

    //时间选择
    _createDateData() {
        let monthn = now.getMonth()+2;
        let yearn  = now.getUTCFullYear()+1;
        let date = [];
        for(let i=1970;i<yearn;i++){
            let month = [];
            if(i===(yearn-1)){
                for(let j = 1;j<monthn;j++){
                    month.push(j+'月');
                }
            }else{
                for(let j = 1;j<13;j++){
                    month.push(j+'月');
                }
            }

            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }

    _showDatePicker() {
        let _this = this;
        Picker.init({
            pickerData: this._createDateData(),
            pickerConfirmBtnText:'确定',
            pickerCancelBtnText:'取消',
            pickerTitleText:'',
            selectedValue: [this.state.year, this.state.month],
            pickerConfirmBtnColor:[51,51,51,1],
            pickerCancelBtnColor:[51,51,51,1],
            pickerToolBarFontSize:14,
            onPickerConfirm: (pickedValue, pickedIndex) => {
                _this.state.dateStr = pickedValue[0] + pickedValue[1];
                let month = pickedValue[1].replace('月','');
                if (month.length === 1) {
                    month = '0'+month;
                }
                _this.state.dateTime = pickedValue[0].replace('年','')+'-'+month;
            },
            onPickerCancel: (pickedValue, pickedIndex) => {

            },
            onPickerSelect: (pickedValue, pickedIndex) => {

            }
        });
        Picker.show();
    }

    render() {

        return (
            <View style={styles.container}>
                <NavigationBarM
                    title='流水统计'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <View style={styles.dateBox}>
                    <TouchableOpacity onPress={this._showDatePicker.bind(this)} activeOpacity={6}>
                        <View style={styles.dateContent}>
                            <Text style={{color:'#333',fontSize:scaleSize(28),marginRight:scaleSize(15)}}>全部月份</Text>
                            <Image source={require('../../../res/images/arrowDown.png')} style={{width:scaleSize(18),height:scaleSize(11)}} />
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.dateContent,{alignSelf:'flex-end'}]}>
                        <Text style={{color:'#666',fontSize:scaleSize(24)}}>收款：</Text>
                        <Text style={{color:'#666',fontSize:scaleSize(30)}}>￥230000.20</Text>
                    </View>

                </View>
                <ScrollView style={{paddingLeft:scaleSize(30),backgroundColor:'#fff'}}>
                    {
                        list.map((item, i) => (
                            <View style={{paddingTop:scaleSize(20)}}>
                                <Text style={{color:'#999',fontSize:scaleSize(28)}}>{item.subtitle}</Text>
                                <ListItem
                                    key={i}
                                    title={item.name}
                                    roundAvatar
                                    avatar={item.labelIcon}
                                    avatarContainerStyle={{
                                        marginRight:scaleSize(20),
                                        width:scaleSize(60),
                                        height:scaleSize(60),
                                        overflow:'hidden',
                                    }}
                                    avatarStyle={{
                                        width:scaleSize(60),
                                        height:scaleSize(60),
                                        backgroundColor:'#f53b3b',
                                    }}
                                    hideChevron={true}
                                    rightTitle={item.price}
                                    rightTitleStyle={{
                                        color:'#333',
                                        fontSize:scaleSize(28),
                                    }}
                                    titleStyle={{
                                        color:'#555',
                                        fontSize:scaleSize(28),
                                        marginLeft:scaleSize(0),
                                        marginBottom:scaleSize(10),
                                    }}
                                    containerStyle={{
                                        borderBottomColor:'#eee',
                                        borderBottomWidth:scaleSize(1),
                                        marginLeft:scaleSize(0),
                                        paddingLeft:scaleSize(0)
                                    }}
                                />
                            </View>
                        ))
                    }
                    <View style={{justifyContent:'center',alignItems:'center',marginVertical:scaleSize(30)}}>
                        <Text style={{color:'#999',fontSize:scaleSize(20)}}>没有更多了</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
        position:'relative',
    },
    dateBox:{
        paddingHorizontal:scaleSize(30),
        paddingVertical:scaleSize(25),
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
    },
    dateContent:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    }
})