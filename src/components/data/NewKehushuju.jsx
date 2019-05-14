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
import { customDataAdd } from '../../axios';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
class NewKehushujus extends Component {
    state = {
        customer_name: '',
        customer_company: '',
        repay_product_name: '',
        num: '',
        price: '',
        total: '',
        repay_money: '',
        repay_date: '', 
    };
    onChange(date, dateString) {
        console.log(date, dateString);
        this.setState({
            repay_date: dateString,
        })
    }
    goBack() {
        this.props.history.push(`/app/data/kehushuju`);
    }

    newUser() {
        
        const {
            customer_name,
            customer_company,
            repay_product_name,
            num,
            price,
            total,
            repay_money,
            repay_date,
        } = this.state;
        let data = {
            customer_name,
            customer_company,
            repay_product_name,
            num,
            price,
            total,
            repay_money,
            repay_date,
        }
        customDataAdd(data).then(res=>{
            if (res.msg === "success") {
                this.props.history.push(`/app/data/kehushuju`);
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
                <BreadcrumbCustom first="数据管理" second="新增客户数据" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="新增客户数据" key="1">
                        <Row>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col span={12}>
                                                <FormItem label="客户姓名" colon={false}>
                                                        <input placeholder="请输入客户姓名" onChange={event => {
                                                            this.setState({
                                                                customer_name: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="客户公司名称" colon={false}>
                                                        <input placeholder="请输入客户公司名称" onChange={event => {
                                                            this.setState({
                                                                customer_company : event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="回款产品" colon={false}>
                                                        <input placeholder="请输入回款产品" onChange={event => {
                                                            this.setState({
                                                                repay_product_name: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="产品数量" colon={false}>
                                                        <input placeholder="请输入产品数量" onChange={event => {
                                                            this.setState({
                                                                num: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="产品单价" colon={false}>
                                                        <input placeholder="请输入产品单价" onChange={event => {
                                                            this.setState({
                                                                price: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="产品总价" colon={false}>
                                                        <input placeholder="请输入产品总价" onChange={event => {
                                                            this.setState({
                                                                total: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="回款金额" colon={false}>
                                                        <input placeholder="请输入回款金额" onChange={event => {
                                                            this.setState({
                                                                repay_money: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="回款日期" colon={false}>
                                                        <DatePicker placeholder="请选择" onChange={this.onChange.bind(this)} />
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={4}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.goBack()}>返回</Button></Col>
                                                <Col span={4}>
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

const NewKehushuju = Form.create()(NewKehushujus);

export default NewKehushuju;