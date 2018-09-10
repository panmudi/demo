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

import {setSpText,scaleSize} from '../../util/px2dp';
import NavigationBarM from '../../common/NavigationBarM';
import NavigatorUtil from "../../util/NavigatorUtil";

var navigation = null;   //清除路由
export default class News extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
        navigation = this.props.navigation;  //调用组件
    }


    // static navigationOptions = {
    //     title: '公告消息',
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

    render() {
        return (
            <View style={styles.container}>
                <NavigationBarM
                    title='公告消息'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <ScrollView>
                {/*公告消息列表*/}
                <View style={styles.spaceBlock}></View>
                <View style={styles.noticePadding}>
                    <TouchableOpacity  onPress={()=>navigation.navigate('Details')}>
                        <View style={styles.noticeList}>
                            <View style={styles.noticeText}>
                                <Text style={{fontSize:scaleSize(22),color:'#888888'}}>13:32   2018-05-04</Text>
                                <Text numberOfLines={2} style={{fontSize:scaleSize(24)}}>由于汉口银行系统升级，2018年5月4日0时起至2018年5月5日暂时2018年5月4日0时起至2018年5月5日暂时2018年5月4日0时起至2018年5月5日暂时</Text>
                            </View>
                            <Image style={styles.nextIcon} source={require('../../../res/images/message/message_06.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.noticeList}>
                        <View style={styles.noticeText}>
                            <Text style={{fontSize:scaleSize(22),color:'#888888'}}>13:32   2018-05-04</Text>
                            <Text numberOfLines={2} style={{fontSize:scaleSize(24)}}>由于汉口银行系统升级，2018年5月4日0时起至2018年5月5日暂时2018年5月4日0时起至2018年5月5日暂时2018年5月4日0时起至2018年5月5日暂时</Text>
                        </View>
                        <Image style={styles.nextIcon} source={require('../../../res/images/message/message_06.png')} />
                    </View>
                    {/*暂无消息*/}
                    {/*<View style={styles.noneImages}>*/}
                        {/*<Image style={{width:scaleSize(300),height:scaleSize(215)}} source={require('../../../res/images/message/none_03.png')} />*/}
                        {/*<Text style={{fontSize:scaleSize(20),color:'#888888',marginTop:scaleSize(40)}}>暂时没有此类消息喔~</Text>*/}
                    {/*</View>*/}
                </View>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#fff',
    },
    spaceBlock:{
        height:scaleSize(20),
        backgroundColor:'#f5f5f5'
    },
    noticePadding:{
        paddingLeft:scaleSize(30),
        paddingRight:scaleSize(30),
    },
    noticeList:{
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#eee',
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingTop:scaleSize(30),
        paddingBottom:scaleSize(30),
    },
    noticeText:{
        width:scaleSize(480),
    },
    nextIcon:{
        width:scaleSize(15),
        height:scaleSize(25),
    },
    noneImages:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:scaleSize(200),
    }
    }
)