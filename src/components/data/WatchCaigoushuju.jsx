/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import {
    Card, Form, Input, Tooltip, Icon, Cascader,
    Select, Row, Col, Checkbox, Button,
    Table, Menu, Tabs, Upload
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { userOne } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

const TabPane = Tabs.TabPane;


class WatchXiaoshoushujus extends Component {
    state = {
        userData: '',
    };
    componentDidMount() {
        this.getUserOne(this.props.match.params.id);
    }
    getUserOne(id){
        let data = {
            id
        }
        userOne(data).then(res=>{
            this.setState({
                userData: res.data.user
            })
        })
    }
    goBack() {
        this.props.history.push(`/app/data/xiaoshoushuju`);
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const {userData} = this.state;
        if(userData!=""){
            return (
                <div className="gutter-example">
                    <BreadcrumbCustom first="用户管理" second="查看用户信息"/>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="查看用户信息" key="1">
                            <Row>
                                <Col className="gutter-row" md={24}>
                                    <div className="gutter-box">
                                        <Card bordered={false}>
                                            <Form {...formItemLayout}>
                                                <Row>
                                                    <Col md={24}>
                                                        <FormItem label="用户id" colon={false}>
                                                            <input disabled value={userData.id} />
                                                        </FormItem>
                                                        <FormItem label="用户类别" colon={false}>
                                                            <input disabled value={userData.type} />
                                                        </FormItem>
                                                        <FormItem label="员工姓名" colon={false}>
                                                            <input disabled value={userData.username} />
                                                        </FormItem>
                                                        <FormItem label="职位" colon={false}>
                                                            <input disabled value={userData.position} />
                                                        </FormItem>
                                                        <FormItem label="手机号码" colon={false}>
                                                            <input disabled value={userData.phone} />
                                                        </FormItem>
                                                        <FormItem label="工号" colon={false}>
                                                            <input disabled value={userData.user_ext} />
                                                        </FormItem>
                                                        <FormItem label="账号名称" colon={false}>
                                                            <input disabled value={userData.account_name} />
                                                        </FormItem>
                                                        <FormItem label="账号密码" colon={false}>
                                                            <input disabled value={userData.password} />
                                                        </FormItem>
                                                        <FormItem label="入职时间" colon={false}>
                                                            <input disabled value={moment(Number(userData.employment_date)*1000).format('YYYY-MM-DD')} />
                                                        </FormItem>
                                                    </Col>
                                                    <Col md={8}>
                                                        <Button type="primary" htmlType="submit" onClick={()=>this.goBack()}>返回</Button></Col>
                                                </Row>
                                            </Form>
                                        </Card>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                    </Tabs>
                </div>
            )
        }else{
            return null
        }
        
    }
}

const WatchXiaoshoushuju = Form.create()(WatchXiaoshoushujus);

export default WatchXiaoshoushuju;