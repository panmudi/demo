import React from 'react'
import {StackNavigator} from 'react-navigation';
import WelcomePage from '../page/WelcomePage'//欢迎页
import HomePage from '../page/HomePage' //首页
import Login from '../page/Login'; //账号密码登录
import LoginSms from '../page/LoginSms' //短信登录
import Register from '../page/Register'; //注册页面
import ForgetPwd from '../page/ForgetPwd'; //忘记密码
import ForgetPwdNext from '../page/ForgetPwdNext'; //忘记密码
import Receipt from '../page/tab/Receipt'; //收款
import Account from '../page/tab/Account'; //账目
import Message from '../page/tab/Message'; //消息中心
import My from '../page/tab/My'; //我的
import ReceiptCode from '../page/receipt/receiptCode'; //收款二维码
import ReceiptDetails from '../page/receipt/receiptDetails'; //收款详情
import QRScanner from '../util/QRScanner'; //收款详情
import PersonApply from '../page/apply/PersonApply'; //进件（详情）
import PersonIdCardInfo from '../page/apply/PersonIdCardInfo'; //进件（相片）
import BusinessLicense from '../page/apply/BusinessLicense'; //进件（营业执照）
import OpenLicense from '../page/apply/OpenLicense'; //进件（开户许可证）
import PersonBankInfo from '../page/apply/PersonBankInfo'; //进件（银行卡号）
import EnterpriseBankInfo from '../page/apply/EnterpriseBankInfo'; //进件（银行卡信息）
import SelectMerchant from '../page/apply/SelectMerchant'; //进件（选择商户类型）
import EnterpriseApply from '../page/apply/EnterpriseApply'; //企业用户
import AlipayNum from '../page/apply/AlipayNum'; //银行卡号
import OpenRemind from '../page/news/OpenRemind'; //开户助手
import News from '../page/news/News'; //消息详情
import Details from '../page/news/Details'; //消息详情展示
import About from '../page/guide/About'; //关于我们
import Guide from '../page/guide/Guide'; //用户指南
import GuideDetails from '../page/guide/GuideDetails'; //用户指南详情
import DeliveryAddress from '../page/guide/DeliveryAddress'; //邮寄地址
import Profile from '../page/profile/Profile'; //修改个人资料
import Rename from '../page/profile/Rename'; //修改姓名
import Set from '../page/set/Set'; //设置
import ChangePwd from '../page/set/ChangePwd'; //修改密码
import Wallet from '../page/wallet/Wallet'; //我的钱包
import Withdraw from '../page/wallet/Withdraw'; //提现
import AccountDetails from '../page/account/AccountDetails';
import EnterpriseIdCardInfo from "../page/apply/EnterpriseIdCardInfo";
import CommercialManagement from '../page/commercial/CommercialManagement';//商户管理
import AddCommercial from '../page/commercial/AddCommercial'; //新增开户
import MyCommercial from '../page/commercial/MyCommercial'; //我的商户
import CommercialDetails from '../page/commercial/CommercialDetails'; //商户详情
import MoreCommercialDetails from '../page/commercial/MoreCommercialDetails';//更多商户详情
import CommercialAccountDetails from '../page/commercial/CommercialAccountDetails'; //商户收款记录

import EmployeeManagement from '../page/employee/EmployeeManagement'; //员工管理
import AddEmployee from '../page/employee/AddEmployee';//新增员工

import Terminal from '../page/terminal/Terminal';//我的终端
import TerminalCode from "../page/terminal/TerminalCode";//我的终端码
import TerminalList from '../page/terminal/TerminalList';//终端列表
import BindTerminal from "../page/terminal/BindTerminal";//绑定终端
import TerminalDetails from '../page/terminal/TerminalDetails'; //终端详情
import TerminalGrade from '../page/terminal/TerminalGrade';//终端等级

import ServiceContract from '../page/guide/ServiceContract'; //服务协议

import AccountInformation from '../page/account/AccountInformation'; //开户资料
import InformationDetails from '../page/account/InformationDetails';  //开户资料详情
import FlowStatistics from "../page/terminal/FlowStatistics";  //流水统计

// import first from '../page/apply/first';//进件（第一个页面）
// import success from '../page/apply/success';//进件（成功页面）
// import fail from '../page/apply/fail';//进件（失败页面）


export default AppNavigator = StackNavigator({
        WelcomePage: {
            screen: WelcomePage
        },
        Login: {
            screen: Login,
        },
        HomePage: {
            screen: HomePage
        },

        QRScanner: {
            screen: QRScanner
        },
        AccountDetails: {
            screen: AccountDetails,
        },

        LoginSms: {
            screen: LoginSms,

        },
        Register: {
            screen: Register,

        },

        ForgetPwd: {
            screen: ForgetPwd
        },
        ForgetPwdNext: {
            screen: ForgetPwdNext
        },
        Receipt: {
            screen: Receipt
        },
        ReceiptCode: {
            screen: ReceiptCode,

        },
        ReceiptDetails: {
            screen: ReceiptDetails,

        },
        Account: {
            screen: Account,

        },
        Message: {
            screen: Message
        },
        My: {
            screen: My,

        },
        CommercialManagement: {
            screen: CommercialManagement,
        },
        AddCommercial: {
            screen: AddCommercial,
        },
        MyCommercial: {
            screen: MyCommercial,
        },
        CommercialDetails: {
            screen: CommercialDetails,
        },
        MoreCommercialDetails: {
            screen: MoreCommercialDetails,
        },
        CommercialAccountDetails: {
            screen: CommercialAccountDetails,
        },
        EmployeeManagement: {
            screen: EmployeeManagement,
        },
        AddEmployee: {
            screen: AddEmployee,
        },
        News: {
            screen: News,

        },
        OpenRemind: {
            screen: OpenRemind,

        },
        Details: {
            screen: Details,

        },
        About: {
            screen: About,

        },
        ServiceContract: {
            screen: ServiceContract,
        },
        Guide: {
            screen: Guide,

        },
        GuideDetails: {
            screen: GuideDetails,

        },
        Profile: {
            screen: Profile
        },
        Rename: {
            screen: Rename,
        },
        Set: {
            screen: Set
        },
        ChangePwd: {
            screen: ChangePwd
        },
        Wallet: {
            screen: Wallet,
        },
        Withdraw: {
            screen: Withdraw
        },
        PersonApply: {
            screen: PersonApply,
        },
        EnterpriseApply: {
            screen: EnterpriseApply,
        },
        AlipayNum: {
            screen: AlipayNum,
        },
        PersonIdCardInfo: {
            screen: PersonIdCardInfo,
        },
        EnterpriseIdCardInfo: {
            screen: EnterpriseIdCardInfo,
        },
        BusinessLicense: {
            screen: BusinessLicense,
        },
        OpenLicense: {
            screen: OpenLicense,

        },
        PersonBankInfo: {
            screen: PersonBankInfo,

        },
        SelectMerchant: {
            screen: SelectMerchant
        },
        EnterpriseBankInfo: {
            screen: EnterpriseBankInfo,

        },
        DeliveryAddress: {
            screen: DeliveryAddress,

        },
        Terminal: {
            screen: Terminal,
        },
        TerminalCode: {
            screen: TerminalCode,
        },
        TerminalList: {
            screen: TerminalList,
        },
        BindTerminal: {
            screen: BindTerminal,
        },
        TerminalDetails: {
            screen: TerminalDetails
        },
        TerminalGrade: {
            screen: TerminalGrade
        },
        AccountInformation: {
            screen: AccountInformation,
        },
        InformationDetails: {
            screen: InformationDetails,
        },
        FlowStatistics: {
            screen: FlowStatistics,
        }
    },
    {
        initialRouteName:'HomePage',
        navigationOptions: {
            header: null
        }
    }
)