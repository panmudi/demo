
import React, { Component } from 'react';

import { StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    DeviceEventEmitter,
    TouchableOpacity,
    TextInput
} from 'react-native';

const { width, height } = Dimensions.get('window');

import {setSpText,scaleSize} from '../../util/px2dp';//适配js

import NavigationBarM from '../../common/NavigationBarM';
import NavigatorUtil from "../../util/NavigatorUtil";
import {API} from "../../common/Const";
import HttpUtil from "../../util/HttpUtil";
import StorageUtil from "../../util/StorageUtil";
import {Modal ,Toast} from 'antd-mobile-rn';


export default class Rename extends Component{
    constructor(props){
        super(props);
        this.state = {
            nickname:'',
        };
    }
    componentWillMount(){
        const { navigation } = this.props;
        const nickname = navigation.getParam('nickname',);
        this.setState({
            nickname:nickname
        })
    }
    //在组件销毁的时候要将其移除
    componentWillUnmount(){

    };

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
                this.getValue()
            }}>
            <Text style={{color: '#ee2424', fontSize: scaleSize(28),}}>{text}</Text>
        </TouchableOpacity>;
    }

    getValue(){
        StorageUtil.get("auth").then((value) => {
            let formData = new FormData();
            formData.append('nickname', this.state.nickname);
            HttpUtil.post(API.userNickname, formData, {
                'Authorization': 'Bearer ' + value.access_token
            }).then((json) => {
                if (json.code === 0) {
                    // StorageUtil.save("userInfo", json, () => {
                    //
                    // })
                    Toast.info('修改成功！',1);
                    DeviceEventEmitter.emit('nickNameBind');
                    DeviceEventEmitter.emit('infoBind');
                    NavigatorUtil.goBack(this.props.navigation);

                }
            }, (error) => {
                console.log(error)
            });
        });
    }

    render() {
        const { navigation } = this.props;
        const name = navigation.getParam('name',);
        return (
            <View style={styles.container}>
                <NavigationBarM
                    title='名称'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                    rightButton={this.renderText('保存')}
                />

                <View style={styles.applyInformation}>
                    <TextInput style={styles.applyInput} underlineColorAndroid='transparent' defaultValue={this.state.nickname} value={this.state.text}
                               onChangeText={(text) =>this.state.nickname = text}
                    />
                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f5f5f5'
    },
    photoBlock: {
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
    },
    photoBox: {
        marginRight:scaleSize(30),
        marginVertical:scaleSize(15),
    },
    photoImage: {
        width:scaleSize(280),
        height:scaleSize(180),
        marginBottom:scaleSize(15),
   },
    applyInformation: {
        borderTopWidth:scaleSize(1),
        borderTopColor:'#eee',
        paddingHorizontal:scaleSize(30),
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'#fff',
        marginTop:scaleSize(20),
    },
    applyText: {
        fontSize:scaleSize(28),
        width:scaleSize(120),
    },
    applyInput: {
        width:width,
        height:scaleSize(88),
        paddingVertical:0,
        color:'#666',
        fontSize:scaleSize(24)
    }
});


