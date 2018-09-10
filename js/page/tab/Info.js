import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator,

} from 'react-native';

import {setSpText,scaleSize} from '../../util/px2dp';
import NavigationBar from '../../common/NavigationBar';
import OpenRemind from "../news/OpenRemind";

var navigation = null;
export default class Info extends Component{
    constructor(props){
        super(props);
        this.state={
            msgData:[
                {
                    msgType:1,//系统消息
                    msgTime:'5/2  21：03',
                    msgInfo:'用户18086506925已注册，赶紧与对方取得联系，引导其激活终端、开启收款，您的收益会因此而增长哦'
                },
                {
                    msgType:2,//开户消息
                    msgTime:'5/2  21：03',
                    msgInfo:'用户18086506925已注册，赶紧与对方取得联系，引导其激活终端、开启收款，您的收益会因此而增长哦'
                },
                {
                    msgType:3,//系统公告
                    msgTime:'5/2  21：03',
                    msgInfo:'用户18086506925已注册，赶紧与对方取得联系，引导其激活终端、开启收款，您的收益会因此而增长哦'
                },
            ]
        }
        ;
        navigation = this.props.navigation;
    }


    msgType(data){
        if(data.item.msgType===1) {
            return {
                type:'系统消息',
                msgIcon:require('../../../res/images/message/m_icon_1.png')
            }
        }else if(data.item.msgType===2){
            return {
                type:'开户消息',
                msgIcon:require('../../../res/images/message/m_icon_2.png')
            }
        }else{
            return {
                type:'系统公告',
                msgIcon:require('../../../res/images/message/m_icon_3.png')
            }
        };
    }



    _renderItem(data){
        let msgType=this.msgType(data);
        return <View style={styles.msgItem}>
                    <View style={styles.msgTop}>
                        <View style={styles.msgTL}>
                            <Image style={styles.messageIcon} resizeMode={'contain'} source={msgType.msgIcon} />
                            <Text style={styles.msgType}>{msgType.type}</Text>
                        </View>
                        <View style={styles.msgTR}>
                            <Text style={styles.msgTime}>{data.item.msgTime}</Text>
                        </View>
                    </View>
                    {/**/}
                    <View>
                        <Text style={styles.msgInfo}>
                            {data.item.msgInfo}
                        </Text>
                    </View>
                </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='消息中心'
                    style={{backgroundColor:'#ee2424'}}
                />
                <View style={[{flex: 1,alignItems:'center',justifyContent:'center'},this.state.msgData.length === 0?'':styles.hide]}>
                    <Image style={{width:scaleSize(233),height:scaleSize(182),marginBottom:scaleSize(20)}} resizeMode={'contain'} source={require('../../../res/images/message/content.png')} />
                    <Text style={{fontSize:scaleSize(24), alignSelf: 'center',color:'#888'}}>暂无消息</Text>
                </View>
                {/*消息列表*/}
                <View style={styles.messagesBox}>
                    <FlatList
                        data={this.state.msgData}
                        renderItem={(data) => this._renderItem(data)}
                    />
                </View>




                {/*<View style={styles.messagesBox}>*/}
                    {/*<View style={styles.msgItem}>*/}
                        {/*<View style={styles.msgTop}>*/}
                            {/*<View style={styles.msgTL}>*/}
                                {/*<Image style={styles.messageIcon} source={require('../../../res/images/message/m_icon_1.png')} />*/}
                                {/*<Text style={styles.msgType}>系统消息</Text>*/}
                            {/*</View>*/}
                            {/*<View style={styles.msgTR}>*/}
                                {/*<Text style={styles.msgTime}>5/2  21：03</Text>*/}
                            {/*</View>*/}
                        {/*</View>*/}
                        {/*/!**!/*/}
                        {/*<View>*/}
                            {/*<Text style={styles.msgInfo}>*/}
                                {/*用户18086506925已注册，赶紧与对方取得联系，引导其激活终端、开启收款，您的收益会因此而增长哦*/}
                            {/*</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</View>*/}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f5f5f5'
    },
    messagesBox:{
        paddingHorizontal:scaleSize(30),
    },
    msgItem:{
        backgroundColor:'#fff',
        marginTop:scaleSize(30),
        paddingHorizontal:scaleSize(30),
        paddingVertical:scaleSize(30),
    },
    messageIcon:{
        width:scaleSize(32),
        height:scaleSize(31),
    },

    msgType:{
        fontSize:scaleSize(26),
        color:'#888',
        marginLeft:scaleSize(16),
        marginTop:scaleSize(-2),
    },
    msgTL:{
        flexDirection:'row',
    },
    msgTime:{
        fontSize:scaleSize(20),
        color:'#999'
    },
    msgTop:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    msgInfo:{
        fontSize:scaleSize(28),
        lineHeight:scaleSize(36),
        color:'#333',
        marginTop:scaleSize(30),
    },
    hide:{
        display:'none'
    }
})