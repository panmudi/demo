import React, { Component } from 'react';
import { StyleSheet,
    Text,
    View,
    Button,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    TouchableNativeFeedback,
    TextInput,
    Modal,
} from 'react-native';

import {setSpText,scaleSize} from '../../util/px2dp';
import NavigationBarL from '../../common/NavigationBarL';
import NavigatorUtil from '../../util/NavigatorUtil';
import {arrowDown, arrowUp} from "../../common/Const";

const {width, height} = Dimensions.get('window');



export default class Wallet extends Component{

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            show:false,
            fliterType:'all',//10种类型(string)  all(所有)，receipt（收款），installment（分期），bonus（红包），earn（收益），withdraw（提现），disburse（支出），sell（销售），award（奖励），fee（手续费）
            amountRange:'',//金额区间
        };
        navigation = this.props.navigation;
    }

    //model
    show(){
        this.setState({
            visible: true
        })
    }

    dismiss() {
        this.setState({
            visible: false
        })
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

    //筛选
    _showFilter(){
        this.state.show?this.setState({
            show:false,
        }):this.setState({
            show:true,
        })

    }

    typeChoose(value){
        this.setState({
            fliterType:value,
        })
    }

    render() {
        const {show,fliterType}=this.state;
        return (

            <View style={styles.container}>
                <NavigationBarL
                    title='我的钱包'
                    style={{backgroundColor:'#ee2424'}}
                    leftButton={this.renderButton(require('../../../res/images/back.png'))}
                />
                {/*消息列表*/}
                {/*
                    账户余额
                */}
                <View style={styles.userInfoMid}>
                    {/**/}
                    <TouchableOpacity onPress={()=>navigation.navigate('Withdraw')}>
                    <Text style={{color:'#ffffff',fontSize:scaleSize(24),}}>账户余额</Text>
                    <View style={styles.userInfoDM}>
                        <Text style={{color:'#fff8ee',fontSize:scaleSize(28),}}>¥16800.00</Text>
                        <View style={styles.nextContainI}>
                            <Text style={{color:'#fff8ee',fontSize:scaleSize(20)}}>提现</Text>
                            <Image style={styles.nextIcon} source={require('../../../res/images/arrowLeft.png')} />
                        </View>
                    </View>
                    </TouchableOpacity>
                    {/*line*/}
                    <View style={styles.line}></View>
                    {/*arrowRight*/}
                    {/*<View style={styles.iconRight}>*/}
                    {/*<Image style={styles.arrowRight} source={require('../../../res/images/arrowLeft.png')} />*/}
                    {/*</View>*/}
                    <View style={{justifyContent:'space-between',flexDirection:'row',paddingTop:scaleSize(20)}}>
                        <View style={{flex:1,alignItems:'center',}}>
                           <View style={{flex:1,alignItems:'center',flexDirection:'row',display:'flex',}}>
                               <Text style={{color:'#fff8ee',fontSize:scaleSize(20),}}>未结算(元)</Text>
                                <TouchableOpacity onPress={() => this.show()}>
                                    <Image style={{width:scaleSize(20),height:scaleSize(20),marginLeft:scaleSize(10)}} source={require('../../../res/images/doubt.png')} />
                                </TouchableOpacity>
                           </View>
                            <Text style={{color:'#fff8ee',fontSize:scaleSize(20),}}>485.02</Text>
                        </View>
                        <View style={{flex:1,alignItems:'center',}}>
                            <Text style={{color:'#fff8ee',fontSize:scaleSize(20),}}>本月收入(元)</Text>
                            <Text style={{color:'#fff8ee',fontSize:scaleSize(20),}}>3560.02</Text>
                        </View>
                        <View style={{flex:1,alignItems:'center',}}>
                            <Text style={{color:'#fff8ee',fontSize:scaleSize(20),}}>今日收入(元)</Text>
                            <Text style={{color:'#fff8ee',fontSize:scaleSize(20),}}>5689.26</Text>
                        </View>
                    </View>
                </View>
                {/**/}
                <TouchableOpacity
                    onPress={this._showFilter.bind(this)}
                    activeOpacity={1}
                >
                    <View style={styles.filterHead}>
                        <View style={styles.filterState}>
                            <Text style={[styles.filterText,show?styles.active:'']}>全部类型</Text>
                            <Image style={{width:scaleSize(18),height:scaleSize(11),marginLeft:scaleSize(10)}} source={show?arrowUp:arrowDown}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{paddingHorizontal:scaleSize(30),justifyContent:'space-between',alignItems:'center',flexDirection:'row',height:scaleSize(88),  borderBottomWidth:scaleSize(1),borderBottomColor:'#eee',}}>
                    <View style={{}}>
                        <Text style={{color:'#333',fontSize:scaleSize(20),}}>分期收益</Text>
                        <Text style={{color:'#888',fontSize:scaleSize(20),}}>2018-05-04  22:10</Text>
                    </View>
                    <View style={{}}>
                        <Text style={{color:'#333',fontSize:scaleSize(20),textAlign:'right'}}>+0.12</Text>
                        <Text style={{color:'#888',fontSize:scaleSize(20),}}>余额：71.03</Text>
                    </View>
                </View>

                {/*我的钱包模态框*/}
                <Modal
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View  style={styles.containerM}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize:scaleSize(28),color:'#333',marginBottom:scaleSize(30)}}>说明</Text>
                            <Text style={{fontSize:scaleSize(24),color:'#555',width:width*0.7,lineHeight:scaleSize(50)}}>每月25日左右结算上月手续费相关奖励金。部分可能涉嫌风险大交易或虚假交易将不计 入结算，具体以一呗实际结算金额为准。</Text>
                            <TouchableOpacity onPress={() => this.dismiss()}>
                                    <Text style={styles.knowBtn}>我知道了</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>
                {/*筛选*/}
                <View style={[show?'':styles.hide]}>
                    <View style={[styles.modalBoxAdd,]}>
                        <View style={styles.modalArea}>
                            <View style={styles.mAtop}>
                                <Text style={{fontSize:scaleSize(28),color:'#333'}}>快捷筛选</Text>
                            </View>
                            {/**/}
                            <View style={styles.mAList}>
                                {/**/}
                                <TouchableOpacity
                                    onPress={() => this.typeChoose('all')}
                                    activeOpacity={1}
                                >
                                    <View style={[styles.mABlock,fliterType==='all'?styles.bgAcitve:'']}>
                                        <Text style={[styles.mAText,fliterType==='all'?styles.textAcitve:'']}>全部类型</Text>
                                    </View>
                                </TouchableOpacity>
                                {/**/}
                                <TouchableOpacity
                                    onPress={() => this.typeChoose('receipt')}
                                    activeOpacity={1}
                                >
                                    <View style={[styles.mABlock,fliterType==='receipt'?styles.bgAcitve:'']}>
                                        <Text style={[styles.mAText,fliterType==='receipt'?styles.textAcitve:'']}>红包</Text>
                                    </View>
                                </TouchableOpacity>
                                {/**/}
                                <TouchableOpacity
                                    onPress={() => this.typeChoose('installment')}
                                    activeOpacity={1}
                                >
                                    <View style={[styles.mABlock,fliterType==='installment'?styles.bgAcitve:'']}>
                                        <Text style={[styles.mAText,fliterType==='installment'?styles.textAcitve:'']}>升级收益</Text>
                                    </View>
                                </TouchableOpacity>
                                {/**/}
                                <TouchableOpacity
                                    onPress={() => this.typeChoose('bonus')}
                                    activeOpacity={1}
                                >
                                    <View style={[styles.mABlock,fliterType==='bonus'?styles.bgAcitve:'']}>
                                        <Text style={[styles.mAText,fliterType==='bonus'?styles.textAcitve:'']}>手续费返还</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.typeChoose('bonus')}
                                    activeOpacity={1}
                                >
                                    <View style={[styles.mABlock,fliterType==='bonus'?styles.bgAcitve:'']}>
                                        <Text style={[styles.mAText,fliterType==='bonus'?styles.textAcitve:'']}>收益结算</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.typeChoose('bonus')}
                                    activeOpacity={1}
                                >
                                    <View style={[styles.mABlock,fliterType==='bonus'?styles.bgAcitve:'']}>
                                        <Text style={[styles.mAText,fliterType==='bonus'?styles.textAcitve:'']}>红包返利</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/*btnArea*/}
                            <View style={[styles.btnArea]}>
                                <View style={[styles.btnItem,styles.btnRest]}>
                                    <Text style={{color:'#ee2424',fontSize:scaleSize(28)}}>重置</Text>
                                </View>
                                {/**/}
                                <View style={[styles.btnItem,styles.btnSure]}>
                                    <Text style={{color:'#fff',fontSize:scaleSize(28)}}>确定</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    userInfoMid:{
        height:scaleSize(228),
        paddingHorizontal:scaleSize(30),
        paddingTop:scaleSize(20),
        backgroundColor:'#f83c3c',
    },
    mt20:{
        marginTop:scaleSize(20)
    },
    line:{
        backgroundColor:'#e02121',
        marginTop:scaleSize(30),
        height:scaleSize(1),
    },
    userImg:{
        width:scaleSize(95),
        height:scaleSize(95),
        borderRadius:scaleSize(50),
    },
    userInfoD:{
        position:'absolute',
        top:scaleSize(50),
        left:scaleSize(152),
    },
    userInfoDM:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        // alignItems:'center',
    },
    arrowLeft:{
        width:scaleSize(15),
        height:scaleSize(25),
        position:'absolute',
        top:scaleSize(59),
        right:scaleSize(30),
    },
    myIcon:{
        width:scaleSize(36),
        marginBottom:scaleSize(33),
    },
    iconList:{
        height:scaleSize(88),
        backgroundColor:'#fff',
        paddingHorizontal:scaleSize(30),
    },
    messagesBox: {
        backgroundColor:'#fff',
        borderBottomColor:'#eeeeee',
        borderBottomWidth:scaleSize(1)
    },
    noticeMessage: {
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingTop:scaleSize(40),
        paddingLeft:scaleSize(45),
    },
    messageIcon:{
        width:scaleSize(40),
        height:scaleSize(40),
        marginBottom:scaleSize(40),
    },
    messagesBlock:{
        width:scaleSize(650),
        borderBottomColor:'#eeeeee',
        borderBottomWidth:scaleSize(1),
        paddingBottom:scaleSize(40),
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingRight:scaleSize(30)
    },
    messageTitle:{
        fontSize:scaleSize(28),
        color:'#333'
    },
    nextContain:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        // alignItems:'center',
        // width:scaleSize(80),
    },
    nextContainI:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        width:scaleSize(80),
    },
    nextIcon:{
        width:scaleSize(15),
        height:scaleSize(25),
    },


    //modal

    containerM: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        width:width,
        height:height,
    },
    modalBox: {
        width:width*0.8,
        height:height*0.35,
        marginLeft:width*0.1,
        marginTop:height*0.3,
        backgroundColor:'#fff',
        borderRadius:scaleSize(10),
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:scaleSize(40),
    },
    knowBtn: {
        color: '#3592fb',
        fontSize: scaleSize(28),
        textAlign:'center',
        paddingVertical:scaleSize(30),
        borderTopColor:'#ddd',
        borderTopWidth:1,
        marginTop:scaleSize(90),
        width:width,
    },
    //筛选
    filterHead:{
        backgroundColor:'#fafafa',
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#eee',
        paddingHorizontal:scaleSize(30),
        height:scaleSize(67),
        justifyContent:'center',
        alignItems:'flex-start',
    },
    filterState:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    filterText:{
        color:'#888',
        fontSize:scaleSize(26),
    },
    modalBoxAdd:{
        position: 'absolute',
        top: scaleSize(-80),
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex:1000,
    },
    modalArea:{
        width: width,
        // height: scaleSize(800),
        backgroundColor:'#fff',
        paddingTop:scaleSize(30),
    },
    hide:{
        display:'none'
    },
    mAtop:{
        marginBottom:scaleSize(40),
        paddingHorizontal:scaleSize(30),
    },
    mAList:{
        paddingLeft:scaleSize(70),
        flexDirection:'row',
        flexWrap:'wrap',
    },
    mABlock:{
        width:scaleSize(160),
        height:scaleSize(60),
        backgroundColor:'#eeeeee',
        borderRadius:scaleSize(4),
        alignItems:'center',
        justifyContent:'center',
        marginRight:scaleSize(70),
        marginBottom:scaleSize(30),
    },
    mAText:{
        fontSize:scaleSize(22),
        color:'#333',
    },
    mAInput:{
        paddingHorizontal:scaleSize(18),
        paddingVertical:0,
        borderWidth: scaleSize(1),
        borderColor: '#eee',
        borderStyle: 'solid',
        width:scaleSize(260),
        height:scaleSize(60),
        color:'#333',
        fontSize:scaleSize(22),
    },
    mARange:{
        marginBottom:scaleSize(40),
        flexDirection:'row',
        flexWrap:'wrap',
        paddingLeft:scaleSize(70),
    },
    btnArea:{
        flexDirection:'row',
        marginTop:scaleSize(70),
    },
    btnItem:{
        flex:1,
        height:scaleSize(88),
        alignItems:'center',
        justifyContent:'center',
    },
    btnRest:{
        backgroundColor:'#ffacac',
    },
    btnSure:{
        backgroundColor:'#ee2424',
    },
    active:{
        color:'#ee2424',
    },
    bgAcitve:{
        backgroundColor:'#ee2424',
    },
    textAcitve:{
        color:'#fff',
    },
})