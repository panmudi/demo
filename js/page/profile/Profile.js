
import React, { Component } from 'react';

import { StyleSheet,
    Text,
    View,
    Button,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    DeviceEventEmitter,
    TextInput
} from 'react-native';

import {scaleSize} from '../../util/px2dp';
//适配js
import NavigationBarM from '../../common/NavigationBarM';
import ImagePicker from 'react-native-image-picker';
import NavigatorUtil from "../../util/NavigatorUtil";
import Picker from "react-native-picker/index";
import area from '../../../res/data/area.json';
import {API} from '../../common/Const';
import StorageUtil from '../../util/StorageUtil';
import HttpUtil from '../../util/HttpUtil';


export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            avatarSource: null,
            nickname:'',
            mobile: '',
            areaValue: ['请选择'],
            accessToken: ''
        };
        navigation = this.props.navigation;
    }

    /**
     * 从缓存中获取token
     */
    _initData(){
        StorageUtil.get('auth').then((value) => {
            this.setState({
                accessToken: value.access_token
            })
        })
        StorageUtil.get('userInfo').then((value) => {
            this.setState({
                avatarSource: {uri: value.avatar},
                nickname: value.nickname,
                mobile: value.mobile
            })
        })
    }
    componentWillMount(){
        this._initData();
        this.listener=DeviceEventEmitter.addListener('nickNameBind',(events) =>{
            HttpUtil.get(API.userInfo, null, {
                'Authorization': 'Bearer ' + this.state.accessToken,
            }).then((json) => {
                if (json.code === 0) {
                    this.setState({
                        nickname: json.data.nickname == null ? json.data.username : json.data.nickname,
                        avatarSource: {uri: json.data.avatar}
                    });
                    StorageUtil.save("userInfo", json.data);
                }
            }, (error) => {
                console.log(error)
            })
        });
    }
    //在组件销毁的时候要将其移除
    componentWillUnmount(){
        this.listener.remove();
    };

    //地区数据处理
    _createAreaData() {
        let data = [];
        let len = area.length;
        for (let i = 0; i < len; i++) {
            let city = [];
            for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
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

    //地区选择控件
    _showAreaPicker() {
        Picker.init({
            pickerData: this._createAreaData(),
            pickerConfirmBtnText: '保存',
            pickerCancelBtnText: '取消',
            pickerTitleText: '',
            pickerConfirmBtnColor: [51, 51, 51, 1],
            pickerCancelBtnColor: [51, 51, 51, 1],
            pickerToolBarFontSize: 14,
            onPickerConfirm: pickedValue => {
                // console.log('area', pickedValue);
                this.setState({
                    areaValue: pickedValue,
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

    selectPhotoTapped() {
        const options = {
            title: '请选择图片来源',
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'相册图片',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
                let formData = new FormData();
                let file = {uri: source.uri, type: 'application/octet-stream', name: 'avatar.png'};
                formData.append('file', file);
                HttpUtil.post(API.userAvatar, formData, {
                    'Authorization': 'Bearer ' + this.state.accessToken,
                    'Content-Type': 'multipart/form-data;charset=utf-8'
                }).then((json) => {
                    if (json.code === 0) {
                      this.setState({
                        avatarSource: source
                      });
                      DeviceEventEmitter.emit('infoBind');
                    }
                }, (error) => {
                    console.log(error)
                });
            }
        });
    }

    //修改姓名
    _pressButton(){
      // let _this=this;
      const {nickname} = this.state;
      this.props.navigation.navigate('Rename',{
          nickname,
          // changeName: function(nickname) {
          //     this.setState({
          //       nickname: nickname
          //     })
          // }
      })
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
    render() {
        const {nickname,areaValue}=this.state;
        return (
            <ScrollView style={[styles.scrollView, styles.horizontalScrollView]}>
                <NavigationBarM
                    title='修改个人资料'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <View style={styles.marginTop}>
                    {/**/}
                    <View style={[styles.userLItem,styles.mt20]}>
                        <Text style={{color:'#333',fontSize:scaleSize(28),}}>我的头像</Text>
                        <View style={styles.nextContainI}>
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                <View>
                                    { this.state.avatarSource === null ?  <Image style={styles.userImg} source={require('../../../res/images/userPic.png')} /> :
                                        <Image style={styles.userImg}  source={this.state.avatarSource} />
                                    }
                                </View>

                            </TouchableOpacity>

                            <Image style={styles.nextIcon} source={require('../../../res/images/message/message_06.png')} />
                        </View>
                    </View>
                    {/**/}
                    <TouchableOpacity onPress={this._pressButton.bind(this)}>
                        <View style={[styles.userItem,styles.mt20]}>
                            <Text style={{color:'#333',fontSize:scaleSize(28),}}>昵称</Text>
                            <View style={styles.nextContain}>
                                <Text style={{color:'#666',fontSize:scaleSize(24),marginRight:scaleSize(10),}}>{nickname}</Text>
                                <Image style={styles.nextIcon} source={require('../../../res/images/message/message_06.png')} />
                            </View>

                        </View>
                    </TouchableOpacity>

                    {/**/}
                    <View style={[styles.userItem]}>
                        <Text style={{color:'#333',fontSize:scaleSize(28),}}>手机号</Text>
                        <View style={styles.nextContain}>
                            <Text style={{color:'#666',fontSize:scaleSize(24),marginRight:scaleSize(10),}}>{this.state.mobile}</Text>
                        </View>

                    </View>
                    
                    <TouchableOpacity onPress={this._showAreaPicker.bind(this)}>
                        <View style={[styles.userItem,styles.mt20]}>
                            <Text style={{color:'#333',fontSize:scaleSize(28),}}>所在地区</Text>
                            <View style={styles.nextContain}>
                                <Text style={{color:'#666',fontSize:scaleSize(24),marginRight:scaleSize(10),}}>{areaValue[0]}{areaValue[1]}{areaValue[2]}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    mt20:{
        marginTop:scaleSize(20)
    },
    userImg:{
        width:scaleSize(95),
        height:scaleSize(95),
        borderRadius:scaleSize(46),
        // paddingRight:scaleSize(10),
    },
    nextIcon:{
        width:scaleSize(15),
        height:scaleSize(25),
        // paddingLeft:scaleSize(10),
    },
    userLItem:{
        height:scaleSize(168),
        backgroundColor:'#fff',
        paddingHorizontal:scaleSize(30),
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
    },
    userItem:{
        height:scaleSize(88),
        backgroundColor:'#fff',
        paddingHorizontal:scaleSize(30),
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#eeeeee',
        borderBottomWidth:scaleSize(1)
    },
    nextContainI:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        width:scaleSize(120),
    },
    nextContain:{
        display:'flex',
        justifyContent:'flex-end',
        flexDirection:'row',
        alignItems:'center',
        width:scaleSize(320),
    },
});
