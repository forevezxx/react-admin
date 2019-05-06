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

class NewIns extends Component {    
    state = {
        value: 1,
        values: 1,
        confirmDirty: false,
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
        this.props.history.push(`/app/shouldCollect/in`);
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
                this.props.history.push(`/app/shouldCollect/in`);
            }
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
            resource_pro: '',
            pay_method: '',
            yidong: '',
            liantong1: '',
            liantong2: '',
            dianxing: '',
            yidong_price: '',
            liantong1_price: '',
            liantong2_price: '',
            dianxing_price: '',
            yidong_cost: '',
            liantong_cost: '',
            dianxing_cost: '',
            total: '',
        });
    }

    handleOk = (e) => {//新增资源属性
        console.log(e);
        let that = this;
        let dataSource = {
            id: that.state.dataSource[that.state.dataSource.length - 1].id + 1,
            resource_pro: that.state.resource_pro,
            pay_method: that.state.pay_method,
            yidong: that.state.yidong,
            liantong1: that.state.liantong1,
            liantong2: that.state.liantong2,
            dianxing: that.state.dianxing,
            yidong_price: that.state.yidong_price,
            liantong1_price: that.state.liantong1_price,
            liantong2_price: that.state.liantong2_price,
            dianxing_price: that.state.dianxing_price,
            yidong_cost: that.state.yidong_cost,
            liantong_cost: that.state.liantong_cost,
            dianxing_cost: that.state.dianxing_cost,
            total: that.state.total,
        }
        let x = that.state.dataSource;
        x.push(dataSource);
        console.log(x);
        this.setState({
            visible: false,
            dataSource: x,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="应收管理" second="应收录入" third="新增" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="新增应收录入" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="客户名称" colon={false}>
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChange}
                                                        >
                                                            <Option value="male">male</Option>
                                                            <Option value="female">female</Option>
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="订单编号" colon={false}>
                                                        <input placeholder="请输入公司名称" disabled value="NO.123654"/>
                                                    </FormItem>
                                                    {/* 资源属性 */}

                                                    <FormItem label="合计金额" colon={false}>
                                                        <input placeholder="请输入公司名称" disabled value="11,000,000" />
                                                    </FormItem>
                                                    <FormItem label="收款主体" colon={false}>
                                                        <input placeholder="请输入收款主体" />
                                                    </FormItem>
                                                    <FormItem label="收款账户" colon={false}>
                                                        <input placeholder="请输入收款账户" />
                                                    </FormItem>
                                                    <FormItem label="结算方式" colon={false}>
                                                        <RadioGroup onChange={this.onChange2} value={this.state.value}>
                                                            <Radio value={1}>月结</Radio>
                                                            <Radio value={2}>预付</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="收款状态" colon={false}>
                                                        <RadioGroup onChange={this.onChange2} value={this.state.value}>
                                                            <Radio value={1}>已收款</Radio>
                                                            <Radio value={2}>未收款</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="收款日期" colon={false}>
                                                        <DatePicker onChange={()=>this.onChange} />
                                                    </FormItem>
                                                    <FormItem label="收款方式" colon={false}>
                                                        <RadioGroup onChange={this.onChange2} value={this.state.value}>
                                                            <Radio value={1}>已收款</Radio>
                                                            <Radio value={2}>未收款</Radio>
                                                        </RadioGroup>
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
                                                        <TextArea rows={4} defaultValue="请输入开票内容"/>
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

const NewIn = Form.create()(NewIns);

export default NewIn;