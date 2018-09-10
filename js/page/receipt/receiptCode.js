import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {scaleSize} from '../../util/px2dp';
import NavigationBarL from '../../common/NavigationBarL';
import NavigatorUtil from "../../util/NavigatorUtil";
import QRCode from "react-native-qrcode";

import {API} from '../../common/Const';
import HttpUtil from "../../util/HttpUtil";
import StorageUtil from "../../util/StorageUtil";
import TimerUtil from "../../util/TimerUtil";
import ReceiptDetails from "./receiptDetails";

var navigation = null;   //清除路由

export default class ReceiptCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amountText: '',
            qrCode: 'https://qr.alipay.com/bax08837lffxi7nli5ws00ce',
            fqPercent: '',
            fqNum: ''
        };
        navigation = this.props.navigation;  //调用组件
    }

    componentWillMount() {
        const {navigation} = this.props;
        const amountText = navigation.getParam('amountText');
        const fqNum = navigation.getParam('fqNum');
        const fqPercent = navigation.getParam('fqPercent');
        this.setState({
            amountText: amountText,
            fqPercent: fqPercent,
            fqNum: fqNum
        });
        this.loadQrCodeText();
    }

    loadQrCodeText() {
        let _this = this;
        StorageUtil.get("auth").then((value) => {
            let formData = new FormData();
            formData.append("amount", this.state.amountText);
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
                <NavigationBarL
                    title='二维码收款'
                    style={{backgroundColor: '#f94343'}}
                    leftButton={this.renderButton(require('../../../res/images/back.png'))}
                />
                <View style={styles.receiptBottom}>
                    <View style={styles.receiptBox}>
                        <View style={styles.receiptTop}>
                            <Text style={{
                                fontSize: scaleSize(24), color: '#333',
                                marginBottom: scaleSize(60),
                            }}>此二维码仅限于向商家付款时使用</Text>
                            <QRCode
                                value={this.state.qrCode}
                                size={scaleSize(352)}
                                bgColor='black'
                                fgColor='white'/>
                            <Text style={{
                                marginTop: scaleSize(140),
                                fontSize: scaleSize(24),
                                color: '#888',
                                marginBottom: scaleSize(10)
                            }}>请扫描上方二维码进行支付</Text>
                            <Text style={{fontSize: scaleSize(32), color: '#333'}}>¥{this.state.amountText}</Text>
                            <Image style={styles.receiptCodeImg} source={require('../../../res/images/bg_02.png')}/>
                        </View>
                    </View>
                    <View style={styles.bottomIcon}>
                        <Image style={{width: scaleSize(32), height: scaleSize(32), marginRight: scaleSize(15)}}
                               source={require('../../../res/images/ceritificate.png')}/>
                        <Text style={{fontSize: scaleSize(26), color: '#fea1a1'}}>一呗</Text>
                    </View>
                    <Image style={styles.receiptLine} source={require('../../../res/images/bg_03.png')}/>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f94343',
    },
    receiptBottom: {
        flex: 1,
        position: 'relative',
    },
    receiptBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scaleSize(30),
    },
    receiptTop: {
        width: scaleSize(672),
        height: scaleSize(892),
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        paddingTop: scaleSize(125),
        paddingBottom: scaleSize(70),
    },
    receiptCodeImg: {
        width: scaleSize(672),
        height: scaleSize(892),
        position: 'absolute',
        top: scaleSize(0),
        left: scaleSize(0),
        zIndex: -1,
    },
    receiptCodeSet: {
        width: scaleSize(352),
        height: scaleSize(352),
    },
    receiptLine: {
        width: scaleSize(750),
        height: scaleSize(186),
        position: 'absolute',
        bottom: scaleSize(0),
        left: scaleSize(0),
        zIndex: -1,
    },
    bottomIcon: {
        width: scaleSize(750),
        position: 'absolute',
        bottom: scaleSize(60),
        left: scaleSize(0),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})