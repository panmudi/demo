/**
 * register
 * @flow
 */

import React, {Component}  from 'react';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {scaleSize} from '../util/px2dp'; //适配js
import {isvalidatemobile} from '../util/validate'

import {ACCESS_TOKEN_KEY, API, eyeOff, eyeOn} from '../common/Const'

import { Toast} from 'antd-mobile-rn';
import CountDownButton from 'react-native-smscode-count-down';
import NavigatorUtil from "../util/NavigatorUtil";
import HttpUtil from "../util/HttpUtil";

const {width, height} = Dimensions.get('window');


var navigation = null;
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            eyeClose: true,
            eyeUrl: eyeOff,
            username: '',//手机号码
            code: ''//
        };
        navigation = this.props.navigation;
        this.getCode = this.getCode.bind(this);
    }

    //注册
    onButtonPress(e) {
        let err = isvalidatemobile(this.state.username)
        //todo 待完善

        let regInfo = {
            username: this.state.username.trim(),
            newpassword1: this.state.password.trim(),
            code: this.state.code.trim()
        }

        HttpUtil.post(API.userRegister, JSON.stringify(regInfo), {
            'Authorization': 'Basic YXBwOmFwcA==',
            'Content-Type': 'application/json;charset=UTF-8'
        }).then((json) => {
            if (json.code === 0) {
                if (!json.data) {
                    Toast.fail(json.msg,1);
                } else {
                    Toast.success("注册成功",1);
                    const {navigation} = this.props;
                    navigation.navigate('Login');
                }
            }
        }, (error) => {
            console.log(error)
        });
    }


    //密码框变化
    changeEye() {
        this.setState({
            eyeClose: !this.state.eyeClose,
            eyeUrl: this.state.eyeClose ? eyeOn : eyeOff,
        });
    }

    //获取验证码
    getCode() {
        HttpUtil.get(API.smsCode + this.state.username, null, {'x-sms-type': 'userRegister'})
            .then((json) => {
                if (json.code === 0) {
                    if (!json.data) {
                        Toast.fail(json.msg,1);
                    }
                }
            }, (error) => {
                console.log(error)
            });
        return true;
    }

    renderButton(image) {
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={() => {
                NavigatorUtil.goBack(this.props.navigation);
            }}>
            <Image
                style={{width: scaleSize(36), height: scaleSize(34)}}
                source={image}/>
        </TouchableOpacity>;
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<NavigationBarM*/}
                {/*title='注册'*/}
                {/*style={{backgroundColor:'#FFF'}}*/}
                {/*leftButton={this.renderButton(require('../../res/images/back-black.png'))}*/}
                {/*/>*/}
                <ScrollView>
                    <View style={styles.registerBox}>
                        <View style={styles.registerBox}>
                            <Image source={require('../../res/images/logo.png')}
                                   style={[styles.logoImage, {marginBottom: scaleSize(120)}]}/>
                            {/*<Text style={styles.logoText}>一呗</Text>*/}
                        </View>
                        <View style={styles.inputArea}>
                            <Image source={require('../../res/images/phone.png')} style={styles.phoneImage}/>
                            <TextInput maxLength={11} keyboardType={'numeric'} value={this.state.text}
                                       style={styles.inputText} onChangeText={(text) => this.setState({username: text})}
                                       placeholder="请输入手机号码" underlineColorAndroid='transparent'/>
                        </View>
                        <View style={styles.inputArea}>
                            <Image source={require('../../res/images/key.png')}
                                   style={[styles.lockImage, {width: scaleSize(33), height: scaleSize(32)}]}/>
                            <TextInput secureTextEntry={false} maxLength={6} value={this.state.text}
                                       style={styles.inputText1} placeholder="请输入验证码"
                                       onChangeText={(text) => this.setState({code: text})}
                                       underlineColorAndroid='transparent'/>
                            <CountDownButton
                                style={{marginRight: scaleSize(10), display: 'flex', width: scaleSize(180)}}
                                textStyle={{color: '#ee2424', fontSize: scaleSize(24)}}
                                timerCount={60}
                                timerTitle={'获取验证码'}
                                enable={this.state.username.length === 11}
                                onClick={(shouldStartCounting) => {
                                    const requestSucc = this.getCode();
                                    shouldStartCounting(requestSucc);
                                }}/>
                        </View>
                        {/**/}
                        <View style={styles.inputArea}>
                            <Image source={require('../../res/images/lock.png')} style={styles.lockImage}/>
                            <TextInput secureTextEntry={this.state.eyeClose} maxLength={20} value={this.state.text}
                                       style={styles.inputText} placeholder="请输入登录密码"
                                       onChangeText={(text) => this.setState({password: text})}
                                       underlineColorAndroid='transparent'/>
                            <Text onPress={this.changeEye.bind(this)} style={styles.eyeP}>
                                <Text>
                                    <Image source={this.state.eyeUrl} style={styles.eyeImage}/>
                                </Text>
                            </Text>
                        </View>
                        {/**/}
                        <TouchableOpacity activeOpacity={0.8} onPress={this.onButtonPress.bind(this)}
                                          style={{marginTop: scaleSize(50),}}>
                            <View style={styles.loginBtn}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: scaleSize(32),
                                    textAlign: 'center',
                                    lineHeight: scaleSize(70)
                                }}>立即注册</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{
                                color: '#ee2424',
                                fontSize: scaleSize(24),
                                alignSelf: 'center',
                                marginRight: scaleSize(30),
                                marginTop: scaleSize(40)
                            }}>已有账号？去登录</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    registerBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    logoImage: {
        width: scaleSize(180),
        height: scaleSize(180),
        marginTop: scaleSize(200),
    },
    logoText: {
        marginTop: scaleSize(20),
        fontSize: scaleSize(32),
        fontFamily: 'PingFang-SC-Medium',
        color: '#4c1111',
        marginBottom: scaleSize(100),
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: scaleSize(1),
        borderColor: '#eee',
        borderStyle: 'solid',
        width: scaleSize(456),
        position: 'relative',
    },
    phoneImage: {
        width: scaleSize(26),
        height: scaleSize(40),
        position: 'absolute',
        bottom: scaleSize(42),
        left: scaleSize(19),
    },
    lockImage: {
        width: scaleSize(33),
        height: scaleSize(40),
        position: 'absolute',
        bottom: scaleSize(42),
        left: scaleSize(16),
        resizeMode: 'contain',
    },
    codeBtn: {
        width: scaleSize(130),
        height: scaleSize(40),
        backgroundColor: '#ee2424',
        borderRadius: scaleSize(19),
    },
    inputText: {
        width: scaleSize(350),
        paddingLeft: scaleSize(65),
        height: scaleSize(120),
        fontSize: scaleSize(26),
    },
    inputText1: {
        width: scaleSize(266),
        paddingLeft: scaleSize(65),
        height: scaleSize(120),
        fontSize: scaleSize(26),
    },
    forgetText: {
        marginTop: scaleSize(20),
        color: '#ee2424',
        fontSize: scaleSize(20),
        // textAlign: 'right',
        width: scaleSize(456),
    },
    loginBtn: {
        width: scaleSize(467),
        height: scaleSize(70),
        backgroundColor: '#ee2424',
        borderRadius: scaleSize(35),
    },

    eyeP: {
        position: 'absolute',
        width: scaleSize(60),
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',

    },
    eyeImage: {
        ...Platform.select({
            ios: {
                width: scaleSize(36),
                height: scaleSize(21),
            },
            android: {
                width: 50,
                height: 29,
            },
        }),
    },
});


