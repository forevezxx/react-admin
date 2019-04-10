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
import Pay from './shouldPay/Pay';
import UserFiles from './shouldCollect/UserFiles';
import In from './shouldCollect/In';
import Baoxiao from './pay/Baoxiao';
import Beiyongjin from './pay/Beiyongjin';
import Gongfei from './pay/Gongfei';
import Caigoushuju from './data/Caigoushuju';
import Kehushuju from './data/Kehushuju';
import Xiaoshoushuju from './data/Xiaoshoushuju';
import Banchiguanli from './checkIn/Banchiguanli';
import Kaoqingjilu from './checkIn/Kaoqingjilu';
import UserManagement from './account/UserManagement';

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
    
    Document, Pay, UserFiles, In, 
    Baoxiao, Beiyongjin, Gongfei, Caigoushuju,
    Kehushuju, Xiaoshoushuju, Banchiguanli,
    Kaoqingjilu, UserManagement
}