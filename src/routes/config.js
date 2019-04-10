export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
        { 
            key: '/app/shouldPay', title: '应付管理',  
            subs: [
                { key: '/app/shouldPay/document', title: '供应商档案', component: 'Document' },
                { key: '/app/shouldPay/pay', title: '应付录入', component: 'Pay' },
            ]
        },
        {
            key: '/app/shouldCollect', title: '应收管理', 
            subs: [
                { key: '/app/shouldCollect/userFiles', title: '客户档案', component: 'UserFiles' },
                { key: '/app/shouldCollect/in', title: '应收录入', component: 'In' },
            ]
        },
        {
            key: '/app/pay', title: '出纳管理', 
            subs: [
                { key: '/app/pay/beiyongjin', title: '备用金管理', component: 'Beiyongjin' },
                { key: '/app/pay/baoxiao', title: '报销管理', component: 'Baoxiao' },
                { key: '/app/pay/gongfei', title: '公费管理', component: 'Gongfei' },
            ]
        },
        {
            key: '/app/data', title: '数据管理', 
            subs: [
                { key: '/app/data/xiaoshoushuju', title: '销售数据', component: 'Xiaoshoushuju' },
                { key: '/app/data/kehushuju', title: '客户数据', component: 'Kehushuju' },
                { key: '/app/data/caigoushuju', title: '采购数据', component: 'Caigoushuju' },
            ]
        },
        {
            key: '/app/checkIn', title: '考勤管理', 
            subs: [
                { key: '/app/checkIn/kaoqingjilu', title: '考勤记录', component: 'Kaoqingjilu' },
                { key: '/app/checkIn/banchiguanli', title: '班次管理', component: 'Banchiguanli' },
            ]
        },
        {
            key: '/app/account', title: '账户管理', 
            subs: [
                { key: '/app/account/userManagement', title: '用户管理', icon: 'user', component: 'UserManagement' },
            ]
        },
    ],
    others: [] // 非菜单相关路由
}