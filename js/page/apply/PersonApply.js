import React, { Component } from 'react';

import {Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scaleSize} from '../../util/px2dp';
import NavigatorUtil from "../../util/NavigatorUtil";
//适配js
import NavigationBarM from '../../common/NavigationBarM';

import Picker from 'react-native-picker';
import area from '../../../res/data/area.json';
import industry from '../../../res/data/industry.json';
import StorageUtil from "../../util/StorageUtil";
import {API, IMAGE_SERVER} from "../../common/Const";
import HttpUtil from "../../util/HttpUtil";

const {width} = Dimensions.get('window');

export default class PersonApply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areaValue: ['请选择'],
            industryValue: ['请选择'],
            visible: false,
            bizLicenceImageText: '请上传',
            idCardImageText: '请上传',
            bankCardText: '请填写',
            alipayText: '请填写'
        };
    }

    //界面初始化
    componentDidMount() {
        //todo 要改成multiGet
        StorageUtil.get("bizLicenceInfo").then((value) => {
            if (value) {
                this.setState({
                    bizLicenceImageText: '上传成功'
                })
            }
        });
        StorageUtil.get("idCardInfo").then((value) => {
            if (value) {
                this.setState({
                    idCardImageText: '上传成功'
                })
            }
        });
        StorageUtil.get("bankInfo").then((value) => {
            if (value) {
                this.setState({
                    bankCardText: value
                })
            }
        });
        StorageUtil.get("alipay").then((value) => {
            if (value) {
                this.setState({
                    alipayText: value
                })
            }
        });
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

    //地区数据处理
    _createAreaData() {
        let data = [];
        let len = area.length;
        for (let i = 0; i < len; i++) {
            let city = [];
            for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }

    //控件
    _showAreaPicker() {
        Picker.init({
            pickerData: this._createAreaData(),
            pickerConfirmBtnText: '保存',
            pickerCancelBtnText: '取消',
            pickerTitleText: '',
            pickerConfirmBtnColor: [51, 51, 51, 1],
            pickerCancelBtnColor: [51, 51, 51, 1],
            pickerToolBarFontSize: 14,
            onPickerConfirm: pickedValue => {
                this.setState({
                    areaValue: pickedValue,
                });
            },
            onPickerCancel: pickedValue => {
                // console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
                // console.log('area', pickedValue);
            }
        });
        Picker.show();
    }

    _showIndustryPicker() {
        Picker.init({
            pickerData: industry,
            pickerConfirmBtnText: '保存',
            pickerCancelBtnText: '取消',
            pickerTitleText: '',
            pickerConfirmBtnColor: [51, 51, 51, 1],
            pickerCancelBtnColor: [51, 51, 51, 1],
            pickerToolBarFontSize: 14,
            onPickerConfirm: pickedValue => {
                this.setState({
                    industryValue: pickedValue,
                });
            },
            onPickerCancel: pickedValue => {

            },
            onPickerSelect: pickedValue => {

            }
        });
        Picker.show();
    }

    //model
    show() {
        this.setState({
            visible: true
        })
    }

    dismiss() {
        this.setState({
            visible: false
        })
    }

    onButtonPress() {
        Picker.hide();
        StorageUtil.get("auth").then((value) => {
            let formData = new FormData();
            formData.append('region', this.state.areaValue[0] + ',' + this.state.areaValue[1] + ',' + this.state.areaValue[2]);
            formData.append('industry', this.state.industryValue[0]);
            formData.append('merchantType', '1');
            HttpUtil.post(API.submitMerchant, formData, {
                'Authorization': 'Bearer ' + value.access_token
            }).then((json) => {
                if (json.code === 0) {
                    this.show();
                    this.timer = setTimeout(() => {
                        this.props.navigation.navigate('HomePage');
                    }, 3000);
                }
            }, (error) => {
                console.log(error)
            });
        });
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    _onPressBtn(pageUrl) {
        let _this=this;
        const {bizLicenceImageText,idCardImageText,bankCardText,alipayText}=this.state;
        if (pageUrl.trim().length > 0) {
            Picker.hide();
            const {navigation} = this.props;
            navigation.navigate(pageUrl,{
                bizLicenceImageText: function(value) {
                    _this.setState({
                        bizLicenceImageText:value
                    })
                },
                idCardImageText: function(value) {
                    _this.setState({
                        idCardImageText:value
                    })
                },
                bankCardText: function(value) {
                    _this.setState({
                        bankCardText:value
                    })
                },
                alipayText: function(value) {
                    _this.setState({
                        alipayText:value
                    })
                },
            });
        }
    }

    _goBack() {
        Picker.hide();
        NavigatorUtil.goBack(this.props.navigation);
    }


    render() {
        const {areaValue, industryValue} = this.state
        return (
            <View>
                <NavigationBarM
                    title='个体工商户进件'
                    style={{backgroundColor: '#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                />
                <View style={styles.spaceBlock}></View>
                <ScrollView style={[styles.scrollView, styles.horizontalScrollView]}>
                    <TouchableOpacity onPress={this._showAreaPicker.bind(this)}>
                        <View style={[styles.userItem]}>
                            <Text style={{color: '#333', fontSize: scaleSize(28),}}>所属地区</Text>
                            <View style={styles.nextContain}>
                                <Text style={{
                                    color: '#666',
                                    fontSize: scaleSize(24),
                                    marginRight: scaleSize(10)
                                }}>{areaValue[0]}{areaValue[1]}{areaValue[2]}</Text>
                                <Image style={styles.nextIcon}
                                       source={require('../../../res/images/message/message_06.png')}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/**/}
                    <TouchableOpacity onPress={this._showIndustryPicker.bind(this)}>
                        <View style={[styles.userItem]}>
                            <Text style={{color: '#333', fontSize: scaleSize(28),}}>行业分类</Text>
                            <View style={styles.nextContain}>
                                <Text style={{
                                    color: '#666',
                                    fontSize: scaleSize(24),
                                    marginRight: scaleSize(10)
                                }}>{industryValue[0]}</Text>
                                <Image style={styles.nextIcon}
                                       source={require('../../../res/images/message/message_06.png')}/>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/**/}
                    <TouchableOpacity onPress={() => this._onPressBtn('BusinessLicense')}>
                        <View style={[styles.userItem]}>
                            <Text style={{color: '#333', fontSize: scaleSize(28),}}>营业执照照片</Text>
                            <View style={styles.nextContain}>
                                <Text style={{
                                    color: '#666',
                                    fontSize: scaleSize(24),
                                    marginRight: scaleSize(10)
                                }}>{this.state.bizLicenceImageText}</Text>
                                <Image style={styles.nextIcon}
                                       source={require('../../../res/images/message/message_06.png')}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/**/}
                    <TouchableOpacity
                        onPress={() => this._onPressBtn('PersonIdCardInfo')}
                    >
                        <View style={[styles.userItem]}>
                            <Text style={{color: '#333', fontSize: scaleSize(28),}}>经营者身份证照片</Text>
                            <View style={styles.nextContain}>
                                <Text style={{
                                    color: '#666',
                                    fontSize: scaleSize(24),
                                    marginRight: scaleSize(10)
                                }}>{this.state.idCardImageText}</Text>
                                <Image style={styles.nextIcon}
                                       source={require('../../../res/images/message/message_06.png')}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/**/}


                    {/**/}
                    <TouchableOpacity
                        onPress={() => this._onPressBtn('PersonBankInfo')}
                    >
                        <View style={[styles.userItem]}>
                            <Text style={{color: '#333', fontSize: scaleSize(28),}}>银行卡号</Text>
                            <View style={styles.nextContain}>
                                <Text style={{
                                    color: '#666',
                                    fontSize: scaleSize(24),
                                    marginRight: scaleSize(10)
                                }}>{this.state.bankCardText}</Text>
                                <Image style={styles.nextIcon}
                                       source={require('../../../res/images/message/message_06.png')}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/**/}
                    <TouchableOpacity onPress={() => this._onPressBtn('AlipayNum')}>
                        <View style={[styles.userItem, styles.mt20]}>
                            <Text style={{color: '#333', fontSize: scaleSize(28),}}>支付宝账号</Text>
                            <View style={styles.nextContain}>
                                <Text style={{
                                    color: '#666',
                                    fontSize: scaleSize(24),
                                    marginRight: scaleSize(10)
                                }}>{this.state.alipayText}</Text>
                                <Image style={styles.nextIcon}
                                       source={require('../../../res/images/message/message_06.png')}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/**/}

                    {/**/}
                    <TouchableOpacity activeOpacity={0.8} onPress={this.onButtonPress.bind(this)}
                                      style={{marginTop: scaleSize(50),}}>
                        <View style={{
                            width: width,
                            paddingLeft: scaleSize(30),
                            paddingRight: scaleSize(30),
                        }}>
                            <View style={styles.btn}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: scaleSize(32),
                                    textAlign: 'center',
                                    lineHeight: scaleSize(70)
                                }}>提交审核</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>


                {/**/}
                <Modal
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={() => {
                        alert("Modal has been closed.")
                    }}
                >
                    <View style={styles.containerM}>
                        <TouchableOpacity
                            onPress={() => this.dismiss()}
                            style={styles.jj_closeA}
                        >
                            <View>
                                <Image source={require('../../../res/images/jj_close.png')} style={styles.jj_close}/>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.jjArea}>
                            <Image source={require('../../../res/images/jj01.png')}
                                   style={[styles.jjImg, styles.mb20]}/>
                            <Image source={require('../../../res/images/logo1.png')}
                                   style={[styles.logo1, styles.mb20]}/>
                            <Text style={[styles.jjT1, styles.mb20]}>您的进件已经提交</Text>
                            <Text style={styles.jjT2}>待审核通过后您就可以开始收款了</Text>
                            {/**/}
                        </View>
                        {/**/}
                    </View>
                </Modal>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    scrollView: {
        width: width,

    },
    spaceBlock: {
        height: scaleSize(20),
        backgroundColor: '#f5f5f5',
    },
    mt20: {
        marginTop: scaleSize(20)
    },
    userImg: {
        width: scaleSize(95),
        height: scaleSize(95),
        borderRadius: scaleSize(50),
        // paddingRight:scaleSize(10),
    },
    nextIcon: {
        width: scaleSize(15),
        height: scaleSize(25),
        // paddingLeft:scaleSize(10),
    },
    userLItem: {
        height: scaleSize(168),
        backgroundColor: '#fff',
        paddingHorizontal: scaleSize(30),
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userItem: {
        backgroundColor: '#fff',
        paddingHorizontal: scaleSize(30),
        paddingVertical: scaleSize(30),
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eeeeee',
        borderBottomWidth: scaleSize(1)
    },
    nextContainI: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: scaleSize(120),
    },
    nextContain: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        width: scaleSize(320),

    },

    btn: {
        height: scaleSize(70),
        backgroundColor: '#ee2424',
        borderRadius: scaleSize(10),
    },

//
    containerM: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    jjArea: {
        position: 'relative',
        width: scaleSize(500),
        height: scaleSize(460),
        backgroundColor: '#fff',
        borderRadius: scaleSize(5),
        alignItems: 'center',
    },
    jjImg: {
        width: scaleSize(500),
        height: scaleSize(148),
    },
    jj_closeA: {
        width: scaleSize(500),
        marginBottom: scaleSize(30),
    },
    jj_close: {
        marginLeft: scaleSize(460),
        width: scaleSize(36),
        height: scaleSize(36),
        resizeMode: 'contain',
    },
    logo1: {
        width: scaleSize(88),
        height: scaleSize(88),
    },
    jjT1: {
        fontSize: scaleSize(28),
        textAlign: 'center',
    },
    jjT2: {
        fontSize: scaleSize(20),
        textAlign: 'center',
    },
    mt50: {
        marginTop: scaleSize(50),
    },
    mb20: {
        marginBottom: scaleSize(20),
    },
});


