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
class NewCaigoushujus extends Component {
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
        this.props.history.push(`/app/data/caigoushuju`);
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
                this.props.history.push(`/app/data/caigoushuju`);
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
                <BreadcrumbCustom first="数据管理" second="新增采购数据" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="新增采购详情" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="公司名称" colon={false}>
                                                        <input placeholder="请输入公司名称"  />
                                                    </FormItem>
                                                    <FormItem label="通道" colon={false}>
                                                        <input placeholder="请输入通道"  />
                                                    </FormItem>
                                                    <FormItem label="属性" colon={false}>
                                                        <input placeholder="请输入属性"  />
                                                    </FormItem>
                                                    <FormItem label="采购价" colon={false}>
                                                        <input placeholder="请输入采购价"  />
                                                    </FormItem>
                                                    <FormItem label="数量" colon={false}>
                                                        <input placeholder="请输入数量"  />
                                                    </FormItem>
                                                    <FormItem label="总金额" colon={false}>
                                                        <input placeholder="请输入总金额"  />
                                                    </FormItem>
                                                    <FormItem label="采购日期" colon={false}>
                                                        <DatePicker placeholder="请选择" onChange={this.onChange.bind(this)} />
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

const NewCaigoushuju = Form.create()(NewCaigoushujus);

export default NewCaigoushuju;