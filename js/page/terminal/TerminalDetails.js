import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    TouchableNativeFeedback,
    TextInput, Platform
} from 'react-native';

import {setSpText,scaleSize} from '../../util/px2dp';
import NavigatorUtil from "../../util/NavigatorUtil";
import NavigationBarM from '../../common/NavigationBarM';
import {API, VERSION} from "../../common/Const";
import {Toast} from "antd-mobile-rn/lib/index.native";
import HttpUtil from "../../util/HttpUtil";
import {Button,List,ListItem} from 'react-native-elements';
import FlowStatistics from "./FlowStatistics";
import TerminalGrade from "./TerminalGrade";

const {width,height}=Dimensions.get('window');
var navigation = null;
export default class TerminalDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
        navigation = this.props.navigation;  //调用组件
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
                <NavigationBarM
                    title='终端详情'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <ScrollView>
                    <View style={styles.jgBlock}></View>
                    <View style={styles.digitBox}>
                        <Text style={styles.digitTitle}>一加数码</Text>
                        <View style={styles.digitPadding}>
                            <TouchableOpacity onPress={()=>navigation.navigate('TerminalGrade')}>
                                <ListItem
                                    title='终端等级'
                                    titleStyle={{
                                        fontSize:scaleSize(28),
                                        color:'#333',
                                        marginLeft:scaleSize(0),
                                    }}
                                    rightTitle='等级P4'
                                    rightTitleStyle={{
                                        fontSize:scaleSize(18),
                                        color:'#ff6464',
                                    }}
                                    containerStyle={{
                                        borderBottomColor:'transparent',
                                        borderBottomWidth:scaleSize(0),
                                    }}
                                    rightIcon={{
                                        name:'chevron-right',
                                        type:'evilicon',
                                        color:'#bbb',
                                    }}
                                />
                            </TouchableOpacity>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{paddingLeft:scaleSize(30)}}>
                                <View style={styles.periodBox}>
                                    <View style={styles.periodTop}>
                                        <Text style={styles.periodLabel}>花呗收款码限额</Text>
                                    </View>
                                    <View style={styles.periodBottom}>
                                        <Text style={styles.periodMoney}>￥299/笔</Text>
                                    </View>
                                </View>
                                <View style={styles.periodBox}>
                                    <View style={styles.periodTop}>
                                        <Text style={styles.periodLabel}>花呗收款码限额</Text>
                                    </View>
                                    <View style={styles.periodBottom}>
                                        <Text style={styles.periodMoney}>￥1500/笔</Text>
                                    </View>
                                </View>
                                <View style={styles.periodBox}>
                                    <View style={styles.periodTop}>
                                        <Text style={styles.periodLabel}>分期收款码限额</Text>
                                    </View>
                                    <View style={styles.periodBottom}>
                                        <Text style={styles.periodMoney}>未开通</Text>
                                    </View>
                                </View>
                                <View style={styles.periodBox}>
                                    <View style={styles.periodTop}>
                                        <Text style={styles.periodLabel}>分期收款码限额</Text>
                                    </View>
                                    <View style={styles.periodBottom}>
                                        <Text style={styles.periodMoney}>未开通</Text>
                                    </View>
                                </View>
                            </ScrollView>
                            <TouchableOpacity onPress={()=>navigation.navigate('FlowStatistics')}>
                                <ListItem
                                    title='流水统计'
                                    titleStyle={{
                                        fontSize:scaleSize(28),
                                        color:'#333',
                                        marginLeft:scaleSize(0),
                                    }}
                                    containerStyle={{
                                        borderBottomColor:'transparent',
                                        borderBottomWidth:scaleSize(0),
                                        borderTopColor:'#eee',
                                        borderTopWidth:scaleSize(1),
                                    }}
                                    rightIcon={{
                                        name:'chevron-right',
                                        type:'evilicon',
                                        color:'#bbb',
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.jgBlock}></View>
                    <View style={styles.digitBox}>
                        <Text style={styles.digitTitle}>支持收款服务</Text>
                        <View style={styles.digitPadding}>
                            <View style={[styles.textSet,{marginTop:scaleSize(30)}]}>
                               <Image source={require('../../../res/images/Alipay.png')} style={{width:scaleSize(35),height:scaleSize(35),alignSelf:'flex-start'}} />
                                <View style={{marginLeft:scaleSize(20),width:width,paddingBottom:scaleSize(20)}}>
                                    <Text style={styles.text01}>支付宝余额、储蓄卡、信用卡、花呗付款</Text>
                                    <View style={styles.textSet}>
                                        <Text style={styles.text02}>[交易手续费率</Text>
                                        <Text style={styles.text03}>0.55%</Text>
                                        <Text style={styles.text02}>]</Text>
                                    </View>
                                    <View style={styles.textSet}>
                                        <Text style={styles.text04}>到账：</Text>
                                        <Text style={styles.text02}>wawkin@tom.com</Text>
                                        <Image source={require('../../../res/images/day.png')} style={{width:scaleSize(50),height:scaleSize(31),marginLeft:scaleSize(10)}} />
                                    </View>
                                </View>
                            </View>
                            {/*<View style={[styles.textSet,{marginTop:scaleSize(30)}]}>*/}
                                {/*<View style={{marginLeft:scaleSize(46)}}>*/}
                                    {/*<Text style={styles.text01}>花呗分期付款</Text>*/}
                                    {/*<View style={styles.textSet}>*/}
                                        {/*<Text style={styles.text02}>[交易手续费率</Text>*/}
                                        {/*<Text style={styles.text03}>0.55%</Text>*/}
                                        {/*<Text style={styles.text02}>]</Text>*/}
                                    {/*</View>*/}
                                    {/*<ScrollView*/}
                                        {/*horizontal={true}*/}
                                        {/*showsHorizontalScrollIndicator={false}>*/}
                                        {/*<View style={[styles.periodBox,styles.periodWidth]}>*/}
                                            {/*<View style={styles.periodTop}>*/}
                                                {/*<Text style={styles.periodLabel}>3期费率</Text>*/}
                                            {/*</View>*/}
                                            {/*<View style={styles.periodBottom}>*/}
                                                {/*<Text style={styles.periodMoney}>3.5%</Text>*/}
                                            {/*</View>*/}
                                        {/*</View>*/}
                                        {/*<View style={[styles.periodBox,styles.periodWidth]}>*/}
                                            {/*<View style={styles.periodTop}>*/}
                                                {/*<Text style={styles.periodLabel}>6期费率</Text>*/}
                                            {/*</View>*/}
                                            {/*<View style={styles.periodBottom}>*/}
                                                {/*<Text style={styles.periodMoney}>6%</Text>*/}
                                            {/*</View>*/}
                                        {/*</View>*/}
                                        {/*<View style={[styles.periodBox,styles.periodWidth]}>*/}
                                            {/*<View style={styles.periodTop}>*/}
                                                {/*<Text style={styles.periodLabel}>12期费率</Text>*/}
                                            {/*</View>*/}
                                            {/*<View style={styles.periodBottom}>*/}
                                                {/*<Text style={styles.periodMoney}>12%</Text>*/}
                                            {/*</View>*/}
                                        {/*</View>*/}
                                        {/*<View style={[styles.periodBox,styles.periodWidth]}>*/}
                                            {/*<View style={styles.periodTop}>*/}
                                                {/*<Text style={styles.periodLabel}>24期费率</Text>*/}
                                            {/*</View>*/}
                                            {/*<View style={styles.periodBottom}>*/}
                                                {/*<Text style={styles.periodMoney}>20%</Text>*/}
                                            {/*</View>*/}
                                        {/*</View>*/}
                                    {/*</ScrollView>*/}
                                    {/*<View style={styles.textSet}>*/}
                                        {/*<Text style={styles.text04}>到账：</Text>*/}
                                        {/*<Text style={styles.text02}>wawkin@tom.com</Text>*/}
                                        {/*<Image source={require('../../../res/images/day.png')} style={{width:scaleSize(40),height:scaleSize(20),marginLeft:scaleSize(10)}} />*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                            {/*</View>*/}
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
        backgroundColor:'#fff',
        position:'relative',
    },
    digitBox:{
        // marginTop:scaleSize(20),
        backgroundColor:'#fff',
    },
    jgBlock:{
        height:scaleSize(20),
        width:width,
        backgroundColor:'#f5f5f5'
    },
    digitTitle:{
        padding:scaleSize(30),
        borderBottomColor:'#eee',
        borderBottomWidth:scaleSize(1),
        color:'#333',
    },
    digitPadding:{
        paddingLeft:scaleSize(50),
    },
    periodBox:{
        width:scaleSize(230),
        marginBottom:scaleSize(30),
        paddingRight:scaleSize(30),
    },
    periodTop:{
        borderTopLeftRadius:scaleSize(5),
        borderTopRightRadius:scaleSize(5),
        backgroundColor:'#fdf3f3',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:scaleSize(20),
    },
    periodBottom:{
        borderBottomLeftRadius:scaleSize(5),
        borderBottomRightRadius:scaleSize(5),
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#ddd',
        borderWidth:scaleSize(1),
        borderTopColor:'transparent',
        borderTopWidth:scaleSize(0),
        paddingVertical:scaleSize(20),
    },
    periodLabel:{
        fontSize:scaleSize(22),
        color:'#555555'
    },
    periodMoney:{
        fontSize:scaleSize(24),
        color:'#ff6464',
    },
    periodWidth:{
        width:scaleSize(190),
    },
    textSet:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:scaleSize(10),
    },
    text01:{
        fontSize:scaleSize(26),
        color:'#333333',
        marginBottom:scaleSize(10),
    },
    text02:{
        fontSize:scaleSize(24),
        color:'#333333'
    },
    text03:{
        fontSize:scaleSize(24),
        color:'#ff6464'
    },
    text04:{
        fontSize:scaleSize(24),
        color:'#999'
    },
})