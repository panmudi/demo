import React, { Component } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scaleSize} from '../../util/px2dp';
import NavigationBarM from '../../common/NavigationBarM';
import StorageUtil from "../../util/StorageUtil";
import moment from 'moment';
import NavigatorUtil from "../../util/NavigatorUtil";

var navigation = null;   //清除路由

moment().format('YYYY-MM-DD HH:mm:ss')

export default class ReceiptDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNo: '',
            amount: '',
            updateTime: '',
            paymentAccount: ''
        };
        navigation = this.props.navigation;  //调用组件
    }

    componentWillMount() {
        StorageUtil.get("orderInfo").then((value) => {
            if (value) {
                this.setState({
                    orderNo: value.orderNo,
                    amount: value.amount,
                    updateTime: moment(value.updateTime).format("YYYY-MM-DD HH:mm:ss"),
                    paymentAccount: value.paymentAccount
                })
            }
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
                <NavigationBarM
                    title='订单详情'
                    style={{backgroundColor: '#fff'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <View style={styles.receiptBottom}>
                    <View style={styles.receiptBox}>
                        <View style={styles.receiptTop}>
                            <View style={{alignItems: 'center'}}>
                                <Text style={{fontSize: scaleSize(24), color: '#333'}}>支付成功</Text>
                                <Image
                                    style={{width: scaleSize(95), height: scaleSize(95), marginVertical: scaleSize(20)}}
                                    source={require('../../../res/images/success.png')}/>
                            </View>
                            <View style={{paddingTop: scaleSize(15)}}>
                                <View style={styles.accountText}>
                                    <Text style={{color: '#999', fontSize: scaleSize(24),}}>商户名</Text>
                                    <Text style={{color: '#333', fontSize: scaleSize(24),}}>一呗支付</Text>
                                </View>
                                <View style={styles.accountText}>
                                    <Text style={{color: '#999', fontSize: scaleSize(24),}}>订单号</Text>
                                    <Text style={{color: '#333', fontSize: scaleSize(24),}}>{this.state.orderNo}</Text>
                                </View>
                                <View style={styles.accountText}>
                                    <Text style={{color: '#999', fontSize: scaleSize(24),}}>交易金额</Text>
                                    <Text style={{color: '#333', fontSize: scaleSize(24),}}>¥{this.state.amount}</Text>
                                </View>
                            </View>
                            <View style={{
                                borderTopWidth: scaleSize(1),
                                borderTopColor: '#eee',
                                marginTop: scaleSize(15),
                                marginHorizontal: scaleSize(70)
                            }}></View>
                            <View style={{paddingTop: scaleSize(15)}}>
                                <View style={styles.accountText}>
                                    <Text style={{color: '#999', fontSize: scaleSize(24),}}>实付金额</Text>
                                    <Text style={{color: '#333', fontSize: scaleSize(24),}}>¥{this.state.amount}</Text>
                                </View>
                                <View style={styles.accountText}>
                                    <Text style={{color: '#999', fontSize: scaleSize(24),}}>付款时间</Text>
                                    <Text
                                        style={{color: '#333', fontSize: scaleSize(24),}}>{this.state.updateTime}</Text>
                                </View>
                                <View style={styles.accountText}>
                                    <Text style={{color: '#999', fontSize: scaleSize(24),}}>付款账号号</Text>
                                    <Text style={{
                                        color: '#333',
                                        fontSize: scaleSize(24),
                                    }}>{this.state.paymentAccount}</Text>
                                </View>
                            </View>
                            <Image style={styles.receiptCodeImg} source={require('../../../res/images/bg_01.png')}/>
                        </View>
                    </View>
                    {/*按钮*/}
                    {/*<View style={styles.receiptBtn}>*/}
                    {/*<Text style={styles.reBtnSet}>退款</Text>*/}
                    {/*</View>*/}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
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
    accountText: {
        marginVertical: scaleSize(15),
        marginHorizontal: scaleSize(70),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#999',
        fontSize: scaleSize(24),
    },
    receiptBtn: {
        height: scaleSize(98),
        backgroundColor: '#fff',
        shadowColor: '#eeeeee',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    receiptBtn: {
        width: scaleSize(800),
        height: scaleSize(98),
        backgroundColor: '#fff',
        shadowColor: '#eeeeee',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: scaleSize(0),
        left: scaleSize(0),
        zIndex: 10,
    },
    reBtnSet: {
        width: scaleSize(690),
        height: scaleSize(70),
        lineHeight: scaleSize(70),
        backgroundColor: '#ee2424',
        textAlign: 'center',
        color: '#fff',
        borderRadius: scaleSize(10),
    },
})
