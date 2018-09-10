import React, { Component } from 'react';
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
    TextInput
} from 'react-native';

import {setSpText,scaleSize} from '../../util/px2dp';
import NavigationBarM from '../../common/NavigationBarM';
import NavigatorUtil from "../../util/NavigatorUtil";
import area from '../../../res/data/area.json';
import Picker from "react-native-picker/index";


var navigation = null;
export default class DeliveryAddress extends Component{
    constructor(props){
        super(props);
        this.state = {
            areaValue:["请选择", "", ""],
        };
        navigation = this.props.navigation;
    }

    // static navigationOptions = {
    //     title: '用户指南',
    //     headerTintColor: '#333',
    //     headerTitleStyle: {
    //         fontWeight: 'normal',
    //         fontSize:scaleSize(32),
    //     },
    // };

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

    renderText(text){
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={()=>{
                // NavigatorUtil.goBack(this.props.navigation);
            }}>
            <Text style={{color: '#ee2424', fontSize: scaleSize(28),}}>{text}</Text>
        </TouchableOpacity>;
    }

    //地区数据处理
    _createAreaData() {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }


    //控件
    _showAreaPicker() {
        Picker.init({
            pickerData: this._createAreaData(),
            pickerConfirmBtnText:'保存',
            pickerCancelBtnText:'取消',
            pickerTitleText:'',
            pickerConfirmBtnColor:[51,51,51,1],
            pickerCancelBtnColor:[51,51,51,1],
            selectedValue: ['河北', '唐山', '古冶区'],
            pickerToolBarFontSize:14,
            onPickerConfirm: pickedValue => {
                // console.log('area', pickedValue);
                this.setState({
                    areaValue:pickedValue,
                });
            },
            onPickerCancel: pickedValue => {
                // console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
                // console.log('area', pickedValue);
            }
        });
        Picker.show();
    }

    _showIndustryPicker(){
        Picker.init({
            pickerData: industry,
            pickerConfirmBtnText:'保存',
            pickerCancelBtnText:'取消',
            pickerTitleText:'',
            pickerConfirmBtnColor:[51,51,51,1],
            pickerCancelBtnColor:[51,51,51,1],
            selectedValue: ['河北', '唐山', '古冶区'],
            pickerToolBarFontSize:14,
            onPickerConfirm: pickedValue => {
                this.setState({
                    industryValue:pickedValue,
                });
            },
            onPickerCancel: pickedValue => {

            },
            onPickerSelect: pickedValue => {

            }
        });
        Picker.show();
    }

    render() {
        const {areaValue}=this.state
        return (
            <View style={styles.container}>
                <NavigationBarM
                    title='邮寄地址'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                    rightButton={this.renderText('保存')}
                />
                {/*用户指南*/}
                <ScrollView>
                    <View style={styles.spaceBlock}></View>
                    <View style={{backgroundColor:'#fff',borderBottomWidth:scaleSize(1),borderBottomColor:'#eee',paddingHorizontal:scaleSize(30)}}>
                        <View style={styles.applyInformation}>
                            <Text style={styles.applyText}>收件人</Text>
                            <TextInput style={styles.applyInput} underlineColorAndroid='transparent'  placeholderTextColor='#888' placeholder={'姓名'}/>
                        </View>
                        <View style={styles.applyInformation}>
                            <Text style={styles.applyText}>手机号</Text>
                            <TextInput style={styles.applyInput} underlineColorAndroid='transparent'  placeholderTextColor='#888' under placeholder={'18888888888'}/>
                        </View>
                        <View style={styles.applyInformation}>
                            <Text style={styles.applyText}>选择地区</Text>
                            <TouchableOpacity onPress={this._showAreaPicker.bind(this)}>
                                <Text style={[styles.applyInput,{paddingVertical:scaleSize(12)}]} >{areaValue[0]} {areaValue[1]} {areaValue[2]}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.applyInformation,{alignItems:'flex-start',}]}>
                            <Text style={styles.applyText}>详细地址</Text>
                            <TextInput style={[styles.applyInput,{height:scaleSize(180),textAlignVertical: 'top'}]}  multiline={true}  underlineColorAndroid='transparent' placeholderTextColor='#888' placeholder={'填写街道门牌号信息'}/>
                        </View>
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
    },
    spaceBlock:{
        height:scaleSize(20),
        backgroundColor:'#f5f5f5',
    },
    applyInformation: {
        borderTopWidth:scaleSize(1),
        borderTopColor:'#eee',
        paddingHorizontal:scaleSize(30),
        paddingVertical:scaleSize(30),
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
    },
    applyText: {
        fontSize:scaleSize(28),
        width:scaleSize(120),
    },
    applyInput: {
        width:scaleSize(450),
        marginLeft:scaleSize(60),
        padding:scaleSize(0),
        fontSize:scaleSize(28),
    },
    }
)