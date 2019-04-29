export default {
    menus: [ // 菜单相关路由
        // { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
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
    others: [ // 非菜单相关路由
        { key: '/app/shouldPay/newshouldpay', title: '新增供应商档案', component: 'NewShouldPay' },
        { key: '/app/shouldPay/watchDocument/:id', title: '查看供应商档案', component: 'WatchDocument' },
        { key: '/app/shouldPay/editDocument/:id', title: '编辑供应商档案', component: 'EditDocument' },
        { key: '/app/shouldPay/newPay', title: '新增应付录入', component: 'NewPay' },
        { key: '/app/shouldPay/watchPay/:id', title: '查看应付录入', component: 'WatchPay' },
        { key: '/app/shouldPay/editPay/:id', title: '编辑应付录入', component: 'EditPay' },

        { key: '/app/shouldCollect/newUserFiles', title: '新增客户档案', component: 'NewUserFiles' },
        { key: '/app/shouldCollect/editUserFiles', title: '编辑客户档案', component: 'EditUserFiles' },
        { key: '/app/shouldCollect/newin', title: '新增应收录入', component: 'NewIn' },

        { key: '/app/pay/newinpay', title: '新增备用金入账记录', component: 'NewInPay' },
        { key: '/app/pay/newoutpay', title: '新增备用金出账记录', component: 'NewOutPay' },
        { key: '/app/pay/newbaoxiao', title: '新增报销记录', component: 'NewBaoxiao' },
        { key: '/app/pay/newgongfei', title: '新增公费记录', component: 'NewGongfei' },

        { key: '/app/checkIn/newkaoqingjilu', title: '新增考勤记录', component: 'NewKaoqingjilu' },

        { key: '/app/account/newUserManagement', title: '新增用户', component: 'NewUserManagement' },
        { key: '/app/account/watchUserManagement/:id', title: '查看用户信息', component: 'WatchUserManagement' },
        { key: '/app/account/editUserManagement/:id', title: '编辑用户信息', component: 'EditUserManagement' },
    ]
}