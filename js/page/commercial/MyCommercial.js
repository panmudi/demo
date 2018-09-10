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
import {SearchBar,ListItem } from 'react-native-elements';
import CommercialDetails from "./CommercialDetails";

const {width,height}=Dimensions.get("window");
var navigation = null;

const list = [
    {
        name: '武汉扬帆物流有限公司',
        subtitle: '2018-06-20 17:05:26',
        number:'15632598745'
    },
    {
        name: '武汉市第一人民医院',
        subtitle: '2018-06-20 17:05:26',
        number:'18912364587'
    },
    {
        name: '江夏区中百仓储',
        subtitle: '2018-06-20 17:05:26',
        number:'13214569874'
    },
]

export default class MyCommercial extends Component{
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
                    title='我的商户'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <SearchBar
                    onChangeText={(someMethod) => this.setState({someMethod})}
                    onClearText={(someMethod) => this.setState({someMethod})}
                    icon={{ type: 'MaterialIcons', name: 'search',color: '#999999'}}
                    clearIcon={{ type: 'MaterialIcons', name: 'clear',color: '#999999'}}
                    placeholder='商户名称或手机号'
                    inputStyle={{
                        backgroundColor:'#f9f9f9',
                        borderWidth:scaleSize(1),
                        borderColor:'#ccc',
                        borderRadius:scaleSize(8),
                        fontSize:scaleSize(24),
                    }}
                    containerStyle={{
                        backgroundColor:'#f5f5f5',
                        borderTopWidth:scaleSize(0),
                        borderBottomWidth:scaleSize(0),
                        borderTopColor:'transparent',
                        borderBottomColor:'transparent',

                    }}
                    inputContainerStyle={{
                        paddingVertical:scaleSize(0),
                        backgroundColor:'#f00',
                    }}
                />
                <ScrollView>
                    <View style={{marginLeft:scaleSize(30),borderBottomColor:'#eee', borderBottomWidth:scaleSize(1),}}>
                        {
                            list.map((item, i) => (
                                <TouchableOpacity onPress={()=>navigation.navigate('CommercialDetails')}>
                                    <ListItem
                                        key={i}
                                        title={item.name}
                                        subtitle={
                                            <View>
                                                <Text style={{color:'#888',fontSize:scaleSize(20)}}>{item.subtitle}</Text>
                                                <View style={styles.telInformation}>
                                                    <Image style={{width:scaleSize(22),height:scaleSize(22),marginRight:scaleSize(10)}} source={require('../../../res/images/commercial/commercial_03.png')} />
                                                    <Text style={{color:'#555',fontSize:scaleSize(20)}}>{item.number}</Text>
                                                </View>
                                            </View>
                                        }
                                        titleStyle={{
                                            color:'#333',
                                            fontSize:scaleSize(24),
                                            marginLeft:scaleSize(0),
                                            marginBottom:scaleSize(20),
                                        }}
                                        containerStyle={{
                                            borderBottomColor:'#eee',
                                            borderBottomWidth:scaleSize(1),
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
        backgroundColor:'#fff',
    },
    telInformation:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:scaleSize(20),
    }
})