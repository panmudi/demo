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
import NavigationBarL from '../../common/NavigationBarL';
import {API} from '../../common/Const';
import StorageUtil from '../../util/StorageUtil';
import HttpUtil from '../../util/HttpUtil';
import NavigatorUtil from "../../util/NavigatorUtil";
import {Button} from 'react-native-elements';

const {width,height}=Dimensions.get("window");
var navigation = null;

export default class TerminalGrade extends Component{
    constructor(props){
        super(props);
        this.state={};
        navigation=this.props.navigation;
    }

    addEmployee(){
        const {navigation} = this.props;
        navigation.navigate('AddEmployee');
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
                <NavigationBarL
                    title='终端等级'
                    style={{backgroundColor:'#ee2424'}}
                    leftButton={this.renderButton(require('../../../res/images/back.png'))}
                />
                <ScrollView>
                    {/*等级终端*/}
                    <View style={styles.commercialBoxTop}>
                        <Image style={styles.commercialTopImg} source={require('../../../res/images/digit/bg.png')} />
                        <View style={styles.commercialTop}>
                        {/*头部等级*/}
                            <View style={[styles.rightsTitle,styles.marginTwenty]}>
                                <View style={styles.digitIcon}>
                                    <Image source={require('../../../res/images/termina/terminal_06.png')} style={styles.digitImg} />
                                </View>
                                <Text style={{color:'#fff',fontSize:scaleSize(30)}}>一加数码</Text>
                            </View>
                            <View style={[styles.rightsTitle,styles.marginTwenty]}>
                                <View style={styles.gradeNumber}>
                                    <Text style={{color:'#ee2424',fontSize:scaleSize(20)}}>P4</Text>
                                </View>
                                <Image source={require('../../../res/images/digit/digit_03.png')} style={styles.gradeShow}/>
                                <Image source={require('../../../res/images/digit/digit_03.png')} style={styles.gradeShow}/>
                                <Image source={require('../../../res/images/digit/digit_05.png')} style={styles.gradeShow}/>
                            </View>
                            <View style={[styles.rightsTitle,styles.marginTwenty]}>
                                <View style={styles.gradeDay01}>
                                    <Text style={{color:'#ee2424',fontSize:scaleSize(18)}}>一天</Text>
                                </View>
                                <Image source={require('../../../res/images/digit/digit_10.png')} style={{width:scaleSize(526),height:scaleSize(27)}} />
                                <View style={styles.gradeDay02}>
                                    <Text style={{color:'#fff',fontSize:scaleSize(18)}}>P5</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.gradeInstructions}>
                        <Image source={require('../../../res/images/digit/digit_14.png')} style={{width:scaleSize(56),height:scaleSize(30),marginRight:scaleSize(15),marginTop:scaleSize(5)}} />
                        <View>
                            <Text style={styles.gradeText}>每天收款笔数>=1,每天收款总额>=1000,累计天数达356天，即可升级至P5</Text>
                        </View>
                    </View>
                    {/*收款权益*/}
                    <View>
                        <View style={styles.rightsTitle}>
                            <Image source={require('../../../res/images/digit/digit_18.png')} style={{width:scaleSize(16),height:scaleSize(16)}} />
                            <Text style={{color:'#333',fontSize:scaleSize(28),marginHorizontal:scaleSize(20)}}>收款码收款权益</Text>
                            <Image source={require('../../../res/images/digit/digit_20.png')} style={{width:scaleSize(16),height:scaleSize(16)}} />
                        </View>
                        <View style={[styles.rightsBox,styles.BorderColor01]}>
                            <Image source={require('../../../res/images/rIcon01.png')} style={{width:scaleSize(90),height:scaleSize(90)}} />
                            <View style={styles.typeContain}>
                                <Text style={styles.typeText}>支付宝</Text>
                                <Text style={styles.typeText}>限额</Text>
                            </View>
                            <View style={styles.rightContent}>
                                <View style={styles.rightsCircleBox}>
                                    <View style={[styles.rightsCircle,styles.rightsCircel01]}>
                                        <Text style={styles.rightsText}>单笔</Text>
                                    </View>
                                    <Text  style={styles.rightsText}>不限</Text>
                                </View>
                                <View style={styles.rightsCircleBox}>
                                    <View style={[styles.rightsCircle,styles.rightsCircel01]}>
                                        <Text style={styles.rightsText}>当日</Text>
                                    </View>
                                    <Text  style={styles.rightsText}>不限</Text>
                                </View>
                                {/*<View style={styles.rightsCircleBox}>*/}
                                    {/*<View style={[styles.rightsCircle,styles.rightsCircel01]}>*/}
                                        {/*<Text style={styles.rightsText}>节假日</Text>*/}
                                    {/*</View>*/}
                                    {/*<Text  style={styles.rightsText}>不限</Text>*/}
                                {/*</View>*/}
                            </View>
                        </View>
                        <View style={[styles.rightsBox,styles.BorderColor02,{marginBottom:scaleSize(0)}]}>
                            <Image source={require('../../../res/images/bank-a.png')} style={{width:scaleSize(90),height:scaleSize(76)}} />
                            <View style={styles.typeContain}>
                                <Text style={styles.typeText}>银行卡</Text>
                                <Text style={styles.typeText}>限额</Text>
                            </View>
                            <View style={styles.rightContent}>
                                <View style={styles.rightsCircleBox}>
                                    <View style={[styles.rightsCircle,styles.rightsCircel02]}>
                                        <Text style={styles.rightsText}>单笔</Text>
                                    </View>
                                    <Text  style={styles.rightsText}>不限</Text>
                                </View>
                                <View style={styles.rightsCircleBox}>
                                    <View style={[styles.rightsCircle,styles.rightsCircel02]}>
                                        <Text style={styles.rightsText}>当日</Text>
                                    </View>
                                    <Text  style={styles.rightsText}>不限</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/**/}
                    <View>
                        <View style={styles.rightsTitle}>
                            <Image source={require('../../../res/images/digit/digit_18.png')} style={{width:scaleSize(16),height:scaleSize(16)}} />
                            <Text style={{color:'#333',fontSize:scaleSize(28),marginHorizontal:scaleSize(20)}}>扫码收款权益</Text>
                            <Image source={require('../../../res/images/digit/digit_20.png')} style={{width:scaleSize(16),height:scaleSize(16)}} />
                        </View>
                        <View style={[styles.rightsBox,styles.BorderColor01]}>
                            <Image source={require('../../../res/images/rIcon01.png')} style={{width:scaleSize(90),height:scaleSize(90)}} />
                            <View style={styles.typeContain}>
                                <Text style={styles.typeText}>支付宝</Text>
                                <Text style={styles.typeText}>限额</Text>
                            </View>
                            <View style={styles.rightContent}>
                                <View style={styles.rightsCircleBox}>
                                    <View style={[styles.rightsCircle,styles.rightsCircel01]}>
                                        <Text style={styles.rightsText}>单笔</Text>
                                    </View>
                                    <Text  style={styles.rightsText}>不限</Text>
                                </View>
                                <View style={styles.rightsCircleBox}>
                                    <View style={[styles.rightsCircle,styles.rightsCircel01]}>
                                        <Text style={styles.rightsText}>当日</Text>
                                    </View>
                                    <Text  style={styles.rightsText}>不限</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.rightsBox,styles.BorderColor02]}>
                            <Image source={require('../../../res/images/bank-a.png')} style={{width:scaleSize(90),height:scaleSize(76)}} />
                            <View style={styles.typeContain}>
                                <Text style={styles.typeText}>银行卡</Text>
                                <Text style={styles.typeText}>限额</Text>
                            </View>
                            <View style={styles.rightContent}>
                                <View style={styles.rightsCircleBox}>
                                    <View style={[styles.rightsCircle,styles.rightsCircel02]}>
                                        <Text style={styles.rightsText}>单笔</Text>
                                    </View>
                                    <Text  style={styles.rightsText}>不限</Text>
                                </View>
                                <View style={styles.rightsCircleBox}>
                                    <View style={[styles.rightsCircle,styles.rightsCircel02]}>
                                        <Text style={styles.rightsText}>当日</Text>
                                    </View>
                                    <Text  style={styles.rightsText}>不限</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.rightsBox,styles.BorderColor03]}>
                            <Image source={require('../../../res/images/rIcon13.png')} style={{width:scaleSize(90),height:scaleSize(90)}} />
                            <View style={styles.typeContain}>
                                <Text style={styles.typeText}>花呗</Text>
                                <Text style={styles.typeText}>限额</Text>
                            </View>
                            <View style={styles.rightContent}>
                                <View style={styles.rightsCircleBox}>
                                    <View style={[styles.rightsCircle,styles.rightsCircel03]}>
                                        <Text style={styles.rightsText}>单笔</Text>
                                    </View>
                                    <Text  style={styles.rightsText}>1.5千</Text>
                                </View>
                                <View style={styles.rightsCircleBox}>
                                    <View style={[styles.rightsCircle,styles.rightsCircel03]}>
                                        <Text style={styles.rightsText}>工作日</Text>
                                    </View>
                                    <Text  style={styles.rightsText}>1.5千/天</Text>
                                </View>
                                <View style={styles.rightsCircleBox}>
                                    <View style={[styles.rightsCircle,styles.rightsCircel03]}>
                                        <Text style={styles.rightsText}>节假日</Text>
                                    </View>
                                    <Text  style={styles.rightsText}>1.5千/天</Text>
                                </View>
                            </View>
                        </View>
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
    commercialBoxTop:{
        width:width,
        backgroundColor:'#ee2424',
        position:'relative',
    },
    commercialTopImg:{
        width:width,
        height:scaleSize(300),
    },
    commercialTop:{
        position:'absolute',
        width:width,
        display:'flex',
        alignItems:'center',
        height:scaleSize(300),
        paddingVertical:scaleSize(20),
    },
    gradeInstructions:{
        paddingVertical:scaleSize(20),
        paddingHorizontal:scaleSize(50),
        backgroundColor:'#ff3333',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-start',
    },
    gradeText:{
        width:width*0.7,
        color:'#fff',
        opacity:0.7,
        fontSize:scaleSize(24),
        lineHeight:scaleSize(40),
        textAlign:'center',
    },
    rightsTitle:{
        paddingVertical:scaleSize(30),
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    rightsBox:{
        borderRadius:scaleSize(10),
        borderLeftWidth:scaleSize(1),
        backgroundColor:'#fff',
        marginHorizontal:scaleSize(30),
        paddingVertical:scaleSize(30),
        paddingHorizontal:scaleSize(50),
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        marginBottom:scaleSize(30),
    },
    BorderColor01:{
        borderLeftColor:'#00abef',
    },
    BorderColor02:{
        borderLeftColor:'#ff6464',
    },
    BorderColor03:{
        borderLeftColor:'#ffc600',
    },
    typeContain:{
        width:scaleSize(100),
        marginLeft:scaleSize(30),
        marginRight:scaleSize(30)
    },
    typeText:{
        fontSize:scaleSize(24),
        color:'#333',
        marginBottom:scaleSize(5),
    },
    rightContent:{
        width:width*0.57,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        alignSelf:'flex-end'
    },
    rightsCircleBox:{
        width:width*0.16,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:scaleSize(10),
    },
    rightsCircle:{
        width:scaleSize(70),
        height:scaleSize(70),
        backgroundColor:'#fff',
        borderRadius:scaleSize(35),
        borderWidth:scaleSize(2),
        justifyContent:'center',
        alignItems:'center',
        marginBottom:scaleSize(10),
    },
    rightsCircel01:{
        borderColor:'#00abef',
    },
    rightsCircel02:{
        borderColor:'#ff6464',
    },
    rightsCircel03:{
        borderColor:'#ffc600',
    },
    rightsText:{
        fontSize:scaleSize(20),
        color:'#333'
    },
    digitIcon:{
        width:scaleSize(40),
        height:scaleSize(40),
        backgroundColor:'#fff',
        borderRadius:scaleSize(20),
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center',
        marginRight:scaleSize(10),
    },
    digitImg:{
        width:scaleSize(28),
        height:scaleSize(28),
        marginTop:scaleSize(10),
    },
    gradeNumber:{
        width:scaleSize(66),
        height:scaleSize(36),
        backgroundColor:'#fff',
        borderRadius:scaleSize(10),
        shadowColor:'#fff',
        shadowOffset:{width: 5, height: 5},
        shadowOpacity:0.7,
        shadowRadius:5,
        elevation: 4,
        justifyContent:'center',
        alignItems:'center',
        marginRight:scaleSize(10),
    },
    gradeShow:{
        width:scaleSize(48),
        height:scaleSize(48),
        marginRight:scaleSize(10),
    },
    gradeDay01:{
        width:scaleSize(56),
        height:scaleSize(30),
        borderRadius:scaleSize(15),
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
    },
    gradeDay02:{
        width:scaleSize(54),
        height:scaleSize(28),
        borderRadius:scaleSize(15),
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#fff',
        borderWidth:scaleSize(1),
    },
    marginTwenty:{
        paddingVertical:scaleSize(20),
    }
})