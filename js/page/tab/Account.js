import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Platform,

} from 'react-native';

import {scaleSize} from '../../util/px2dp';
import NavigationBar from '../../common/NavigationBar';
import AccountDetails from '../../page/account/AccountDetails';
import Picker from "react-native-picker/index";
import {API,arrowDown,arrowUp} from "../../common/Const";
import StorageUtil from "../../util/StorageUtil";
import HttpUtil from "../../util/HttpUtil";
import moment from 'moment';

var navigation = null;
moment().format('YYYY-MM-DD HH:mm:ss')

let now   = new Date();
const {width, height} = Dimensions.get('window');

const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEIGHT_ANDROID = 50;

export default class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
            date:this.props.date,
            isLoading: false,
            dataArray: [],
            page: 0,
            limit: 12,
            isLoadData: false,
            _initValue: true,
            dateTime: '',
            dateStr: '本月',
            show:false,
            fliterType:'all',//10种类型(string)  all(所有)，receipt（收款），installment（分期），bonus（红包），earn（收益），withdraw（提现），disburse（支出），sell（销售），award（奖励），fee（手续费）
            amountRange:'',//金额区间
        };
        navigation = this.props.navigation;
        this.typeChoose=this.typeChoose.bind(this);
    }

    componentWillMount() {
        this.loadLineData(true);
    }

    componentDidMount() {
        this.setState({
            year:now.getUTCFullYear()+'年',
            month:(now.getMonth()+1)+'月',
        });
    }

    loadLineData(refreshing){
        let _this = this, page = this.state.page+1;
        if (refreshing) {
            page = 1;
        }
        this.setState({
           page: page
        });
        StorageUtil.get("auth").then((value) => {
            let formData = {page: this.state.page, limit: this.state.limit};
            HttpUtil.get(API.transactionList, formData, {
                'Authorization': 'Bearer ' + value.access_token
            }).then((json) => {
                let dataArray = [];
                console.log(json);
                if (refreshing) {
                    dataArray = json.records ? json.records : [];
                } else {
                    dataArray = this.state.dataArray.concat(json.records);
                }
                if (json.records.length % _this.state.limit !== 0) {
                    _this.setState({
                        dataArray: dataArray,
                        isLoading: false,
                        isLoadData: false,
                        _initValue: false
                    })
                } else {
                    _this.setState({
                        dataArray: dataArray,
                        isLoading: false,
                        _initValue: false
                    });
                    setTimeout(() => {
                        _this.setState({
                            isLoadData: true
                        });
                    }, 500);
                }

            }, (json) => {
                console.log(json)
            });
        });
    }

    componentWillUnmount() {

    }
    //时间选择
    _createDateData() {
        let monthn = now.getMonth()+2;
        let yearn  = now.getUTCFullYear()+1;
        let date = [];
        for(let i=1970;i<yearn;i++){
            let month = [];
            if(i===(yearn-1)){
                for(let j = 1;j<monthn;j++){
                    month.push(j+'月');
                }
            }else{
                for(let j = 1;j<13;j++){
                    month.push(j+'月');
                }
            }

            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }

    _showDatePicker() {
        let _this = this;
        Picker.init({
            pickerData: this._createDateData(),
            pickerConfirmBtnText:'确定',
            pickerCancelBtnText:'取消',
            pickerTitleText:'',
            selectedValue: [this.state.year, this.state.month],
            pickerConfirmBtnColor:[51,51,51,1],
            pickerCancelBtnColor:[51,51,51,1],
            pickerToolBarFontSize:14,
            onPickerConfirm: (pickedValue, pickedIndex) => {
                _this.state.dateStr = pickedValue[0] + pickedValue[1];
                let month = pickedValue[1].replace('月','');
                if (month.length === 1) {
                    month = '0'+month;
                }
                _this.state.dateTime = pickedValue[0].replace('年','')+'-'+month;
                console.log('date',  _this.state.dateStr, _this.state.dateTime);
                _this.loadLineData(true);
            },
            onPickerCancel: (pickedValue, pickedIndex) => {

            },
            onPickerSelect: (pickedValue, pickedIndex) => {

            }
        });
        Picker.show();
    }

    //
    loadData(refreshing) {
        if (refreshing) {
            this.setState({
                isLoading: true
            });
            this.loadLineData(refreshing);
        } else {
            if (this.state.isLoadData) {
                this.setState({
                    isLoadData: false
                });
                this.loadLineData(refreshing);
            }
        }
    }

    _renderItem(data) {
        let createTime = moment(data.item.createTime).format("YYYY-MM-DD HH:mm:ss");
        let typeStr = data.item.type === '1' ? '普通收款' : '普通收款';
        return <TouchableOpacity onPress={()=>navigation.navigate('AccountDetails',{tnxId: data.item.tnxId})}>
                    <View style={styles.countList}>
                        <View style={styles.countImages}><Image style={styles.childImage} source={require('../../../res/images/count/count_12.png')} /></View>
                        <View style={styles.countText}>
                            <View>
                                <Text style={{fontSize:scaleSize(24),color:'#333'}}>{typeStr}预计推荐收益</Text>
                                <Text style={{fontSize:scaleSize(22),color:'#555'}}>[{typeStr}]</Text>
                                <Text style={{fontSize:scaleSize(20),color:'#888'}}>{createTime}</Text>
                            </View>
                            <Text style={{fontSize:scaleSize(24),color:'#f53b3b'}}>+{data.item.amount}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
    }

    genIndicator() {
        if (this.state.isLoadData) {
            return <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                    size={'large'}
                    color={'red'}
                    animating={true}
                />
                <Text>正在加载更多</Text>
            </View>
        } else {
            return null;
        }

    }

    createEmptyView() {
        if (!this.state._initValue && this.state.dataArray.length === 0) {
            return (
                <Text style={{fontSize: 30, alignSelf: 'center'}}>还没有数据哦！</Text>
            );
        } else {
            return null;
        }
    }

    //筛选
    _showFilter(){
        this.state.show?this.setState({
                show:false,
            }):this.setState({
            show:true,
        })

    }

    typeChoose(value){
        this.setState({
            fliterType:value,
        })
    }

    render() {
        const {show,fliterType}=this.state;
        return (

            <View style={styles.container}>
                <NavigationBar
                    title='账目明细'
                    style={{backgroundColor:'#ee2424'}}
                />
                {/*筛选详情*/}
                <View style={[show?'':styles.hide]}>
                    <View style={[styles.modalBox,]}>
                        <View style={styles.modalArea}>
                            {/**/}
                            {/*<View style={styles.mAtop}>*/}
                                {/*<Text style={{fontSize:scaleSize(28),color:'#333'}}>金额</Text>*/}
                            {/*</View>*/}
                            {/*/!**!/*/}
                            {/*<View style={styles.mARange}>*/}
                                {/*<TextInput*/}
                                    {/*style={[styles.mAInput,{paddingLeft:scaleSize(30)}]}*/}
                                    {/*underlineColorAndroid='transparent'*/}
                                    {/*placeholder="¥ 最低金额"*/}
                                    {/*placeholderTextColor='#888'*/}
                                {/*/>*/}
                                {/*<View style={styles.line}></View>*/}
                                {/*<TextInput*/}
                                    {/*style={styles.mAInput}*/}
                                    {/*underlineColorAndroid='transparent'*/}
                                    {/*placeholder="¥ 最高金额"*/}
                                    {/*placeholderTextColor='#888'*/}
                                {/*/>*/}
                            {/*</View>*/}
                            {/**/}
                            <View style={styles.mAtop}>
                                <Text style={{fontSize:scaleSize(28),color:'#333'}}>快捷筛选</Text>
                            </View>
                            {/**/}
                            <View style={styles.mAList}>
                                {/**/}
                                <TouchableOpacity
                                    onPress={() => this.typeChoose('all')}
                                    activeOpacity={1}
                                >
                                    <View style={[styles.mABlock,fliterType==='all'?styles.bgAcitve:'']}>
                                        <Text style={[styles.mAText,fliterType==='all'?styles.textAcitve:'']}>全部</Text>
                                    </View>
                                </TouchableOpacity>

                                {/**/}
                                <TouchableOpacity
                                    onPress={() => this.typeChoose('receipt')}
                                    activeOpacity={1}
                                >
                                    <View style={[styles.mABlock,fliterType==='receipt'?styles.bgAcitve:'']}>
                                        <Text style={[styles.mAText,fliterType==='receipt'?styles.textAcitve:'']}>普通收款</Text>
                                    </View>
                                </TouchableOpacity>

                                {/**/}
                                <TouchableOpacity
                                    onPress={() => this.typeChoose('installment')}
                                    activeOpacity={1}
                                >
                                    <View style={[styles.mABlock,fliterType==='installment'?styles.bgAcitve:'']}>
                                        <Text style={[styles.mAText,fliterType==='installment'?styles.textAcitve:'']}>收款</Text>
                                    </View>
                                </TouchableOpacity>

                                {/**/}
                                <TouchableOpacity
                                    onPress={() => this.typeChoose('bonus')}
                                    activeOpacity={1}
                                >
                                    <View style={[styles.mABlock,fliterType==='bonus'?styles.bgAcitve:'']}>
                                        <Text style={[styles.mAText,fliterType==='bonus'?styles.textAcitve:'']}>红包</Text>
                                    </View>
                                </TouchableOpacity>

                                {/**/}
                                {/*<TouchableOpacity*/}
                                    {/*onPress={() => this.typeChoose('earn')}*/}
                                    {/*activeOpacity={1}*/}
                                {/*>*/}
                                    {/*<View style={[styles.mABlock,fliterType==='earn'?styles.bgAcitve:'']}>*/}
                                        {/*<Text style={[styles.mAText,fliterType==='earn'?styles.textAcitve:'']}>收益</Text>*/}
                                    {/*</View>*/}
                                {/*</TouchableOpacity>*/}

                                {/**/}
                                {/*<TouchableOpacity*/}
                                    {/*onPress={() => this.typeChoose('withdraw')}*/}
                                    {/*activeOpacity={1}*/}
                                {/*>*/}
                                    {/*<View style={[styles.mABlock,fliterType==='withdraw'?styles.bgAcitve:'']}>*/}
                                        {/*<Text style={[styles.mAText,fliterType==='withdraw'?styles.textAcitve:'']}>提现</Text>*/}
                                    {/*</View>*/}
                                {/*</TouchableOpacity>*/}

                                {/**/}
                                {/*<TouchableOpacity*/}
                                    {/*onPress={() => this.typeChoose('disburse')}*/}
                                    {/*activeOpacity={1}*/}
                                {/*>*/}
                                    {/*<View style={[styles.mABlock,fliterType==='disburse'?styles.bgAcitve:'']}>*/}
                                        {/*<Text style={[styles.mAText,fliterType==='disburse'?styles.textAcitve:'']}>支出</Text>*/}
                                    {/*</View>*/}
                                {/*</TouchableOpacity>*/}

                                {/**/}
                                {/*<TouchableOpacity*/}
                                    {/*onPress={() => this.typeChoose('sell')}*/}
                                    {/*activeOpacity={1}*/}
                                {/*>*/}
                                    {/*<View style={[styles.mABlock,fliterType==='sell'?styles.bgAcitve:'']}>*/}
                                        {/*<Text style={[styles.mAText,fliterType==='sell'?styles.textAcitve:'']}>销售</Text>*/}
                                    {/*</View>*/}
                                {/*</TouchableOpacity>*/}

                                {/**/}
                                {/*<TouchableOpacity*/}
                                    {/*onPress={() => this.typeChoose('award')}*/}
                                    {/*activeOpacity={1}*/}
                                {/*>*/}
                                    {/*<View style={[styles.mABlock,fliterType==='award'?styles.bgAcitve:'']}>*/}
                                        {/*<Text style={[styles.mAText,fliterType==='award'?styles.textAcitve:'']}>推广奖励</Text>*/}
                                    {/*</View>*/}
                                {/*</TouchableOpacity>*/}

                                {/**/}
                                {/*<TouchableOpacity*/}
                                    {/*onPress={() => this.typeChoose('fee')}*/}
                                    {/*activeOpacity={1}*/}
                                {/*>*/}
                                    {/*<View style={[styles.mABlock,fliterType==='fee'?styles.bgAcitve:'']}>*/}
                                        {/*<Text style={[styles.mAText,fliterType==='fee'?styles.textAcitve:'']}>手续费返还</Text>*/}
                                    {/*</View>*/}
                                {/*</TouchableOpacity>*/}

                            </View>
                            {/*btnArea*/}
                            <View style={[styles.btnArea]}>
                                <View style={[styles.btnItem,styles.btnRest]}>
                                    <Text style={{color:'#ee2424',fontSize:scaleSize(28)}}>重置</Text>
                                </View>
                                {/**/}
                                <View style={[styles.btnItem,styles.btnSure]}>
                                    <Text style={{color:'#fff',fontSize:scaleSize(28)}}>确定</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/**/}
                <TouchableOpacity
                    onPress={this._showFilter.bind(this)}
                    activeOpacity={1}
                >
                    <View style={styles.filterHead}>
                        <View style={styles.filterState}>
                            <Text style={[styles.filterText,show?styles.active:'']}>全部</Text>
                            <Image style={{width:scaleSize(18),height:scaleSize(11),marginLeft:scaleSize(10)}} source={show?arrowUp:arrowDown}/>
                        </View>
                    </View>
                </TouchableOpacity>


                {/**/}
                <View style={styles.countHead}>
                    <View>
                        <Text style={{fontSize:scaleSize(26),color:'#333'}}>{this.state.dateStr}</Text>
                        <Text style={{fontSize:scaleSize(20),color:'#888'}}>收入 ¥9852.34</Text>
                    </View>
                    {/**/}
                    <TouchableOpacity onPress={this._showDatePicker.bind(this)} activeOpacity={1}>
                        <View>
                            <Image style={{width:scaleSize(38),height:scaleSize(35)}} source={require('../../../res/images/count/count_03.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.dataArray}
                    renderItem={(data) => this._renderItem(data)}
                    // refreshing={this.state.isLoading}
                    // onRefresh={() => {
                    //     this.loadData();
                    // }}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            colors={['red']}
                            tintColor={'orange'}
                            titleColor={'red'}
                            refreshing={this.state.isLoading}
                            onRefresh={() => {
                                this.loadData(true);
                            }}
                        />
                    }
                    ListFooterComponent={() => this.genIndicator()}
                    ListEmptyComponent={this.createEmptyView()}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => {
                        this.loadData()
                    }}
                />


                {/*<TouchableOpacity onPress={()=>navigation.navigate('AccountDetails')}>*/}
                    {/*<View style={styles.countList}>*/}
                        {/*<View style={styles.countImages}><Image style={styles.childImage} source={require('../../../res/images/count/count_10.png')} /></View>*/}
                        {/*<View style={styles.countText}>*/}
                            {/*<View>*/}
                            {/*<Text style={{fontSize:scaleSize(24),color:'#333'}}>普通收款直接收益</Text>*/}
                            {/*<Text style={{fontSize:scaleSize(22),color:'#555'}}>[普通收款]</Text>*/}
                            {/*<Text style={{fontSize:scaleSize(20),color:'#888'}}>今天  17:15</Text>*/}
                            {/*</View>*/}
                            {/*<Text style={{fontSize:scaleSize(32),color:'#f53b3b'}}>+1.92</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={()=>navigation.navigate('AccountDetails')}>*/}
                    {/*<View style={styles.countList}>*/}
                        {/*<View style={styles.countImages}><Image style={styles.childImage} source={require('../../../res/images/count/count_12.png')} /></View>*/}
                        {/*<View style={styles.countText}>*/}
                            {/*<View>*/}
                                {/*<Text style={{fontSize:scaleSize(24),color:'#333'}}>普通收款间接收益</Text>*/}
                                {/*<Text style={{fontSize:scaleSize(22),color:'#555'}}>[普通收款]</Text>*/}
                                {/*<Text style={{fontSize:scaleSize(20),color:'#888'}}>今天  17:15</Text>*/}
                            {/*</View>*/}
                            {/*<Text style={{fontSize:scaleSize(32),color:'#f53b3b'}}>+1.92</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={()=>navigation.navigate('AccountDetails')}>*/}
                    {/*<View style={styles.countList}>*/}
                        {/*<View style={styles.countImages}><Image style={styles.childImage} source={require('../../../res/images/count/count_07.png')} /></View>*/}
                        {/*<View style={styles.countText}>*/}
                            {/*<View>*/}
                                {/*<Text style={{fontSize:scaleSize(24),color:'#333'}}>普通收款</Text>*/}
                                {/*<Text style={{fontSize:scaleSize(22),color:'#555'}}>[普通收款]</Text>*/}
                                {/*<Text style={{fontSize:scaleSize(20),color:'#888'}}>今天  17:15</Text>*/}
                            {/*</View>*/}
                            {/*<Text style={{fontSize:scaleSize(32),color:'#f53b3b'}}>+1.92</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={()=>navigation.navigate('AccountDetails')}>*/}
                    {/*<View style={styles.countList}>*/}
                        {/*<View style={styles.countImages}><Image style={styles.childImage} source={require('../../../res/images/count/reward.png')} /></View>*/}
                        {/*<View style={styles.countText}>*/}
                            {/*<View>*/}
                                {/*<Text style={{fontSize:scaleSize(24),color:'#333'}}>红包收益</Text>*/}
                                {/*<Text style={{fontSize:scaleSize(22),color:'#555'}}>[普通收款]</Text>*/}
                                {/*<Text style={{fontSize:scaleSize(20),color:'#888'}}>今天  17:15</Text>*/}
                            {/*</View>*/}
                            {/*<Text style={{fontSize:scaleSize(32),color:'#f53b3b'}}>+1.92</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</TouchableOpacity>*/}


                {/*暂无数据*/}
                {/*<Text style={{color:'#888',fontSize:scaleSize(26),marginVertical:scaleSize(40),textAlign:'center'}}>暂无数据~~</Text>*/}

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f5f5f5',
    },
    countHead:{
        backgroundColor:'#f5f5f5',
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#eee',
        paddingVertical:scaleSize(20),
        paddingHorizontal:scaleSize(30),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    countRecord:{
        backgroundColor:'#fff',
        // borderBottomWidth:scaleSize(1),
        // borderBottomColor:'#eee',
    },
    countList:{
        paddingLeft:scaleSize(30),
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    countImages:{
        width:scaleSize(66),
        height:scaleSize(66),
        backgroundColor:'#f53b3b',
        borderRadius:scaleSize(66),
        marginRight:scaleSize(30),
        overflow:'hidden',
    },
    childImage:{
        width:scaleSize(66),
        height:scaleSize(66),
        resizeMode:'contain'
    },
    countText:{
        width:scaleSize(600),
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#eee',
        paddingVertical:scaleSize(20),
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        paddingRight:scaleSize(30),
    },
    //
    text: {
        color: 'white',
        fontSize: 20,
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        margin: 10
    },
    //筛选
    filterHead:{
        backgroundColor:'#fafafa',
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#eee',
        paddingHorizontal:scaleSize(30),
        height:scaleSize(67),
        justifyContent:'center',
        alignItems:'flex-start',
    },
    filterState:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    filterText:{
        color:'#888',
        fontSize:scaleSize(26),
    },
    modalBox:{
        position: 'absolute',
        top: scaleSize(67),
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex:1000,
    },
    modalArea:{
        width: width,
        // height: scaleSize(800),
        backgroundColor:'#fff',
        paddingTop:scaleSize(30),
    },
    hide:{
        display:'none'
    },
    mAtop:{
        marginBottom:scaleSize(40),
        paddingHorizontal:scaleSize(30),
    },
    mAList:{
        paddingLeft:scaleSize(70),
        flexDirection:'row',
        flexWrap:'wrap',
    },
    mABlock:{
        width:scaleSize(160),
        height:scaleSize(60),
        backgroundColor:'#eeeeee',
        borderRadius:scaleSize(4),
        alignItems:'center',
        justifyContent:'center',
        marginRight:scaleSize(70),
        marginBottom:scaleSize(30),
    },
    mAText:{
        fontSize:scaleSize(22),
        color:'#333',
    },
    mAInput:{
        paddingHorizontal:scaleSize(18),
        paddingVertical:0,
        borderWidth: scaleSize(1),
        borderColor: '#eee',
        borderStyle: 'solid',
        width:scaleSize(260),
        height:scaleSize(60),
        color:'#333',
        fontSize:scaleSize(22),
    },
    mARange:{
        marginBottom:scaleSize(40),
        flexDirection:'row',
        flexWrap:'wrap',
        paddingLeft:scaleSize(70),
    },
    line:{
        width:scaleSize(50),
        height:1,
        backgroundColor:'#eee',
        marginTop:scaleSize(30),
        marginHorizontal:scaleSize(20),
    },
    btnArea:{
        flexDirection:'row',
        marginTop:scaleSize(70),
    },
    btnItem:{
        flex:1,
        height:scaleSize(88),
        alignItems:'center',
        justifyContent:'center',
    },
    btnRest:{
        backgroundColor:'#ffacac',
    },
    btnSure:{
        backgroundColor:'#ee2424',
    },
    active:{
        color:'#ee2424',
    },
    bgAcitve:{
        backgroundColor:'#ee2424',
    },
    textAcitve:{
        color:'#fff',
    },
})