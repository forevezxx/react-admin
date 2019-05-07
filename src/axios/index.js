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

// 用户登录
export const login = (username, password) => post({ 
    url: config.LOGIN,
    data: {
        username,
        password
    }
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

