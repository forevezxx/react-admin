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


//应付管理
//应付管理-供应商档案
export const SUPPLIER_ADD = SERVER_URL + '/supplier/add';
export const SUPPLIER_ALL = SERVER_URL + '/supplier/all';
export const SUPPLIER_SEARCH = SERVER_URL + '/supplier/search';
export const SUPPLIER_ONE = SERVER_URL + '/supplier/one';
export const SUPPLIER_UPDATE = SERVER_URL + '/supplier/update';

//应付管理-应付录入

export const LOGIN = SERVER_URL + '/user/login'; //用户登录接口
export const USER_ADD = SERVER_URL + '/user/add'; //新增用户接口

//用户管理
export const USER_UPDATE = SERVER_URL + '/user/update';//更新用户信息
export const USER_ALL = SERVER_URL + '/user/all';//查询全部用户信息
export const USER_SEARCH = SERVER_URL + '/user/search';//查询数据
export const USER_ONE = SERVER_URL + '/user/one';//查看用户信息
export const USER_DISABLE = SERVER_URL + '/user/disable';//停用用户账号

//考勤管理
//考勤管理-考勤记录
export const ATTENDANCE_ADD = SERVER_URL + '/attendance/add';//添加考勤信息
export const ATTENDANCE_ALL = SERVER_URL + '/attendance/all';//查询全部
export const ATTENDANCE_SEARCH = SERVER_URL + '/attendance/search';//搜索
export const ATTENDANCE_ONE = SERVER_URL + '/attendance/one';//查询单个考勤信息
export const ATTENDANCE_UPDATE = SERVER_URL + '/attendance/update';//更新考勤信息
//考勤管理-班次管理
export const BANCI_ADD = SERVER_URL + '/banci/add';//新增班次
export const BANCI_ALL = SERVER_URL + '/banci/all';//查询班次信息
export const BANCI_SEARCH = SERVER_URL + '/banci/search';//班次条件查询
export const BANCI_ONE = SERVER_URL + '/banci/one';//查看具体班次信息
export const BANCI_UPDATE = SERVER_URL + '/banci/update';//更新班次信息
//考勤管理-班次管理-排班表
export const BANCI_ORDER_ADD = SERVER_URL + '/banci-order/add';//新增排班表
export const BANCI_ORDER_ALL = SERVER_URL + '/banci-order/all';//获取排班表列表
export const BANCI_ORDER_SEARCH = SERVER_URL + '/banci-order/search';//根据条件查询排班表信息
export const BANCI_ORDER_ONE = SERVER_URL + '/banci-order/one';//查看具体排班表信息
export const BANCI_ORDER_UPDATE = SERVER_URL + '/banci-order/update';//更新排班表信息
//出纳管理-备用金管理
export const IMPREST_ADD = SERVER_URL + '/imprest/add';//新增入账出账数据
export const IMPREST_ALL = SERVER_URL + '/imprest/all';//查询全部出入帐数据
export const IMPREST_SEARCH = SERVER_URL + '/imprest/search';//查询条件数据
export const IMPREST_ONE = SERVER_URL + '/imprest/one';//查看单条出入帐信息
export const IMPREST_UPDATE = SERVER_URL + '/imprest/update';//更新出入帐信息
//出纳管理-报销管理
export const BAOXIAO_ADD = SERVER_URL + '/baoxiao/add';//新增报销数据
export const BAOXIAO_ALL = SERVER_URL + '/baoxiao/all';//查询全部报销数据
export const BAOXIAO_SEARCH = SERVER_URL + '/baoxiao/search';//查询条件数据
export const BAOXIAO_ONE = SERVER_URL + '/baoxiao/one';//查看单条报销信息
export const BAOXIAO_UPDATE = SERVER_URL + '/baoxiao/update';//更新报销信息
//出纳管理-公费管理 接口缺失

//应收管理-客户档案管理
export const CLIENT_ADD = SERVER_URL + '/client/add';//新增客户档案数据
export const CLIENT_ALL = SERVER_URL + '/client/all';//查询全部数据
export const CLIENT_SEARCH = SERVER_URL + '/client/search';//查询条件数据
export const CLIENT_ONE = SERVER_URL + '/client/one';//查看单条客户档案信息
export const CLIENT_UPDATE = SERVER_URL + '/client/update';//更新客户档案信息

//应收管理-应收录入管理
export const CLIENT_PAY_RECORD_ADD = SERVER_URL + '/client-pay-record/add';//新增应收录入数据
export const CLIENT_PAY_RECORD_ALL = SERVER_URL + '/client-pay-record/all';//查询全部数据
export const CLIENT_PAY_RECORD_SEARCH = SERVER_URL + '/client-pay-record/search';//查询条件数据
export const CLIENT_PAY_RECORD_ONE = SERVER_URL + '/client-pay-record/one';//查看单条应收录入信息
export const CLIENT_PAY_RECORD_UPDATE = SERVER_URL + '/client-pay-record/update';//更新应收录入信息

//数据管理-客户数据
export const CUSTOMER_DATA_ADD = SERVER_URL + '/customer-data/add';//新增客户数据
export const CUSTOMER_DATA_ALL = SERVER_URL + '/customer-data/all';//查询全部数据
export const CUSTOMER_DATA_SEARCH = SERVER_URL + '/customer-data/search';//查询条件数据
export const CUSTOMER_DATA_ONE = SERVER_URL + '/customer-data/one';//查看单条客户信息
export const CUSTOMER_DATA_UPDATE = SERVER_URL + '/customer-data/update';//更新客户信息

//数据管理-销售数据
export const SALE_DATA_ADD = SERVER_URL + '/sale-data/add';//新增销售数据
export const SALE_DATA_ALL = SERVER_URL + '/sale-data/all';//查询全部数据
export const SALE_DATA_SEARCH = SERVER_URL + '/sale-data/search';//查询条件数据
export const SALE_DATA_ONE = SERVER_URL + '/sale-data/one';//查看单条销售信息
export const SALE_DATA_UPDATE = SERVER_URL + '/sale-data/update';//更新销售信息

//资源新增
export const RESOURCE_ADD = SERVER_URL + '/resource/add';//新增资源数据
export const RESOURCE_ALL = SERVER_URL + '/resource/all';//查询全部数据
export const RESOURCE_SEARCH = SERVER_URL + '/resource/search';//查询条件数据
export const RESOURCE_ONE = SERVER_URL + '/resource/one';//查看单条资源信息
export const RESOURCE_UPDATE = SERVER_URL + '/resource/update';//更新资源信息


//供应商应收记录
export const SUPPLIER_PAY_RECORD_ADD = SERVER_URL + '/supplier-pay-record/add';//新增供应商应收数据
export const SUPPLIER_PAY_RECORD_ALL = SERVER_URL + '/supplier-pay-record/all';//查询全部数据
export const SUPPLIER_PAY_RECORD_SEARCH = SERVER_URL + '/supplier-pay-record/search';//查询条件数据
export const SUPPLIER_PAY_RECORD_ONE = SERVER_URL + '/supplier-pay-record/one';//查看单条供应商应收信息
export const SUPPLIER_PAY_RECORD_UPDATE = SERVER_URL + '/supplier-pay-record/update';//更新供应商应收信息
