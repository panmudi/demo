import {NavigationActions} from 'react-navigation'

export default class NavigatorUtil {
    /**
     * 返回上一页
     * @param navigation
     */
    static goBack(navigation) {
        navigation.goBack();
    }


    /**
     * 跳转登录页
     */
    static resetToLogin(params) {
        const {navigation} = params;
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Login',
                })
            ]
        });
        navigation.dispatch(resetAction);
    }

    /**
     * 跳转首页
     */
    static resetToHomePage(params) {
        const {navigation} = params;
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'HomePage',
                })
            ]
        });
        navigation.dispatch(resetAction);
    }
}