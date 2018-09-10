import React, { Component } from 'react';
import { StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    DeviceEventEmitter,
    TouchableOpacity,
    TextInput
} from 'react-native';

const { width, height } = Dimensions.get('window');

import {scaleSize} from '../../util/px2dp';//适配js

import NavigationBarM from '../../common/NavigationBarM';
import NavigatorUtil from "../../util/NavigatorUtil";
import {API} from "../../common/Const";
import HttpUtil from "../../util/HttpUtil";
import StorageUtil from "../../util/StorageUtil";
import {Modal ,Toast} from 'antd-mobile-rn';

var navigation = null;
export default class Terminal extends Component{
    constructor(props){
        super(props);
        this.state = {
            terminalState:true,//
        };
        navigation=this.props.navigation;
    }
    componentWillMount(){

    }
    //在组件销毁的时候要将其移除
    componentWillUnmount(){

    };

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

    //tabs
    tabL(){
        this.setState({
            terminalState:true,
        })
    }
    tabR(){
        this.setState({
            terminalState:false,
        })
    }

    render() {
        const {terminalState}=this.state;
        return (
            <View style={styles.container}>
                <NavigationBarM
                    title='我的终端'
                    style={{backgroundColor: '#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                {/**/}
                <View style={[styles.terStore,styles.mt20]}>
                    <TouchableOpacity onPress={this.tabL.bind(this)} activeOpacity={1} style={{flex:1}}>
                        <View style={[styles.terItem]}>
                            <Text style={[styles.terType,terminalState?styles.active:'']}>终端库存</Text>
                            <Text style={[styles.terNum,]}>1090台</Text>
                        </View>
                    </TouchableOpacity>
                    {/**/}
                    <TouchableOpacity onPress={this.tabR.bind(this)} activeOpacity={1} style={{flex:1}}>
                        <View style={[styles.terItem]}>
                            <Text style={[styles.terType,terminalState?'':styles.active]}>已流出终端</Text>
                            <Text style={[styles.terNum,]}>17245台</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/**/}
                <View style={[styles.terStay,terminalState?'':styles.hide]}>
                    <TouchableOpacity onPress={()=>navigation.navigate('TerminalCode')}>
                        <View style={[styles.TsItem,styles.mt20]}>
                            {/**/}
                            <View style={[styles.TsItemL]}>
                                <Image style={[styles.TsIcon]} source={require('../../../res/images/termina/termina01.png')}/>
                                <View>
                                    <Text style={[styles.TsText1]}>终端</Text>
                                    <Text style={[styles.TsText2]}>未开通分期</Text>
                                    <Text style={[styles.TsText2]}>已开通花呗</Text>
                                </View>
                            </View>
                            {/**/}
                            <View style={[styles.TsItemR]}>
                                <Text style={{color:'#fff',fontSize:scaleSize(24),marginRight:scaleSize(10),}}>数量：1049台</Text>
                                <Image style={styles.nextIcon} source={require('../../../res/images/arrowLeft.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/**/}
                    {/*<View style={[styles.TsItem,styles.mt20]}>*/}
                        {/*/!**!/*/}
                        {/*<View style={[styles.TsItemL]}>*/}
                            {/*<Image style={[styles.TsIcon]} source={require('../../../res/images/termina/termina01.png')}/>*/}
                            {/*<View>*/}
                                {/*<Text style={[styles.TsText1]}>终端</Text>*/}
                                {/*<Text style={[styles.TsText2]}>已开通分期</Text>*/}
                                {/*<Text style={[styles.TsText2]}>已开通花呗</Text>*/}
                            {/*</View>*/}
                        {/*</View>*/}
                        {/*/!**!/*/}
                        {/*<View style={[styles.TsItemR]}>*/}
                            {/*<Text style={{color:'#fff',fontSize:scaleSize(24),marginRight:scaleSize(10),}}>数量：1049台</Text>*/}
                            {/*<Image style={styles.nextIcon} source={require('../../../res/images/arrowLeft.png')} />*/}
                        {/*</View>*/}
                    {/*</View>*/}
                </View>

                {/**/}
                <View style={[terminalState?styles.hide:'',styles.mt20]}>
                    <View style={styles.countList}>
                        <View style={styles.countImages}><Image style={styles.childImage} source={require('../../../res/images/termina/termina02.png')}/></View>
                        <View style={styles.countText}>
                            <View>
                                <Text style={styles.TsText3}>全配版  x1</Text>
                                <Text style={styles.TsText4}>划拨给 <Text style={styles.TsText5}>[15271913129]</Text></Text>
                            </View>
                            <Text style={styles.TsText6}>2018-06-20 17:05:26</Text>
                        </View>
                    </View>
                    {/**/}
                    <View style={styles.countList}>
                        <View style={styles.countImages}><Image style={styles.childImage} source={require('../../../res/images/termina/termina02.png')}/></View>
                        <View style={styles.countText}>
                            <View>
                                <Text style={styles.TsText3}>全配版  x1</Text>
                                <Text style={styles.TsText4}>划拨给 <Text style={styles.TsText5}>[15271913129]</Text></Text>
                            </View>
                            <Text style={styles.TsText6}>2018-06-20 17:05:26</Text>
                        </View>
                    </View>
                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f5f5f5'
    },
    hide:{
        display:'none',
    },
    terStore:{
        height:scaleSize(128),
        backgroundColor:'#fff',
        flexDirection:'row',
    },
    mt20:{
        marginTop:scaleSize(20),
    },
    terItem:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    terType:{
        color:'#999',
        fontSize:scaleSize(22),
    },
    terNum:{
        color:'#28e239',
        fontSize:scaleSize(26),
        marginTop:scaleSize(5)
    },
    active:{
        color: '#2858f3',
    },
    //留
    terStay:{

    },
    TsItemL:{
        flexDirection:'row',

    },
    TsItem:{
        height:scaleSize(168),
        backgroundColor:'#ee2424',
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        paddingRight:scaleSize(30),
        paddingLeft:scaleSize(70),
    },
    TsIcon:{
        width:scaleSize(68),
        height:scaleSize(74),
        marginRight:scaleSize(20),
        marginTop:scaleSize(10),
    },
    TsText1:{
        color:'#fff',
        fontSize:scaleSize(26),
    },
    TsText2:{
        color:'#fff',
        fontSize:scaleSize(20),
    },
    //去
    TsItemR:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
    },
    nextIcon:{
        width:scaleSize(15),
        height:scaleSize(25),
    },
    countList:{
        paddingHorizontal:scaleSize(30),
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    countImages:{
        width:scaleSize(66),
        height:scaleSize(66),
        backgroundColor:'#f53b3b',
        borderRadius:scaleSize(66),
        marginRight:scaleSize(30),
        overflow:'hidden',
    },
    childImage:{
        width:scaleSize(66),
        height:scaleSize(66),
        resizeMode:'contain'
    },
    countText:{
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#eee',
        paddingVertical:scaleSize(20),
        flexGrow:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
    },
    TsText3:{
        fontSize:scaleSize(24),
        color:'#333',
    },
    TsText4:{
        fontSize:scaleSize(22),
        color:'#888',
    },
    TsText5:{
        fontSize:scaleSize(22),
        color:'#555',
    },
    TsText6:{
        fontSize:scaleSize(20),
        color:'#888',
    },
});