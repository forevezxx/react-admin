/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import {
    Card, Form, Input, Tooltip, Icon, Cascader,
    Select, Row, Col, Checkbox, Button,
    Table, Menu, Tabs, Upload, DatePicker, Radio
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { userAdd, userUpdate } from '../../axios';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
class UserManagements extends Component {
    state = {
        confirmDirty: false,
        value: 1,
        values: 1,
    };
    onChange(date, dateString) {
        console.log(date, dateString);
    }

    onChange2 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    onChange3 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            values: e.target.value,
        });
    }

    newUser() {
        let data = {
            id: 'ID000009',
            type: '1',
            username: '测试账户1',
            position: '开发',
            phone: '15068747888',
            user_ext: '00001',
            account_name: 'zxx',
            password: '1',
            employment_date:'20190421',
            user_auth: '1',
            function_auth: '1',
        }
        userAdd(data).then(res=>{
            console.log(res);
        })
    }
    userUpdates() {
        let data = {
            id: '8',
            update_json: JSON.stringify({
                type: '1',
                username: '测试账户1',
                position: '开发',
                phone: '15068747888',
                user_ext: '1',
                account_name: 'zxx',
                password: '1',
                employment_date: '20190421',
                user_auth: '1',
                function_auth: '1',
                enabled: '1',
            }),
            token: localStorage.getItem('user_token'),
        };
        userUpdate(data).then(res =>{
            console.log(res);
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example newUserManagement">
                <BreadcrumbCustom first="用户管理" second="新增用户" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="新增用户" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="用户ID" colon={false}>
                                                        <input placeholder="请输入公司名称" disabled value="11,000,000" />
                                                    </FormItem>
                                                    <FormItem label="用户类别" colon={false}>
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChange}
                                                        >
                                                            <Option value="male">male</Option>
                                                            <Option value="female">female</Option>
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="员工姓名" colon={false}>
                                                        <input placeholder="请输入员工姓名" />
                                                    </FormItem>
                                                    <FormItem label="职位" colon={false}>
                                                        <input placeholder="请输入职位" />
                                                    </FormItem>
                                                    <FormItem label="手机号码" colon={false}>
                                                        <input placeholder="请输入手机号码" />
                                                    </FormItem>
                                                    <FormItem label="工号" colon={false}>
                                                        <input placeholder="请输入工号" />
                                                    </FormItem>
                                                    <FormItem label="账号名称" colon={false}>
                                                        <input placeholder="请输入账号名称" />
                                                    </FormItem>
                                                    <FormItem label="账号密码" colon={false}>
                                                        <input placeholder="请输入账号密码" />
                                                    </FormItem>
                                                    <FormItem label="入职时间" colon={false}>
                                                        <DatePicker onChange={() => this.onChange} />
                                                    </FormItem>
                                                    <FormItem label="权限模块" colon={false}>
                                                        <input placeholder="请输入入账方式" />
                                                    </FormItem>
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.userUpdates()}>返回</Button></Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={()=>this.newUser()}>保存</Button></Col>
                                            </Row>
                                        </Form>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    {/* <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane> */}
                </Tabs>
            </div>
        )
    }
}

const UserManagement = Form.create()(UserManagements);

export default UserManagement;