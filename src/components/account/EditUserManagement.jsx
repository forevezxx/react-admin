/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import {
    Card, Form, Row, Col, Checkbox, Button, Tabs
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { userOne, userUpdate } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;

const TabPane = Tabs.TabPane;


class EditUserManagements extends Component {
    state = {
        id: '',
        type: '',
        username: '',
        position: '',
        phone: '',
        user_ext: '',
        account_name: '',
        password: '',
        employment_date: '',
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
                id: res.data.user.id,
                type: res.data.user.type,
                username: res.data.user.username,
                position: res.data.user.position,
                phone: res.data.user.phone,
                user_ext: res.data.user.user_ext,
                account_name: res.data.user.account_name,
                password: res.data.user.password,
                employment_date: res.data.user.employment_date,
            })
        })
    }
    goBack() {
        this.props.history.push(`/app/account/userManagement`);
    }
    userUpdates() {
        const { type, username, position, phone, user_ext, account_name, password, employment_date } = this.state;
        let data = {
            id: this.props.match.params.id,
            update_json: JSON.stringify({
                type,
                username,
                position,
                phone,
                user_ext,
                account_name,
                password,
                employment_date,
            }),
            token: localStorage.getItem('user_token'),
        };
        userUpdate(data).then(res =>{
            if(res.msg === "success"){
                this.props.history.push(`/app/account/userManagement`);
            }
        })
    }
    onChange2 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { id, type, username, position, phone, user_ext, account_name, password, employment_date } = this.state;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="用户管理" second="编辑用户信息" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="编辑用户信息" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={8}>
                                                <FormItem label="用户id" colon={false}>
                                                            <input value={id} onChange={ event=>{this.setState({id: event.target.value});}} />
                                                        </FormItem>
                                                        <FormItem label="用户类别" colon={false}>
                                                            <input value={type} onChange={event=>{this.setState({type: event.target.value});}} />
                                                        </FormItem>
                                                        <FormItem label="员工姓名" colon={false}>
                                                            <input value={username} onChange={ event=>{this.setState({username: event.target.value});}} />
                                                        </FormItem>
                                                        <FormItem label="职位" colon={false}>
                                                            <input value={position} onChange={ event=>{this.setState({position: event.target.value});}} />
                                                        </FormItem>
                                                        <FormItem label="手机号码" colon={false}>
                                                            <input value={phone} onChange={ event=>{this.setState({phone: event.target.value});}} />
                                                        </FormItem>
                                                        <FormItem label="工号" colon={false}>
                                                            <input value={user_ext} onChange={ event=>{this.setState({user_ext: event.target.value});}} />
                                                        </FormItem>
                                                        <FormItem label="账号名称" colon={false}>
                                                            <input value={account_name} onChange={ event=>{this.setState({account_name: event.target.value});}} />
                                                        </FormItem>
                                                        <FormItem label="账号密码" colon={false}>
                                                            <input value={password} onChange={ event=>{this.setState({password: event.target.value});}} />
                                                        </FormItem>
                                                        <FormItem label="入职时间" colon={false}>
                                                            <input value={moment(Number(employment_date)*1000).format('YYYY-MM-DD')} onChange={event=>{this.setState({employment_date: event.target.value});}} />
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
                                            </Row>
                                            <Row>
                                                <Col md={4}><Button type="primary" htmlType="submit" onClick={()=>this.goBack()}>返回</Button></Col>
                                                <Col md={4}><Button type="primary" htmlType="submit" onClick={()=>this.userUpdates()}>保存</Button></Col>
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

const EditUserManagement = Form.create()(EditUserManagements);

export default EditUserManagement;