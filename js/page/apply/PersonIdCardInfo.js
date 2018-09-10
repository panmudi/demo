import React, { Component } from 'react';

import {Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {scaleSize} from '../../util/px2dp'; //适配js
import NavigationBarM from '../../common/NavigationBarM';
import NavigatorUtil from "../../util/NavigatorUtil";
import StorageUtil from "../../util/StorageUtil";
import HttpUtil from "../../util/HttpUtil";
import {API, IMAGE_SERVER} from '../../common/Const'
import ImagePicker from "react-native-image-picker"; //导入上传图片组件

const {width, height} = Dimensions.get('window');





export default class PersonIdCardInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idCardImageFrontSource: null,
            idCardImageBackSource: null,
            realName: '',
            idCardNumber: '',
            address: ''
        };
    }

    componentDidMount() {
        StorageUtil.get("idCardInfo").then((value) => {
            if (value) {
                this.setState({
                    idCardImageFrontSource: {
                        uri: IMAGE_SERVER + value.idCardImageFront
                    },
                    idCardImageBackSource: {
                        uri: IMAGE_SERVER + value.idCardImageBack
                    },
                    realName: value.realName,
                    idCardNumber: value.idCardNumber,
                    address: value.address
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

    renderText(text) {
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={() => {
                StorageUtil.get("auth").then((value) => {
                    let formData = new FormData();
                    let frontFile = {
                        uri: this.state.idCardImageFrontSource.uri,
                        type: 'application/octet-stream',
                        name: 'idCardImageFront.jpg'
                    };
                    formData.append('idCardImageFrontFile', frontFile);
                    let backFile = {
                        uri: this.state.idCardImageBackSource.uri,
                        type: 'application/octet-stream',
                        name: 'idCardImageBack.jpg'
                    };
                    formData.append('idCardImageBackFile', backFile);
                    formData.append('realName', this.state.realName);
                    formData.append('idCardNumber', this.state.idCardNumber);
                    formData.append('address', this.state.address);
                    HttpUtil.post(API.updateIdCard, formData, {
                        'Authorization': 'Bearer ' + value.access_token,
                        'Content-Type': 'multipart/form-data;charset=utf-8'
                    }).then((json) => {
                        if (json.code === 0) {
                            StorageUtil.save("idCardInfo", json.data, () => {
                                const { navigation } = this.props;
                                const idCardImageText= navigation.getParam('idCardImageText');
                                idCardImageText('上传成功');
                                NavigatorUtil.goBack(this.props.navigation);
                            })
                        }
                    }, (error) => {
                        console.log(error)
                    });
                });
            }}>
            <Text style={{color: '#ee2424', fontSize: scaleSize(28),}}>{text}</Text>
        </TouchableOpacity>;
    }

    //上传图片方法
    selectPhotoTapped() {
        const options = {
            title: '请选择图片来源',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '相册图片',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {uri: response.uri};

                this.setState({
                    idCardImageFrontSource: source,
                });
            }
        });
    }

    selectPhotoTappedAdd() {
        const options = {
            title: '请选择图片来源',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '相册图片',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = {uri: response.uri};
                this.setState({
                    idCardImageBackSource: source,
                });
            }
        });
    }


    render() {
        return (

            <View style={styles.container}>
                <NavigationBarM
                    title='经营者身份证照片'
                    style={{backgroundColor: '#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                    rightButton={this.renderText('保存')}
                />
                <ScrollView>
                    {/*照片内容*/}
                    <View style={{backgroundColor: '#fff', borderBottomWidth: scaleSize(1), borderBottomColor: '#eee'}}>
                        <View style={{paddingHorizontal: scaleSize(30)}}>
                            <Text style={{fontSize: scaleSize(28), marginTop: scaleSize(15)}}>经营者身份证照片</Text>
                            <View style={styles.photoBlock}>
                                <View style={styles.photoBox}>
                                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                        <View>
                                            {this.state.idCardImageFrontSource === null ?
                                                <Image style={styles.photoImage}
                                                       source={require('../../../res/images/addPhoto.png')}/> :
                                                <Image style={styles.photoImage}
                                                       source={this.state.idCardImageFrontSource}/>
                                            }
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{
                                        fontSize: scaleSize(20),
                                        color: '#888',
                                        textAlign: 'center',
                                    }}>[正面]</Text>
                                </View>
                                <View style={styles.photoBox}>
                                    <Image style={styles.photoImage}
                                           source={require('../../../res/images/userInfo.png')}/>
                                    <Text style={{
                                        fontSize: scaleSize(20),
                                        color: '#888',
                                        textAlign: 'center',
                                    }}>示意图</Text>
                                </View>
                            </View>
                            <View style={[styles.photoBlock, {marginBottom: scaleSize(15)}]}>
                                <View style={styles.photoBox}>
                                    <TouchableOpacity onPress={this.selectPhotoTappedAdd.bind(this)}>
                                        <View>
                                            {this.state.idCardImageBackSource === null ?
                                                <Image style={styles.photoImage}
                                                       source={require('../../../res/images/addPhoto.png')}/> :
                                                <Image style={styles.photoImage}
                                                       source={this.state.idCardImageBackSource}/>
                                            }
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{
                                        fontSize: scaleSize(20),
                                        color: '#888',
                                        textAlign: 'center',
                                    }}>[反面]</Text>
                                </View>
                                <View style={styles.photoBox}>
                                    <Image style={styles.photoImage}
                                           source={require('../../../res/images/userInfo_a.png')}/>
                                    <Text style={{
                                        fontSize: scaleSize(20),
                                        color: '#888',
                                        textAlign: 'center',
                                    }}>示意图</Text>
                                </View>
                            </View>
                            <View style={styles.applyInformation}>
                                <Text style={styles.applyText}>姓名</Text>
                                <TextInput style={styles.applyInput} underlineColorAndroid='transparent'
                                           placeholderTextColor='#888' placeholder={'张三'} value={this.state.realName}
                                           onChangeText={(text) => this.setState({realName: text})}/>
                            </View>
                            <View style={styles.applyInformation}>
                                <Text style={styles.applyText}>地址</Text>
                                <TextInput style={styles.applyInput} underlineColorAndroid='transparent'
                                           placeholderTextColor='#888' placeholder={'北京市朝阳区'}
                                           value={this.state.address}
                                           onChangeText={(text) => this.setState({address: text})}/>
                            </View>
                            <View style={styles.applyInformation}>
                                <Text style={styles.applyText}>身份证号</Text>
                                <TextInput style={styles.applyInput} underlineColorAndroid='transparent'
                                           placeholderTextColor='#888' placeholder={'4288888888888888'}
                                           value={this.state.idCardNumber}
                                           onChangeText={(text) => this.setState({idCardNumber: text})}/>
                            </View>
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
        backgroundColor: '#f5f5f5'
    },
    photoBlock: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    photoBox: {
        marginRight: scaleSize(30),
        marginVertical: scaleSize(15),
    },
    photoImage: {
        width: scaleSize(280),
        height: scaleSize(180),
        resizeMode: 'contain',
        marginBottom: scaleSize(15),
    },
    applyInformation: {
        borderTopWidth: scaleSize(1),
        borderTopColor: '#eee',
        paddingHorizontal: scaleSize(30),
        paddingVertical: scaleSize(20),
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    applyText: {
        fontSize: scaleSize(28),
        width: scaleSize(120),
        color: '#333',
    },
    applyInput: {
        width: scaleSize(450),
        marginLeft: scaleSize(60),
        padding: scaleSize(0),
    }
});


