import React, {Component} from 'react';
import {DeviceEventEmitter, Image, StyleSheet, View} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Message from './tab/Message'; //消息
import My from './tab/My'; //我的
import Receipt from './tab/Receipt'; //收款
import Account from './tab/Account'; //账目
import {scaleSize} from "../util/px2dp";
import {LISTENER} from "../common/Const";
import SplashScreen from "rn-splash-screen";

var navigation = null;

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Receipt',
            visible: false,
        };
        navigation = this.props.navigation;  //调用组件
    }

    componentDidMount() {
        SplashScreen.hide();
    }
    render() {
        return (
            <View style={styles.tabs_container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Receipt'}
                        title="收款"
                        selectedTitleStyle={{color: "#333"}}
                        renderIcon={() => <Image style={{width: scaleSize(40), height: scaleSize(40),}}
                                                 source={require('../../res/images/icon-01.png')}/>}
                        renderSelectedIcon={() => <Image style={{width: scaleSize(40), height: scaleSize(40),}}
                                                         source={require('../../res/images/icon-01-1.png')}/>}
                        onPress={() => {
                            DeviceEventEmitter.emit(LISTENER.terminalInfo);
                            this.setState({selectedTab: 'Receipt'});
                        }}>
                        <Receipt navigation={navigation}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Account'}
                        title="账目"
                        selectedTitleStyle={{color: "#333"}}
                        renderIcon={() => <Image style={{width: scaleSize(36), height: scaleSize(40),}}
                                                 source={require('../../res/images/icon-02.png')}/>}
                        renderSelectedIcon={() => <Image style={{width: scaleSize(36), height: scaleSize(40),}}
                                                         source={require('../../res/images/icon-02-1.png')}/>}
                        onPress={() => {
                            DeviceEventEmitter.emit(LISTENER.listBill);
                            this.setState({selectedTab: 'Account'});
                        }}>
                        <Account navigation={navigation}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Message'}
                        title="消息"
                        selectedTitleStyle={{color: "#333"}}
                        renderIcon={() => <Image style={{width: scaleSize(44), height: scaleSize(38),}}
                                                 source={require('../../res/images/icon-03.png')}/>}
                        renderSelectedIcon={() => <Image style={{width: scaleSize(44), height: scaleSize(38),}}
                                                         source={require('../../res/images/icon-03-1.png')}/>}
                        onPress={() => {
                            DeviceEventEmitter.emit(LISTENER.listMessage);
                            this.setState({selectedTab: 'Message'});
                        }}>
                        <Message navigation={navigation}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'My'}
                        title="我的"
                        selectedTitleStyle={{color: "#333"}}
                        renderIcon={() => <Image style={{width: scaleSize(36), height: scaleSize(40),}}
                                                 source={require('../../res/images/icon-04.png')}/>}
                        renderSelectedIcon={() => <Image style={{width: scaleSize(36), height: scaleSize(40),}}
                                                         source={require('../../res/images/icon-04-1.png')}/>}
                        onPress={() => {
                            DeviceEventEmitter.emit(LISTENER.userInfo);
                            this.setState({selectedTab: 'My'});
                        }}>
                        <My navigation={navigation}/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabs_container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
