import React, { Component } from 'react';

import {Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RadioButton, RadioGroup} from 'react-native-flexi-radio-button';
import {scaleSize} from '../../util/px2dp'; //适配js
import NavigationBarM from '../../common/NavigationBarM';
import NavigatorUtil from "../../util/NavigatorUtil";
import { Toast} from 'antd-mobile-rn';

const { width, height } = Dimensions.get('window');




export default class SelectMerchant extends Component{
    constructor(props){
        super(props);
        this.state = {
            avatarSource: null,
            photoSource: null,
            visible:false,
        };
    }

    //"true" or "false"的函数定义
    trueFuntion(){
        this.setState({
            visible:true
        })
    }
    falseFuntion(){
        this.setState({
            visible:false
        })
    }
    falseFuntionTwo(){
        this.setState({
            visible:false
        })
        this.props.navigation.navigate('HomePage');
    }

    onSelect(index, value){
        this.setState({
            text: `${value}`
        })
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

    onButtonPress(){
        if(this.state.text === 'item1'){
            this.props.navigation.navigate('PersonApply');
        }else if(this.state.text === 'item2'){
            this.props.navigation.navigate('EnterpriseApply');
        }else{
            Toast.info('请选择商户类型！',1);
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <NavigationBarM
                    title='选择商户类型'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
               {/*选择商户类型*/}
                <RadioGroup
                    onSelect = {(index, value) => this.onSelect(index, value)}
                    size={scaleSize(36)}
                    color='#ddd'
                    activeColor='#ee2424'
                    // selectedIndex={0}
                    highlightColor='#fff'
                >
                    <RadioButton  style={styles.merchantBlock} value={'item1'} color='#ee2424'>
                        <View style={{
                            display:'flex',
                            justifyContent:'flex-start',
                            alignItems:'center',
                            flexDirection:'row'}}>
                            <Image style={styles.merchantIcon} source={require('../../../res/images/apply/apply_01.png')} />
                            <View style={styles.merchantText}>
                                <Text style={{color:'#333',fontSize:scaleSize(28)}}>个体工商户</Text>
                                <Text style={{color:'#555',fontSize:scaleSize(22),lineHeight:scaleSize(35)}}>需要经营者本人身份证、个体工商户营业执照及个人银行账户</Text>
                            </View>
                        </View>
                    </RadioButton>
                    <RadioButton  style={styles.merchantBlock} value={'item2'} color='#ee2424'>
                        <View style={{
                            display:'flex',
                            justifyContent:'flex-start',
                            alignItems:'center',
                            flexDirection:'row'}}>
                            <Image style={styles.merchantIcon} source={require('../../../res/images/apply/apply_02.png')} />
                            <View style={styles.merchantText}>
                                <Text style={{color:'#333',fontSize:scaleSize(28)}}>企业用户</Text>
                                <Text style={{color:'#555',fontSize:scaleSize(22),lineHeight:scaleSize(35)}}>需要法人身份证、企业营业执照、开户许可证 及企业对公账户</Text>
                            </View>
                        </View>
                    </RadioButton>
                </RadioGroup>
                <TouchableOpacity activeOpacity={0.8} onPress={this.onButtonPress.bind(this)} style={{marginTop:scaleSize(50),}}>
                    <View style={{ width:width,
                        paddingLeft:scaleSize(30),
                        paddingRight:scaleSize(30),}}>
                        <View style={styles.btn}>
                            <Text style={{color: '#fff', fontSize: scaleSize(32),textAlign:'center',lineHeight:scaleSize(70)}}>确定</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.trueFuntion()} style={{marginTop:scaleSize(500),}} >
                    <View style={styles.merchantBottom} >
                        <Text style={{color:'#555555',fontSize:scaleSize(22)}}>资格不符合？</Text>
                        <Text style={{color:'#ee2424',fontSize:scaleSize(22)}}>放弃开户</Text>
                    </View>
                </TouchableOpacity>

                {/*放弃开户弹出层*/}
                <Modal
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={styles.modalContain}>
                        <View style={styles.modalBlock}>
                            <Text style={styles.modalTitle}>放弃开户</Text>
                            <Text style={styles.modalContent}>您确定要放弃开户吗？</Text>
                            <View style={styles.modalBtn}>
                                <TouchableOpacity  activeOpacity={0.8}  onPress={() => this.falseFuntion()}>
                                    <Text style={styles.modalClose}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  activeOpacity={0.8}  onPress={() => this.falseFuntionTwo()}>
                                    <Text style={[styles.modalClose,styles.modalSure]}>确定</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f5f5f5',
    },
    merchantBlock: {
        borderBottomColor:'#eee',
        borderBottomWidth:scaleSize(1),
        borderTopColor:'#eee',
        borderTopWidth:scaleSize(1),
        backgroundColor:'#fff',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row-reverse',
        flexWrap:'nowrap',
        marginTop:scaleSize(20),
    },
    merchantIcon: {
        width:scaleSize(50),
        height:scaleSize(50),
        marginHorizontal:scaleSize(10),
        marginRight:scaleSize(25),
    },
    merchantText: {
         width:scaleSize(530),
        marginHorizontal:scaleSize(20),
        marginRight:scaleSize(35),
    },
    btn:{
        height:scaleSize(70),
        backgroundColor:'#ee2424',
        borderRadius:scaleSize(10),
    },
    merchantBottom: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    modalContain: {
        width:width,
        height:height,
        backgroundColor:'rgba(0,0,0,0.6)',
    },
    modalBlock: {
        width:width*0.8,
        height:height*0.35,
        marginLeft:width*0.1,
        marginTop:height*0.3,
        backgroundColor:'#fff',
        borderRadius:scaleSize(10),
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    modalTitle: {
        fontSize:scaleSize(36),
        color:'#333',
        textAlign:'center',
        marginTop:scaleSize(60),
        marginBottom:scaleSize(60),
    },
    modalContent: {
        width:width*0.64,
        fontSize:scaleSize(28),
        color:'#555',
        textAlign:'center',
        justifyContent:'center',
    },
    modalBtn: {
        marginTop:scaleSize(80),
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    modalClose: {
        paddingHorizontal:scaleSize(50),
        paddingVertical:scaleSize(10),
        borderRadius:scaleSize(30),
        borderColor:'#ee2424',
        borderWidth:scaleSize(2),
        fontSize:scaleSize(28),
        color:'#333',
        marginHorizontal:scaleSize(20),
    },
    modalSure: {
        color:'#fff',
        backgroundColor:'#ee2424',
        borderRadius:scaleSize(30),
        overflow:'hidden',
    }
});


