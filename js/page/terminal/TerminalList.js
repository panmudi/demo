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
import {Button,ListItem,Icon} from 'react-native-elements';
import BindTerminal from "./BindTerminal";

const {width,height}=Dimensions.get("window");
const terminalImg = require('../../../res/images/termina/terminal_03.png');
const terminalImgSelect = require('../../../res/images/termina/terminal_06.png');

var navigation = null;

const list = [
    {
        name: '一加数码',
    },
    {
        name: '一加数码',
    },
    {
        name: '一加数码',
    },
]

export default class TerminalList extends Component{
    constructor(props){
        super(props);
        this.state={
            someMethod:'111',
            terminalState:false,
            titleColor:'#f00',
            listNumber: 0,
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

    terminalCheck(i){
        if(i === 0){
            this.setState({
                terminalState: false,
                listNumber:i,
            });
        } else if(!(this.state.terminalState) && i === 0) {
            this.setState({
                terminalState: true,
                listNumber: i,
            });
        } else if (!(this.state.terminalState) && i>0){
            this.setState({
                terminalState: false,
                listNumber:i,
            });
        }
        else{
            this.setState({
                terminalState: false,
                listNumber:i,
            });
        }

    }

    render(){
        const {terminalState,terminalUrl,listNumber,firstState}=this.state
        return(
            <View style={styles.contain}>
                <NavigationBarM
                    title='切换终端'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <ScrollView>
                    <View style={{borderBottomColor:'#eee', borderBottomWidth:scaleSize(1),backgroundColor:'#fff',marginTop:scaleSize(20)}}>
                        {
                            list.map((item, i) => (
                                <View  style={styles.terminalList}>
                                    <Image source={listNumber === i && (!terminalState) ? terminalImgSelect:terminalImg } style={{width:scaleSize(45),height:scaleSize(45),paddingVertical:scaleSize(20),}} />
                                    <ListItem
                                        key={i}
                                        hideChevron={listNumber === i && (!terminalState) ? false:true}
                                        title={item.name}
                                        titleStyle={[
                                            listNumber === i && (!terminalState) ? styles.titleColorChange:styles.titleColor,
                                            {
                                                fontSize:scaleSize(28),
                                                marginLeft:scaleSize(0),
                                                paddingVertical:scaleSize(20),
                                            }
                                        ]}
                                        containerStyle={{
                                            borderBottomColor:'#eee',
                                            borderBottomWidth:scaleSize(1),
                                            width:width*0.88,
                                        }}
                                        onPress={()=>this.terminalCheck(i)}
                                        rightIcon={{
                                                name:'check',
                                                type:'MaterialIcons',
                                                color:'#ee2424'}}
                                    />
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
                <View style={styles.terminalBottom}>
                    <Text style={{color:'#333',fontSize:scaleSize(28)}}>替他人收款？</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('BindTerminal')}><Text style={{color:'#f14545',fontSize:scaleSize(28)}}>绑定开户资料</Text></TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles=StyleSheet.create({
    contain:{
        flex:1,
        backgroundColor:'#f5f5f5',
        position:'relative',
    },
    telInformation:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:scaleSize(20),
    },
     terminalList:{
         flexDirection:'row',
         justifyContent:'space-between',
         paddingLeft:scaleSize(30),
         alignItems:'center',
    },
    terminalBottom:{
        width:width,
        borderTopColor:'#eee',
        borderTopWidth:scaleSize(1),
        paddingVertical:scaleSize(30),
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        bottom:0,
        left:0,
        backgroundColor:'#fff'
    },
    titleColor:{
        color:'#333',
    },
    titleColorChange:{
        color:'#ee2424',
    },
})