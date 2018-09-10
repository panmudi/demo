
import React, { Component } from 'react';

import {
    StyleSheet,
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

const { width, height } = Dimensions.get('window');

import {setSpText,scaleSize} from '../util/px2dp';//适配js
import NavigationBarM from '../common/NavigationBarM';
import NavigatorUtil from "../util/NavigatorUtil";
import Login from "./Login";

export default class ForgetPwdNext extends Component{
    constructor(){
        super();
        this.state = {};
    }
    static navigationOptions = {
        title: '忘记密码',
        headerTintColor: '#333',
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize:scaleSize(32),
        },
    };
    onButtonPress(){
        const {navigation} = this.props;
        navigation.navigate('Login');
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
                    title='忘记密码'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../res/images/back-black.png'))}
                />
                <View style={styles.marginTop}>
                    <View>
                        <View style={styles.applyInformation}>
                            <Text style={styles.applyText}>新密码</Text>
                            <TextInput style={styles.applyInput} underlineColorAndroid='transparent'  placeholderTextColor='#ccc' placeholder={'请输入新密码'}/>
                        </View>
                        <View style={[styles.applyInformation,{borderTopWidth:scaleSize(1),borderTopColor:'#eee'}]}>
                            <Text style={styles.applyText}>确认新密码</Text>
                            <TextInput style={styles.applyInput} underlineColorAndroid='transparent'  placeholderTextColor='#ccc' under placeholder={'请确认新密码'}/>
                        </View>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={this.onButtonPress.bind(this)} style={{marginTop:scaleSize(50),}}>
                    <View style={{ width:width,
                        paddingLeft:scaleSize(30),
                        paddingRight:scaleSize(30),}}>
                        <View style={styles.btn}>
                            <Text style={{color: '#fff', fontSize: scaleSize(32),textAlign:'center',lineHeight:scaleSize(70)}}>确认</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
         flex:1,
        backgroundColor:'#f5f5f5',
    },
    marginTop:{
        marginBottom:scaleSize(20),
        marginTop:scaleSize(20),
        paddingLeft:scaleSize(30),
        backgroundColor:'#fff',
    },
    btn:{
        height:scaleSize(70),
        backgroundColor:'#ee2424',
        borderRadius:scaleSize(10),
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
        width:scaleSize(180),
        color:'#333',
    },
    applyInput: {
        width:scaleSize(400),
        marginLeft:scaleSize(60),
        padding:scaleSize(0),
        fontSize:scaleSize(28),
    },
});


