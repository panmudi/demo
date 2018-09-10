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

const {width,height}=Dimensions.get('window');
var navigation = null;
export default class InformationDetails extends Component{
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
                    title='开户资料详情'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <ScrollView>
                    <View style={styles.accountBox}>
                        <View style={styles.accountInformation}>
                            <Text style={{color:'#333',fontSize:scaleSize(28)}}>武汉扬帆物流有限公司</Text>
                            <View style={styles.telInformation}>
                                <Image style={{width:scaleSize(22),height:scaleSize(22),marginRight:scaleSize(10)}} source={require('../../../res/images/commercial/commercial_03.png')} />
                                <Text style={{color:'#555',fontSize:scaleSize(20)}}>13214569874</Text>
                            </View>
                        </View>
                        <View style={{borderBottomWidth:scaleSize(1),borderBottomColor:'#eee',paddingBottom:scaleSize(15)}}>

                            <View  style={styles.accountText}>
                                <Text style={{color:'#999',fontSize:scaleSize(24),}}>地址</Text>
                                <Text style={{color:'#333',fontSize:scaleSize(24),}}>洪山区马湖新村</Text>
                            </View>
                            <View  style={styles.accountText}>
                                <Text style={{color:'#999',fontSize:scaleSize(24),}}>所属行业</Text>
                                <Text style={{color:'#333',fontSize:scaleSize(24),}}>手机通讯</Text>
                            </View>
                            <View style={styles.accountText}>
                                <Text style={{color:'#999',fontSize:scaleSize(24),}}>支付宝账号</Text>
                                <Text style={{color:'#333',fontSize:scaleSize(24),}}>waw***@tom.com</Text>
                            </View>
                        </View>
                        <View style={{paddingVertical:scaleSize(15)}}>
                            <View style={styles.accountText}>
                                <Text style={{color:'#999',fontSize:scaleSize(24),}}>创建时间</Text>
                                <Text style={{color:'#333',fontSize:scaleSize(24),}}>2018-06-21 16:02</Text>
                            </View>
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
        backgroundColor:'#f5f5f5',
        position:'relative',
    },
    accountBox: {
        backgroundColor:'#fafafa',
        paddingHorizontal:scaleSize(30),
        paddingTop:scaleSize(0),
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#eee',
        marginBottom:scaleSize(20),
    },
    telInformation:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:scaleSize(30),
    },
    accountText: {
        marginTop:scaleSize(15),
        marginBottom:scaleSize(15),
        flexDirection:'row',
        justifyContent:'space-between',
    },
    accountInformation:{
        marginTop:scaleSize(30),
        marginBottom:scaleSize(20),
        alignItems:'center',
    },
    countImages:{
        width:scaleSize(66),
        height:scaleSize(66),
        backgroundColor:'#f53b3b',
        borderRadius:scaleSize(66),
        marginRight:scaleSize(30),
    },
    accountPerson:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    ButtonMore:{
        backgroundColor:'#fff',
        height:scaleSize(70),
    },
    cashierTitle:{
        fontSize:scaleSize(26),
        color:'#333',
        paddingVertical:scaleSize(30),
        borderBottomColor:'#eee',
        borderBottomWidth:scaleSize(1),
        paddingLeft:scaleSize(30),
    },
    cashierBox:{
        backgroundColor:'#fff',
        borderBottomColor:'#eee',
        borderBottomWidth:scaleSize(1)
    }
})