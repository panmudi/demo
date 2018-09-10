import React, { Component } from 'react';

import {Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {scaleSize} from '../../util/px2dp'; //适配js
import NavigationBarM from '../../common/NavigationBarM';
import NavigatorUtil from "../../util/NavigatorUtil";
import StorageUtil from "../../util/StorageUtil";
import {API} from "../../common/Const";
import HttpUtil from "../../util/HttpUtil";

const { width, height } = Dimensions.get('window');

export default class EnterpriseBankInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            bankCard: '',
            linkBankNumber: ''
        };
    }

    componentDidMount() {
        StorageUtil.get("bankInfo").then((value) => {
            if (value) {
                this.setState({
                    bankCard: value.bankCard,
                    linkBankNumber: value.linkBankNumber
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
                    formData.append('bankCard', this.state.bankCard);
                    formData.append('linkBankNumber', this.state.linkBankNumber);
                    HttpUtil.post(API.updateCompanyBankcard, formData, {
                        'Authorization': 'Bearer ' + value.access_token
                    }).then((json) => {
                        if (json.code === 0) {
                            StorageUtil.save("bankInfo", json.data, () => {
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
                    title='银行卡信息'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                    rightButton={this.renderText('保存')}
                />
                <ScrollView>
                {/*银行卡信息*/}
                    <View style={styles.warnBlock}>
                        <Image style={styles.warnIcon} source={require('../../../res/images/apply/apply_03.png')}/>
                        <Text style={{width:scaleSize(560),fontSize:scaleSize(20),color:'#ee2424',lineHeight:scaleSize(30)}}>为确保您的资金可正常结算，银行卡持卡人必须与营业执照经营者姓名一致。</Text>
                    </View>
                    <View style={styles.bankBox}>
                        <Text style={styles.bankTitle}>企业对公账号</Text>
                        <View style={styles.writeBlock}>
                            <TextInput style={styles.bankInput} underlineColorAndroid="transparent" placeholder={'请输入银行卡号'}
                                       value={this.state.bankCard}
                                       onChangeText={(text) => this.setState({bankCard: text})} />
                            {/*图像识别银行卡<Image style={styles.bankPhoto} source={require('../../../res/images/apply/apply_04.png')} />*/}
                        </View>
                    </View>
                    <View style={styles.bankBox}>
                        <Text style={styles.bankTitle}>联行号</Text>
                        <View style={styles.writeBlock}>
                            <TextInput style={styles.bankInput} underlineColorAndroid="transparent" placeholder={'请输入联行号'}
                                       value={this.state.linkBankNumber}
                                       onChangeText={(text) => this.setState({linkBankNumber: text})} />
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


