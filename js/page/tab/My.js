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
    DeviceEventEmitter,
    TextInput
} from 'react-native';

import {setSpText,scaleSize} from '../../util/px2dp';
import NavigationBar from '../../common/NavigationBar'
import Profile from "../profile/Profile";
import Withdraw from "../wallet/Withdraw";
import {API, LISTENER} from '../../common/Const';
import StorageUtil from '../../util/StorageUtil';
import HttpUtil from '../../util/HttpUtil';
import CommercialManagement from "../commercial/CommercialManagement";
import AccountInformation from "../account/AccountInformation";

const {width,height}=Dimensions.get("window");

var navigation = null;
export default class My extends Component{
    constructor(props){
        super(props);
        this.state = {
          nickname: '',
          avatarSource: null
        };
        navigation = this.props.navigation;
    }

    componentDidMount() {
        var self = this;
        self._initData();
        this.listener = DeviceEventEmitter.addListener(LISTENER.userInfo, () => {
            self._initData();
        });
    }

    //卸载消息监听
    componentWillUnmount() {
        this.listener.remove();
    }

    _initData(){
        StorageUtil.get('auth').then((value) => {
            HttpUtil.get(API.userInfo, null, {
                'Authorization': 'Bearer ' + value.access_token
            }).then((json) => {
                console.log(json);
                if (json.code === 0){
                    this.setState({
                        nickname: json.data.nickname == null ? json.data.username : json.data.nickname,
                        avatarSource: {uri: json.data.avatar}
                    });
                    StorageUtil.save("userInfo", json.data);
                }
            }, (error) => {
                console.log(error)
            })
        });
    }

    componentWillMount() {
        this._initData();
        this.listener=DeviceEventEmitter.addListener('infoBind',(events) =>{
            console.log(1);
            this._initData();
        });
    }

    //在组件销毁的时候要将其移除
    componentWillUnmount(){
        this.listener.remove();
    };

    renderButton(image){
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={()=>{
                navigation.navigate('Set')
            }}>
            <Image
                style={{width:scaleSize(36), height:scaleSize(34)}}
                source={image}/>
        </TouchableOpacity>;
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='个人中心'
                    style={{backgroundColor:'#ee2424'}}
                    rightButton={this.renderButton(require('../../../res/images/setup.png'))}
                />

                <TouchableOpacity activeOpacity={0.8}  onPress={()=>navigation.navigate('Profile')}>
                    <View style={styles.userInfo}>
                        {this.state.avatarSource == null ? <Image style={styles.userImg} source={require('../../../res/images/userPic.png')}/> : <Image style={styles.userImg} source={this.state.avatarSource}/>}
                        <View style={styles.userInfoD}>
                            <Text style={{color:'#ffffff',fontSize:scaleSize(28),}}>{this.state.nickname}</Text>
                            <Text style={{color:'#fff8ee',fontSize:scaleSize(20),}}>渠道经理：深圳市盛天大成科技有限公司</Text>
                        </View>
                        <Image style={styles.arrowLeft} source={require('../../../res/images/arrowLeft.png')} />
                    </View>
                </TouchableOpacity>
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
                        <Text style={{color:'#fff8ee',fontSize:scaleSize(20),flex:1}}>历史收款总金额</Text>
                        <Text style={{color:'#fff8ee',fontSize:scaleSize(20),flex:1,textAlign:'right'}}>¥16800.00</Text>
                    </View>

                </View>
                {/*
                    list
                */}
                <ScrollView>
                <View style={[styles.messagesBox,styles.mt20]}>
                    {/*<View style={styles.noticeMessage}>*/}
                        {/*<Image style={styles.messageIcon} source={require('../../../res/images/myIcon01.png')}/>*/}
                        {/*<View style={styles.messagesBlock}>*/}
                            {/*<Text style={styles.messageTitle}>账目</Text>*/}
                            {/*<View style={styles.nextContain}>*/}
                                {/*<Image style={styles.nextIcon} source={require('../../../res/images/message/message_06.png')} />*/}
                            {/*</View>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                    {/**/}
                    <TouchableOpacity onPress={()=>navigation.navigate('Wallet')}>
                        <View style={styles.noticeMessage}>
                            <Image style={styles.messageIcon} source={require('../../../res/images/myIcon_01.png')}/>
                            <View style={styles.messagesBlock}>
                                <Text style={styles.messageTitle}>我的钱包</Text>
                                <View style={styles.nextContain}>
                                    <Image style={styles.nextIcon} source={require('../../../res/images/message/message_06.png')} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/**/}
                    <TouchableOpacity onPress={()=>navigation.navigate('Terminal')}>
                        <View style={styles.noticeMessage}>
                            <Image style={styles.messageIcon} source={require('../../../res/images/myIcon_02.png')} />
                            <View style={styles.messagesBlock}>
                                <Text style={styles.messageTitle}>我的终端</Text>
                                <View style={styles.nextContain}>
                                    <Image style={styles.nextIcon} source={require('../../../res/images/message/message_06.png')} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/**/}
                    <TouchableOpacity onPress={()=>navigation.navigate('CommercialManagement')}>
                        <View style={styles.noticeMessage}>
                            <Image style={styles.messageIcon} source={require('../../../res/images/myIcon_03.png')} />
                            <View style={styles.messagesBlock}>
                                <Text style={styles.messageTitle}>商户管理</Text>
                                <View style={styles.nextContain}>
                                    <Image style={styles.nextIcon} source={require('../../../res/images/message/message_06.png')} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/**/}
                    <TouchableOpacity onPress={()=>navigation.navigate('EmployeeManagement')}>
                        <View style={styles.noticeMessage}>
                            <Image style={styles.messageIcon} source={require('../../../res/images/myIcon_04.png')} />
                            <View style={styles.messagesBlock}>
                                <Text style={styles.messageTitle}>员工管理</Text>
                                <View style={styles.nextContain}>
                                    <Image style={styles.nextIcon} source={require('../../../res/images/message/message_06.png')} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/**/}
                    <TouchableOpacity onPress={()=>navigation.navigate('AccountInformation')}>
                        <View style={styles.noticeMessage}>
                            <Image style={styles.messageIcon} source={require('../../../res/images/myIcon_05.png')} />
                            <View style={[styles.messagesBlock,{borderBottomWidth:scaleSize(0),borderBottomColor:'transparent'}]}>
                                <Text style={styles.messageTitle}>开户资料</Text>
                                <View style={styles.nextContain}>
                                    <Image style={styles.nextIcon} source={require('../../../res/images/message/message_06.png')} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
                {/**/}
                <View style={[styles.messagesBox,styles.mt20]}>
                    {/**/}
                    <TouchableOpacity onPress={()=>navigation.navigate('Guide')}>
                        <View style={styles.noticeMessage}>
                            <Image style={styles.messageIcon} source={require('../../../res/images/myIcon_06.png')}/>
                            <View style={styles.messagesBlock}>
                                <Text style={styles.messageTitle}>用户指南</Text>
                                <View style={styles.nextContain}>
                                    <Image style={styles.nextIcon} source={require('../../../res/images/message/message_06.png')} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/**/}
                    <TouchableOpacity onPress={()=>navigation.navigate('About')}>
                        <View style={styles.noticeMessage}>
                            <Image style={styles.messageIcon} source={require('../../../res/images/myIcon_07.png')}/>
                            <View style={[styles.messagesBlock,{borderBottomWidth:scaleSize(0),borderBottomColor:'transparent'}]}>
                                <Text style={styles.messageTitle}>关于我们</Text>
                                <View style={styles.nextContain}>
                                    <Image style={styles.nextIcon} source={require('../../../res/images/message/message_06.png')} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f5f5f5'
    },
    userInfo:{
        // width:scaleSize(467),
        height:scaleSize(170),
        paddingHorizontal:scaleSize(30),
        paddingTop:scaleSize(36),
        backgroundColor:'#ee2424',
    },
    userInfoMid:{
        height:scaleSize(200),
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
        borderBottomColor:'#eee',
        borderBottomWidth:0.5,
    },
    noticeMessage: {
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingTop:scaleSize(0),
        paddingLeft:scaleSize(45),
    },
    messageIcon:{
        width:scaleSize(40),
        height:scaleSize(40),
    },
    messagesBlock:{
        width:width*0.85,
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingRight:scaleSize(30),
        marginTop:scaleSize(40),
        paddingBottom:scaleSize(40),
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
    messageNum:{
        backgroundColor:'#ef2727',
        width:scaleSize(34),
        height:scaleSize(34),
        borderRadius:scaleSize(17),
        color:'#fff',
        fontSize:scaleSize(18),
        textAlign:'center',
        lineHeight:scaleSize(34),
        overflow:'hidden',
    },
    nextIcon:{
        width:scaleSize(15),
        height:scaleSize(25),
    },
    borderNone:{
        borderBottomWidth:scaleSize(0)
    },
})