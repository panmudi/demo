import React, { Component } from 'react';

import {Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {scaleSize} from '../../util/px2dp'; //适配js
import NavigationBarM from '../../common/NavigationBarM';
import NavigatorUtil from "../../util/NavigatorUtil";
import StorageUtil from "../../util/StorageUtil";
import {API} from "../../common/Const";
import HttpUtil from "../../util/HttpUtil";

const { width, height } = Dimensions.get('window');

export default class AlipayNum extends Component{
    constructor(props){
        super(props);
        this.state = {
            alipay: '',
        };
    }

    componentDidMount() {
        StorageUtil.get("alipay").then((value) => {
            if (value) {
                this.setState({
                    alipay: value
                })
            }
        });
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
                StorageUtil.get("auth").then((value) => {
                    let formData = new FormData();
                    formData.append('alipay', this.state.alipay);
                    HttpUtil.post(API.updateAlipayAccount, formData, {
                        'Authorization': 'Bearer ' + value.access_token
                    }).then((json) => {
                        if (json.code === 0) {
                            StorageUtil.save("alipay", json.data, () => {
                                const { navigation } = this.props;
                                const alipayText= navigation.getParam('alipayText');
                                alipayText(this.state.alipay);
                                NavigatorUtil.goBack(this.props.navigation);
                            })
                        }
                    }, (error) => {
                        console.log(error)
                    });
                });
            }}>
            <Text style={{color: '#ee2424', fontSize: scaleSize(28),}}>{text}</Text>
        </TouchableOpacity>;
    }

    render() {
        return (

            <View style={styles.container}>
                <NavigationBarM
                    title='支付宝账号'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                    rightButton={this.renderText('保存')}
                />
                <ScrollView>
                {/*支付宝账号*/}

                    <View style={[styles.bankBox,{marginTop:scaleSize(20)}]}>
                        <View style={styles.writeBlock}>
                            <TextInput style={styles.bankInput} underlineColorAndroid="transparent"   placeholder='请输入支付宝账号' value={this.state.alipay}
                                       onChangeText={(text) => this.setState({alipay: text})}/>
                        </View>
                    </View>
                </ScrollView>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f5f5f5'
    },
    warnBlock: {
        paddingVertical:scaleSize(20),
        paddingHorizontal:scaleSize(70),
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'row',
        flexWrap:'nowrap',
        alignItems:'center',
    },
    warnIcon: {
        width:scaleSize(30),
        height:scaleSize(30),
        marginRight:scaleSize(10),
        alignSelf:'flex-start',
    },
    bankBox: {
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#eee',
        backgroundColor:'#fff',
        paddingLeft:scaleSize(30),
        display:'flex',
        justifyContent:'flex-start',
        marginBottom:scaleSize(20),
    },
    bankTitle: {
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#eee',
        fontSize:scaleSize(28),
        color:'#333',
        paddingVertical:scaleSize(30),
    },
    writeBlock: {
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingRight:scaleSize(30),
        paddingVertical:scaleSize(20),
    },
    bankInput: {
        width:scaleSize(620),
        padding:scaleSize(0),
        fontSize:scaleSize(28),
        color:'#888',
    },
    bankPhoto: {
        width:scaleSize(45),
        height:scaleSize(45),
        padding:scaleSize(0),
    }
});


