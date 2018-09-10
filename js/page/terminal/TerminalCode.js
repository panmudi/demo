import React, { Component } from 'react';
import { StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    DeviceEventEmitter,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

import {scaleSize} from '../../util/px2dp';//适配js

import NavigationBarL from '../../common/NavigationBarL';
import NavigatorUtil from "../../util/NavigatorUtil";
import {API} from "../../common/Const";
import HttpUtil from "../../util/HttpUtil";
import StorageUtil from "../../util/StorageUtil";
import {Modal ,Toast} from 'antd-mobile-rn';
import TimerUtil from "../../util/TimerUtil";
import QRCode from "react-native-qrcode";
import {Button} from 'react-native-elements';


export default class TerminalCode extends Component{
    constructor(props) {
        super(props);
        this.state = {
            qrCode: 'https://qr.alipay.com/bax08837lffxi7nli5ws00ce',
            fqPercent: '',
            fqNum: '',
            number:1,
            phoneNumber:'',
        };
        navigation = this.props.navigation;  //调用组件
    }

    componentWillMount() {
        const {navigation} = this.props;
        const fqNum = navigation.getParam('fqNum');
        const fqPercent = navigation.getParam('fqPercent');
        this.setState({
            fqPercent: fqPercent,
            fqNum: fqNum
        });
        this.loadQrCodeText();
    }

    loadQrCodeText() {
        let _this = this;
        StorageUtil.get("auth").then((value) => {
            let formData = new FormData();
            formData.append("fq_num", this.state.fqNum);
            formData.append("fq_percent", this.state.fqPercent);
            HttpUtil.post(API.qrCodeText, formData, {
                'Authorization': 'Bearer ' + value.access_token
            }).then((json) => {
                if (json && json.code === 0 && json.data) {
                    _this.setState({
                        qrCode: json.data.qr_code
                    })
                    //开启轮询订单状态定时任务
                    TimerUtil.refreshOrderTimer = setInterval(function () {
                        //调用后台接口，通过订单号获取订单状态
                        HttpUtil.get(API.selectByOrderNo + json.data.orderNo, null, {
                            'Authorization': 'Bearer ' + value.access_token
                        }).then((json) => {
                            if (json.code === 0) {
                                if (json.data.status === '1') {
                                    clearInterval(TimerUtil.refreshOrderTimer);
                                    StorageUtil.save("orderInfo", json.data, () => {
                                        navigation.navigate('ReceiptDetails');
                                    })
                                }
                            }
                        }, (error) => {
                            console.log(error)
                        });

                        TimerUtil.refreshOrderTimerCount++;
                        if (TimerUtil.refreshOrderTimerCount > 24) {
                            clearInterval(TimerUtil.refreshOrderTimer);
                        }
                    }, 5000)
                }
            }, (error) => {
                console.log(error)
            });
        });
    }

    sendButton() {
        Modal.alert('系统提示', '您即将向13135693933划拨一台花呗版终端', [
            { text: '确定', onPress: () => console.log('sure'), style: 'cancel'},
            { text: '取消', onPress: () =>console.log('cancel'), style: 'cancel' },
        ]);
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
                <NavigationBarL
                    title='生成终端码'
                    style={{backgroundColor:'#ee2424'}}
                    leftButton={this.renderButton(require('../../../res/images/back.png'))}
                />
                {/**/}
                <ScrollView>
                    <View style={styles.terminalTitle}>
                        <Image source={require('../../../res/images/termina/termina01.png')} style={{width:scaleSize(68),height:scaleSize(74),marginRight:scaleSize(20)}} />
                        <View>
                            <Text style={{color:'#fff',fontSize:scaleSize(26),marginTop:scaleSize(5),}}>终端</Text>
                            <View style={styles.authorityClass}>
                                <Text style={{color:'#fff',fontSize:scaleSize(20),marginRight:scaleSize(50)}}>未开通分期</Text>
                                <Text style={{color:'#fff',fontSize:scaleSize(20)}}>已开通花呗</Text>
                            </View>
                        </View>
                    </View>
                    {/*二维码*/}
                    <View style={[styles.terminalCode,styles.terminalMargin]}>
                        <QRCode
                            value={this.state.qrCode}
                            size={scaleSize(315)}
                            bgColor='black'
                            fgColor='white'/>
                        <Text style={styles.codeText}>二维码9秒后刷新</Text>
                    </View>
                    {/**/}
                    <View style={styles.marginTop}>
                        <View>
                            <View style={styles.applyInformation}>
                                <Text style={styles.applyText}>设置数量</Text>
                                <TextInput
                                    style={styles.applyInput}
                                    underlineColorAndroid='transparent'
                                    placeholderTextColor='#333'
                                    maxLength={4}
                                    placeholder={'1'}
                                    editable={false}
                                    onChangeText={(text) => this.setState({number: text})}
                                    value={this.state.number}/>
                            </View>
                            <View style={[styles.applyInformation,{borderBottomColor:'transparent',borderBottomWidth:scaleSize(0)}]}>
                                <Text style={styles.applyText}>手机号码</Text>
                                <TextInput
                                    style={styles.applyInput}
                                    maxLength={11}
                                    keyboardType='numeric'
                                    underlineColorAndroid='transparent'
                                    placeholderTextColor='#ccc'
                                    placeholder={'输入将发送的用户手机号'}
                                    onChangeText={(text) => this.setState({phoneNumber: text})}
                                    value={this.state.phoneNumber}/>
                                <Button
                                    title='发送'
                                    buttonStyle={styles.sendButton}
                                    textStyle={{color:'#fff',fontSize:scaleSize(20) }}
                                    onPress={()=>this.sendButton()}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <View style={styles.terminalInstructions}>
                            <Text style={{color:'#ee2424',fontSize:scaleSize(20),lineHeight:scaleSize(35),}}>说明：</Text>
                            <Text style={{color:'#999',fontSize:scaleSize(20),lineHeight:scaleSize(35),}}>您可将设置好数量的终端二维码分享给其他用户，或填写对方手机号划拨终端，系统将会给此手机号发送短 信通知，对方可在仓库中查看收到的终端。</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
    },
    terminalTitle:{
        width:width,
        paddingVertical:scaleSize(15),
        paddingHorizontal:scaleSize(30),
        backgroundColor:'#f83c3c',
        flexDirection:'row',
    },
    authorityClass:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:scaleSize(10),
    },
    terminalCode:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderTopColor:'#eee',
        borderTopWidth:scaleSize(1),
        borderBottomColor:'#eee',
        borderBottomWidth:scaleSize(1),
        marginBottom:scaleSize(20),
    },
    terminalMargin:{
        paddingVertical:scaleSize(80),
    },
    codeText:{
        fontSize:scaleSize(20),
        color:'#999',
        marginTop:scaleSize(40),
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
        width:scaleSize(160),
        color:'#333',
    },
    applyInput: {
        width:scaleSize(300),
        marginLeft:scaleSize(60),
        padding:scaleSize(0),
        fontSize:scaleSize(28),
    },
    sendButton:{
        width:scaleSize(120),
        height:scaleSize(46),
        backgroundColor:'#ee2424',
        borderRadius:scaleSize(10),
        marginLeft:scaleSize(0),
    },
    terminalInstructions:{
        width:width*0.7,
        justifyContent:'flex-start',
        flexDirection:'row',
        marginTop:scaleSize(50),
    },
});