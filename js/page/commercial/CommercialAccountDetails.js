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
        name: '普通收款',
        subtitle: '2018-06-20 17:05:26',
        price:'+1300.00',
    },
    {
        name: '普通收款',
        subtitle: '2018-06-20 17:05:26',
        price:'+130.00',
    },
    {
        name: '普通收款',
        subtitle: '2018-06-20 17:05:26',
        price:'+1250.00',
    },
]

export default class CommercialAccountDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            someMethod:'111'
        };
        navigation=this.props.navigation;
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
                    <View style={styles.cashierAccount}>
                        <Text style={{color:'#333',fontSize:scaleSize(28),marginTop:scaleSize(40),}}>武汉扬帆物流有限公司</Text>
                        <Text style={{color:'#888',fontSize:scaleSize(20),marginTop:scaleSize(20),}}>收营员：杨帆能源</Text>
                        <View style={styles.telInformation}>
                            <Image style={{width:scaleSize(22),height:scaleSize(22),marginRight:scaleSize(10)}} source={require('../../../res/images/commercial/commercial_03.png')} />
                            <Text style={{color:'#555',fontSize:scaleSize(20)}}>13214569874</Text>
                        </View>
                        <View style={[styles.checkBox,{marginBottom:scaleSize(40)},]}>
                            <View style={styles.checkList}>
                                <Image style={styles.checkImage} source={require('../../../res/images/commercial/commercial_04.png')} />
                                <Text style={styles.checkText}>支付宝余额</Text>
                            </View>
                            <View style={styles.checkList}>
                                <Image style={styles.checkImage} source={require('../../../res/images/commercial/commercial_04.png')} />
                                <Text style={styles.checkText}>储蓄卡</Text>
                            </View>
                            <View style={styles.checkList}>
                                <Image style={styles.checkImage} source={require('../../../res/images/commercial/commercial_04.png')} />
                                <Text style={styles.checkText}>信用卡</Text>
                            </View>
                            <View style={styles.checkList}>
                                <Image style={styles.checkImage} source={require('../../../res/images/commercial/commercial_04.png')} />
                                <Text style={styles.checkText}>花呗</Text>
                            </View>
                            {/*<View style={styles.checkList}>*/}
                                {/*<Image style={styles.checkImage} source={require('../../../res/images/commercial/commercial_04.png')} />*/}
                                {/*<Text style={styles.checkText}>花呗分期</Text>*/}
                            {/*</View>*/}
                        </View>
                    </View>
                    <View style={styles.cashierBox}>
                        <Text style={styles.cashierTitle}>流水记录</Text>
                        {
                            list.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.name}
                                    subtitle={item.subtitle}
                                    roundAvatar
                                    avatar={require('../../../res/images/count/count_10.png')}
                                    avatarContainerStyle={{
                                        marginRight:scaleSize(20),
                                        overflow:'hidden'
                                    }}
                                    avatarStyle={{
                                        backgroundColor:'#ee2424',
                                    }}
                                    hideChevron={true}
                                    rightTitle={item.price}
                                    rightTitleStyle={{
                                        color:'#333',
                                        fontSize:scaleSize(24),
                                    }}
                                    titleStyle={{
                                        color:'#333',
                                        fontSize:scaleSize(24),
                                        marginLeft:scaleSize(0),
                                        marginBottom:scaleSize(10),
                                    }}
                                    subtitleStyle={{
                                        color:'#888',
                                        fontSize:scaleSize(20),
                                        marginLeft:scaleSize(0),
                                        fontWeight:'normal',
                                    }}
                                    containerStyle={{
                                        borderBottomColor:'#eee',
                                        borderBottomWidth:scaleSize(1),
                                        marginLeft:scaleSize(30),
                                    }}
                                />
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
    cashierAccount:{
        display:'flex',
        justifyContent:'flex-start',
        backgroundColor:'#fff',
        marginBottom:scaleSize(20),
        paddingHorizontal:scaleSize(30),
    },
    telInformation:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:scaleSize(20),
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
    },
    checkBox:{
        borderTopColor:'#eee',
        borderTopWidth:scaleSize(1),
        marginVertical:scaleSize(20),
        paddingTop:scaleSize(30),
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
    },
    checkList:{
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center',
        marginRight:scaleSize(45),
        marginBottom:scaleSize(30)
    },
    checkImage:{
        width:scaleSize(31),
        height:scaleSize(31),
        marginRight:scaleSize(10),
    },
    checkText:{
        fontSize:scaleSize(20),
        color:'#333',
    }
})