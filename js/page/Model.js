import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    TouchableNativeFeedback,
    TextInput, Platform
} from 'react-native';

import {setSpText,scaleSize} from '../util/px2dp';
import NavigatorUtil from "../util/NavigatorUtil";
import NavigationBarM from '../common/NavigationBarM';
import {API, VERSION} from "../common/Const";
import { Button, Modal, WhiteSpace, WingBlank } from 'antd-mobile-rn';

const {width,height}=Dimensions.get('window');
var navigation = null;
export default class Model extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible1: false,
            visible2: false,
        };
        navigation = this.props.navigation;  //调用组件
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

    onClose = () => {
        this.setState({
            visible: false,
        });
    }

    onClose1 = () => {
        this.setState({
            visible1: false,
        });
    }

    onClose2 = () => {
        this.setState({
            visible2: false,
        });
    }

    onButtonClick = () => {
        Modal.alert('Title', 'alert content', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
            { text: 'OK', onPress: () => console.log('ok') },
        ]);
    }

    onButtonClick2 = () => {
        Modal.operation([
            { text: '标为未读', onPress: () => console.log('标为未读被点击了') },
            { text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了') },
        ]);
    }

    onButtonClick3 = () => {
        Modal.prompt(
            'Login',
            'Pleas input login information',
            (login: any, password: any) =>
                console.log(`login: ${login}, password: ${password}`),
            'login-password',
            null,
            ['Please input name', 'Please input password'],
        );
    }

    onButtonClick4 = () => {
        Modal.prompt(
            'Input password',
            'password message',
            (password: any) => console.log(`password: ${password}`),
            'secure-text',
            'defaultValue',
        );
    }

    onButtonClick5 = () => {
        Modal.prompt(
            'Name',
            'name message',
            (password: any) => console.log(`password: ${password}`),
            'default',
            null,
            ['please input name'],
        );
    }

    componentWillUnmount(){
        this.setState({
            visible: false,
            visible1: false,
            visible2: false,
        })
    }

    render() {
        const footerButtons = [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => console.log('ok') },
        ];
        return (
            <View style={styles.container}>
                <NavigationBarM
                    title='开户资料'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../res/images/back-black.png'))}
                />
                <ScrollView style={{ marginTop: 20 }}>
                    <WingBlank>
                        <Button onClick={() => this.setState({ visible: true })}>
                            showModal
                        </Button>
                        <WhiteSpace />
                        <Button onClick={() => this.setState({ visible1: true })}>
                            transparent:false
                        </Button>
                        <WhiteSpace />
                        <Button onClick={() => this.setState({ visible2: true })}>
                            popup
                        </Button>
                        <WhiteSpace />
                        <Button onClick={this.onButtonClick}>Modal.alert</Button>
                        <WhiteSpace />
                        <Button onClick={this.onButtonClick2}>Modal.opertation</Button>
                        <WhiteSpace />
                        <Button onClick={this.onButtonClick5}>Modal.prompt (default)</Button>
                        <WhiteSpace />
                        <Button onClick={this.onButtonClick3}>
                            Modal.prompt (login-password)
                        </Button>
                        <WhiteSpace />
                        <Button onClick={this.onButtonClick4}>
                            Modal.prompt (secure-text)
                        </Button>
                    </WingBlank>
                    <Modal
                        title="系统提示"
                        transparent
                        onClose={this.onClose}
                        maskClosable     //点击蒙层是否允许关闭
                        visible={this.state.visible}  //对话框是否可见
                        closable={false}     //是否显示关闭按钮
                        footer={footerButtons}   //底部内容
                    >
                        <View style={styles.modalText}>
                            <Text style={{fontSize:scaleSize(28),color:'#333'}}>您即将向</Text>
                            <Text style={{fontSize:scaleSize(28),color:'#ee2424'}}>18771030947</Text>
                            <Text style={{fontSize:scaleSize(28),color:'#333'}}>划拨一台花呗版终端</Text>
                        </View>
                    </Modal>
                    <Modal
                        transparent={false}
                        visible={this.state.visible1}
                        animationType="slide-up"
                        onClose={this.onClose1}
                    >
                        <View style={{ paddingVertical: 220 }}>
                            <Text style={{ textAlign: 'center' }}>Content...</Text>
                            <Text style={{ textAlign: 'center' }}>Content...</Text>
                        </View>
                        <Button type="primary" inline onClick={this.onClose1}>
                            close modal
                        </Button>
                    </Modal>
                    <Modal
                        popup
                        visible={this.state.visible2}
                        animationType="slide-up"
                        onClose={this.onClose2}
                    >
                        <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                            <Text style={{fontSize:scaleSize(28),color:'#333'}}>]您即将向</Text>
                            <Text style={{fontSize:scaleSize(28),color:'#ee2424'}}>18771030947</Text>
                            <Text style={{fontSize:scaleSize(28),color:'#333'}}>划拨一台花呗版终端</Text>
                        </View>
                        <Button type="primary" inline onClick={this.onClose2}>
                            close modal
                        </Button>
                        <Button type="danger" inline onClick={this.onClose2}>
                            close modal
                        </Button>
                    </Modal>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
        position:'relative',
    },
    modalText:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        flexWrap:'wrap',
        padding:scaleSize(50),
    },
    CommercialButton:{
        width:width*0.3,
        backgroundColor:'#ee2424',
        height:scaleSize(70),
        borderRadius:scaleSize(35),
        borderWidth:scaleSize(1),
        borderColor:'transparent'
    },
})