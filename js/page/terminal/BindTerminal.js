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
import NavigationBarM from '../../common/NavigationBarM';
import {API} from '../../common/Const';
import StorageUtil from '../../util/StorageUtil';
import HttpUtil from '../../util/HttpUtil';
import NavigatorUtil from "../../util/NavigatorUtil";
import {Button,ListItem,Icon,SearchBar} from 'react-native-elements';

const {width,height}=Dimensions.get("window");
const terminalImg = require('../../../res/images/termina/terminal_03.png');
const terminalImgSelect = require('../../../res/images/termina/terminal_06.png');

var navigation = null;


export default class BindTerminal extends Component{
    constructor(props){
        super(props);
        this.state={
            someMethod:'111',
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

    renderText(text){
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={()=>{
                this.onClearText()
            }}>
            <Text style={{color: '#ee2424', fontSize: scaleSize(28),}}>{text}</Text>
        </TouchableOpacity>;
    }

    render(){
        return(
            <View style={styles.contain}>
                <NavigationBarM
                    title='绑定开户资料'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                    rightButton={this.renderText('取消')}
                />
                <ScrollView>
                    <View style={styles.bindWarning}>
                        <Image source={require('../../../res/images/commercial/icon_03.png')} style={{width:scaleSize(30),height:scaleSize(30)}} />
                        <Text style={{color:'#f87116',fontSize:scaleSize(24),marginLeft:scaleSize(15)}}>成功绑定他人开户资料后，可使用它代替该商户收款！</Text>
                    </View>
                    <SearchBar
                        onChangeText={(someMethod) => this.setState({someMethod})}
                        onClearText={(someMethod) => this.setState({someMethod})}
                        icon={{ type: 'MaterialIcons', name: 'search',color: '#999999'}}
                        clearIcon={{ type: 'MaterialIcons', name: 'clear',color: '#999999'}}
                        placeholder='商户名称或手机号'
                        inputStyle={{
                            backgroundColor:'#fbf5f5',
                            borderRadius:scaleSize(12),
                            fontSize:scaleSize(24),
                        }}
                        containerStyle={{
                            backgroundColor:'#fff',
                            borderTopWidth:scaleSize(0),
                            borderBottomWidth:scaleSize(0),
                            borderTopColor:'transparent',
                            borderBottomColor:'transparent',

                        }}
                        inputContainerStyle={{
                            paddingVertical:scaleSize(0),
                            backgroundColor:'#f00',
                        }}
                    />
                </ScrollView>
            </View>
        )
    }

}

const styles=StyleSheet.create({
    contain:{
        flex:1,
        backgroundColor:'#fff',
        position:'relative',
    },
    bindWarning:{
        flexDirection:'row',
        alignItems:'center',
        margin:scaleSize(30),
    }
})