/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import BasicForm from './forms/BasicForm';
import BasicTable from './tables/BasicTables';
import AdvancedTable from './tables/AdvancedTables';
import AsynchronousTable from './tables/AsynchronousTable';
import Echarts from './charts/Echarts';
import Recharts from './charts/Recharts';
import Icons from './ui/Icons';
import Buttons from './ui/Buttons';
import Spins from './ui/Spins';
import Modals from './ui/Modals';
import Notifications from './ui/Notifications';
import Tabs from './ui/Tabs';
import Banners from './ui/banners';
import Drags from './ui/Draggable';
import Dashboard from './dashboard/Dashboard';
import Gallery from './ui/Gallery';
import BasicAnimations from './animation/BasicAnimations';
import ExampleAnimations from './animation/ExampleAnimations';
import AuthBasic from './auth/Basic';
import RouterEnter from './auth/RouterEnter';
import Cssmodule from './cssmodule';
import MapUi from './ui/map';
import QueryParams from './extension/QueryParams';

import Document from './shouldPay/Document';
import NewShouldPay from './shouldPay/NewShouldPay';
import WatchDocument from './shouldPay/WatchDocument';
import EditDocument from './shouldPay/EditDocument';
import Pay from './shouldPay/Pay';
import NewPay from './shouldPay/NewPay';
import WatchPay from './shouldPay/WatchPay';
import EditPay from './shouldPay/EditPay';

import UserFiles from './shouldCollect/UserFiles';
import In from './shouldCollect/In';
import NewUserFiles from './shouldCollect/NewUserFiles';
import EditUserFiles from './shouldCollect/EditUserFiles';
import WatchUserFiles from './shouldCollect/WatchUserFiles';
import NewIn from './shouldCollect/NewIn';
import EditIn from './shouldCollect/EditIn';
import WatchIn from './shouldCollect/WatchIn';

import Baoxiao from './pay/Baoxiao';
import Beiyongjin from './pay/Beiyongjin';
import Gongfei from './pay/Gongfei';
import NewInPay from './pay/NewInPay';
import NewOutPay from './pay/NewOutPay';
import NewBaoxiao from './pay/NewBaoxiao';
import EditBaoxiao from './pay/EditBaoxiao';
import WatchBaoxiao from './pay/WatchBaoxiao';
import NewGongfei from './pay/NewGongfei';
import EditGongfei from './pay/EditGongfei';
import WatchGongfei from './pay/WatchGongfei';



import Caigoushuju from './data/Caigoushuju';
import NewCaigoushuju from './data/NewCaigoushuju';
import EditCaigoushuju from './data/EditCaigoushuju';
import WatchCaigoushuju from './data/WatchCaigoushuju';

import Kehushuju from './data/Kehushuju';
import NewKehushuju from './data/NewKehushuju';
import EditKehushuju from './data/EditKehushuju';
import WatchKehushuju from './data/WatchKehushuju';

import Xiaoshoushuju from './data/Xiaoshoushuju';
import NewXiaoshoushuju from './data/NewXiaoshoushuju';
import EditXiaoshoushuju from './data/EditXiaoshoushuju';
import WatchXiaoshoushuju from './data/WatchXiaoshoushuju';

import Banchiguanli from './checkIn/Banchiguanli';
import Kaoqingjilu from './checkIn/Kaoqingjilu';
import NewKaoqingjilu from './checkIn/NewKaoqingjilu';

import UserManagement from './account/UserManagement';
import NewUserManagement from './account/NewUserManagement';
import WatchUserManagement from './account/WatchUserManagement';
import EditUserManagement from './account/EditUserManagement';


const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});

export default {
    BasicForm, BasicTable, AdvancedTable, AsynchronousTable,
    Echarts, Recharts, Icons, Buttons, Spins, Modals, Notifications,
    Tabs, Banners, Drags, Dashboard, Gallery, BasicAnimations,
    ExampleAnimations, AuthBasic, RouterEnter, WysiwygBundle,
    Cssmodule, MapUi, QueryParams,
    
    Document, NewShouldPay, WatchDocument, EditDocument, 
    Pay, WatchPay, EditPay, NewPay,
    UserFiles, NewUserFiles, EditUserFiles, WatchUserFiles, 
    In, NewIn, EditIn, WatchIn,
    Beiyongjin, NewInPay, NewOutPay,
    Baoxiao, NewBaoxiao, WatchBaoxiao, EditBaoxiao,
    Gongfei, NewGongfei, EditGongfei, WatchGongfei,
    NewKaoqingjilu,
    
    Caigoushuju, WatchCaigoushuju, EditCaigoushuju, NewCaigoushuju,
    Kehushuju, WatchKehushuju, EditKehushuju, NewKehushuju,
    Xiaoshoushuju, WatchXiaoshoushuju, EditXiaoshoushuju, NewXiaoshoushuju,
    Banchiguanli,
    Kaoqingjilu, UserManagement, 
    
     
    NewUserManagement, WatchUserManagement, EditUserManagement
}