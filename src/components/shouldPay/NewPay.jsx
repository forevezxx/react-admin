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
import { supplierAdd } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class NewPays extends Component {
    state = {
        confirmDirty: false,
        value: 1,
        values: 1,
        company_type: '',
        company_name: '',
        company_owner: '',
        position: '',
        industry: '',
        email: '',
        address: '',
        tel: '',
        phone: '',
        company_pic: '',
        contract_num: '',
        source: '',
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
    goBack() {
        this.props.history.push(`/app/shouldPay/pay`);
    }
    newSupplier() {
        const { 
            company_type,
            company_name,
            company_owner,
            position,
            industry,
            email,
            address,
            tel,
            phone,
            company_pic,
            contract_num,
            source
        } = this.state;
        const token = localStorage.getItem('user_token');
        let data = {
            company_type,
            company_name,
            company_owner,
            position,
            industry,
            email,
            address,
            tel,
            phone,
            company_pic,
            contract_num,
            source,
            token
        }
        supplierAdd(data).then(res => {
            console.log(res);
            if (res.msg === "success") {
                this.props.history.push(`/app/shouldPay/pay`);
            }
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="应付管理" second="应付录入" third="新增应付录入" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="新增应付录入" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="供应商名称" colon={false}>
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChange}
                                                        >
                                                            <Option value="male">male</Option>
                                                            <Option value="female">female</Option>
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="订单合同编号" colon={false}>
                                                        <input placeholder="请输入公司名称" disabled value="NO.123654"/>
                                                    </FormItem>
                                                    {/* 资源属性 */}

                                                    <FormItem label="合计金额" colon={false}>
                                                        <input placeholder="请输入公司名称" disabled value="11,000,000" />
                                                    </FormItem>
                                                    <FormItem label="付款状态" colon={false}>
                                                        <RadioGroup onChange={this.onChange2} value={this.state.value}>
                                                            <Radio value={1}>已付款</Radio>
                                                            <Radio value={2}>未付款</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="付款日期" colon={false}>
                                                        <DatePicker onChange={()=>this.onChange} />
                                                    </FormItem>
                                                    <FormItem label="付款主体" colon={false}>
                                                        <input placeholder="请输入付款主体" />
                                                    </FormItem>
                                                    <FormItem label="付款账号" colon={false}>
                                                        <input placeholder="请输入付款账号" />
                                                    </FormItem>
                                                    <FormItem label="开票状态" colon={false}>
                                                        <RadioGroup onChange={this.onChange3} value={this.state.values}>
                                                            <Radio value={1}>已开票</Radio>
                                                            <Radio value={2}>未开票</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="开票抬头" colon={false}>
                                                        <input placeholder="请输入开票抬头" />
                                                    </FormItem>
                                                    <FormItem label="组织机构代码" colon={false}>
                                                        <input placeholder="请输入组织机构代码" />
                                                    </FormItem>
                                                    <FormItem label="开票内容" colon={false}>
                                                        <TextArea rows={4} defaultValue="请输入开票内容" />
                                                    </FormItem>
                                                    <FormItem label="开户银行" colon={false}>
                                                        <input placeholder="请输入开户银行" />
                                                    </FormItem>
                                                    <FormItem label="开票种类" colon={false}>
                                                        <input placeholder="请输入开票种类" />
                                                    </FormItem>
                                                    <FormItem label="邮寄地址" colon={false}>
                                                        <input placeholder="请输入邮寄地址" />
                                                    </FormItem>
                                                    <FormItem label="开票日期" colon={false}>
                                                        <DatePicker onChange={() => this.onChange} />
                                                    </FormItem>
                                                    <FormItem label="平账状态" colon={false}>
                                                        <RadioGroup onChange={this.onChange3} value={this.state.values}>
                                                            <Radio value={1}>已平账</Radio>
                                                            <Radio value={2}>未平账</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="备注信息" colon={false}>
                                                        <TextArea rows={4} defaultValue="请输入备注信息" />
                                                    </FormItem>
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={()=>this.goBack()}>返回</Button></Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={()=>this.newSupplier()}>保存</Button></Col>
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

const NewPay = Form.create()(NewPays);

export default NewPay;