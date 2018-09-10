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

const { width, height } = Dimensions.get('window');

import {setSpText,scaleSize} from '../../util/px2dp';//适配js
import NavigationBarM from '../../common/NavigationBarM';
import NavigatorUtil from "../../util/NavigatorUtil";

export default class Withdraw extends Component{
    constructor(props){
        super(props);
        this.state = {
            money:'',
            visible:false
        };
    }
    // static navigationOptions = {
    //     title: '提现',
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

    moneyFuntion(){
        let moneyVar=this.state.money;
        if (moneyVar<71.03){
            this.setState({
                visible:true
            })
        }else{
            this.setState({
                visible:false
            })

        }
    }
    
    render() {
        return (
            <View>
                <NavigationBarM
                    title='提现'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                {/**/}
                <View style={[styles.userItem,{marginTop:scaleSize(20),}]}>
                    <Text style={{color:'#333',fontSize:scaleSize(28),}}>提现账户</Text>
                    <View style={styles.nextContain}>
                        <Image style={styles.AlipayIcon} source={require('../../../res/images/Alipay.png')} />
                        <View>
                            <Text style={{color:'#333',fontSize:scaleSize(28),marginRight:scaleSize(10),}}>账号(waw***@tom.com)</Text>
                            <Text style={{color:'#999',fontSize:scaleSize(22),marginRight:scaleSize(10),}}>预计1~2个工作日到账</Text>
                        </View>

                    </View>

                </View>
                {/**/}
                <View style={[styles.moneyItem,styles.mt20]}>
                    <View>
                        <Text style={{color:'#333',fontSize:scaleSize(28),marginTop:scaleSize(30)}}>提现金额</Text>
                    </View>
                    {/**/}
                    <View>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="请输入金额"
                            defaultValue={this.state.money}
                            underlineColorAndroid='transparent'
                            value={this.state.text}
                            onChange={()=>this.moneyFuntion()}
                            onChangeText ={(text)=>{this.setState({money: text})}}

                        />
                    </View>
                    {/**/}
                    <View style={{ justifyContent:'space-between', flexDirection:'row',}}>
                        <Text style={{color:'#333',fontSize:scaleSize(20),marginTop:scaleSize(30)}}>钱包余额¥71.03</Text>
                        <Text style={{color:'#3592fb',fontSize:scaleSize(20),marginTop:scaleSize(30)}}>全部提现</Text>
                    </View>

                </View>
                {/**/}
                <TouchableOpacity style={{marginTop:scaleSize(50),}}>
                    <View style={{ width:width,
                        paddingLeft:scaleSize(30),
                        paddingRight:scaleSize(30),}}>
                        <View style={[this.state.visible?styles.btn:styles.btnChange]}>
                            <Text style={{color: '#fff', fontSize: scaleSize(32),textAlign:'center',lineHeight:scaleSize(70)}}>提现</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Text style={{color:'#999',fontSize:scaleSize(20),textAlign:'center', marginTop:scaleSize(30)}}>注：提现单笔限额为1000.00元，每日最多可提现3次</Text>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    moneyItem:{
        height:scaleSize(250),
        backgroundColor:'#fff',
        paddingHorizontal:scaleSize(30),
        display:'flex',
        justifyContent:'flex-start',
        // flexDirection:'row',
        // alignItems:'center',
        borderBottomColor:'#eeeeee',
        borderBottomWidth:scaleSize(1),
    },
    userItem:{
        height:scaleSize(128),
        backgroundColor:'#fff',
        paddingHorizontal:scaleSize(30),
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#eeeeee',
        borderBottomWidth:scaleSize(1),

    },
    nextContain:{
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center',
        width:scaleSize(420),
        marginLeft:scaleSize(80),

    },
    AlipayIcon:{
        width:scaleSize(68),
        height:scaleSize(68),
        marginRight:scaleSize(20),
    },
    mt20:{
        marginTop:scaleSize(20)
    },

    inputStyle:{
        width:width,
        height:scaleSize(100),
        fontSize:scaleSize(24),
        backgroundColor:'#fff',
        borderBottomWidth:scaleSize(1),
        borderColor:'#eee',
        borderStyle:'solid',
    },
    btnChange:{
        height:scaleSize(70),
        backgroundColor:'#ee2424',
        borderRadius:scaleSize(10),
        opacity:0.5,
    },
    btn:{
        height:scaleSize(70),
        backgroundColor:'#ee2424',
        borderRadius:scaleSize(10),
    },
});
