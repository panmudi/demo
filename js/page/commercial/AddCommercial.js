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

export default class AddCommercial extends Component{
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
        Modal.alert('温馨提示', '确定为商户[18338484838]配置该权限吗？',
            [
            { text: '确定', onPress: () => console.log('sure'), style: 'cancel'},
            { text: '取消', onPress: () =>console.log('cancel'), style: 'cancel' },
        ]);
    }

    render(){
        const {authorityType,authorityState}=this.state;
        return(
            <View style={styles.contain}>
                <NavigationBarM
                    title='新增开户'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <ScrollView>
                    <View style={styles.marginTop}>
                        <View style={styles.applyInformation}>
                            <Text style={styles.applyText}>商户注册手机号</Text>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.applyInput}
                                underlineColorAndroid='transparent'
                                placeholderTextColor='#ccc'
                                placeholder={'请输入'}
                              />
                        </View>
                    </View>
                    <View style={styles.marginTop}>
                        <Text style={{fontSize:scaleSize(28),color:'#333',marginVertical:scaleSize(30)}}>配置商户权限</Text>
                        <TouchableOpacity onPress={this.authorityLess.bind(this)} activeOpacity={1}>
                            <View style={[styles.checkBox,(authorityType === 'less' && authorityState) ? styles.checkBoxChange : '']}>
                                <View style={styles.checkList}>
                                    <Image style={styles.checkImage} source={require('../../../res/images/commercial/commercial_04.png')} />
                                    <Text style={styles.checkText}>支付宝余额</Text>
                                </View>
                                <View style={styles.checkList}>
                                    <Image style={styles.checkImage} source={require('../../../res/images/commercial/commercial_04.png')} />
                                    <Text style={styles.checkText}>储蓄卡</Text>
                                </View>
                                <View style={styles.checkList}>
                                    <Image style={styles.checkImage} source={require('../../../res/images/commercial/commercial_04.png')} />
                                    <Text style={styles.checkText}>信用卡</Text>
                                </View>
                                <Image source={require('../../../res/images/commercial/select.png')} style={[styles.selectedImages,(authorityType === 'less' && authorityState) ? styles.selectedImagesChange : '']}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.authorityMore.bind(this)} activeOpacity={1}>
                            <View style={[styles.checkBox,{marginBottom:scaleSize(40)},(authorityType === 'more' && authorityState) ? styles.checkBoxChange : '']}>
                                <View style={styles.checkList}>
                                    <Image style={styles.checkImage} source={require('../../../res/images/commercial/commercial_04.png')} />
                                    <Text style={styles.checkText}>支付宝余额</Text>
                                </View>
                                <View style={styles.checkList}>
                                    <Image style={styles.checkImage} source={require('../../../res/images/commercial/commercial_04.png')} />
                                    <Text style={styles.checkText}>储蓄卡</Text>
                                </View>
                                <View style={styles.checkList}>
                                    <Image style={styles.checkImage} source={require('../../../res/images/commercial/commercial_04.png')} />
                                    <Text style={styles.checkText}>信用卡</Text>
                                </View>
                                <View style={styles.checkList}>
                                    <Image style={styles.checkImage} source={require('../../../res/images/commercial/commercial_04.png')} />
                                    <Text style={styles.checkText}>花呗</Text>
                                </View>
                                {/*<View style={styles.checkList}>*/}
                                    {/*<Image style={styles.checkImage} source={require('../../../res/images/commercial/commercial_04.png')} />*/}
                                    {/*<Text style={styles.checkText}>花呗分期</Text>*/}
                                {/*</View>*/}
                                <Image source={require('../../../res/images/commercial/select.png')} style={[styles.selectedImages,(authorityType === 'more' && authorityState) ? styles.selectedImagesChange : '']}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonBox}>
                        <Button
                            title='确定'
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
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
    },
    applyText: {
        fontSize:scaleSize(28),
        width:scaleSize(220),
        color:'#333',
    },
    applyInput: {
        width:scaleSize(400),
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
    checkBox:{
        borderColor:'#eee',
        borderWidth:scaleSize(1),
        borderRadius:scaleSize(10),
        marginBottom:scaleSize(20),
        marginRight:scaleSize(30),
        paddingHorizontal:scaleSize(70),
        paddingTop:scaleSize(30),
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'flex-start',
        flexWrap:'wrap',
        position:'relative',
    },
    checkBoxChange:{
        borderColor:'#ee2424',
        borderWidth:scaleSize(1),
    },
    checkList:{
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center',
        marginRight:scaleSize(45),
        marginBottom:scaleSize(30)
    },
    checkImage:{
        width:scaleSize(31),
        height:scaleSize(31),
        marginRight:scaleSize(10),
    },
    checkText:{
        fontSize:scaleSize(20),
        color:'#333',
    },
    selectedImages:{
        position:'absolute',
        right:-9999,
    },
    selectedImagesChange:{
        position:'absolute',
        top:0,
        right:0,
        width:scaleSize(49),
        height:scaleSize(42),
    }
})