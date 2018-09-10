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
import {Modal, WhiteSpace, WingBlank } from 'antd-mobile-rn';

import {setSpText,scaleSize} from '../../util/px2dp';
import NavigationBarM from '../../common/NavigationBarM';
import {API} from '../../common/Const';
import StorageUtil from '../../util/StorageUtil';
import HttpUtil from '../../util/HttpUtil';
import NavigatorUtil from "../../util/NavigatorUtil";
import {Button} from 'react-native-elements';

const {width,height}=Dimensions.get("window");
var navigation = null;

export default class AddEmployee extends Component{
    constructor(props){
        super(props);
        this.state={
            authorityType: 'less',//配置权限
            authorityState: false,//选中状态
        };
        navigation=this.props.navigation;
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

    //权限配置
    authorityLess() {
        if (this.state.authorityType === 'less' && this.state.authorityState) {
            this.setState({
                authorityState: false,
            });
        } else {
            this.setState({
                authorityState: true,
            });
        }
        this.setState({
            authorityType: 'less',
        });
    }
    //权限配置
    authorityMore() {
        if (this.state.authorityType === 'more' && this.state.authorityState) {
            this.setState({
                authorityState: false,
            });
        } else {
            this.setState({
                authorityState: true,
            });
        }
        this.setState({
            authorityType: 'more',
        });
    }

    addButton() {
        Modal.alert('温馨提示', '确定为商户[18338484838]配置该权限吗？', [
            { text: '确定', onPress: () => console.log('sure'), style: 'cancel'},
            { text: '取消', onPress: () =>console.log('cancel'), style: 'cancel' },
        ]);
    }

    render(){
        const {authorityType,authorityState}=this.state;
        return(
            <View style={styles.contain}>
                <NavigationBarM
                    title='搜索'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <ScrollView>
                    <View style={styles.marginTop}>
                        <Text style={styles.cashierTitle}>对方手机号</Text>
                        <View style={styles.applyInformation}>
                            <View style={styles.phnumberBox}>
                                <Text style={styles.applyText}>+86</Text>
                                <TextInput
                                    secureTextEntry={true}
                                    style={styles.applyInput}
                                    underlineColorAndroid='transparent'
                                    placeholderTextColor='#ccc'
                                    placeholder={'请输入手机号'}
                                  />
                            </View>
                            <Image source={require('../../../res/images/commercial/phnumber.png')} style={{width:scaleSize(43),height:scaleSize(42)}} />
                        </View>
                    </View>
                    <View style={styles.buttonBox}>
                        <Button
                            title='搜索'
                            buttonStyle={styles.CommercialButtonAdd}
                            textStyle={{fontSize:scaleSize(32)}}
                            onPress={()=>this.addButton()}
                        />
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
    marginTop:{
        marginBottom:scaleSize(20),
        marginTop:scaleSize(20),
        paddingLeft:scaleSize(30),
        backgroundColor:'#fff',
        borderTopWidth:scaleSize(1),
        borderTopColor:'#eee',
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#eee',
    },
    applyInformation: {
        paddingHorizontal:scaleSize(30),
        paddingVertical:scaleSize(20),
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
    },
    phnumberBox:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
    },
    applyText: {
        fontSize:scaleSize(28),
        width:scaleSize(60),
        color:'#333',
    },
    applyInput: {
        width:scaleSize(350),
        marginLeft:scaleSize(60),
        padding:scaleSize(0),
        fontSize:scaleSize(28),
    },
    buttonBox:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    CommercialButtonAdd:{
        width:width*0.9,
        borderRadius:scaleSize(8),
        height:scaleSize(70),
        backgroundColor:'#ee2424',
        marginTop:scaleSize(30),
    },
    cashierTitle:{
        fontSize:scaleSize(26),
        color:'#333',
        paddingVertical:scaleSize(30),
        borderBottomColor:'#eee',
        borderBottomWidth:scaleSize(1),
        paddingLeft:scaleSize(30),
    },
})