export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
        { 
            key: '/app/shouldPay', title: '应付管理',  
            subs: [
                { key: '/app/shouldPay/document', title: '供应商档案', component: 'Dashboard' },
                { key: '/app/shouldPay/pay', title: '应付录入', component: 'Buttons' },
            ]
        },
        {
            key: '/app/shouldCollect', title: '应收管理', 
            subs: [
                { key: '/app/shouldCollect/buttons', title: '客户档案', component: 'Dashboard' },
                { key: '/app/shouldCollect/buttons', title: '应收录入', component: 'Dashboard' },
            ]
        },
        {
            key: '/app/pay', title: '出纳管理', 
            subs: [
                { key: '/app/pay/buttons', title: '备用金管理', component: 'Dashboard' },
                { key: '/app/pay/buttons', title: '报销管理', component: 'Dashboard' },
                { key: '/app/pay/buttons', title: '公费管理', component: 'Dashboard' },
            ]
        },
        {
            key: '/app/data', title: '数据管理', 
            subs: [
                { key: '/app/data/buttons', title: '销售数据', component: 'Dashboard' },
                { key: '/app/data/buttons', title: '客户数据', component: 'Dashboard' },
                { key: '/app/data/buttons', title: '采购数据', component: 'Dashboard' },
            ]
        },
        {
            key: '/app/checkIn', title: '考勤管理', 
            subs: [
                { key: '/app/checkIn/buttons', title: '考勤记录', component: 'Dashboard' },
                { key: '/app/checkIn/buttons', title: '班次管理', component: 'Dashboard' },
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