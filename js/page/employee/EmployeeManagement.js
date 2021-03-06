import React, { Component } from 'react';
import { StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    TouchableNativeFeedback,
    DeviceEventEmitter,
    TextInput
} from 'react-native';

import {setSpText,scaleSize} from '../../util/px2dp';
import NavigationBarL from '../../common/NavigationBarL';
import {API} from '../../common/Const';
import StorageUtil from '../../util/StorageUtil';
import HttpUtil from '../../util/HttpUtil';
import NavigatorUtil from "../../util/NavigatorUtil";
import {Button} from 'react-native-elements';

const {width,height}=Dimensions.get("window");
var navigation = null;

export default class EmployeeManagement extends Component{
    constructor(props){
        super(props);
        this.state={};
        navigation=this.props.navigation;
    }

    addEmployee(){
        const {navigation} = this.props;
        navigation.navigate('AddEmployee');
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

    render(){
        return(
            <View style={styles.contain}>
                <NavigationBarL
                    title='员工管理'
                    style={{backgroundColor:'#ee2424'}}
                    leftButton={this.renderButton(require('../../../res/images/back.png'))}
                />
                <ScrollView>
                {/*查看详情*/}
                    <View style={styles.commercialBoxTop}>
                        <Image style={styles.commercialTopImg} source={require('../../../res/images/commercial/commercial_01.png')} />
                        <View style={styles.commercialTop}>
                            <Text style={{fontSize:scaleSize(20),color:'#fff',marginTop:scaleSize(10)}}>我的员工</Text>
                            <Text style={{fontSize:scaleSize(36),color:'#fff',paddingVertical:scaleSize(30)}}>3</Text>
                            <Button
                                title='立即添加'
                                buttonStyle={styles.CommercialButton}
                                textStyle={{color:'#ee2424',fontSize:scaleSize(32) }}
                                onPress={()=>this.addEmployee()}
                            />
                            <Text style={{fontSize:scaleSize(20),color:'#fff',marginTop:scaleSize(20)}}>剩余点数100点</Text>
                        </View>
                    </View>
                    {/*员工记录*/}
                    <View style={{marginTop:scaleSize(20)}}>
                        <Text style={styles.commercialTitle}>员工记录</Text>
                        <View style={styles.boxWhite}>
                            <View style={styles.openBoxTitle}>
                                <View style={{alignItems:'center',flexDirection:'row',}}>
                                    <Image style={{width:scaleSize(42),height:scaleSize(42),marginRight:scaleSize(10)}} source={require('../../../res/images/commercial/commercial_03.png')} />
                                    <Text style={{fontSize:scaleSize(28),color:'#333'}}>15632598745</Text>
                                </View>
                                <Text style={styles.commercialOrage}>待提交资料</Text>
                            </View>
                            <View style={{paddingVertical:scaleSize(10),width:width*0.95,marginLeft:width*0.05}}>
                                <View style={styles.openInformation}>
                                    <Text style={styles.fontGray}>商户昵称：</Text>
                                    <Text style={styles.fontBlack}>15632598745</Text>
                                </View>
                                <View style={styles.openInformation}>
                                    <Text style={styles.fontGray}>商户权限：</Text>
                                    <Text style={styles.fontBlack}>支付宝余额、储蓄卡、信用卡、花呗、花呗分期</Text>
                                </View>
                                <View style={styles.openInformation}>
                                    <Text style={styles.fontGray}>开户时间：</Text>
                                    <Text style={styles.fontBlack}>2018-06-21  01:07:36</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.boxWhite}>
                            <View style={styles.openBoxTitle}>
                                <View style={{alignItems:'center',flexDirection:'row',}}>
                                    <Image style={{width:scaleSize(42),height:scaleSize(42),marginRight:scaleSize(10)}} source={require('../../../res/images/commercial/commercial_03.png')} />
                                    <Text style={{fontSize:scaleSize(28),color:'#333'}}>15632598745</Text>
                                </View>
                                <Text style={styles.commercialGreen}>审核通过</Text>
                            </View>
                            <View style={{paddingVertical:scaleSize(10),width:width*0.95,marginLeft:width*0.05}}>
                                <View style={styles.openInformation}>
                                    <Text style={styles.fontGray}>商户昵称：</Text>
                                    <Text style={styles.fontBlack}>15632598745</Text>
                                </View>
                                <View style={styles.openInformation}>
                                    <Text style={styles.fontGray}>商户权限：</Text>
                                    <Text style={styles.fontBlack}>支付宝余额、储蓄卡、信用卡、花呗、花呗分期</Text>
                                </View>
                                <View style={styles.openInformation}>
                                    <Text style={styles.fontGray}>开户时间：</Text>
                                    <Text style={styles.fontBlack}>2018-06-21  01:07:36</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.boxWhite}>
                            <View style={styles.openBoxTitle}>
                                <View style={{alignItems:'center',flexDirection:'row',}}>
                                    <Image style={{width:scaleSize(42),height:scaleSize(42),marginRight:scaleSize(10)}} source={require('../../../res/images/commercial/commercial_03.png')} />
                                    <Text style={{fontSize:scaleSize(28),color:'#333'}}>15632598745</Text>
                                </View>
                                <Text style={styles.commercialOrage}>待提交资料</Text>
                            </View>
                            <View style={{paddingVertical:scaleSize(10),width:width*0.95,marginLeft:width*0.05}}>
                                <View style={styles.openInformation}>
                                    <Text style={styles.fontGray}>商户昵称：</Text>
                                    <Text style={styles.fontBlack}>15632598745</Text>
                                </View>
                                <View style={styles.openInformation}>
                                    <Text style={styles.fontGray}>商户权限：</Text>
                                    <Text style={styles.fontBlack}>支付宝余额、储蓄卡、信用卡、花呗、花呗分期</Text>
                                </View>
                                <View style={styles.openInformation}>
                                    <Text style={styles.fontGray}>开户时间：</Text>
                                    <Text style={styles.fontBlack}>2018-06-21  01:07:36</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',marginBottom:scaleSize(30)}}>
                            <Text style={{color:'#999',fontSize:scaleSize(20)}}>已经到底了</Text>
                        </View>

                        {/*暂无员工*/}
                        {/*<View style={{justifyContent:'center',alignItems:'center',marginBottom:scaleSize(30)}}>*/}
                            {/*<Image source={require('../../../res/images/commercial/employee_02.png')} style={{width:scaleSize(443),height:scaleSize(240)}} />*/}
                            {/*<Text style={{color:'#999',fontSize:scaleSize(20)}}>您暂时没有员工喔~</Text>*/}
                        {/*</View>*/}
                    </View>
                </ScrollView>
            </View>
        )
    }

}

const styles=StyleSheet.create({
    contain:{
        flex:1,
        backgroundColor:'#f5f5f5',
    },
    commercialBoxTop:{
        width:width,
        backgroundColor:'#ee2424',
        position:'relative',
    },
    commercialTopImg:{
        width:width,
        height:scaleSize(290),
    },
    commercialTop:{
        position:'absolute',
        width:width,
        display:'flex',
        alignItems:'center',
        height:scaleSize(290),
        paddingVertical:scaleSize(20),
    },
    CommercialButton:{
        width:width*0.3,
        backgroundColor:'#fff',
        height:scaleSize(60),
        borderRadius:scaleSize(35),
        color:'#ee2424',
    },
    boxWhite:{
        backgroundColor:'#fff',
        borderBottomColor:'#eee',
        borderBottomWidth:scaleSize(1),
        borderTopColor:'#eee',
        borderTopWidth:scaleSize(1),
        marginBottom:scaleSize(20),
    },
    commercialTitle:{
        borderLeftColor:'#ee2424',
        borderLeftWidth:scaleSize(4),
        color:'#333',
        fontSize:scaleSize(26),
        marginVertical:scaleSize(20),
        marginHorizontal:scaleSize(30),
        paddingLeft:scaleSize(20),
    },
    commercialDouble:{
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        padding:scaleSize(30),
        borderTopColor:'#eee',
        borderTopWidth:scaleSize(1),
    },
    WidthSet:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:width*0.4,
    },
    buttonBox:{
        display:'flex',
        justifyContent:'center',
    },
    CommercialButtonAdd:{
        width:width*0.8,
        borderRadius:scaleSize(8),
        height:scaleSize(70),
        backgroundColor:'#ee2424',
        marginTop:scaleSize(30),
    },
    flexRight:{
        justifyContent:'flex-end',
    },
    openBoxTitle:{
        display:'flex',
        width:width*0.95,
        marginLeft:width*0.05,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:scaleSize(30),
        borderBottomColor:'#eee',
        borderBottomWidth:scaleSize(1),
        paddingRight:scaleSize(30),
        paddingLeft:scaleSize(10),
    },
    openInformation:{
        justifyContent:'flex-start',
        flexDirection:'row',
        fontSize:scaleSize(22),
        marginVertical:scaleSize(10),
        paddingRight:scaleSize(30),
        paddingLeft:scaleSize(10),
    },
    fontGray:{
        fontSize:scaleSize(22),
        color:'#999'
    },
    fontBlack:{
        fontSize:scaleSize(22),
        color:'#333'
    },
    commercialOrage:{
        color:'#f9811f',
        fontSize:scaleSize(28),
    },
    commercialGreen:{
        color:'#15f11f',
        fontSize:scaleSize(28),
    }
})