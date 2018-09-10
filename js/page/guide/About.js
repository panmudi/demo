import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    Linking,
    NativeModules,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import {scaleSize} from '../../util/px2dp';
import NavigatorUtil from "../../util/NavigatorUtil";
import NavigationBarM from '../../common/NavigationBarM';
import {ListItem} from 'react-native-elements'
import {API, VERSION} from "../../common/Const";
import {Toast} from 'antd-mobile-rn';
import HttpUtil from "../../util/HttpUtil";
import ServiceContract from "./ServiceContract";

const {width, height} = Dimensions.get('window');
var navigation = null;
export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            version: VERSION,
        };
        navigation = this.props.navigation;  //调用组件
    }

    //版本检测
    checkVersion() {
        HttpUtil.get(API.appVersion).then((res) => {
            if (res.code === 0) {
                if (Platform.OS === 'android') {
                    if (res.data.apkVersion != VERSION) {
                        NativeModules.DownloadApk.download(res.data.apkUrl);
                    } else {
                        Toast.info('已经是最新版本', 1);
                    }
                } else {
                    if (res.data.ipaVersion != VERSION) {
                        Linking.openURL(res.data.appstoreUrl).catch(err => console.error('An error occurred', err));
                    } else {
                        Toast.info('已经是最新版本', 1);
                    }
                }
            }
        }, (err) => {
            console.log(err)
        })
    }

    renderButton(image) {
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={() => NavigatorUtil.goBack(this.props.navigation)}>
            <Image
                style={{width: scaleSize(36), height: scaleSize(34)}}
                source={image}/>
        </TouchableOpacity>;
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBarM
                    title='关于我们'
                    style={{backgroundColor: '#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                {/*关于我们*/}
                <View style={styles.aboutBox}>
                    <Image source={require('../../../res/images/logo.png')}
                           style={{width: scaleSize(150), height: scaleSize(150), marginTop: scaleSize(80)}}/>
                    <Text style={{color: '#333', marginTop: scaleSize(50), fontSize: scaleSize(32)}}>一呗手机终端</Text>
                    <Text style={{
                        color: '#555',
                        marginTop: scaleSize(30),
                        fontSize: scaleSize(28)
                    }}>v{this.state.version}</Text>
                    <View style={styles.aboutList}>
                        <TouchableOpacity onPress={() => navigation.navigate('ServiceContract')}>
                            <ListItem
                                title='服务协议'
                                titleStyle={{fontSize: scaleSize(28), color: '#333', marginVertical: scaleSize(10)}}
                                containerStyle={{
                                    borderBottomColor: '#eee',
                                    borderBottomWidth: scaleSize(1),
                                    width: width,
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.checkVersion()}}>
                            <ListItem
                                title='版本更新'
                                rightTitle='检查更新'
                                rightTitleStyle={{fontSize: scaleSize(24), color: '#999',}}
                                titleStyle={{fontSize: scaleSize(28), color: '#333', marginVertical: scaleSize(10)}}
                                containerStyle={{
                                    borderBottomColor: '#eee',
                                    borderBottomWidth: scaleSize(1),
                                    width: width,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.aboutBottom}><Text style={{fontSize: scaleSize(26), color: '#999'}}>copyright@2018
                    一呗</Text></View>
                {/*<View style={styles.aboutBox}>*/}
                {/*<Image source={require('../../../res/images/logo.png')} style={{width: scaleSize(180), height: scaleSize(180),marginTop: scaleSize(120)}}/>*/}
                {/*<Text style={{color:'#999',marginTop:scaleSize(10),fontSize:scaleSize(24)}}>v0.0.1</Text>*/}
                {/*<Text style={{marginTop:scaleSize(40),fontSize:scaleSize(34)}}>一呗手机终端</Text>*/}
                {/*<Text style={{width:scaleSize(450),color:'#555',marginTop:scaleSize(50),fontSize:scaleSize(26),textAlign:'center',lineHeight:scaleSize(40)}}>您的手机收款专家，为您提供方便快捷的一站式的收款方式</Text>*/}
                {/*<Text style={{marginTop:scaleSize(40),fontSize:scaleSize(26)}}>收款从未收到如此手软过~</Text>*/}
                {/*<Image source={require('../../../res/images/message/code.png')} style={{width: scaleSize(265), height: scaleSize(265),marginTop:scaleSize(40)}}/>*/}
                {/*<Text style={{color:'#555',marginTop:scaleSize(40),fontSize:scaleSize(20)}}>扫描二维码，您的朋友也可下载一呗客户端</Text>*/}
                {/*</View>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        position: 'relative',
    },
    aboutBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    aboutBottom: {
        position: 'absolute',
        bottom: scaleSize(40),
        width: width,
        left: scaleSize(0),
        justifyContent: 'center',
        alignItems: 'center'
    },
    aboutList: {
        borderTopColor: '#eee',
        borderBottomColor: '#eee',
        borderTopWidth: scaleSize(1),
        borderBottomWidth: scaleSize(1),
        backgroundColor: '#fff',
        marginTop: scaleSize(80),
    }
})