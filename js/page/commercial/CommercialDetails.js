import React, { Component } from 'react';
import { StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    TouchableNativeFeedback,
    DeviceEventEmitter,
    TextInput
} from 'react-native';

import {setSpText,scaleSize} from '../../util/px2dp';
import NavigationBarM from '../../common/NavigationBarM';
import {API} from '../../common/Const';
import StorageUtil from '../../util/StorageUtil';
import HttpUtil from '../../util/HttpUtil';
import NavigatorUtil from "../../util/NavigatorUtil";
import {Button,ListItem } from 'react-native-elements';

const {width,height}=Dimensions.get("window");
var navigation = null;

const list = [
    {
        name: '杨帆能源',
        number:'15632598745'
    },
    {
        name: '叶嘉莹',
        number:'18912364587'
    },
    {
        name: '落花',
        number:'13214569874'
    },
]

export default class CommercialDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            someMethod:'111'
        };
        navigation=this.props.navigation;
    }

    moreInformation(){
        const {navigation} = this.props;
        navigation.navigate('MoreCommercialDetails');
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

    render(){
        return(
            <View style={styles.contain}>
                <NavigationBarM
                    title='商户详情'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <ScrollView>
                    <View style={styles.accountBox}>
                        <View style={styles.accountInformation}>
                            <Text style={{color:'#333',fontSize:scaleSize(28)}}>武汉扬帆物流有限公司</Text>
                            <View style={styles.telInformation}>
                                <Image style={{width:scaleSize(22),height:scaleSize(22),marginRight:scaleSize(10)}} source={require('../../../res/images/commercial/commercial_03.png')} />
                                <Text style={{color:'#555',fontSize:scaleSize(20)}}>13214569874</Text>
                            </View>
                        </View>
                        <View style={{borderBottomWidth:scaleSize(1),borderBottomColor:'#eee',paddingBottom:scaleSize(15)}}>
                            <View style={styles.accountText}>
                                <Text style={{color:'#999',fontSize:scaleSize(24),}}>商户类型</Text>
                                <Text style={{color:'#333',fontSize:scaleSize(24),}}>企业用户</Text>
                            </View>
                            <View  style={styles.accountText}>
                                <Text style={{color:'#999',fontSize:scaleSize(24),}}>地址</Text>
                                <Text style={{color:'#333',fontSize:scaleSize(24),}}>洪山区马湖新村</Text>
                            </View>
                        </View>
                        <Button
                            title='显示更多'
                            buttonStyle={styles.ButtonMore}
                            textStyle={{color:'#3592fb',fontSize:scaleSize(20) }}
                            onPress={()=>this.moreInformation()}
                            containerStyle={{paddingVertical:scaleSize(1)}}
                        />
                    </View>
                    <View style={styles.cashierBox}>
                        <Text style={styles.cashierTitle}>收银员</Text>
                        {
                            list.map((item, i) => (
                                <TouchableOpacity onPress={()=>navigation.navigate('CommercialAccountDetails')}>
                                    <ListItem
                                        key={i}
                                        title={item.name}
                                        subtitle={item.number}
                                        titleStyle={{
                                            color:'#333',
                                            fontSize:scaleSize(22),
                                            marginLeft:scaleSize(0),
                                            marginBottom:scaleSize(10),
                                        }}
                                        subtitleStyle={{
                                            color:'#555',
                                            fontSize:scaleSize(20),
                                            marginLeft:scaleSize(0),
                                            fontWeight:'normal',
                                        }}
                                        containerStyle={{
                                            borderBottomColor:'#eee',
                                            borderBottomWidth:scaleSize(1),
                                            marginLeft:scaleSize(30),
                                        }}
                                        rightIcon={{
                                            name:'chevron-right',
                                            type:'evilicon',
                                            color:'#bbb',
                                        }}
                                    />
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }

}

const styles=StyleSheet.create({
    contain:{
        flex:1,
        backgroundColor:'#f5f5f5',
    },
    accountBox: {
        backgroundColor:'#fff',
        paddingHorizontal:scaleSize(30),
        paddingTop:scaleSize(0),
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#eee',
        marginBottom:scaleSize(20),
    },
    telInformation:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:scaleSize(30),
    },
    accountText: {
        marginTop:scaleSize(15),
        marginBottom:scaleSize(15),
        flexDirection:'row',
        justifyContent:'space-between',
    },
    accountInformation:{
        marginTop:scaleSize(30),
        marginBottom:scaleSize(20),
        alignItems:'center',
    },
    countImages:{
        width:scaleSize(66),
        height:scaleSize(66),
        backgroundColor:'#f53b3b',
        borderRadius:scaleSize(66),
        marginRight:scaleSize(30),
    },
    accountPerson:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    ButtonMore:{
        backgroundColor:'#fff',
        height:scaleSize(90),
    },
    cashierTitle:{
        fontSize:scaleSize(26),
        color:'#333',
        paddingVertical:scaleSize(30),
        borderBottomColor:'#eee',
        borderBottomWidth:scaleSize(1),
        paddingLeft:scaleSize(30),
    },
    cashierBox:{
        backgroundColor:'#fff',
        borderBottomColor:'#eee',
        borderBottomWidth:scaleSize(1)
    }
})