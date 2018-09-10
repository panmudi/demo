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
import { List, ListItem } from 'react-native-elements'
import {API, VERSION} from "../../common/Const";
import {Toast} from "antd-mobile-rn/lib/index.native";
import HttpUtil from "../../util/HttpUtil";
import {Button} from 'react-native-elements';
import InformationDetails from "./InformationDetails";

const {width,height}=Dimensions.get('window');
var navigation = null;
export default class AccountInformation extends Component{
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
                    title='开户资料'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                {/*开户资料个人信息*/}
                <View style={styles.accountContain}>
                    <TouchableOpacity onPress={()=>navigation.navigate('InformationDetails')}>
                        <View style={styles.accountBlock}>
                            <View style={styles.accountTop}>
                                <Text style={{color:'#fff',fontSize:scaleSize(28),marginBottom:scaleSize(10)}}>一加数码</Text>
                                <Text style={{color:'#fff',fontSize:scaleSize(28)}}>waw***@tom.com</Text>
                            </View>
                            <View style={{margin:scaleSize(20)}}>
                                <Text style={{color:'#888888',fontSize:scaleSize(20),marginBottom:scaleSize(10)}}>手机号：139****5122</Text>
                                <Text style={{color:'#888888',fontSize:scaleSize(20),marginBottom:scaleSize(10)}}>开户时间：2018-06-21 15:28</Text>
                                <Text style={{color:'#ee2424',fontSize:scaleSize(20)}}>绑定他人开户资料</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                {/*提交开户资料*/}
                <View style={styles.submitInformation}>
                    <View style={styles.submitWarning}>
                        <View style={styles.widthDb}>
                            <Text style={{color:'#333',fontSize:scaleSize(28),marginBottom:scaleSize(10)}}>提交开户资料</Text>
                            <Text style={{color:'#888888',fontSize:scaleSize(20)}}>商家收款不再是难题</Text>
                        </View>
                        <View style={styles.widthDb}>
                            <Image source={require('../../../res/images/information.png')} style={{width:scaleSize(180),height:scaleSize(120)}} />
                        </View>
                    </View>
                    <Button
                        title='去提交'
                        buttonStyle={styles.CommercialButtonAdd}
                        textStyle={{fontSize:scaleSize(32)}}
                        onPress={()=>navigation.navigate('SelectMerchant')}
                    />
                </View>
                {/*绑定开户资料*/}
                <View style={styles.bindBox}>
                    <Text style={{color:'#888888',fontSize:scaleSize(20)}}>替他人收款？</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('BindTerminal')}><Text style={{color:'#ee2424',fontSize:scaleSize(20)}}>绑定开户资料</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
        position:'relative',
    },
    accountContain:{
        marginHorizontal:width*0.05,
        marginVertical:scaleSize(20),
    },
    accountBlock:{
        borderRadius:scaleSize(10),
        backgroundColor:'#fff'
    },
    accountTop:{
        borderTopLeftRadius:scaleSize(10),
        borderTopRightRadius:scaleSize(10),
        backgroundColor:'#f02d2d',
        padding:scaleSize(20),
    },
    CommercialButtonAdd:{
        width:width*0.8,
        borderRadius:scaleSize(8),
        height:scaleSize(70),
        backgroundColor:'#ee2424',
        marginTop:scaleSize(30),
    },
    submitInformation:{
        width:width,
        backgroundColor:'#fff',
        paddingVertical:scaleSize(30),
        paddingHorizontal:scaleSize(20),
    },
    submitWarning:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    widthDb:{
        width:width*0.5,
        justifyContent:'center',
        alignItems:'center'
    },
    bindBox:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:scaleSize(30),
    }
})