export const BASE_URL = 'http://192.168.1.10:8777';
export const IMAGE_SERVER = 'http://192.168.1.10:8088/';
export const VERSION = '0.0.1';

//AsyncStorage中key常量
export const KEY = {
    //认证授权信息
    auth: 'auth',
    //登录名
    loginName: 'loginName',
    //当前终端
    currTerminal: 'currTerminal',
    //用户信息
    userInfo: 'userInfo'
}

//监听器常量
export const LISTENER = {
    //消息列表
    listMessage: 'listMessage',
    //用户中心
    userInfo: 'userInfo',
    //账单列表
    listBill: 'listBill',
    //终端信息
    terminalInfo: 'terminalInfo'
}

//后台接口常量
export const API = {
    /**
     * 进件
     */
    //上传营业执照
    updateBizLicenceImage: BASE_URL + '/biz/app/merchant/updateBizLicenceImage',
    //上传身份证
    updateIdCard: BASE_URL + '/biz/app/merchant/updateIdcard',
    //银行卡号
    updatePersonBankcard: BASE_URL + '/biz/app/merchant/updatePersonBankcard',
    //企业银行卡
    updateCompanyBankcard: BASE_URL + '/biz/app/merchant/updateCompanyBankcard',
    //上传开户许可
    updateAccountPermitsImage: BASE_URL + '/biz/app/merchant/updateAccountPermitsImage',
    //保存支付宝账号
    updateAlipayAccount: BASE_URL + '/biz/app/merchant/updateAlipayAccount',
    //提交商户进件
    submitMerchant: BASE_URL + '/biz/app/merchant/submitMerchant',
    //获取商户进件信息
    merchantInfo: BASE_URL + '/biz/app/merchant/merchantInfo',
    /**
     * 登录前
     */
    //用户名登录
    usernameLogin: BASE_URL + '/auth/oauth/token',
    //手机号登录
    mobileLogin: BASE_URL + '/auth/mobile/token',
    //获取短信验证码
    smsCode: BASE_URL + '/admin/smsCode/',
    //用户信息
    userInfo: BASE_URL + '/admin/user/info',
    //商户注册
    userRegister: BASE_URL + '/biz/app/merchant/register',
    //修改密码
    passwordChange: BASE_URL + '/admin/app/forget',
    /**
     * 收款
     */
    //分期费用明细
    feeDetail: BASE_URL + '/admin/app/fee/',
    //轮询订单状态
    selectByOrderNo: BASE_URL + '/pay/transaction/selectByOrderNo/',
    //获取收款码信息
    qrCodeText: BASE_URL + '/pay/alipay/precreatePay',
    //扫码收款信息
    qrScannerText: BASE_URL + '/pay/alipay/tradePay',
    /**
     * 账单
     */
    //账单列表
    transactionList: BASE_URL + '/pay/transaction/page',
    //账单详情
    selectByTnxId: BASE_URL + '/pay/transaction/selectByTnxId/',
    /**
     * 消息
     */
    //消息列表
    listMessage: BASE_URL + '/biz/app/message/page',
    //删除消息
    delMessage: BASE_URL + '/biz/app/message/delete/',
    /**
     * 我的
     */
    //上传头像
    userAvatar: BASE_URL + '/admin/app/user/avatar',
    //修改用户昵称
    userNickname: BASE_URL + '/admin/app/user/nickname',
    //修改密码
    userPassword: BASE_URL + '/admin/app/user/password',
    //用户指南
    userGuide: BASE_URL + '/biz/app/userGuide/list',
    //检查新版本
    appVersion: BASE_URL + '/biz/app/version/check',
    //登出
    logout: BASE_URL + '/auth/authentication/removeToken'
}

//图片常量
export const eyeOff = require('../../res/images/eyeOff.png');
export const eyeOn = require('../../res/images/eyeOn.png');

export const arrowDown = require('../../res/images/arrowDown.png');
export const arrowUp = require('../../res/images/arrowUp.png');