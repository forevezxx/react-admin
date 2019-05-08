/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import {
    Card, Form, Input, Tooltip, Icon, Cascader,
    Select, Row, Col, Checkbox, Button,
    Table, Menu, Tabs, Upload, DatePicker, Radio,
    Modal,
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { supplierPayRecordOne } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

const TabPane = Tabs.TabPane;


class WatchPays extends Component {
    state = {
        documentData: {},
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
        dataSource: [{
            id: '1',
            resource_pro: '电信营销',
            pay_method: '月结',
            yidong: '1',
            liantong1: '1',
            liantong2: '1',
            dianxing: '1',
            yidong_price: '0.026',
            liantong1_price: '0.026',
            liantong2_price: '0.026',
            dianxing_price: '0.026',
            yidong_cost: '0.026',
            liantong_cost: '0.026',
            dianxing_cost: '0.026',
            total: '1000',
        }],
        visible: false,
    };
    componentDidMount() {
        this.getSupplierOne(this.props.match.params.id);
    }
    getSupplierOne(id) {
        let data = {
            id
        }
        supplierPayRecordOne(data).then(res => {
            this.setState({
                documentData: res.data.supplier
            })
        })
    }
    goBack() {
        this.props.history.push(`/app/shouldPay/pay`);
    }
    render() {

        const { dataSource, count, documentData} = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;

        const columns = [{
            title: '资源属性',
            dataIndex: 'resource_pro',
            key: 'resource_pro',
        }, {
            title: '付款方式',
            dataIndex: 'pay_method',
            key: 'pay_method',
        }, {
            title: '移动消耗条数',
            dataIndex: 'yidong',
            key: 'yidong',
        }, {
            title: '联通1消耗条数',
            dataIndex: 'liantong1',
            key: 'liantong1',
        }, {
            title: '联通2消耗条数',
            dataIndex: 'liantong2',
            key: 'liantong2',
        }, {
            title: '电信消耗条数',
            dataIndex: 'dianxing',
            key: 'dianxing',
        }, {
            title: '移动单价(元)',
            dataIndex: 'yidong_price',
            key: 'yidong_price',
        }, {
            title: '联通1单价(元)',
            dataIndex: 'liantong1_price',
            key: 'liantong1_price',
        }, {
            title: '联通2单价(元)',
            dataIndex: 'liantong2_price',
            key: 'liantong2_price',
        }, {
            title: '电信单价(元)',
            dataIndex: 'dianxing_price',
            key: 'dianxing_price',
        }, {
            title: '移动成本(元)',
            dataIndex: 'yidong_cost',
            key: 'yidong_cost',
        }, {
            title: '联通成本(元)',
            dataIndex: 'liantong_cost',
            key: 'liantong_cost',
        }, {
            title: '电信成本(元)',
            dataIndex: 'dianxing_cost',
            key: 'dianxing_cost',
        }, {
            title: '总金额(元)',
            dataIndex: 'total',
            key: 'total',
        }];
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="应付管理" second="应付录入" third="查看应付录入" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="查看应付录入" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="供应商名称" colon={false}>
                                                        <input placeholder="请输入供应商名称" disabled value={documentData.supplier_name} />
                                                    </FormItem>
                                                    <FormItem label="订单合同编号" colon={false}>
                                                        <input placeholder="请输入订单合同编号" disabled value={documentData.order_num} />
                                                    </FormItem>
                                                    <Row gutter={16}>
                                                        <Col className="gutter-row" md={24} >
                                                            <div className="gutter-box">
                                                                <Card bordered={false}>
                                                                    <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={false} />
                                                                    {/* <Button type="dashed" icon="plus-square" onClick={this.showModal}>新增资源属性</Button> */}
                                                                    <Modal
                                                                        title="新增资源属性"
                                                                        visible={this.state.visible}
                                                                        onOk={this.handleOk}
                                                                        onCancel={this.handleCancel}
                                                                        okText="保存"
                                                                        cancelText="返回"
                                                                    >
                                                                        <Row>
                                                                            <Col span={12}>
                                                                                <FormItem label="资源属性" colon={false}>
                                                                                    <input placeholder="请输入资源属性名称" onChange={event => {
                                                                                        this.setState({
                                                                                            resource_pro: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="移动消耗条数" colon={false}>
                                                                                    <input placeholder="请输入消耗条数" onChange={event => {
                                                                                        this.setState({
                                                                                            yidong: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="联通2消耗条数" colon={false}>
                                                                                    <input placeholder="请输入消耗条数" onChange={event => {
                                                                                        this.setState({
                                                                                            liantong2: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="移动报价" colon={false}>
                                                                                    <input placeholder="请输入报价" onChange={event => {
                                                                                        this.setState({
                                                                                            yidong_price: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="联通2报价" colon={false}>
                                                                                    <input placeholder="请输入报价" onChange={event => {
                                                                                        this.setState({
                                                                                            liantong2_price: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="移动成本" colon={false}>
                                                                                    <input placeholder="请输入成本" onChange={event => {
                                                                                        this.setState({
                                                                                            yidong_cost: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="电信成本" colon={false}>
                                                                                    <input placeholder="请输入成本" onChange={event => {
                                                                                        this.setState({
                                                                                            dianxing_cost: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                            </Col>
                                                                            <Col span={12}>
                                                                                <FormItem label="付款方式" colon={false}>
                                                                                    <input placeholder="请输入付款方式" onChange={event => {
                                                                                        this.setState({
                                                                                            pay_method: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="联通1消耗条数" colon={false}>
                                                                                    <input placeholder="请输入消耗条数" onChange={event => {
                                                                                        this.setState({
                                                                                            liantong1: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="电信消耗条数" colon={false}>
                                                                                    <input placeholder="请输入消耗条数" onChange={event => {
                                                                                        this.setState({
                                                                                            dianxing: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="联通1报价" colon={false}>
                                                                                    <input placeholder="请输入报价" onChange={event => {
                                                                                        this.setState({
                                                                                            liantong1_price: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="电信报价" colon={false}>
                                                                                    <input placeholder="请输入报价" onChange={event => {
                                                                                        this.setState({
                                                                                            dianxing_price: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="联通成本" colon={false}>
                                                                                    <input placeholder="请输入成本" onChange={event => {
                                                                                        this.setState({
                                                                                            liantong_cost: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="总金额" colon={false}>
                                                                                    <input placeholder="请输入总金额" onChange={event => {
                                                                                        this.setState({
                                                                                            total: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                            </Col>
                                                                        </Row>
                                                                    </Modal>
                                                                </Card>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <FormItem label="合计金额" colon={false}>
                                                        <input placeholder="请输入合计金额" disabled value={documentData.total_price} />
                                                    </FormItem>
                                                    <FormItem label="付款方式" colon={false}>
                                                        <input placeholder="请输入付款方式" disabled value={documentData.pay_type == 0 ? '对公' : '对私'} />
                                                    </FormItem>
                                                    <FormItem label="付款状态" colon={false}>
                                                        {/* <RadioGroup onChange={this.onChange2} value={this.state.value}>
                                                            <Radio value={1}>已付款</Radio>
                                                            <Radio value={2}>未付款</Radio>
                                                        </RadioGroup> */}
                                                        <input placeholder="请输入付款状态" disabled value={documentData.status == 0 ? '已付款' : '未付款'} />
                                                    </FormItem>
                                                    <FormItem label="付款日期" colon={false}>
                                                        {/* <DatePicker placeholder="请选择" onChange={() => this.onChange} /> */}
                                                        <input placeholder="请输入付款日期" disabled value={documentData.pay_time} />
                                                    </FormItem>
                                                    <FormItem label="付款主体" colon={false}>
                                                        <input placeholder="请输入付款主体" disabled value={documentData.pay_entity} />
                                                    </FormItem>
                                                    <FormItem label="付款账号" colon={false}>
                                                        <input placeholder="请输入付款账号" disabled value={documentData.pay_account} />
                                                    </FormItem>
                                                    <FormItem label="开票状态" colon={false}>
                                                        {/* <RadioGroup onChange={this.onChange3} value={this.state.values}>
                                                            <Radio value={1}>已开票</Radio>
                                                            <Radio value={2}>未开票</Radio>
                                                        </RadioGroup> */}
                                                        <input placeholder="请输入开票状态" disabled value={documentData.receipt_status == 0 ? '未开票' : '已开票'} />
                                                    </FormItem>
                                                    <FormItem label="开票抬头" colon={false}>
                                                        <input placeholder="请输入开票抬头" disabled value={documentData.receipt_head} />
                                                    </FormItem>
                                                    <FormItem label="组织机构代码" colon={false}>
                                                        <input placeholder="请输入组织机构代码" disabled value={documentData.org_code} />
                                                    </FormItem>
                                                    <FormItem label="开票内容" colon={false}>
                                                        {/* <TextArea rows={4} defaultValue="请输入开票内容" /> */}
                                                        <input placeholder="请输入开票内容" disabled value={documentData.receipt_content} />
                                                    </FormItem>
                                                    <FormItem label="开户银行" colon={false}>
                                                        <input placeholder="请输入开户银行" disabled value={documentData.deposit_bank} />
                                                    </FormItem>
                                                    <FormItem label="开票种类" colon={false}>
                                                        <input placeholder="请输入开票种类" disabled value={documentData.receipt_type} />
                                                    </FormItem>
                                                    <FormItem label="邮寄地址" colon={false}>
                                                        <input placeholder="请输入邮寄地址" disabled value={documentData.address} />
                                                    </FormItem>
                                                    <FormItem label="开票日期" colon={false}>
                                                        {/* <DatePicker placeholder="请选择" onChange={() => this.onChange} /> */}
                                                        <input placeholder="请输入开票日期" disabled value={documentData.receipt_date} />
                                                    </FormItem>
                                                    <FormItem label="平账状态" colon={false}>
                                                        {/* <RadioGroup onChange={this.onChange3} value={this.state.values}>
                                                            <Radio value={1}>已平账</Radio>
                                                            <Radio value={2}>未平账</Radio>
                                                        </RadioGroup> */}
                                                        <input placeholder="请输入平账状态" disabled value={documentData.flat_account_type == 0 ? '未平帐' : '已平帐'} />
                                                    </FormItem>
                                                    <FormItem label="备注信息" colon={false}>
                                                        {/* <TextArea rows={4} defaultValue="请输入备注信息" /> */}
                                                        <input placeholder="请输入备注信息" disabled value={documentData.backup} />
                                                    </FormItem>
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.goBack()}>返回</Button></Col>
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

const WatchPay = Form.create()(WatchPays);

export default WatchPay;