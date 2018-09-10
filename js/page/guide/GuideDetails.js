import React, {Component} from 'react';
import {
    ActivityIndicator,
    Button,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from 'react-native';

import {scaleSize} from '../../util/px2dp';
import NavigationBarM from '../../common/NavigationBarM';
import NavigatorUtil from "../../util/NavigatorUtil";

var navigation = null;

export default class GuideDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
        navigation = this.props.navigation;
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
                    title='用户指南'
                    style={{backgroundColor:'#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                {/*用户指南详情页*/}
                <View style={[styles.noticePadding,{marginTop:scaleSize(50)}]}>
                    <Text style={{fontSize:scaleSize(28),marginBottom:scaleSize(80),color:'#333'}}>{this.props.navigation.state.params.title}</Text>
                    <Text style={styles.newsContent}>{this.props.navigation.state.params.content}</Text>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
        container:{
            flex: 1,
            backgroundColor:'#f5f5f5',
        },
        noticePadding:{
            paddingLeft:scaleSize(30),
            paddingRight:scaleSize(30),
        },
        newsContent:{
            lineHeight:scaleSize(40),
            fontSize:scaleSize(24),
        },
    }
)