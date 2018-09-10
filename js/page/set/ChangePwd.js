
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

const { width, height } = Dimensions.get('window');
import {Toast} from 'antd-mobile-rn';
import HttpUtil from "../../util/HttpUtil";
import StorageUtil from "../../util/StorageUtil";
import {API} from "../../common/Const";
import {setSpText,scaleSize} from '../../util/px2dp';
//适配js
import NavigationBarM from '../../common/NavigationBarM';
import NavigatorUtil from "../../util/NavigatorUtil";



var navigation = null;
export default class ChangePwd extends Component{
    constructor(props){
        super(props);
        this.state = {
          password: '',
          newpassword1: '',
          newpassword2: ''
        };
        navigation = this.props.navigation;
    }

    passwordMethod() {
      if (this.state.password.trim().length === 0) {
        Toast.fail('请输入旧密码', 1);
        return;
      }
      if (this.state.newpassword1.trim().length === 0 || this.state.newpassword1.trim().length < 6) {
        Toast.fail('请输入新密码,长度至少6个字符', 1);
        return;
      }
      if (this.state.newpassword2.trim().length === 0) {
        Toast.fail('请再次输入新密码', 1);
        return;
      }
      if (this.state.newpassword1.trim() != this.state.newpassword2.trim()) {
        Toast.fail('两次输入的新密码不一致', 1);
        return;
      }
      StorageUtil.get('auth').then((value) => {
        let formData = new FormData();
        formData.append("password", this.state.password);
        formData.append("newpassword1", this.state.newpassword1);
        HttpUtil.post(API.userPassword, formData, {
            'Authorization': 'Bearer ' + value.access_token
        }).then((json) => {
          if (json.code === 0) {
            if (json.data) {
              Toast.success('密码修改成功!', 1);
              this.setState({
                password: '',
                newpassword1: '',
                newpassword2: ''
              })
            } else {
              Toast.fail(json.msg, 1);
            }
          }
        }, (error) => {
            console.log(error)
        });
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
        return (
            <View style={styles.container}>
                <NavigationBarM
                    title='修改登录密码'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <View style={styles.marginTop}>
                    <View>
                        <View style={styles.applyInformation}>
                            <Text style={styles.applyText}>旧密码</Text>
                            <TextInput secureTextEntry={true} style={styles.applyInput} underlineColorAndroid='transparent'  placeholderTextColor='#ccc' placeholder={'请输入旧密码'}
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.password}/>
                        </View>
                        <View style={styles.applyInformation}>
                            <Text style={styles.applyText}>新密码</Text>
                            <TextInput secureTextEntry={true} style={styles.applyInput} underlineColorAndroid='transparent'  placeholderTextColor='#ccc' placeholder={'请输入新密码'}
                            onChangeText={(text) => this.setState({newpassword1: text})}
                            value={this.state.newpassword1}/>
                        </View>
                        <View style={[styles.applyInformation,{borderBottomWidth:scaleSize(0), borderBottomColor:'transparent',}]}>
                            <Text style={styles.applyText}>确认新密码</Text>
                            <TextInput secureTextEntry={true} style={styles.applyInput} underlineColorAndroid='transparent'  placeholderTextColor='#ccc' placeholder={'请确认新密码'}
                            onChangeText={(text) => this.setState({newpassword2: text})}
                            value={this.state.newpassword2}/>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={this.passwordMethod.bind(this)} style={{marginTop:scaleSize(50),}}>
                    <View style={{ width:width,
                        paddingLeft:scaleSize(30),
                        paddingRight:scaleSize(30),}}>
                        <View style={styles.btn}>
                            <Text style={{color: '#fff', fontSize: scaleSize(32),textAlign:'center',lineHeight:scaleSize(70)}}>确认</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('ForgetPwd')}>
                    <View style={{width:width,display:'flex',justifyContent:'center',alignItems:'center',marginTop:scaleSize(40)}}>
                        <Text style={{color:'#ee2424',fontSize:scaleSize(24)}}>忘记旧密码？</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#f5f5f5',
    },
    marginTop:{
        marginBottom:scaleSize(20),
        marginTop:scaleSize(20),
        paddingLeft:scaleSize(30),
        backgroundColor:'#fff',
        borderTopWidth:scaleSize(1),
        borderTopColor:'#eee',
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#eee',
    },
    btn:{
        height:scaleSize(70),
        backgroundColor:'#ee2424',
        borderRadius:scaleSize(10),
    },
    applyInformation: {
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#eee',
        paddingHorizontal:scaleSize(30),
        paddingVertical:scaleSize(20),
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
    },
    applyText: {
        fontSize:scaleSize(28),
        width:scaleSize(180),
        color:'#333',
    },
    applyInput: {
        width:scaleSize(400),
        marginLeft:scaleSize(60),
        padding:scaleSize(0),
        fontSize:scaleSize(28),
    },
});


