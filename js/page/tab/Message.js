import React, {Component} from 'react';
import {
    DeviceEventEmitter,
    Image,
    RefreshControl,
    StyleSheet,
    SwipeableFlatList,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';

import {scaleSize} from '../../util/px2dp';
import NavigationBar from '../../common/NavigationBar';
import HttpUtil from '../../util/HttpUtil';
import {API, LISTENER} from '../../common/Const';
import moment from 'moment';
import {Modal,Toast} from 'antd-mobile-rn';

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgData: [],
            page: 1,
            limit: 5,
            refreshing: false
        };
    }

    componentDidMount() {
        var self = this;
        self._initData(false);
        this.listener = DeviceEventEmitter.addListener(LISTENER.listMessage, () => {
            self._initData(false);
        });
    }

    //卸载消息监听
    componentWillUnmount() {
        this.listener.remove();
    }

    //初始化消息列表
    _initData(dropdown) {
        if (!dropdown) {
            Toast.loading('正在加载');
        }
        let curPage = dropdown ? this.state.page + 1 : 1;
        this.setState({
            page: curPage,
            refreshing: dropdown,
            msgData: dropdown ? this.state.msgData : []
        })
        HttpUtil.get(API.listMessage, {
            'page': curPage,
            'limit': this.state.limit
        }, {
            'Authorization': 'Bearer ' + global.accessToken
        }).then((res) => {
            Toast.hide();
            if (res.code === 0) {
                let _msgData = this.state.msgData;
                for (let i in res.data) {
                    _msgData.unshift(res.data[i]);
                }
                this.setState({
                    msgData: _msgData,
                    refreshing: false
                })
            }
        }, (err) => {
            Toast.hide();
            console.log(err);
        })
    }

    //消息类型
    msgType(data) {
        if (data.item.msgType === 1) {
            return {
                type: '系统公告',
                msgIcon: require('../../../res/images/message/m_icon_3.png')
            }
        } else if (data.item.msgType === 2) {
            return {
                type: '系统消息',
                msgIcon: require('../../../res/images/message/m_icon_1.png')
            }
        } else {
            return {
                type: '开户信息',
                msgIcon: require('../../../res/images/message/m_icon_2.png')
            }
        }
    }

    _renderItem(data) {
        let msgType = this.msgType(data);
        return <View style={styles.msgItem}>
            <View style={styles.msgTop}>
                <View style={styles.msgTL}>
                    <Image style={styles.messageIcon} resizeMode={'contain'} source={msgType.msgIcon}/>
                    <Text style={styles.msgType}>{msgType.type}</Text>
                </View>
                <View style={styles.msgTR}>
                    <Text
                        style={styles.msgTime}>{moment(new Date()).format('YYYYMMDD') == moment(data.item.createTime).format('YYYYMMDD') ? moment(data.item.createTime).format('HH:mm') : moment(data.item.createTime).format('MM/DD HH:mm')}</Text>
                </View>
            </View>
            {/**/}
            <View>
                <Text style={styles.msgInfo}>
                    {data.item.content}
                </Text>
            </View>
        </View>
    }

    //删除
    deleteActions(rowData) {
        var self = this;
        if (rowData.item.msgType === 1) {
            //系统公告不能删除
            return;
        } else {
            return <View style={styles.quickContainer}>
                <TouchableHighlight
                    onPress={() => {
                        Modal.alert('提示', '确认删除这条消息', [{
                            text: '确定', onPress: () => {
                                HttpUtil.post(API.delMessage + rowData.item.msgId, null, {
                                    'Authorization': 'Bearer ' + global.accessToken
                                }).then((res) => {
                                    if (res.code === 0 && res.data) {
                                        self._initData(false);
                                    } else {
                                        Toast.fail('删除失败', 1);
                                    }
                                }, (err) => {
                                    console.log(err);
                                })
                            }
                        },
                            {text: '取消', onPress: () => console.log('cancel'), style: 'cancel'},
                        ]);
                    }}
                >
                    <View style={styles.quick}>
                        <Text style={styles.text}>删除</Text>
                    </View>
                </TouchableHighlight>
            </View>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='消息中心'
                    style={{backgroundColor: '#ee2424'}}
                />
                <View style={[{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }, this.state.msgData.length === 0 ? '' : styles.hide]}>
                    <Image style={{width: scaleSize(233), height: scaleSize(182), marginBottom: scaleSize(20)}}
                           resizeMode={'contain'} source={require('../../../res/images/message/content.png')}/>
                    <Text style={{fontSize: scaleSize(24), alignSelf: 'center', color: '#888'}}>暂无消息</Text>
                </View>
                {/*消息列表*/}
                <View style={[styles.messagesBox, this.state.msgData.length === 0 ? styles.hide : '']}>
                    <SwipeableFlatList
                        data={this.state.msgData}
                        renderItem={(data) => this._renderItem(data)}
                        refreshControl={
                            <RefreshControl
                                title={'Loading'}
                                colors={['red']}
                                tintColor={'orange'}
                                titleColor={'red'}
                                refreshing={this.state.refreshing}
                                onRefresh={() => this._initData(true)}
                            />
                        }
                        renderQuickActions={(rowData) => this.deleteActions(rowData)}
                        maxSwipeDistance={scaleSize(115)}
                        bounceFirstRowOnMount={false}
                    />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    messagesBox: {
        // paddingHorizontal:scaleSize(30),
        flex: 1,
        paddingBottom: scaleSize(30),
    },
    msgItem: {
        backgroundColor: '#fff',
        marginTop: scaleSize(30),
        paddingHorizontal: scaleSize(30),
        paddingVertical: scaleSize(30),
        marginHorizontal: scaleSize(30),
    },
    messageIcon: {
        width: scaleSize(32),
        height: scaleSize(31),
    },

    msgType: {
        fontSize: scaleSize(26),
        color: '#888',
        marginLeft: scaleSize(16),
        marginTop: scaleSize(-2),
    },
    msgTL: {
        flexDirection: 'row',
    },
    msgTime: {
        fontSize: scaleSize(20),
        color: '#999'
    },
    msgTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    msgInfo: {
        fontSize: scaleSize(28),
        lineHeight: scaleSize(36),
        color: '#333',
        marginTop: scaleSize(30),
    },
    hide: {
        display: 'none'
    },
    //
    quick: {
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: scaleSize(400),
    },
    quickContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: scaleSize(30),
        // marginBottom: scaleSize(30),
        marginTop: scaleSize(30),
    },
    text: {
        color: 'white',
        fontSize: scaleSize(30),
        marginRight: scaleSize(30),
    },
})