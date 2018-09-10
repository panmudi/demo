import React, { Component } from 'react';

import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scaleSize} from '../../util/px2dp'; //适配js
import {API, IMAGE_SERVER} from '../../common/Const'

import NavigationBarM from '../../common/NavigationBarM';
import NavigatorUtil from "../../util/NavigatorUtil";
import ImagePicker from "react-native-image-picker";
import HttpUtil from "../../util/HttpUtil";
import StorageUtil from "../../util/StorageUtil";

const {width, height} = Dimensions.get('window');

export default class BusinessLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoSource: null,
        };
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

    //初始加载已经上传的图片
    componentDidMount() {
        StorageUtil.get("bizLicenceInfo").then((value) => {
            if (value) {
                this.setState({
                    photoSource: {
                        uri: IMAGE_SERVER + value
                    }
                })
            }
        });
    }

    renderText(text) {
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={() => {
                StorageUtil.get("auth").then((value) => {
                    let formData = new FormData();
                    let file = {
                        uri: this.state.photoSource.uri,
                        type: 'application/octet-stream',
                        name: 'bizLicence.jpg'
                    };
                    formData.append('bizLicenceImageFile', file);
                    HttpUtil.post(API.updateBizLicenceImage, formData, {
                        'Authorization': 'Bearer ' + value.access_token,
                        'Content-Type': 'multipart/form-data;charset=utf-8'
                    }).then((json) => {
                        if (json.code === 0) {
                            StorageUtil.save("bizLicenceInfo", json.data.bizLicenceImage, () => {
                                const { navigation } = this.props;
                                const bizLicenceImageText= navigation.getParam('bizLicenceImageText');
                                bizLicenceImageText('上传成功');
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
            }
            else {
                let source = {uri: response.uri};

                this.setState({
                    photoSource: source,
                });
            }
        });
    }


    render() {
        return (

            <View style={styles.container}>
                <NavigationBarM
                    title='营业执照照片'
                    style={{backgroundColor: '#FFF'}}
                    leftButton={this.renderButton(require('../../../res/images/back-black.png'))}
                    rightButton={this.renderText('保存')}
                />
                <ScrollView>
                    {/*照片内容*/}
                    <View style={{backgroundColor: '#fff', borderBottomWidth: scaleSize(1), borderBottomColor: '#eee'}}>
                        <View style={{paddingHorizontal: scaleSize(30)}}>
                            <Text style={{fontSize: scaleSize(28), marginTop: scaleSize(15)}}>营业执照照片</Text>
                            <View style={[styles.photoBlock, {marginBottom: scaleSize(15)}]}>
                                <View style={styles.photoBox}>
                                    <TouchableOpacity onPress={this.selectPhotoTappedAdd.bind(this)}>
                                        <View>
                                            {this.state.photoSource === null ? <Image style={styles.photoImage}
                                                                                      source={require('../../../res/images/addPhoto.png')}/> :
                                                <Image style={styles.photoImage} source={this.state.photoSource}/>
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
                                           source={require('../../../res/images/apply/apply_08.png')}/>
                                    <Text style={{
                                        fontSize: scaleSize(20),
                                        color: '#888',
                                        textAlign: 'center',
                                    }}>示意图</Text>
                                </View>
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
        marginBottom: scaleSize(15),
        resizeMode: 'contain',
    },
});


