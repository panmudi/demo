
import React, { Component } from 'react';

import {Modal, TouchableOpacity, StyleSheet, Image, DeviceInfo, View, Text} from 'react-native'


import {setSpText,scaleSize} from '../../util/px2dp';//适配js

export default class success extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: true
        };
    }

    show(){
        this.setState({
            visible: true
        })
    }

    dismiss() {
        this.setState({
            visible: false
        })
    }

    render() {
        return (
           <Modal
               transparent={true}
               visible={this.state.visible}
           >
               <View  style={styles.container}>
                   <TouchableOpacity
                       onPress={() => this.dismiss()}
                       style={styles.jj_closeA}
                   >
                       <View>
                           {/*<Text>111</Text>*/}
                           <Image source={require('../../../res/images/jj_close.png')} style={styles.jj_close} />
                       </View>
                   </TouchableOpacity>

                   <View style={styles.jjArea}>
                       <Image source={require('../../../res/images/jj01.png')}style={[styles.jjImg,styles.mb20]} />
                       <Image source={require('../../../res/images/logo1.png')} style={[styles.logo1,styles.mb20]} />
                       <Text  style={[styles.jjT1,styles.mb20]}>您的进件审核已经通过</Text>
                       <Text  style={styles.jjT2}>您可以开始收款了</Text>
                       {/**/}
                   </View>
                   {/**/}
               </View>

           </Modal>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent:'center'
    },
    jjArea:{
        position:'relative',
        width: scaleSize(500),
        height: scaleSize(460),
        backgroundColor:'#fff',
        borderRadius:scaleSize(5),
        alignItems: 'center',
    },
    jjImg:{
        width: scaleSize(500),
        height: scaleSize(148),
    },
    jj_closeA:{
        width: scaleSize(500),
        marginBottom:scaleSize(30),
        // textAlign: 'right',
    },
    jj_close:{
        marginLeft:scaleSize(460),
        width: scaleSize(36),
        height: scaleSize(36),
    },
    logo1:{
        width: scaleSize(88),
        height: scaleSize(88),
    },
    jjT1:{
        fontSize:scaleSize(28),
        textAlign:'center',
    },
    jjT2:{
        fontSize:scaleSize(20),
        textAlign:'center',
    },
    mt50:{
        marginTop:scaleSize(50),
    },
    mb20:{
        marginBottom:scaleSize(20),
    },
    btn:{
        width:scaleSize(260),
        height:scaleSize(70),
        backgroundColor:'#ee2424',
        borderRadius:scaleSize(35),
        marginTop:scaleSize(60),
        // fontSize:setSpText(32),
    },
});

