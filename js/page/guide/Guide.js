import React, {Component} from 'react';
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
    TextInput,
    Navigator,
} from 'react-native';

import {setSpText, scaleSize} from '../../util/px2dp';
import NavigationBarM from '../../common/NavigationBarM';
import GuideDetails from "./GuideDetails";
import NavigatorUtil from "../../util/NavigatorUtil";
import HttpUtil from '../../util/HttpUtil';
import StorageUtil from '../../util/StorageUtil';
import {API} from "../../common/Const";
import {ListItem} from 'react-native-elements';


var navigation = null;
export default class Guide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userGuides: [],
            guideContent: ''
        };
        navigation = this.props.navigation;
    }

    componentDidMount() {
        HttpUtil.get(API.userGuide, null, {
            'Authorization': 'Bearer ' + global.accessToken
        }).then((res) => {
            console.log(res);
            if (res.code === 0) {
                this.setState({
                    userGuides: res.data
                })
            }
        }, (err) => {
            console.log(err)
        })
    }

    renderButton(image) {
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={() => {
                NavigatorUtil.goBack(this.props.navigation);
            }}>
            <Image
                style={{width: scaleSize(36), height: scaleSize(34)}}
                source={image}/>
        </TouchableOpacity>;
    }

    render() {
        const {userGuides} = this.state;
        const {navigate} = this.props.navigation;
        return (


            <View style={styles.container}>
                <NavigationBarM
                    title='用户指南'
                    style={{backgroundColor: '#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                {/*用户指南*/}
                <ScrollView>
                    <View style={styles.spaceBlock}></View>
                    {
                        userGuides.map((item) => (
                            <TouchableOpacity key={item.id} onPress={() =>
                                this.props.navigation.navigate('GuideDetails', {
                                    title: item.title,
                                    content: item.content,
                                })}>
                                <ListItem
                                    title={item.sort + '.' + item.title}
                                    titleStyle={{
                                        color: '#333',
                                        fontSize: scaleSize(24),
                                        marginLeft: scaleSize(0),
                                        // marginBottom:scaleSize(20),
                                    }}
                                    containerStyle={{
                                        borderBottomColor: '#eee',
                                        borderBottomWidth: scaleSize(1),
                                    }}
                                    hideChevron={true}
                                    rightIcon={{
                                        name: 'chevron-right',
                                        type: 'evilicon',
                                        color: '#bbb',
                                    }}
                                />
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        spaceBlock: {
            height: scaleSize(20),
            backgroundColor: '#f5f5f5',
        },
        guideList: {
            paddingLeft: scaleSize(30),
            borderBottomColor: '#eeeeee',
            borderBottomWidth: scaleSize(1),
            paddingBottom: scaleSize(30),
            paddingTop: scaleSize(30),
            paddingRight: scaleSize(30),
            marginLeft: scaleSize(30),
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
        },
        guideText: {
            width: scaleSize(600),
            color: '#333',
        },
        nextIcon: {
            width: scaleSize(15),
            height: scaleSize(25),
        },
    }
)