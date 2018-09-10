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
    TextInput, Platform
} from 'react-native';

import {setSpText,scaleSize} from '../../util/px2dp';
import NavigatorUtil from "../../util/NavigatorUtil";
import NavigationBarM from '../../common/NavigationBarM';
import { List, ListItem } from 'react-native-elements'
import {API, VERSION} from "../../common/Const";
import {Toast} from "antd-mobile-rn/lib/index.native";
import HttpUtil from "../../util/HttpUtil";

const {width,height}=Dimensions.get('window');

export default class ServiceContract extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
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
                    title='服务协议'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                {/*关于我们*/}
                <ScrollView>
                    <View style={styles.aboutBox}>
                        <Text style={{color:'#333',marginTop:scaleSize(50),fontSize:scaleSize(32)}}>“一呗”用户服务协议</Text>
                        <Text style={{color:'#555',marginTop:scaleSize(20),fontSize:scaleSize(28)}}>v0.0.1</Text>
                        <Text style={styles.contractText}>      欢迎您与湖北点赞科技有限公司（包括其分公司、子公司，以下简称“点赞科技”）就使用点赞科技经营的网站、移动客户端应用程序等服务签署《赞呗用户服务协议》（以下简称“本协议”）。在您登录赞呗过程中点击同意本协议之前，您已充分阅读、理解并接受本协议的全部内容，一旦您勾选“我已阅读并同意”按钮后，本协议即构成对双方有约束力的法律文件。</Text>
                        <Text style={styles.contractText}>      本协议有助于您了解点赞科技为您提供的服务内容及您使用服务的权利和义务，请您仔细阅读（特别是以粗体标注的内容）。如您为无民事行为能力人或为限制民事行为能力人，请告知您的监护人，并在您监护人的指导下阅读本协议和使用本服务。此外，您还需确保您不是任何国家、国际组织或者地域实施的贸易限制、制裁或其他法律、法规限制的对象，否则您可能无法正常注册及使用点赞科技服务。</Text>
                        <Text style={styles.contractText}>       您同意，点赞科技可以随时以在点赞科技网站及移动客户端应用程序上发布修订版本的方式来修订本协议，并通过点赞科技官方网站、点赞科技生活号、移动客户端等其中一种或多种方式告知您。</Text>
                    </View>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        position:'relative',
    },
    aboutBox:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:width*0.9,
        marginLeft:width*0.05,
    },
    contractText:{
        color:'#555',
        fontSize:scaleSize(28),
        lineHeight:scaleSize(50),
        marginTop:scaleSize(30),
    }
})