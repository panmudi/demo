import React, {Component} from 'react';

import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';


import {scaleSize} from '../util/px2dp';
import {Toast} from 'antd-mobile-rn';
import CountDownButton from 'react-native-smscode-count-down';
import HttpUtil from "../util/HttpUtil";
import {API, KEY} from "../common/Const";
import StorageUtil from "../util/StorageUtil";
import NavigatorUtil from "../util/NavigatorUtil";


export default class LoginSms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            code: ''
        };
    }

    componentDidMount() {
        StorageUtil.get(KEY.loginName).then((value) => {
            this.setState({
                mobile: value
            })
        });
    }

    //登录
    handleLogin() {
        if (!this.state.mobile.trim().length === 11) {
            Toast.fail('请输入手机号码', 1);
            return;
        }
        if (!this.state.code.trim().length === 0) {
            Toast.fail('请输入验证码', 1);
            return;
        }

        Toast.loading('正在登录');
        let formData = new FormData();
        formData.append("mobile", this.state.mobile);
        formData.append("code", this.state.code);
        formData.append("grant_type", 'mobile');
        formData.append("scope", 'server');

        HttpUtil.post(API.mobileLogin, formData, {
            'Authorization': 'Basic eWliZWk6eWliZWk='
        }).then((json) => {
            Toast.hide();
            if (json && json.access_token) {
                StorageUtil.save(KEY.loginName, this.state.mobile);
                StorageUtil.save(KEY.auth, json, () => {
                    NavigatorUtil.resetToHomePage({
                        navigation: this.props.navigation
                    });
                    global.accessToken = json.access_token;
                });
            }
        }, (error) => {
            Toast.hide();
            console.log(error)
        });
    }

    //获取验证码
    getCode() {
        HttpUtil.get(API.smsCode + this.state.mobile, null, {'x-sms-type': 'userLogin'})
            .then((json) => {
                if (json.code === 0) {
                    if (!json.data) {
                        Toast.fail(json.msg, 1);
                    }
                }
            }, (error) => {
                console.log(error)
            });
        return true;
    }

    //登录成功
    onLoginSuccess() {
        const {navigation} = this.props;
        navigation.navigate('HomePage');
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.registerBox}>
                        <Image source={require('../../res/images/logo.png')}
                               style={[styles.logoImage, {marginBottom: scaleSize(120)}]}/>
                        {/*<Text style={styles.logoText}>一呗</Text>*/}
                        <View style={styles.inputArea}>
                            <Image source={require('../../res/images/phone.png')} style={styles.phoneImage}/>
                            <TextInput maxLength={11} keyboardType={'numeric'} value={this.state.text}
                                       style={styles.inputText} onChangeText={(text) => this.setState({mobile: text})}
                                       placeholder="请输入手机号码" underlineColorAndroid='transparent'/>
                        </View>
                        <View style={styles.inputArea}>
                            <Image source={require('../../res/images/lock.png')} style={styles.lockImage}/>
                            <TextInput secureTextEntry={false} maxLength={6} value={this.state.text}
                                       style={styles.inputText1} placeholder="请输入验证码"
                                       onChangeText={(text) => this.setState({code: text})}
                                       underlineColorAndroid='transparent'/>
                            <CountDownButton
                                style={{marginRight: scaleSize(10), display: 'flex', width: scaleSize(180)}}
                                textStyle={{color: '#ee2424', fontSize: scaleSize(24)}}
                                timerCount={60}
                                timerTitle={'获取验证码'}
                                enable={this.state.mobile.length === 11}
                                onClick={(shouldStartCounting) => {
                                    const requestSucc = this.getCode();
                                    shouldStartCounting(requestSucc);
                                }}/>

                        </View>
                        <View>
                            <Text style={styles.forgetText}
                                  onPress={() => this.props.navigation.navigate('forgetPwd')}>忘记密码了？</Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.8} onPress={this.handleLogin.bind(this)}
                                          style={{marginTop: scaleSize(50),}}>
                            <View style={styles.loginBtn}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: scaleSize(32),
                                    textAlign: 'center',
                                    lineHeight: scaleSize(70)
                                }}>登 录</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={{
                                width: scaleSize(456),
                                color: '#999',
                                fontSize: scaleSize(28),
                                textAlign: 'center',
                                marginTop: scaleSize(30),
                            }} onPress={() => this.props.navigation.navigate('Login')}>账号密码登录</Text>
                        </View>
                        {/**/}
                        <View style={{}}>
                            <Text style={{
                                width: scaleSize(456),
                                color: '#333',
                                fontSize: scaleSize(24),
                                textAlign: 'center',
                                marginTop: scaleSize(150),
                                marginBottom: scaleSize(80)
                            }}>
                                还没账号<Text style={{color: '#ee2424'}}
                                          onPress={() => this.props.navigation.navigate('Register')}>去注册</Text>
                            </Text>
                        </View>
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
        marginTop: scaleSize(200)
    },
    logoText: {
        marginTop: scaleSize(20),
        fontSize: scaleSize(32),
        fontFamily: 'PingFang-SC-Medium',
        color: '#4c1111',
        marginBottom: scaleSize(100),
    },
    inputArea: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: scaleSize(1),
        borderColor: '#eee',
        borderStyle: 'solid',
        width: scaleSize(456),
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
        fontSize: scaleSize(24),
        textAlign: 'right',
        width: scaleSize(456),
    },


    loginBtn: {
        width: scaleSize(467),
        height: scaleSize(70),
        backgroundColor: '#ee2424',
        borderRadius: scaleSize(35),
    },
});
