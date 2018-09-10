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

var navigation = null;

export default class Details extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
        navigation = this.props.navigation;
    }

    // static navigationOptions = {
    //     title: '公告详情',
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
                {/*消息详情展示*/}
                <NavigationBarM
                    title='公告详情'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <ScrollView>
                <View style={styles.spaceBlock}></View>
                <View style={styles.noticePadding}>
                    <Text style={styles.newsContent}>由于汉口银行系统升级，2018年5月4日0时0分起，至2018年5月5日23时59分止，使用汉口银行进行消费的款项到账时间延后，请各位商户悉知，如有不便，敬请谅解，谢谢！</Text>
                    <View style={styles.rightText}>
                        <Text style={{fontSize:scaleSize(26)}}>一呗</Text>
                    </View>
                    <View style={styles.rightText}>
                        <Text style={{fontSize:scaleSize(22),color:'#888888'}}>13:32   2018-05-04</Text>
                    </View>
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
            backgroundColor:'#f5f5f5',
        },
        noticePadding:{
            paddingLeft:scaleSize(30),
            paddingRight:scaleSize(30),
        },
        newsContent:{
               marginTop:scaleSize(50),
               marginBottom:scaleSize(96),
              fontSize:scaleSize(26),
        },
        rightText:{
            display:'flex',
            justifyContent:'flex-end',
            flexDirection:'row',
            alignItems:'flex-end',
        }
    }
)