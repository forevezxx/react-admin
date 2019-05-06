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


class WatchUserManagements extends Component {
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
    onChange2 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    goBack() {
        this.props.history.push(`/app/account/userManagement`);
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
                                                        <FormItem label="权限模块" colon={false}>
                                                            <Row>
                                                                <Col span={24}><div className="user_auth">用户权限</div></Col>
                                                                <Col span={24}><Checkbox onChange={this.onChange2.bind(this)} value="1">档案管理</Checkbox></Col>
                                                                <Col span={24}><Checkbox onChange={this.onChange2.bind(this)} value="2">用户管理</Checkbox></Col>
                                                                <Col span={24}><Checkbox onChange={this.onChange2.bind(this)} value="3">数据管理</Checkbox></Col>
                                                                <Col span={24}><div className="function_auth">功能权限</div></Col>
                                                                <Col span={24}><Checkbox onChange={this.onChange2.bind(this)} value="1">查看权限</Checkbox></Col>
                                                                <Col span={24}><Checkbox onChange={this.onChange2.bind(this)} value="2">编辑权限</Checkbox></Col>
                                                                <Col span={24}><Checkbox onChange={this.onChange2.bind(this)} value="3">保存权限</Checkbox></Col>
                                                                <Col span={24}><Checkbox onChange={this.onChange2.bind(this)} value="4">新增权限</Checkbox></Col>
                                                                <Col span={24}><Checkbox onChange={this.onChange2.bind(this)} value="5">查询权限</Checkbox></Col>
                                                                <Col span={24}><Checkbox onChange={this.onChange2.bind(this)} value="6">停用权限</Checkbox></Col>
                                                            </Row>
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

const WatchUserManagement = Form.create()(WatchUserManagements);

export default WatchUserManagement;