import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    Platform,
    DeviceEventEmitter
} from 'react-native';
import {scaleSize} from '../../util/px2dp';
import NavigationBar from '../../common/NavigationBar';
import {Dimensions} from 'react-native'
import ReceiptCode from "../receipt/receiptCode";
import HttpUtil from "../../util/HttpUtil";
import {API, LISTENER} from "../../common/Const";
import StorageUtil from "../../util/StorageUtil";
import { Toast} from 'antd-mobile-rn';
import NavigatorUtil from "../../util/NavigatorUtil";
import TerminalDetails from "../terminal/TerminalDetails";

const {width, height} = Dimensions.get('window');

const amountExp = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/;

const arrowDown = require('../../../res/images/rIcon10.png');
const arrowUp = require('../../../res/images/rIcon11.png');


var navigation = null;   //清除路由
export default class Receipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            amountText: '',
            switchState:false,

            selType: 'sel6',//分期类型
            selState: false,//选中状态
            kbState:true,


            isMerchantPay: true,
            isCustomPay: false,

            feeSD: false,
            feePD: false,

            feeImgUrl: arrowDown,
            feeImgUrlP: arrowDown,

            // cashState:false,//收款选中状态

            visible: false, //modal
            feeDetail: {    //后台计算费用明细
                installment3: undefined,
                installment6: undefined,
                installment12: undefined,
                installment24: undefined
            },  //整个费用明细
            username: '',
            installmentDetail: {    //单个选中的分期的明细
                installmentFee: '0.00',
                perInstallmentFee: '0.00',
                merchantActualAmountOfMerchantPay: '0.00',
                merchantActualAmountOfCustomPay: '0.00',
                receiptAmount: '0.00',
                transactionFee: '0.00',
                customActualAmountOfMerchantPay: '0.00',
                customActualAmountOfCustomPay: '0.00'
            },

            fqNum: '',
            fqPercent: '',

        };
        navigation = this.props.navigation;  //调用组件

        this.typeAmount = this.typeAmount.bind(this);
        this.backspaceAmount = this.backspaceAmount.bind(this);
        this.clearAmount = this.clearAmount.bind(this);
        this.confirmAmount = this.confirmAmount.bind(this);
    }

    static navigationOptions = {
        title: '收款',
        headerTintColor: '#ee2424',
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: scaleSize(32),
            textAlign: 'center',
        },
    };

    componentDidMount() {
        var self = this;
        self._initData();
        this.listener = DeviceEventEmitter.addListener(LISTENER.terminalInfo, () => {
            self._initData();
        });
    }

    //卸载消息监听
    componentWillUnmount() {
        this.listener.remove();
    }

    //初始化终端数据
    _initData() {

    }

    componentWillMount() {
        StorageUtil.get("userInfo").then((value) => {
            this.setState({
                username: value.username
            })
        });
    }

    loadReceiptCode() {
        if (this.state.isMerchantPay && !this.state.isCustomPay) {
            this.setState({
                fqPercent: '100'
            })
        }else if(!this.state.isMerchantPay && this.state.isCustomPay){
            this.setState({
                fqPercent: '0'
            })
        }else {
            this.setState({
                fqPercent: '100'
            })
        }
        if (this.state.selType === 'sel3') {
            this.setState({
                fqNum: '3'
            })
        }else if (this.state.selType === 'sel6') {
            this.setState({
                fqNum: '6'
            })
        }else if (this.state.selType === 'sel12') {
            this.setState({
                fqNum: '12'
            })
        }
        if (this.state.amountText.trim().length === 0 || this.state.amountText === '0'){
            Toast.fail('请输入收款金额',1);
            return;
        }
        const {amountText} = this.state;
        const {fqPercent} = this.state;
        const {fqNum} = this.state;

        navigation.navigate('ReceiptCode', {amountText,fqPercent,fqNum})
    }

    loadQRScanner() {
        if (this.state.isMerchantPay && !this.state.isCustomPay) {
            this.setState({
                fqPercent: '100'
            })
        }else if(!this.state.isMerchantPay && this.state.isCustomPay){
            this.setState({
                fqPercent: '0'
            })
        }else {
            this.setState({
                fqPercent: '100'
            })
        }
        if (this.state.selType === 'sel3') {
            this.setState({
                fqNum: '3'
            })
        }else if (this.state.selType === 'sel6') {
            this.setState({
                fqNum: '6'
            })
        }else if (this.state.selType === 'sel12') {
            this.setState({
                fqNum: '12'
            })
        }
        if (this.state.amountText.trim().length === 0 || this.state.amountText === '0'){
            Toast.fail('请输入收款金额',1);
            return;
        }
        const {amountText} = this.state;
        const {fqPercent} = this.state;
        const {fqNum} = this.state;
        navigation.navigate('QRScanner', {amountText,fqPercent,fqNum})
    }

    calcFee(inputAmount) {
        HttpUtil.get(API.feeDetail + inputAmount)
            .then((json) => {
                if (json.code === 0 && json.data) {
                    this.setState({
                        amountText: inputAmount,
                        feeDetail: json.data,
                    })
                    if (this.state.selState) {
                        if (this.state.selType === 'sel3') {
                            this.setState({
                                installmentDetail: this.state.feeDetail.installment3
                            })
                        }
                        if (this.state.selType === 'sel6') {
                            this.setState({
                                installmentDetail: this.state.feeDetail.installment6
                            })
                        }
                        if (this.state.selType === 'sel12') {
                            this.setState({
                                installmentDetail: this.state.feeDetail.installment12
                            })
                        }
                        if (this.state.selType === 'sel24') {
                            this.setState({
                                installmentDetail: this.state.feeDetail.installment24
                            })
                        }
                    }
                }
            }, (error) => {
                console.log(error)
            });
    }


    //数字键盘键入金额
    typeAmount(text) {
        let inputAmount = this.state.amountText + text;
        if (this.state.amountText === '0' && text !== '.' && text !== '0' && text !== '00') {
            inputAmount = text;
        }
        let isMatch = amountExp.test(inputAmount);
        if (isMatch) {
            var finalAmount = Number(inputAmount);
            if (finalAmount > 1000000) {
                Toast.fail('金额不得高于100万',1);
            } else if (finalAmount < 0.01 && inputAmount.length === 4) {
                Toast.fail('金额不得小于0.01元',1);
            } else {
                this.calcFee(inputAmount)
            }
        }
    }

    //金额数字全部退格
    clearAmount() {
        this.setState({
            amountText: '',
            feeDetail: {
                installment3: undefined,
                installment6: undefined,
                installment12: undefined,
                installment24: undefined
            },
            installmentDetail: {
                installmentFee: '0.00',
                perInstallmentFee: '0.00',
                merchantActualAmountOfMerchantPay: '0.00',
                merchantActualAmountOfCustomPay: '0.00',
                receiptAmount: '0.00',
                transactionFee: '0.00',
                customActualAmountOfMerchantPay: '0.00',
                customActualAmountOfCustomPay: '0.00'
            },
        })
    }

    //金额数字退格
    backspaceAmount() {
        if (this.state.amountText.length > 1) {
            let inputAmount = this.state.amountText.substring(0, this.state.amountText.length - 1);
            this.calcFee(inputAmount)
        } else if (this.state.amountText.length === 1) {
            this.setState({
                amountText: '',
                feeDetail: {
                    installment3: undefined,
                    installment6: undefined,
                    installment12: undefined,
                    installment24: undefined
                },
                installmentDetail: {
                    installmentFee: '0.00',
                    perInstallmentFee: '0.00',
                    merchantActualAmountOfMerchantPay: '0.00',
                    merchantActualAmountOfCustomPay: '0.00',
                    receiptAmount: '0.00',
                    transactionFee: '0.00',
                    customActualAmountOfMerchantPay: '0.00',
                    customActualAmountOfCustomPay: '0.00'
                },
            })
        }
    }

    //确认金额
    confirmAmount() {
        this.setState({
            kbState:false,
        });
    }

    //选中分期3期
    _onPressInstallment3() {
        if (this.state.selType === 'sel3' && this.state.selState) {
            this.setState({
                selState: false,
            });
        } else {
            this.setState({
                selState: true,
            });
        }
        this.setState({
            selType: 'sel3',
            installmentDetail: this.state.feeDetail.installment3
        });
    }

    //选中分期6期
    _onPressInstallment6() {
        if (this.state.selType === 'sel6' && this.state.selState) {
            this.setState({
                selState: false,
            });
        } else {
            this.setState({
                selState: true,
            });
        }
        this.setState({
            selType: 'sel6',
            installmentDetail: this.state.feeDetail.installment6
        });
    }

    //选中分期12期
    _onPressInstallment12() {
        if (this.state.selType === 'sel12' && this.state.selState) {
            this.setState({
                selState: false,
            });
        } else {
            this.setState({
                selState: true,
            });
        }
        this.setState({
            selType: 'sel12',
            installmentDetail: this.state.feeDetail.installment12
        });
    }

    //选中分期24期
    _onPressInstallment24() {
        if (this.state.selType === 'sel24' && this.state.selState) {
            this.setState({
                selState: false,
            });
        } else {
            this.setState({
                selState: true,
            });
        }
        this.setState({
            selType: 'sel24',
            installmentDetail: this.state.feeDetail.installment24
        });
    }

    //点击商户承担
    _onPressMerchantPay() {
        if (this.state.isMerchantPay) {
            this.setState({
                isMerchantPay: true,
                feeSD: false,
                feePD: false,
                feeImgUrl: arrowDown,
                feeImgUrlP: arrowDown,
            });
        } else {
            this.setState({
                isMerchantPay: true,
                isCustomPay: false,
                feeSD: false,
                feePD: false,
                feeImgUrl: arrowDown,
                feeImgUrlP: arrowDown,
            });
        }
    }

    //点击客户承担
    _onPressCustomPay() {
        if (this.state.isCustomPay) {
            this.setState({
                isCustomPay: true,
                feeSD: false,
                feePD: false,
                feeImgUrl: arrowDown,
                feeImgUrlP:arrowDown,
            });
        } else {
            this.setState({
                isMerchantPay: false,
                isCustomPay: true,
                feeSD: false,
                feePD: false,
                feeImgUrl: arrowDown,
                feeImgUrlP:arrowDown,
            });
        }
    }

    //
    _onPressButtonSD() {
        this.setState({
            feeImgUrlP:arrowDown,
        })
        this.state.feeSD ? this.setState({
            feeSD: false,
            feePD: false,
            feeImgUrl: arrowDown,
        }) : this.setState({
            feeSD:true,
            feePD:  false,
            feeImgUrl: arrowUp,
        })


    }

    _onPressButtonPD() {
        if(this.state.isCustomPay){
            this.setState({
                feeImgUrl:arrowDown,
            })
            this.state.feePD ? this.setState({
                feePD: false,
                feeSD: false,
                feeImgUrlP:arrowDown,
            }) : this.setState({
                feePD: true,
                feeSD: false,
                feeImgUrlP: arrowUp,
            })
        }

    }

    //model
    show() {
        this.setState({
            visible: true
        })
    }

    dismiss() {
        this.setState({
            visible: false
        })
    }

    _onPressModal() {
        this.props.navigation.navigate('SelectMerchant');
        this.dismiss()
    }

    renderButton(image){
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={()=>{
                this.setState({
                    switchState:!this.state.switchState
                })
            }}>
            <Image
                style={{width:scaleSize(36), height:scaleSize(34)}}
                source={image}/>
        </TouchableOpacity>;
    }

    switchTerminal(){
        const {navigation} = this.props;
        navigation.navigate('TerminalList');
        this.setState({
            switchState:false,
        })
    }

    render() {
        const {kbState,selType, selState, isMerchantPay, isCustomPay, feeSD, feePD, feeImgUrl,feeImgUrlP,switchState} = this.state
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='收款'
                    style={{backgroundColor: '#ee2424'}}
                    rightButton={this.renderButton(require('../../../res/images/commercial/icon_04.png'))}
                />

                <ScrollView>
                    {/**/}
                    <TouchableOpacity onPress={()=>navigation.navigate('TerminalDetails')} activeOpacity={5}>
                        <View style={styles.name}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{color: '#333', fontSize: scaleSize(26),}}>{this.state.username}</Text>
                                <TouchableOpacity onPress={()=>navigation.navigate('TerminalGrade')}>
                                    <View style={styles.gradeBox}>
                                        <Image source={require('../../../res/images/commercial/icon_06.png')} style={{width:scaleSize(20),height:scaleSize(20),marginRight:scaleSize(5)}} />
                                        <Text style={{color:'#ff6464',fontSize:scaleSize(17)}}>等级P4</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/**/}
                            <View style={styles.payType}>
                                {/**/}
                                <View style={styles.pTItem}>
                                    <Image style={{width: scaleSize(26), height: scaleSize(26),}}
                                           source={require('../../../res/images/rIcon01.png')}/>
                                    <Text style={{
                                        color: '#555',
                                        fontSize: scaleSize(20),
                                        marginLeft: scaleSize(8)
                                    }}>支付宝</Text>
                                </View>
                                {/**/}
                                <View style={styles.pTItem}>
                                    <Image style={{width: scaleSize(26), height: scaleSize(26),}}
                                           source={require('../../../res/images/bank.png')}/>
                                    <Text style={{
                                        color: '#555',
                                        fontSize: scaleSize(20),
                                        marginLeft: scaleSize(8)
                                    }}>储蓄卡</Text>
                                </View>
                                {/**/}
                                <View style={styles.pTItem}>
                                    <Image style={{width: scaleSize(26), height: scaleSize(26),}}
                                           source={require('../../../res/images/bank.png')}/>
                                    <Text style={{
                                        color: '#555',
                                        fontSize: scaleSize(20),
                                        marginLeft: scaleSize(8)
                                    }}>银行卡</Text>
                                </View>
                                {/**/}
                                <View style={styles.pTItem}>
                                    <Image style={{width: scaleSize(26), height: scaleSize(26),}}
                                           source={require('../../../res/images/rIcon02.png')}/>
                                    <Text
                                        style={{color: '#555', fontSize: scaleSize(20), marginLeft: scaleSize(8)}}>花呗</Text>
                                </View>
                                {/**/}
                                <View style={styles.pTItem}>
                                    <Image style={{width: scaleSize(32), height: scaleSize(27),}}
                                           source={require('../../../res/images/rIcon03.png')}/>
                                    <Text style={{
                                        color: '#aaa',
                                        fontSize: scaleSize(20),
                                        marginLeft: scaleSize(8)
                                    }}>花呗分期</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/**/}
                    <View style={{backgroundColor: '#f5f5f5',height:scaleSize(20)}}></View>
                    {/**/}
                    <View style={[styles.calc]}>
                        <View style={styles.topArea}>
                            <View style={styles.calcItem}>
                                <Image style={{width: scaleSize(30), height: scaleSize(30),}}
                                       source={require('../../../res/images/rIcon04.png')}/>
                                <Text style={{
                                    color: '#555',
                                    fontSize: scaleSize(24),
                                    marginLeft: scaleSize(8)
                                }}>收款金额</Text>
                            </View>
                            {/**/}
                            <View style={styles.calcInput}>
                                <Text
                                    style={{color: '#333', fontSize: scaleSize(36), marginTop: scaleSize(-3)}}>¥</Text>
                                <TextInput maxLength={11} keyboardType={'numeric'} value={this.state.amountText}
                                           style={styles.RinputText} editable={false}
                                           // placeholder="请输入金额"
                                           underlineColorAndroid='transparent'
                                           placeholderTextColor='#999'
                                />
                            </View>
                        </View>
                        {/**/}
                        <View style={[styles.calcKb,kbState?'':styles.hide]}>
                            <View style={styles.kbLeft}>
                                {/**/}
                                <View style={styles.grid}>
                                    <TouchableOpacity onPress={() => this.typeAmount('1')}>
                                        <View style={styles.gridText}>
                                            <Text>1</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/**/}
                                <View style={styles.grid}>
                                    <TouchableOpacity onPress={() => this.typeAmount('2')}>
                                        <View style={styles.gridText}>
                                            <Text>2</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/**/}
                                <View style={styles.grid}>
                                    <TouchableOpacity onPress={() => this.typeAmount('3')}>
                                        <View style={styles.gridText}>
                                            <Text>3</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/**/}
                                <View style={styles.grid}>
                                    <TouchableOpacity onPress={() => this.typeAmount('4')}>
                                        <View style={styles.gridText}>
                                            <Text>4</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/**/}
                                <View style={styles.grid}>
                                    <TouchableOpacity onPress={() => this.typeAmount('5')}>
                                        <View style={styles.gridText}>
                                            <Text>5</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/**/}
                                <View style={styles.grid}>
                                    <TouchableOpacity onPress={() => this.typeAmount('6')}>
                                        <View style={styles.gridText}>
                                            <Text>6</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/**/}
                                <View style={styles.grid}>
                                    <TouchableOpacity onPress={() => this.typeAmount('7')}>
                                        <View style={styles.gridText}>
                                            <Text>7</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/**/}
                                <View style={styles.grid}>
                                    <TouchableOpacity onPress={() => this.typeAmount('8')}>
                                        <View style={styles.gridText}>
                                            <Text>8</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/**/}
                                <View style={styles.grid}>
                                    <TouchableOpacity onPress={() => this.typeAmount('9')}>
                                        <View style={styles.gridText}>
                                            <Text>9</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/**/}
                                <View style={styles.grid}>
                                    <TouchableOpacity onPress={() => this.typeAmount('.')}>
                                        <View style={styles.gridText}>
                                            <Text>.</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/**/}
                                <View style={styles.grid}>
                                    <TouchableOpacity onPress={() => this.typeAmount('0')}>
                                        <View style={styles.gridText}>
                                            <Text>0</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/**/}
                                <View style={styles.grid}>
                                    <TouchableOpacity onPress={() => this.typeAmount('00')}>
                                        <View style={styles.gridText}>
                                            <Text>00</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/**/}
                            <View style={styles.kbRight}>
                                <TouchableOpacity onPress={() => this.backspaceAmount()}
                                                  onLongPress={() => this.clearAmount()}>
                                    <View style={styles.gridL}>
                                        <Image style={{width: scaleSize(40), height: scaleSize(26),}}
                                               source={require('../../../res/images/rIcon06.png')}/>
                                    </View>
                                </TouchableOpacity>
                                {/**/}
                                <TouchableOpacity
                                    onPress={() => this.confirmAmount()}
                                    disabled={this.state.amountText.length>0?false:true}
                                >
                                    <View style={[styles.gridL, styles.red,(this.state.amountText.length===0)?styles.disableBtn:'']}>
                                        <Text style={{color: '#fff',}}>确定</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/**/}
                        </View>
                        <View style={[kbState?styles.hide:'']}>
                            <TouchableOpacity
                                onPress={() => { this.setState({
                                    kbState:true,
                                });}}
                            >
                                <View style={{height:scaleSize(60),alignItems: 'center',
                                    justifyContent: 'center',}}>
                                    <Text style={{color:'#ee2424',fontSize:scaleSize(24)}}> <Image style={{marginRight:scaleSize(10),width: scaleSize(39), height: scaleSize(21),resizeMode: 'contain',}}
                                                                                                   source={require('../../../res/images/rIcon12.png')}/> 打开键盘</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/**/}
                    <View style={{backgroundColor: '#f5f5f5',height:scaleSize(20)}}></View>
                    {/**/}
                    <View style={[{backgroundColor: '#fff', flexGrow: 1,}]}>
                        <View style={[styles.stages,]}>
                            {/**/}
                            <View style={[styles.topArea,{paddingVertical: scaleSize(15)}]}>
                                <View style={styles.calcItem}>
                                    <Image style={{width: scaleSize(36), height: scaleSize(31),}}
                                           source={require('../../../res/images/rIcon07.png')}/>
                                    <Text style={{
                                        color: '#555',
                                        fontSize: scaleSize(24),
                                        marginLeft: scaleSize(8)
                                    }}>分期收款(不可选)</Text>
                                </View>
                            </View>
                            {/**/}
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                        style={{height: scaleSize(145)}}>
                                <View style={[styles.staArea]}>
                                    <TouchableOpacity onPress={this._onPressInstallment3.bind(this)} activeOpacity={1}
                                                      disabled={this.state.feeDetail.installment3 ? false : true}>
                                        <View
                                            style={[styles.staGrid, (selType === 'sel3' && selState) ? styles.active : '']}>
                                            <Text
                                                style={[styles.staText, (selType === 'sel3' && selState) ? styles.activeText : '']}>分3期</Text>
                                            <Text
                                                style={[styles.staText, (selType === 'sel3' && selState) ? styles.activeText : '']}>¥{this.state.feeDetail.installment3 ? this.state.feeDetail.installment3.perInstallmentFee : '0.00'}/期</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this._onPressInstallment6.bind(this)} activeOpacity={1}
                                                      disabled={this.state.feeDetail.installment6 ? false : true}>
                                        <View
                                            style={[styles.staGrid, (selType === 'sel6' && selState) ? styles.active : '']}>
                                            <Text
                                                style={[styles.staText, (selType === 'sel6' && selState) ? styles.activeText : '']}>分6期</Text>
                                            <Text
                                                style={[styles.staText, (selType === 'sel6' && selState) ? styles.activeText : '']}>¥{this.state.feeDetail.installment6 ? this.state.feeDetail.installment6.perInstallmentFee : '0.00'}/期</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this._onPressInstallment12.bind(this)} activeOpacity={1}
                                                      disabled={this.state.feeDetail.installment12 ? false : true}>
                                        <View
                                            style={[styles.staGrid, (selType === 'sel12' && selState) ? styles.active : '']}>
                                            <Text
                                                style={[styles.staText, (selType === 'sel12' && selState) ? styles.activeText : '']}>分12期</Text>
                                            <Text
                                                style={[styles.staText, (selType === 'sel12' && selState) ? styles.activeText : '']}>¥{this.state.feeDetail.installment12 ? this.state.feeDetail.installment12.perInstallmentFee : '0.00'}/期</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this._onPressInstallment24.bind(this)} activeOpacity={1}
                                                      disabled={this.state.feeDetail.installment24 ? false : true}>
                                        <View
                                            style={[styles.staGrid, (selType === 'sel24' && selState) ? styles.active : '']}>
                                            <Text
                                                style={[styles.staText, (selType === 'sel24' && selState) ? styles.activeText : '']}>分24期</Text>
                                            <Text
                                                style={[styles.staText, (selType === 'sel24' && selState) ? styles.activeText : '']}>¥{this.state.feeDetail.installment24 ? this.state.feeDetail.installment24.perInstallmentFee : '0.00'}/期</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </ScrollView>

                            {/*
                            费用承担
                            */}
                            <View style={[styles.fee, selState ? '' : styles.hide]}>
                                <View style={styles.feeTop}>
                                    <View>
                                        <Text style={{fontSize: scaleSize(24), color: '#333'}}>手续费</Text>
                                    </View>
                                    <View style={styles.feeTopBtn}>
                                        <TouchableOpacity onPress={this._onPressMerchantPay.bind(this)}
                                                          activeOpacity={1}>
                                            <View style={[styles.feeBar, isMerchantPay ? styles.feeBarActive : '']}>
                                                <Text style={[{
                                                    fontSize: scaleSize(20),
                                                    color: '#999'
                                                }, isMerchantPay ? styles.feeBarActiveText : '']}>商家承担</Text>
                                            </View>
                                        </TouchableOpacity>

                                        {/**/}
                                        <TouchableOpacity onPress={this._onPressCustomPay.bind(this)} activeOpacity={1}>
                                            <View style={[styles.feeBar, isCustomPay ? styles.feeBarActive : '']}>
                                                <Text style={[{
                                                    fontSize: scaleSize(20),
                                                    color: '#999'
                                                }, isCustomPay ? styles.feeBarActiveText : '']}>顾客承担</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                                {/*
                                */}
                                <View style={styles.cash}>
                                    <TouchableOpacity onPress={this._onPressButtonSD.bind(this)} activeOpacity={1}>
                                        <View style={styles.cashItem}>
                                            <Text style={[{fontSize: scaleSize(24), color: '#333'}]}>商家实收</Text>
                                            <View style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                display: 'flex'
                                            }}>
                                                <Text style={[{
                                                    fontSize: scaleSize(24),
                                                    color: '#ee2424'
                                                }]}>¥{this.state.isMerchantPay ? this.state.installmentDetail.merchantActualAmountOfMerchantPay : this.state.installmentDetail.merchantActualAmountOfCustomPay}</Text>
                                                <Image style={styles.downImage} source={feeImgUrl}/>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    {/**/}
                                    <View style={[styles.cashItemDA, feeSD ? '' : styles.hide]}>
                                        <View style={styles.cashItemD}>
                                            <Text style={[{fontSize: scaleSize(24), color: '#555'}]}>收款金额</Text>
                                            <View>
                                                <Text style={[{
                                                    fontSize: scaleSize(24),
                                                    color: '#555'
                                                }]}>¥{this.state.installmentDetail.receiptAmount}
                                                </Text>
                                            </View>
                                        </View>
                                        {/**/}
                                        <View style={[styles.cashItemD,isMerchantPay?'':styles.hide]}>
                                            <Text style={[{fontSize: scaleSize(24), color: '#555'}]}>手续费</Text>
                                            <View>
                                                <Text style={[{
                                                    fontSize: scaleSize(24),
                                                    color: '#555'
                                                }]}>-¥{this.state.installmentDetail.installmentFee}
                                                </Text>
                                            </View>
                                        </View>
                                        {/**/}
                                        <View style={styles.cashItemD}>
                                            <Text style={[{fontSize: scaleSize(24), color: '#555'}]}>交易手续费</Text>
                                            <View>
                                                <Text style={[{
                                                    fontSize: scaleSize(24),
                                                    color: '#555'
                                                }]}>-¥{this.state.installmentDetail.transactionFee}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/**/}
                                    <TouchableOpacity onPress={this._onPressButtonPD.bind(this)} activeOpacity={1}>
                                        <View style={styles.cashItem}>
                                            <Text style={[{fontSize: scaleSize(24), color: '#333'}]}>顾客实付</Text>
                                            <View style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                display: 'flex'
                                            }}>
                                                <Text style={[{
                                                    fontSize: scaleSize(24),
                                                    color: '#ee2424'
                                                }]}>¥{this.state.isMerchantPay? this.state.installmentDetail.customActualAmountOfMerchantPay: this.state.installmentDetail.customActualAmountOfCustomPay}</Text>
                                                <Image style={[styles.downImage,isMerchantPay?styles.hide:'']}
                                                       source={feeImgUrlP}/>
                                            </View>
                                        </View>
                                    </TouchableOpacity>


                                    {/**/}
                                    <View style={[isCustomPay ? '':styles.hide]}>
                                        <View style={[styles.cashItemDA, feePD ? '' : styles.hide]}>
                                            <View style={styles.cashItemD}>
                                                <Text style={[{fontSize: scaleSize(24), color: '#555'}]}>收款金额</Text>
                                                <View>
                                                    <Text style={[{
                                                        fontSize: scaleSize(24),
                                                        color: '#555'
                                                    }]}>¥{this.state.installmentDetail.receiptAmount}
                                                    </Text>
                                                </View>
                                            </View>
                                            {/**/}
                                            <View style={[styles.cashItemD,isMerchantPay?styles.hide:'']}>
                                                <Text style={[{fontSize: scaleSize(24), color: '#555'}]}>手续费</Text>
                                                <View>
                                                    <Text style={[{
                                                        fontSize: scaleSize(24),
                                                        color: '#555'
                                                    }]}>-¥{this.state.installmentDetail.installmentFee}
                                                    </Text>
                                                </View>
                                            </View>
                                            {/**/}
                                        </View>
                                    </View>

                                </View>
                            </View>

                            {/**/}
                            <View style={{height: scaleSize(240)}}></View>
                        </View>
                    </View>

                </ScrollView>
                {/**/}
                <View style={[styles.receipt, {backgroundColor: '#fff',}]}>
                    <TouchableOpacity onPress={() => this.loadQRScanner()}>
                        <View style={[styles.receiptCode]}>
                            <Image style={{width: scaleSize(40), height: scaleSize(40),}}
                                   source={require('../../../res/images/rIcon08.png')}/>
                            <Text style={{color: '#fff', fontSize: scaleSize(24), marginLeft: scaleSize(15)}}>去扫码收款</Text>
                        </View>
                    </TouchableOpacity>
                    {/**/}
                    <TouchableOpacity onPress={() => this.loadReceiptCode()}>
                        <View style={[styles.receiptCode]}>
                            <Image style={{width: scaleSize(40), height: scaleSize(40),}}
                                   source={require('../../../res/images/rIcon09.png')}/>
                            <Text
                                style={{color: '#fff', fontSize: scaleSize(24), marginLeft: scaleSize(15)}}>生成收款码</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/*进件引导*/}
                {/*<ScrollView><View style={{width:width}}><Image style={{width:width,height:scaleSize(1802)}} source={require('../../../res/images/guide.png')} /></View></ScrollView>*/}
                {/**/}
                {/*<Modal*/}
                    {/*transparent={true}*/}
                    {/*visible={this.state.visible}*/}
                    {/*onRequestClose={() => {*/}
                        {/*alert("Modal has been closed.")*/}
                    {/*}}*/}
                {/*>*/}
                    {/*<View style={styles.containerM}>*/}
                        {/*<TouchableOpacity*/}
                            {/*onPress={() => this.dismiss()}*/}
                            {/*style={styles.jj_closeA}*/}
                        {/*>*/}
                            {/*<View>*/}
                                {/*/!*<Text>111</Text>*!/*/}
                                {/*<Image source={require('../../../res/images/jj_close.png')} style={styles.jj_close}/>*/}
                            {/*</View>*/}
                        {/*</TouchableOpacity>*/}

                        {/*<View style={styles.jjArea}>*/}
                            {/*<Image source={require('../../../res/images/jj01.png')} style={styles.jjImg}/>*/}
                            {/*<Text style={[styles.jjT1, styles.mt50, styles.mb20]}>注册成功，等待您去进件</Text>*/}
                            {/*<Text style={styles.jjT2}>您的商户权限为“支付宝”。</Text>*/}
                            {/*<TouchableOpacity activeOpacity={0.8} onPress={this._onPressModal.bind(this)}*/}
                                              {/*style={{marginTop: scaleSize(60)}}>*/}
                                {/*<View style={styles.btn}>*/}
                                    {/*<Text style={{*/}
                                        {/*color: '#fff',*/}
                                        {/*fontSize: scaleSize(32),*/}
                                        {/*textAlign: 'center',*/}
                                        {/*lineHeight: scaleSize(70)*/}
                                    {/*}}>去进件</Text>*/}
                                {/*</View>*/}
                            {/*</TouchableOpacity>*/}
                            {/*/!**!/*/}
                        {/*</View>*/}
                        {/*/!**!/*/}
                    {/*</View>*/}

                {/*</Modal>*/}
                <View style={[styles.switchHidden,switchState === true ? styles.switchBox : '']}>
                    <TouchableOpacity onPress={()=>this.switchTerminal()}>
                        <Image source={require('../../../res/images/commercial/switchImg.png')} style={{width:scaleSize(170),height:scaleSize(70),resizeMode:'cover',}} />
                        <View style={styles.switchSet}>
                            <Image source={require('../../../res/images/commercial/icon_05.png')} style={{width:scaleSize(22),height:scaleSize(22),resizeMode:'contain',marginRight:scaleSize(10)}}/>
                            <Text style={{color:'#fff',fontSize:scaleSize(24)}}>切换终端</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f5f5f5'
        backgroundColor: '#fff',
        position:'relative',
    },
    mt20: {
        marginTop: scaleSize(20)
    },
    name: {
        height: scaleSize(145),
        paddingHorizontal: scaleSize(30),
        paddingVertical: scaleSize(30),
        backgroundColor: '#fff',
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#eee',
    },
    payType: {
        flexDirection: 'row',
        marginTop: scaleSize(29),
    },
    pTItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: scaleSize(30),
    },
    calc: {
        backgroundColor: '#fff',
        borderTopWidth: scaleSize(1),
        borderTopColor: '#eee',
    },
    calcItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: scaleSize(250),
        marginRight: scaleSize(30),
    },
    calcInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // width: scaleSize(460),
    },
    RinputText: {
        width: scaleSize(360),
        fontSize: scaleSize(48),
        // height: scaleSize(30),
        paddingVertical: 0,
        color: '#333',
    },
    topArea: {
        paddingHorizontal: scaleSize(30),
        paddingVertical: scaleSize(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#eee',
    },
    calcKb: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    kbLeft: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: scaleSize(585),
        // flex: 3,
    },
    grid: {
        width: scaleSize(194),
        height: scaleSize(120),
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#eee',
        borderRightWidth: scaleSize(1),
        borderRightColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridText: {
        width: scaleSize(194),
        height: scaleSize(120),
        alignItems: 'center',
        justifyContent: 'center',
    },
    kbRight: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        flex: 1,
    },
    gridL: {
        display: 'flex',
        flexGrow: 1,
        height: scaleSize(240),
        alignItems: 'center',
        justifyContent: 'center',
    },
    red: {
        backgroundColor: '#ee2424',
    },
    stages: {
        backgroundColor: '#fff',
        // borderBottomWidth: scaleSize(1),
        // borderBottomColor: '#eee',
        borderTopWidth: scaleSize(1),
        borderTopColor: '#eee',
        // display: 'flex',
        // flexDirection: 'row',
        // alignItems: 'center',
    },

    staGrid: {
        width: scaleSize(248),
        height: scaleSize(112),
        borderRadius: scaleSize(4),
        borderWidth: scaleSize(1),
        borderColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scaleSize(20),
    },
    staArea: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: scaleSize(112),
        marginTop: scaleSize(30),
        // marginBottom:scaleSize(125),
        paddingHorizontal: scaleSize(30),
    },
    staText: {
        color: '#333',
        fontSize: scaleSize(22),
    },

    receipt: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scaleSize(30),
        position: 'absolute',
        bottom: scaleSize(-1),
        paddingBottom: scaleSize(40),
        width: width,
    },
    receiptCode: {
        width: scaleSize(335),
        height: scaleSize(120),
        borderRadius: scaleSize(4),
        backgroundColor: '#ee2424',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    //分期选中样式
    active: {
        backgroundColor: '#ee2424',
        borderColor: '#ee2424',
    },
    activeText: {
        color: '#fff',
    },
    fee: {
        backgroundColor: '#fff',
        height: scaleSize(300),
        marginTop: scaleSize(30),
    },
    feeTop: {
        height: scaleSize(65),
        paddingHorizontal: scaleSize(30),
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#eee',
        // alignItems:'center',
    },
    feeTopBtn: {
        display: 'flex',
        flexDirection: 'row',
        width: scaleSize(200),
        // borderWidth:scaleSize(1),
        // borderColor:'#eee',
    },
    feeBar: {
        width: scaleSize(100),
        height: scaleSize(38),
        borderWidth: scaleSize(1),
        borderColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    feeBarActive: {
        backgroundColor: '#ee2424',
        borderColor: '#ee2424',
    },
    feeBarActiveText: {
        color: '#fff',
    },
    cash: {
        flexDirection: 'column',
    },
    cashItem: {
        paddingHorizontal: scaleSize(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: scaleSize(60),
    },
    cashItemD: {
        paddingHorizontal: scaleSize(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cashItemDA: {
        backgroundColor: '#eee',
        paddingVertical: scaleSize(10),
    },
    hide: {
        display: 'none'
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
        height: scaleSize(460),
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
    },
    mt50: {
        marginTop: scaleSize(50),
    },
    mb20: {
        marginBottom: scaleSize(20),
    },
    btn: {
        width: scaleSize(260),
        height: scaleSize(70),
        backgroundColor: '#ee2424',
        borderRadius: scaleSize(35),
        // marginTop:scaleSize(60),
        // fontSize:setSpText(32),
    },
    downImage: {
        ...Platform.select({
            ios: {
                width: scaleSize(26),
                height: scaleSize(14),
                marginLeft: scaleSize(10),
                resizeMode: 'contain',
            },
            android: {
                width: scaleSize(26),
                height: scaleSize(14),
                marginLeft: scaleSize(10),
                resizeMode: 'contain',
            },
        }),
    },
    disableBtn:{
        opacity:0.7,
    },
    switchBox:{
        width:scaleSize(170),
        height:scaleSize(70),
        position:'absolute',
        top:scaleSize(90),
        right:scaleSize(20),
    },
    switchHidden:{
        right:-9999,
    },
    switchSet:{
        width:scaleSize(170),
        height:scaleSize(70),
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:scaleSize(0),
        right:scaleSize(0),
        zIndex:99
    },
    gradeBox:{
        borderColor:'#ff6464',
        borderWidth:scaleSize(1),
        paddingHorizontal:scaleSize(5),
        paddingVertical:scaleSize(3),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:scaleSize(20),
        borderRadius:scaleSize(5)
    }
})