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
    TextInput
} from 'react-native';

import {setSpText,scaleSize} from '../../util/px2dp';
import NavigationBarM from '../../common/NavigationBarM';
import NavigatorUtil from "../../util/NavigatorUtil";

const { width, height } = Dimensions.get('window');

var navigation = null;   //清除路由
export default class OpenRemind extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
        navigation = this.props.navigation;  //调用组件
    }


    // static navigationOptions = {
    //     title: '公告消息',
    //     headerTintColor: '#333',
    //     headerTitleStyle: {
    //         fontWeight: 'normal',
    //         fontSize:scaleSize(32),
    //     },
    // };

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
                    title='开户助手'
                    style={{backgroundColor:'#f5f5f5'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <ScrollView>
                    <View style={styles.openBox}>
                        <View style={styles.openTitle}>
                            <Image style={styles.openIcon} source={require('../../../res/images/message/message_01.png')} />
                            <Text style={{fontSize:scaleSize(32),color:'#333'}}>开户提醒</Text>
                        </View>
                        <Text style={styles.openContent}>尊敬的用户，您好！已为你配置“支付宝余额、储蓄卡、信用卡、花呗、花呗分期”的商户权限，请尽快提交开户资料以便开展收款业务。</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SelectMerchant')}>
                            <Text style={{color:'#3592fb',fontSize:scaleSize(28),paddingVertical:scaleSize(30)}}>去开户</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#f5f5f5',
    },
    openBox:{
        width:width*0.8,
        marginTop:scaleSize(80),
        backgroundColor:'#fff',
        borderRadius:scaleSize(6),
        overflow:'hidden',
        padding:scaleSize(30),
        paddingBottom:scaleSize(0),
        alignItems:'center',
        marginLeft:width*0.1,
    },
    openTitle:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignSelf:'flex-start',
    },
    openIcon:{
        width:scaleSize(40),
        height:scaleSize(40),
        marginRight:scaleSize(10),
    },
    openContent:{
        paddingVertical:scaleSize(30),
        fontSize:scaleSize(28),
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#eee',
        alignItems:'flex-start',
    }
    }
)