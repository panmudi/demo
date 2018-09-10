import React , {Component} from 'react';

import {Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {scaleSize} from '../util/px2dp'; //适配js
import NavigationBarM from '../common/NavigationBarM';
import NavigatorUtil from "../util/NavigatorUtil";
import CountDownButton from 'react-native-smscode-count-down';
import HttpUtil from "../util/HttpUtil";
import {API} from "../common/Const";
import { Toast} from 'antd-mobile-rn';

const { width, height } = Dimensions.get('window');



var navigation = null;
export default class ForgetPwd extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            code: '',
        };
        navigation = this.props.navigation;
        this.getCode = this.getCode.bind(this);
    }
    static navigationOptions = {
        title: '忘记密码',
        headerTintColor: '#333',
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize:scaleSize(32),
        },
    };

    //获取验证码
    getCode() {
        HttpUtil.get(API.smsCode + this.state.username, null, {'x-sms-type': 'passwordChange'})
            .then((json) => {
                if (json.code === 0) {
                    if (!json.data) {
                        Toast.fail(json.msg,1);
                    }
                }
            }, (error) => {
                console.log(error)
            });
    }

    forgetPwdNext(){
        const {navigation} = this.props;
        navigation.navigate('ForgetPwdNext');
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
                    title='忘记密码'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../res/images/back-black.png'))}
                />
                <View style={styles.marginTop}>
                    <View>
                        <View style={styles.applyInformation}>
                            <Text style={styles.applyText}>手机号</Text>
                            <TextInput style={styles.applyInput}  value={this.state.text} onChangeText={(text) => this.setState({username: text})} underlineColorAndroid='transparent'  placeholderTextColor='#ccc' placeholder={'请输入您的手机号码'}/>
                            <CountDownButton
                                style={{ marginRight:scaleSize(30),paddingHorizontal:scaleSize(0),height:scaleSize(30)}}
                                textStyle={{color: '#ee2424', fontSize: scaleSize(24)}}
                                timerCount={60}
                                timerTitle={'获取验证码'}
                                enable={this.state.username.length === 11}
                                onClick={(shouldStartCounting) => {
                                    const requestSucc = this.getCode();
                                    shouldStartCounting(requestSucc);
                                }}/>
                        </View>
                        <View style={[styles.applyInformation,{borderTopWidth:scaleSize(1),borderTopColor:'#eee'}]}>
                            <Text style={styles.applyText}>验证码</Text>
                            <TextInput style={styles.applyInput} underlineColorAndroid='transparent'  placeholderTextColor='#ccc' under placeholder={'请输入验证码'}/>
                        </View>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.8}  onPress={this.forgetPwdNext.bind(this)} style={{marginTop:scaleSize(50),}}>
                    <View style={{ width:width,
                        paddingLeft:scaleSize(30),
                        paddingRight:scaleSize(30),}}>
                        <View style={styles.btn}>
                            <Text style={{color: '#fff', fontSize: scaleSize(32),textAlign:'center',lineHeight:scaleSize(70)}}>下一步，设置新密码</Text>
                        </View>
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
    },
    btn:{
        height:scaleSize(70),
        backgroundColor:'#ee2424',
        borderRadius:scaleSize(10),
    },
    applyInformation: {
        paddingHorizontal:scaleSize(30),
        paddingVertical:scaleSize(20),
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
    },
    applyText: {
        fontSize:scaleSize(28),
        width:scaleSize(120),
        color:'#333',
    },
    applyInput: {
        width:scaleSize(300),
        marginLeft:scaleSize(60),
        padding:scaleSize(0),
        fontSize:scaleSize(28),
    },
});


