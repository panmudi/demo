/**
 * Created by penn on 2016/12/14.
 */
import React, {Component} from 'react';
import {Modal, Platform, StyleSheet, Text, TouchableOpacity, View, Linking, NativeModules} from 'react-native';

import {scaleSize} from "../util/px2dp";
import SplashScreen from "rn-splash-screen";
import StorageUtil from "../util/StorageUtil";
import {API, KEY, VERSION} from "../common/Const";
import HttpUtil from "../util/HttpUtil";
import NavigatorUtil from "../util/NavigatorUtil";

export default class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expireModel: false,//判断用户是否有token
            versionModel: false,//判断是否有新版本
            version: VERSION,
            changeLog: '',
            upgradeUrl: ''
        }
    }

    componentDidMount() {
        //检查新版本
        HttpUtil.get(API.appVersion).then((res) => {
            if (res.code === 0) {
                if (!this._checkVersion(res.data)) {
                    StorageUtil.get(KEY.auth).then((value) => {
                        if (value == null) {
                            SplashScreen.hide();
                            NavigatorUtil.resetToLogin({
                                navigation: this.props.navigation
                            });
                        } else {
                            HttpUtil.get(API.userInfo, null, {
                                'Authorization': 'Bearer ' + value.access_token
                            }).then((res) => {
                                if (res.code === 0) {
                                    //token保存为全局变量
                                    global.accessToken = value.access_token;
                                    global.refreshToken = value.refresh_token;
                                    StorageUtil.save(KEY.userInfo, res.data, () => {
                                        SplashScreen.hide();
                                        NavigatorUtil.resetToHomePage({
                                            navigation: this.props.navigation
                                        });
                                    })
                                } else {
                                    SplashScreen.hide();
                                    NavigatorUtil.resetToLogin({
                                        navigation: this.props.navigation
                                    });
                                }
                            }, (ex) => {
                                console.log(ex)
                            })
                        }
                    });
                }
            } else {
                console.log(res);
            }
        }, (ex) => {
            console.log(ex)
        })
    }

    //新版本判断
    _checkVersion(versionInfo) {
        if (Platform.OS === 'android') {
            if (versionInfo.apkVersion != VERSION) {
                this.setState({
                    version: versionInfo.apkVersion,
                    changeLog: versionInfo.changeLog,
                    upgradeUrl: versionInfo.apkUrl,
                    versionModel: true
                });
                return true;
            }
        } else {
            if (versionInfo.ipaVersion != VERSION) {
                this.setState({
                    version: versionInfo.ipaVersion,
                    changeLog: versionInfo.changeLog,
                    upgradeUrl: versionInfo.appstoreUrl,
                    versionModel: true
                });
                return true;
            }
        }
        return false;
    }

    //版本更新
    _updateVersion() {
        this.setState({
            versionModel: false
        });
        if (Platform.OS === 'android') {
            NativeModules.DownloadApk.download(this.state.upgradeUrl);
        } else {
            Linking.openURL(this.state.upgradeUrl).catch(err => console.error('An error occurred', err));
        }
    }
    
    //跳转到登录
    _gotoLogin() {
        this.setState({
            expireModel: false
        });
        NavigatorUtil.resetToLogin({
            navigation: this.props.navigation
        });
    }

    render() {
        let changeLogItems = this.state.changeLog.split(";");
        return (
            <View style={styles.tabs_container}>
                {/*</Modal>*/}
                <Modal transparent={true} visible={this.state.expireModel} onRequestClose={() => {
                }}>
                    <View style={styles.containerM}>
                        <View style={styles.jjArea}>
                            <Text style={[styles.jjT1, styles.mt50, styles.mb20]}>提示</Text>
                            <Text style={styles.jjT2}>登入信息已过期或账号在其他设备登录</Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={this._gotoLogin.bind(this)}
                                              style={{marginTop: scaleSize(60)}}>
                                <View style={styles.btn}>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: scaleSize(32),
                                        textAlign: 'center',
                                        lineHeight: scaleSize(70)
                                    }}>好的</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/*</Modal>*/}
                <Modal
                    transparent={true}
                    visible={this.state.versionModel}
                    onRequestClose={() => {
                    }}
                >
                    <View style={styles.containerM}>
                        <View style={styles.jjArea}>
                            <View style={{width: scaleSize(360), justifyContent: 'flex-start'}}>
                                <Text
                                    style={[styles.vjjT1, styles.mt50, styles.mb20]}>发现新版本(v{this.state.version})</Text>
                                {
                                    changeLogItems.map((item) => {
                                        <Text style={styles.vjjT2} key={item.toString()}>{item}</Text>
                                    })
                                }
                            </View>
                            <TouchableOpacity activeOpacity={0.8} onPress={this._updateVersion.bind(this)}
                                              style={{marginTop: scaleSize(60)}}>
                                <View style={styles.btn}>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: scaleSize(28),
                                        textAlign: 'center',
                                        lineHeight: scaleSize(70)
                                    }}>{Platform.OS === 'android' ? '下载安装' : '去AppStore更新'}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    //modal
    containerM: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    jjArea: {
        position: 'relative',
        width: scaleSize(500),
        backgroundColor: '#fff',
        borderRadius: scaleSize(5),
        alignItems: 'center',
    },
    jjImg: {
        width: scaleSize(500),
        height: scaleSize(148),
    },
    jj_closeA: {
        width: scaleSize(500),
        marginBottom: scaleSize(30),
        // textAlign: 'right',
    },
    jj_close: {
        marginLeft: scaleSize(460),
        width: scaleSize(36),
        height: scaleSize(36),
        resizeMode: 'contain',
    },
    jjT1: {
        fontSize: scaleSize(28),
        textAlign: 'center',
    },
    jjT2: {
        fontSize: scaleSize(20),
        textAlign: 'center',
        marginBottom: scaleSize(10),
    },
    vjjT1: {
        fontSize: scaleSize(28),
        textAlign: 'left',
    },
    vjjT2: {
        fontSize: scaleSize(20),
        textAlign: 'left',
        marginBottom: scaleSize(10),
    },
    mt50: {
        marginTop: scaleSize(50),
    },
    mb20: {
        marginBottom: scaleSize(20),
    },
    btn: {
        width: scaleSize(360),
        height: scaleSize(70),
        backgroundColor: '#ee2424',
        borderRadius: scaleSize(35),
        marginBottom: scaleSize(40),
        // marginTop:scaleSize(60),
        // fontSize:setSpText(32),
    },
});
