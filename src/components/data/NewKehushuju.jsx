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
import { userAdd } from '../../axios';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
class NewXiaoshoushujus extends Component {
    state = {
        type: '',
        username: '',
        position: '',
        phone: '',
        user_ext: '',
        account_name: '',
        password: '',
        employment_date: '',
        user_auth: '',
        function_auth: '', 
    };
    onChange(date, dateString) {
        console.log(date, dateString);
        this.setState({
            employment_date: dateString,
        })
    }

    onChange2 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    goBack() {
        this.props.history.push(`/app/data/xiaoshoushuju`);
    }

    newUser() {
        const {
            type,
            username,
            position,
            phone,
            user_ext,
            account_name,
            password,
            employment_date,
            user_auth,
            function_auth, 
        } = this.state;
        let data = {
            type,
            username,
            position,
            phone,
            user_ext,
            account_name,
            password,
            employment_date,
            user_auth,
            function_auth,
        }
        userAdd(data).then(res=>{
            if (res.msg === "success") {
                this.props.history.push(`/app/data/xiaoshoushuju`);
            }
        })
    }
    handleSelectChangeUserType(value) {
        this.setState({
            type: value
        });
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
                                                    {/* <FormItem label="用户ID" colon={false}>
                                                        <input placeholder="请输入公司名称" disabled value="11,000,000" />
                                                    </FormItem> */}
                                                    <FormItem label="用户类别" colon={false}>
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChangeUserType.bind(this)}
                                                        >
                                                            <Option value="1">普通用户</Option>
                                                            <Option value="2">管理员</Option>
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="员工姓名" colon={false}>
                                                        <input placeholder="请输入员工姓名" onChange={event => {
                                                            this.setState({
                                                                username: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="职位" colon={false}>
                                                        <input placeholder="请输入职位" onChange={event => {
                                                            this.setState({
                                                                position: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="手机号码" colon={false}>
                                                        <input placeholder="请输入手机号码" onChange={event => {
                                                            this.setState({
                                                                phone: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="工号" colon={false}>
                                                        <input placeholder="请输入工号" onChange={event => {
                                                            this.setState({
                                                                user_ext: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="账号名称" colon={false}>
                                                        <input placeholder="请输入账号名称" onChange={event => {
                                                            this.setState({
                                                                account_name: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="账号密码" colon={false}>
                                                        <input placeholder="请输入账号密码" onChange={event => {
                                                            this.setState({
                                                                password: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="入职时间" colon={false}>
                                                        <DatePicker placeholder="请选择" onChange={this.onChange.bind(this)} />
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
                                                    <Button type="primary" htmlType="submit" onClick={() => this.goBack()}>返回</Button></Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.newUser()}>保存</Button></Col>
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
    }
}

const NewXiaoshoushuju = Form.create()(NewXiaoshoushujus);

export default NewXiaoshoushuju;