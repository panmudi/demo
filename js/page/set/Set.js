import React, {Component} from 'react';

import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scaleSize} from '../../util/px2dp';
//适配js
import NavigationBarM from '../../common/NavigationBarM';
import NavigatorUtil from "../../util/NavigatorUtil";
import HttpUtil from "../../util/HttpUtil";
import StorageUtil from "../../util/StorageUtil";
import {API, KEY} from "../../common/Const";
import * as CacheManager from '../../util/cache'
import {Modal, Toast} from 'antd-mobile-rn';

const {width, height} = Dimensions.get('window');

var navigation = null;

export default class Set extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cacheSize: ''
        };
        navigation = this.props.navigation;  //调用组件
    }

    static navigationOptions = {
        title: '设置',
        headerTintColor: '#333',
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: scaleSize(32),
        },
    };

    // 获得缓存大小
    async getCacheSize() {
        const data = await CacheManager.getCacheSize();
        const size = data / (1024 * 1024);
        this.setState({
            cacheSize: size.toFixed(2) + 'M'
        });
    }

    // 清除缓存
    async clearCacheSize() {
        await CacheManager.clearCache();
        this.setState({cacheSize: '0.00M'});
        Toast.success('缓存已清理!', 1);
    }

    /**
     * 从缓存中获取token
     */
    componentDidMount() {
        this.getCacheSize()
    }

    onLogout() {
        Modal.alert('提示', '是否确认退出登录', [
            {
                text: '确定', onPress: () => {
                    let formData = new FormData();
                    formData.append("accesstoken", global.accessToken);
                    formData.append("refreshToken", global.refreshToken);
                    HttpUtil.post(API.logout, formData).then((res) => {
                        if (res.code === 0) {
                            StorageUtil.delete(KEY.auth, () => {
                                //清除全局变量
                                global.accessToken = null;
                                global.refreshToken = null;
                                NavigatorUtil.resetToLogin({
                                    navigation: this.props.navigation
                                });
                            })
                        }
                    }, (err) => {
                        console.log(err)
                    })
                }
            },
            {text: '取消', onPress: () => console.log('cancel'), style: 'cancel'},
        ]);
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

    //清楚缓存
    cacheMethod() {
        this.clearCacheSize()
    }

    render() {
        return (
            <ScrollView style={[styles.scrollView, styles.horizontalScrollView]}>
                <NavigationBarM
                    title='设置'
                    style={{backgroundColor: '#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <View style={styles.marginTop}>
                    <TouchableOpacity onPress={() => navigation.navigate('ChangePwd')}>
                        <View style={[styles.userItem, styles.mt20]}>
                            <Text style={{color: '#333', fontSize: scaleSize(28)}}>修改密码</Text>
                            <View style={styles.nextContain}>
                                <Image style={styles.nextIcon}
                                       source={require('../../../res/images/message/message_06.png')}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.cacheMethod.bind(this)}>
                        <View style={[styles.userItem]}>
                            <Text style={{color: '#333', fontSize: scaleSize(28),}}>清理缓存</Text>
                            <View style={styles.nextContain}>
                                <Text style={{
                                    color: '#666',
                                    fontSize: scaleSize(24),
                                    marginRight: scaleSize(10),
                                }}>{this.state.cacheSize}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/**/}
                    <TouchableOpacity onPress={this.onLogout.bind(this)} style={{marginTop: scaleSize(50),}}>
                        <View style={{
                            width: width,
                            paddingLeft: scaleSize(30),
                            paddingRight: scaleSize(30),
                        }}>
                            <View style={styles.btn}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: scaleSize(32),
                                    textAlign: 'center',
                                    lineHeight: scaleSize(70)
                                }}>退出登录</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                {/*<Toast ref="toast" position='top'/>*/}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    mt20: {
        marginTop: scaleSize(20)
    },
    userImg: {
        width: scaleSize(95),
        height: scaleSize(95),
        borderRadius: scaleSize(50),
        // paddingRight:scaleSize(10),
    },
    nextIcon: {
        width: scaleSize(15),
        height: scaleSize(25),
        // paddingLeft:scaleSize(10),
    },
    AlipayIcon: {
        width: scaleSize(26),
        height: scaleSize(26),
        marginRight: scaleSize(10),
    },
    userLItem: {
        height: scaleSize(168),
        backgroundColor: '#fff',
        paddingHorizontal: scaleSize(30),
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userItem: {
        backgroundColor: '#fff',
        paddingHorizontal: scaleSize(30),
        paddingVertical: scaleSize(30),
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eeeeee',
        borderBottomWidth: scaleSize(1)
    },
    nextContainI: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: scaleSize(120),
    },
    nextContain: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        width: scaleSize(320),
    },
    btn: {
        height: scaleSize(70),
        backgroundColor: '#ee2424',
        borderRadius: scaleSize(10),
    },
});