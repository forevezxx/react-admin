/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { get, post } from './tools';
import * as config from './config';

export const getBbcNews = () => get({ url: config.NEWS_BBC });

export const npmDependencies = () => axios.get('./npm.json').then(res => res.data).catch(err => console.log(err));

export const weibo = () => axios.get('./weibo.json').then(res => res.data).catch(err => console.log(err));

export const gitOauthLogin = () => get({ url: `${config.GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin` });
export const gitOauthToken = code => post({ 
    url: `https://cors-anywhere.herokuapp.com/${config.GIT_OAUTH}/access_token`,
    data: {
        client_id: '792cdcd244e98dcd2dee',
        client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059',
        redirect_uri: 'http://localhost:3006/',
        state: 'reactAdmin',
        code,
    } 
});
// {headers: {Accept: 'application/json'}}
export const gitOauthInfo = access_token => get({ url: `${config.GIT_USER}access_token=${access_token}` });

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({ url: config.MOCK_AUTH_ADMIN });
// 访问权限获取
export const guest = () => get({ url: config.MOCK_AUTH_VISITOR });




export const supplierAdd = (data) => post({
    url: config.SUPPLIER_ADD,
    data
})
export const supplierAll = (data) => post({
    url: config.SUPPLIER_ALL,
    data
})
export const supplierSearch = (data) => post({
    url: config.SUPPLIER_SEARCH,
    data
})
export const supplierOne = (data) => post({
    url: config.SUPPLIER_ONE,
    data
})
export const supplierUpdate = (data) => post({
    url: config.SUPPLIER_UPDATE,
    data
})
export const supplierExport = (data) => post({
    url: config.SUPPLIER_EXPORT,
    data
})


export const supplierPayRecordAdd = (data) => post({
    url: config.SUPPLIER_PAY_RECORD_ADD,
    data
})
export const supplierPayRecordAll = (data) => post({
    url: config.SUPPLIER_PAY_RECORD_ALL,
    data
})
export const supplierPayRecordSearch = (data) => post({
    url: config.SUPPLIER_PAY_RECORD_SEARCH,
    data
})
export const supplierPayRecordOne = (data) => post({
    url: config.SUPPLIER_PAY_RECORD_ONE,
    data
})
export const supplierPayRecordUpdate = (data) => post({
    url: config.SUPPLIER_PAY_RECORD_UPDATE,
    data
})
export const supplierPayRecordExport = (data) => post({
    url: config.SUPPLIER_PAY_RECORD_EXPORT,
    data
})

export const resourceAdd = (data) => post({
    url: config.RESOURCE_ADD,
    data
})
export const resourceAll = (data) => post({
    url: config.RESOURCE_ALL,
    data
})
export const resourceSearch = (data) => post({
    url: config.RESOURCE_SEARCH,
    data
})
export const resourceOne = (data) => post({
    url: config.RESOURCE_ONE,
    data
})
export const resourceUpdate = (data) => post({
    url: config.RESOURCE_UPDATE,
    data
})

export const clientAdd = (data) => post({
    url: config.CLIENT_ADD,
    data
})
export const clientAll = (data) => post({
    url: config.CLIENT_ALL,
    data
})
export const clientSearch = (data) => post({
    url: config.CLIENT_SEARCH,
    data
})
export const clientOne = (data) => post({
    url: config.CLIENT_ONE,
    data
})
export const clientUpdate = (data) => post({
    url: config.CLIENT_UPDATE,
    data
})
export const clientExport = (data) => post({
    url: config.CLIENT_EXPORT,
    data
})

export const clientPayRecordAdd = (data) => post({
    url: config.CLIENT_PAY_RECORD_ADD,
    data
})
export const clientPayRecordAll = (data) => post({
    url: config.CLIENT_PAY_RECORD_ALL,
    data
})
export const clientPayRecordSearch = (data) => post({
    url: config.CLIENT_PAY_RECORD_SEARCH,
    data
})
export const clientPayRecordOne = (data) => post({
    url: config.CLIENT_PAY_RECORD_ONE,
    data
})
export const clientPayRecordUpdate = (data) => post({
    url: config.CLIENT_PAY_RECORD_UPDATE,
    data
})
export const clientPayRecordExport = (data) => post({
    url: config.CLIENT_PAY_RECORD_EXPORT,
    data
})

export const imprestAdd = (data) => post({
    url: config.IMPREST_ADD,
    data
})
export const imprestAll = (data) => post({
    url: config.IMPREST_ALL,
    data
})
export const imprestSearch = (data) => post({
    url: config.IMPREST_SEARCH,
    data
})
export const imprestOne = (data) => post({
    url: config.IMPREST_ONE,
    data
})
export const imprestUpdate = (data) => post({
    url: config.IMPREST_UPDATE,
    data
})
export const imprestExport = (data) => post({
    url: config.IMPREST_EXPORT,
    data
})

export const baoxiaoAdd = (data) => post({
    url: config.BAOXIAO_ADD,
    data
})
export const baoxiaoAll = (data) => post({
    url: config.BAOXIAO_ALL,
    data
})
export const baoxiaoSearch = (data) => post({
    url: config.BAOXIAO_SEARCH,
    data
})
export const baoxiaoOne = (data) => post({
    url: config.BAOXIAO_ONE,
    data
})
export const baoxiaoUpdate = (data) => post({
    url: config.BAOXIAO_UPDATE,
    data
})
export const baoxiaoExport = (data) => post({
    url: config.BAOXIAO_EXPORT,
    data
})




export const publicMoneyAdd = (data) => post({
    url: config.PUBLIC_MONEY_ADD,
    data
})
export const publicMoneyAll = (data) => post({
    url: config.PUBLIC_MONEY_ALL,
    data
})
export const publicMoneySearch = (data) => post({
    url: config.PUBLIC_MONEY_SEARCH,
    data
})
export const publicMoneyOne = (data) => post({
    url: config.PUBLIC_MONEY_ONE,
    data
})
export const publicMoneyUpdate = (data) => post({
    url: config.PUBLIC_MONEY_UPDATE,
    data
})
export const publicMoneyExport = (data) => post({
    url: config.PUBLIC_MONEY_EXPORT,
    data
})


export const saleDataAdd = (data) => post({
    url: config.SALE_DATA_ADD,
    data
})
export const saleDataAll = (data) => post({
    url: config.SALE_DATA_ALL,
    data
})
export const saleDataSearch = (data) => post({
    url: config.SALE_DATA_SEARCH,
    data
})
export const saleDataOne = (data) => post({
    url: config.SALE_DATA_ONE,
    data
})
export const saleDataUpdate = (data) => post({
    url: config.SALE_DATA_UPDATE,
    data
})
export const saleDataExport = (data) => post({
    url: config.SALE_DATA_EXPORT,
    data
})


export const customDataAdd = (data) => post({
    url: config.CUSTOMER_DATA_ADD,
    data
})
export const customDataAll = (data) => post({
    url: config.CUSTOMER_DATA_ALL,
    data
})
export const customDataSearch = (data) => post({
    url: config.CUSTOMER_DATA_SEARCH,
    data
})
export const customDataOne = (data) => post({
    url: config.CUSTOMER_DATA_ONE,
    data
})
export const customDataUpdate = (data) => post({
    url: config.CUSTOMER_DATA_UPDATE,
    data
})
export const customDataExport = (data) => post({
    url: config.CUSTOMER_DATA_EXPORT,
    data
})

export const purchanseAdd = (data) => post({
    url: config.PURCHANSE_ADD,
    data
})
export const purchanseAll = (data) => post({
    url: config.PURCHANSE_ALL,
    data
})
export const purchanseSearch = (data) => post({
    url: config.PURCHANSE_SEARCH,
    data
})
export const purchanseOne = (data) => post({
    url: config.PURCHANSE_ONE,
    data
})
export const purchanseUpdate = (data) => post({
    url: config.PURCHANSE_UPDATE,
    data
})
export const purchanseExport = (data) => post({
    url: config.PURCHANSE_EXPORT,
    data
})



export const attendanceAdd = (data) => post({
    url: config.ATTENDANCE_ADD,
    data
})
export const attendanceAll = (data) => post({
    url: config.ATTENDANCE_ALL,
    data
})
export const attendanceSearch = (data) => post({
    url: config.ATTENDANCE_SEARCH,
    data
})
export const attendanceOne = (data) => post({
    url: config.ATTENDANCE_ONE,
    data
})
export const attendanceUpdate = (data) => post({
    url: config.ATTENDANCE_UPDATE,
    data
})
export const attendanceExport = (data) => post({
    url: config.ATTENDANCE_EXPORT,
    data
})
export const attendanceGetUsernameExport = (data) => post({
    url: config.ATTENDANCE_GET_USERNAME,
    data
})



export const banciAdd = (data) => post({
    url: config.BANCI_ADD,
    data
})
export const banciAll = (data) => post({
    url: config.BANCI_ALL,
    data
})
export const banciSearch = (data) => post({
    url: config.BANCI_SEARCH,
    data
})
export const banciOne = (data) => post({
    url: config.BANCI_ONE,
    data
})
export const banciUpdate = (data) => post({
    url: config.BANCI_UPDATE,
    data
})
export const banciExport = (data) => post({
    url: config.BANCI_EXPORT,
    data
})


export const banciOrderAdd = (data) => post({
    url: config.BANCI_ORDER_ADD,
    data
})
export const banciOrderAll = (data) => post({
    url: config.BANCI_ORDER_ALL,
    data
})
export const banciOrderSearch = (data) => post({
    url: config.BANCI_ORDER_SEARCH,
    data
})
export const banciOrderOne = (data) => post({
    url: config.BANCI_ORDER_ONE,
    data
})
export const banciOrderUpdate = (data) => post({
    url: config.BANCI_ORDER_UPDATE,
    data
})
export const banciOrderExport = (data) => post({
    url: config.BANCI_ORDER_EXPORT,
    data
})



export const userAdd = (data) => post({
    url: config.USER_ADD,
    data
})

export const userUpdate = (data) => post({
    url: config.USER_UPDATE,
    data
})
export const userAll = (data) => post({
    url: config.USER_ALL,
    data
})
export const userSearch = (data) => post({
    url: config.USER_SEARCH,
    data
})

export const userOne = (data) => post({
    url: config.USER_ONE,
    data
})

export const userDisable = (data) => post({
    url: config.USER_DISABLE,
    data
})

export const userEnable = (data) => post({
    url: config.USER_ENABLE,
    data
})

export const userExport = (data) => post({
    url: config.USER_EXPORT,
    data
})

// 用户登录
export const login = (username, password) => post({ 
    url: config.LOGIN,
    data: {
        username,
        password
    }
})





