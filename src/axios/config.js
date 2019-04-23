/**
 * Created by 叶子 on 2017/7/30.
 * 接口地址配置文件
 */

//easy-mock模拟数据接口地址
const EASY_MOCK = 'https://www.easy-mock.com/mock';
const MOCK_AUTH = EASY_MOCK + '/597b5ed9a1d30433d8411456/auth'; // 权限接口地址
export const MOCK_AUTH_ADMIN = MOCK_AUTH + '/admin'; // 管理员权限接口
export const MOCK_AUTH_VISITOR = MOCK_AUTH + '/visitor' // 访问权限接口

// github授权
export const GIT_OAUTH = 'https://github.com/login/oauth';
// github用户
export const GIT_USER = 'https://api.github.com/user';

// bbc top news
export const NEWS_BBC = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=429904aa01f54a39a278a406acf50070';



// 接口请求地址
const SERVER_URL = 'http://backend.delcache.com';

export const LOGIN = SERVER_URL + '/user/login'; //用户登录接口
export const USER_ADD = SERVER_URL + '/user/add'; //新增用户接口

//用户管理
export const USER_UPDATE = SERVER_URL + '/user/update';//更新用户信息
export const USER_ALL = SERVER_URL + '/user/all';//查询全部用户信息
export const USER_SEARCH = SERVER_URL + '/user/search';//查询数据
export const USER_ONE = SERVER_URL + '/user/one';//查看用户信息
export const USER_DISABLE = SERVER_URL + '/user/disable';//停用用户账号

//考勤管理
export const ATTENDANCE_ADD = SERVER_URL + '/attendance/add';//添加考勤信息
export const ATTENDANCE_ALL = SERVER_URL + '/attendance/all';//查询全部
export const ATTENDANCE_SEARCH = SERVER_URL + '/attendance/search';//搜索
export const ATTENDANCE_ONE = SERVER_URL + '/attendance/one';//查询单个考勤信息
export const ATTENDANCE_UPDATE = SERVER_URL + '/attendance/update';//更新考勤信息



