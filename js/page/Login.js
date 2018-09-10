import React, {Component} from 'react';

import {Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {scaleSize} from '../util/px2dp';

import {API, eyeOff, eyeOn, KEY} from '../common/Const'
import {Toast} from 'antd-mobile-rn';
import HttpUtil from "../util/HttpUtil";
import StorageUtil from "../util/StorageUtil";
import NavigatorUtil from "../util/NavigatorUtil";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            eyeClose: true,
            eyeUrl: eyeOff
        };
        navigation = this.props.navigation;
    }

    componentDidMount() {
        StorageUtil.get(KEY.loginName).then((value) => {
            this.setState({
                username: value,
            })
        });
    }

    //登录
    handleLogin() {
        if (this.state.username.trim().length === 0) {
            Toast.fail('请输入手机号码', 1);
            return;
        }
        if (this.state.password.trim().length === 0) {
            Toast.fail('请输入密码', 1);
            return;
        }

        Toast.loading('正在登录');
        let formData = new FormData();
        formData.append("username", this.state.username);
        formData.append("password", this.state.password);
        formData.append("grant_type", 'password');
        formData.append("scope", 'server');
        HttpUtil.post(API.usernameLogin, formData, {
            'Authorization': 'Basic eWliZWk6eWliZWk='
        }).then((json) => {
            Toast.hide();
            if (json && json.access_token) {
                StorageUtil.save(KEY.loginName, this.state.username);
                StorageUtil.save(KEY.auth, json, () => {
                    NavigatorUtil.resetToHomePage({
                        navigation: this.props.navigation
                    });
                    global.accessToken = json.access_token;
                    global.refreshToken = json.refresh_token;
                });
            }
        }, (error) => {
            Toast.hide();
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
                            <TextInput maxLength={11} value={this.state.text}
                                       defaultValue={this.state.username}
                                       style={styles.inputText} onChangeText={(text) => this.setState({username: text})}
                                       placeholder="请输入手机号码" underlineColorAndroid='transparent'/>
                        </View>
                        <View style={styles.inputArea}>
                            <Image source={require('../../res/images/lock.png')} style={styles.lockImage}/>
                            <TextInput secureTextEntry={this.state.eyeClose} maxLength={10} value={this.state.text}
                                       style={styles.inputText} placeholder="请输入登录密码"
                                       onChangeText={(text) => this.setState({password: text})}
                                       underlineColorAndroid='transparent'/>
                            <Text onPress={this.changeEye.bind(this)} style={styles.eyeP}>
                                <Text>
                                    <Image source={this.state.eyeUrl} style={styles.eyeImage}/>
                                </Text>

                            </Text>
                        </View>
                        <View>
                            <Text style={styles.forgetText}
                                  onPress={() => this.props.navigation.navigate('ForgetPwd')}>忘记密码了？</Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.6} onPress={this.handleLogin.bind(this)}
                                          style={{marginTop: scaleSize(50),}}>
                            <View style={styles.btn}>
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
                            }} onPress={() => this.props.navigation.navigate('LoginSms')}>短信验证登录</Text>
                        </View>
                        {/**/}
                        <View>
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
    inputText: {
        width: scaleSize(350),
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
    btn: {
        width: scaleSize(467),
        height: scaleSize(70),
        backgroundColor: '#ee2424',
        borderRadius: scaleSize(35),
    },
});
