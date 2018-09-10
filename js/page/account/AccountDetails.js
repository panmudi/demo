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
    TextInput
} from 'react-native';
import {setSpText,scaleSize} from "../../util/px2dp";
import NavigationBarM from '../../common/NavigationBarM';
import NavigatorUtil from "../../util/NavigatorUtil";
import Picker from "react-native-picker/index";
import StorageUtil from "../../util/StorageUtil";
import HttpUtil from "../../util/HttpUtil";
import {API} from "../../common/Const";
import moment from 'moment';

var navigation = null;
moment().format('YYYY-MM-DD HH:mm:ss')

export default class AccountDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {}
        };
        navigation = this.props.navigation;
    }

    // static navigationOptions = {
    //     title: '账目详情',
    //     headerTintColor: '#333',
    //     headerTitleStyle: {
    //         fontWeight: 'normal',
    //         fontSize:scaleSize(32),
    //     },
    // };

    componentWillMount() {
        const {navigation} = this.props;
        const tnxId = navigation.getParam('tnxId');
        this._initLoadData(tnxId);
    }

    componentDidMount() {
        Picker.hide();
    }

    _initLoadData(tnxId) {
        let _this = this;
        StorageUtil.get("auth").then((value) => {
            HttpUtil.get(API.selectByTnxId + tnxId, null, {
                'Authorization': 'Bearer ' + value.access_token
            }).then((json) => {
                if (json.code === 0) {
                    json.data.createTime = moment(json.data.createTime).format("YYYY-MM-DD HH:mm:ss");
                    json.data.collectionMode = json.data.collectionMode === '1' ? '扫码收款' : '收款码收款';
                    json.data.type = json.data.type === '1' ? '普通收款' : '普通收款';
                    json.data.title = json.data.type === '1' ? '普通收款预计推荐收益' : '普通收款预计推荐收益';
                    _this.setState({
                        data: json.data
                    })
                }
            }, (error) => {
                console.log(error)
            });
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
    render() {
        return (
                <View style={styles.container}>
                    <NavigationBarM
                        title='账目详情'
                        style={{backgroundColor:'#FFF'}}
                        leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                    />
                    <ScrollView>
                    <View style={styles.accountBox}>
                        <View style={styles.accountInformation}>
                            <View style={styles.accountPerson}>
                                <View style={styles.countImages}><Image style={{width:scaleSize(66),height:scaleSize(66),borderRadius:scaleSize(66),}} source={require('../../../res/images/count/count_12.png')} /></View>
                                <Text style={{color:'#333',fontSize:scaleSize(24)}}>{this.state.data.title}</Text>
                            </View>
                            <Text style={{color:'#333',fontSize:scaleSize(28),marginBottom:scaleSize(20)}}>+{this.state.data.amount}</Text>
                            <Text style={{color:'#999',fontSize:scaleSize(22)}}>交易成功</Text>
                        </View>
                        <View style={{marginTop:scaleSize(15),paddingTop:scaleSize(15)}}>
                            <View style={styles.accountText}>
                                <Text style={{color:'#999',fontSize:scaleSize(24),}}>类型</Text>
                                <Text style={{color:'#333',fontSize:scaleSize(24),}}>{this.state.data.type}</Text>
                            </View>
                            <View  style={styles.accountText}>
                                <Text style={{color:'#999',fontSize:scaleSize(24),}}>来源</Text>
                                <Text style={{color:'#333',fontSize:scaleSize(24),}}>**鸡翅</Text>
                            </View>
                            <View  style={styles.accountText}>
                                <Text style={{color:'#999',fontSize:scaleSize(24),}}>收款方式</Text>
                                <Text style={{color:'#333',fontSize:scaleSize(24),}}>{this.state.data.collectionMode}</Text>
                            </View>
                        </View>
                        <View style={{borderTopWidth:scaleSize(1),borderTopColor:'#eee',marginTop:scaleSize(15),paddingTop:scaleSize(15)}}>
                            <View style={styles.accountText}>
                                <Text style={{color:'#999',fontSize:scaleSize(24),}}>创建时间</Text>
                                <Text style={{color:'#333',fontSize:scaleSize(24),}}>{this.state.data.createTime}</Text>
                            </View>
                            <View  style={styles.accountText}>
                                <Text style={{color:'#999',fontSize:scaleSize(24),}}>订单号</Text>
                                <Text style={{color:'#333',fontSize:scaleSize(24),}}>{this.state.data.orderNo}</Text>
                            </View>
                            <View  style={styles.accountText}>
                                <Text style={{color:'#999',fontSize:scaleSize(24),}}>推荐收益收入</Text>
                                <Text style={{color:'#333',fontSize:scaleSize(24),}}>+{this.state.data.amount}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.accountBox}>
                        <View style={styles.accountText}>
                            <Text style={{color:'#999',fontSize:scaleSize(24),}}>交易金额</Text>
                            <Text style={{color:'#333',fontSize:scaleSize(24),}}>{this.state.data.amount}</Text>
                        </View>
                        <View  style={styles.accountText}>
                            <Text style={{color:'#999',fontSize:scaleSize(24),}}>付款账号</Text>
                            <Text style={{color:'#333',fontSize:scaleSize(24),}}>{this.state.data.paymentAccount}</Text>
                        </View>
                        <View  style={styles.accountText}>
                            <Text style={{color:'#999',fontSize:scaleSize(24),}}>付款方式</Text>
                            <Text style={{color:'#333',fontSize:scaleSize(24),}}>支付宝账户</Text>
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
        backgroundColor:'#f5f5f5',
    },
    accountBox: {
        backgroundColor:'#fafafa',
        paddingHorizontal:scaleSize(30),
        paddingVertical:scaleSize(30),
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#eee',
        marginBottom:scaleSize(20),
    },
    accountText: {
        marginTop:scaleSize(15),
        marginBottom:scaleSize(15),
        flexDirection:'row',
        justifyContent:'space-between',
    },
    accountInformation:{
        marginTop:scaleSize(30),
        marginBottom:scaleSize(30),
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
    }
)