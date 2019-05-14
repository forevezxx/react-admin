/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import {
    Card, Form, Input, Tooltip, Icon, Cascader,
    Select, Row, Col, Checkbox, Button,
    Table, Menu, Tabs, Upload, Modal, Radio, DatePicker
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { clientPayRecordOne } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;


class WatchUserFiless extends Component {
    state = {
        documentData: {},
    };
    componentDidMount() {
        this.getSupplierOne(this.props.match.params.id);
    }
    getSupplierOne(id) {
        let data = {
            id
        }
        clientPayRecordOne(data).then(res => {
            this.setState({
                documentData: res.data.supplier
            })
        })
    }
    goBack() {
        this.props.history.push(`/app/shouldCollect/In`);
    }
    render() {
        const { documentData } = this.state;
        const { dataSource, count } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
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
                <BreadcrumbCustom first="应付管理" second="档案管理" third="查看供应商档案" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="查看供应商档案" key="1">
                        <Row>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                            <Col span={24}>
                                                    <FormItem label="客户名称" colon={false}>
                                                        {/* <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChange}
                                                        >
                                                            <Option value="male">male</Option>
                                                            <Option value="female">female</Option>
                                                        </Select> */}
                                                        <input placeholder="请输入客户名称" disabled value={documentData.client_name} />
                                                    </FormItem>
                                                    <FormItem label="订单编号" colon={false}>
                                                        <input placeholder="请输入订单编号" disabled value={documentData.orderId}/>
                                                    </FormItem>
                                                    {/* 资源属性 */}
                                                    <Row gutter={16}>
                                                        <Col className="gutter-row" span={24} >
                                                            <div className="gutter-box">
                                                                <Card bordered={false}>
                                                                    <Table columns={columns} dataSource={documentData.resource} rowKey={record => record.id} pagination={false}/>
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
                                                                                    <input placeholder="请输入资源属性名称" onChange={event=>{
                                                                                        this.setState({
                                                                                            resource_pro: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="移动消耗条数" colon={false}>
                                                                                    <input placeholder="请输入消耗条数" onChange={event=>{
                                                                                        this.setState({
                                                                                            yidong: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="联通2消耗条数" colon={false}>
                                                                                    <input placeholder="请输入消耗条数" onChange={event=>{
                                                                                        this.setState({
                                                                                            liantong2: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="移动报价" colon={false}>
                                                                                    <input placeholder="请输入报价" onChange={event=>{
                                                                                        this.setState({
                                                                                            yidong_price: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="联通2报价" colon={false}>
                                                                                    <input placeholder="请输入报价" onChange={event=>{
                                                                                        this.setState({
                                                                                            liantong2_price: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="移动成本" colon={false}>
                                                                                    <input placeholder="请输入成本" onChange={event=>{
                                                                                        this.setState({
                                                                                            yidong_cost: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="电信成本" colon={false}>
                                                                                    <input placeholder="请输入成本" onChange={event=>{
                                                                                        this.setState({
                                                                                            dianxing_cost: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                            </Col>
                                                                            <Col span={12}>
                                                                                <FormItem label="付款方式" colon={false}>
                                                                                    <input placeholder="请输入付款方式" onChange={event=>{
                                                                                        this.setState({
                                                                                            pay_method: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="联通1消耗条数" colon={false}>
                                                                                    <input placeholder="请输入消耗条数" onChange={event=>{
                                                                                        this.setState({
                                                                                            liantong1: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="电信消耗条数" colon={false}>
                                                                                    <input placeholder="请输入消耗条数" onChange={event=>{
                                                                                        this.setState({
                                                                                            dianxing: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="联通1报价" colon={false}>
                                                                                    <input placeholder="请输入报价" onChange={event=>{
                                                                                        this.setState({
                                                                                            liantong1_price: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="电信报价" colon={false}>
                                                                                    <input placeholder="请输入报价" onChange={event=>{
                                                                                        this.setState({
                                                                                            dianxing_price: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="联通成本" colon={false}>
                                                                                    <input placeholder="请输入成本" onChange={event=>{
                                                                                        this.setState({
                                                                                            liantong_cost: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="总金额" colon={false}>
                                                                                    <input placeholder="请输入总金额" onChange={event=>{
                                                                                        this.setState({
                                                                                            total: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                            </Col>
                                                                        </Row>
                                                                    </Modal>
                                                                </Card>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <FormItem label="合计金额" colon={false}>
                                                        <input placeholder="请输入合计金额" disabled value={documentData.total_count} />
                                                    </FormItem>
                                                    <FormItem label="收款主体" colon={false}>
                                                        <input placeholder="请输入收款主体" disabled value={documentData.receivables_entity}/>
                                                    </FormItem>
                                                    <FormItem label="收款账户" colon={false}>
                                                        <input placeholder="请输入收款账户" disabled value={documentData.receivables_account}/>
                                                    </FormItem>
                                                    <FormItem label="结算方式" colon={false}>
                                                        {/* <RadioGroup onChange={this.onChange2} value={this.state.value}>
                                                            <Radio value={1}>月结</Radio>
                                                            <Radio value={2}>预付</Radio>
                                                        </RadioGroup> */}
                                                        <input placeholder="请输入结算方式" disabled value={documentData.pay_method == 1 ? '月结' : '预付'} />
                                                    </FormItem>
                                                    <FormItem label="收款状态" colon={false}>
                                                        {/* <RadioGroup onChange={this.onChange2} value={this.state.value}>
                                                            <Radio value={1}>已收款</Radio>
                                                            <Radio value={2}>未收款</Radio>
                                                        </RadioGroup> */}
                                                        <input placeholder="请输入结算方式" disabled value={documentData.receivables_status == 1 ? '已收款' : '未收款'} />
                                                    </FormItem>
                                                    <FormItem label="收款日期" colon={false}>
                                                        {/* <DatePicker onChange={()=>this.onChange} /> */}
                                                        <input placeholder="请输入付款日期" disabled value={documentData.receivables_date} />
                                                    </FormItem>
                                                    <FormItem label="收款方式" colon={false}>
                                                        {/* <RadioGroup onChange={this.onChange2} value={this.state.value}>
                                                            <Radio value={1}>已收款</Radio>
                                                            <Radio value={2}>未收款</Radio>
                                                        </RadioGroup> */}
                                                        <input placeholder="请输入结算方式" disabled value={documentData.receivables_type == 1 ? '已收款' : '未收款'} />
                                                    </FormItem>
                                                    <FormItem label="开票状态" colon={false}>
                                                        {/* <RadioGroup onChange={this.onChange3} value={this.state.values}>
                                                            <Radio value={1}>已开票</Radio>
                                                            <Radio value={2}>未开票</Radio>
                                                        </RadioGroup> */}
                                                        <input placeholder="请输入结算方式" disabled value={documentData.invoice_status == 1 ? '已开票' : '未开票'} />
                                                    </FormItem>
                                                    <FormItem label="开票抬头" colon={false}>
                                                        <input placeholder="请输入开票抬头" disabled value={documentData.invoice_head}/>
                                                    </FormItem>
                                                    <FormItem label="组织机构代码" colon={false}>
                                                        <input placeholder="请输入组织机构代码" disabled value={documentData.org_code} />
                                                    </FormItem>
                                                    <FormItem label="开票内容" colon={false}>
                                                        <TextArea rows={4} placeholder="请输入开票内容" disabled value={documentData.invoice_content}/>
                                                    </FormItem>
                                                    <FormItem label="开户银行" colon={false}>
                                                        <input placeholder="请输入开户银行" disabled value={documentData.open_bank}/>
                                                    </FormItem>
                                                    <FormItem label="开票种类" colon={false}>
                                                        <input placeholder="请输入开票种类" disabled value={documentData.invoice_type}/>
                                                    </FormItem>
                                                    <FormItem label="邮寄地址" colon={false}>
                                                        <input placeholder="请输入邮寄地址" disabled value={documentData.mail_addr} />
                                                    </FormItem>
                                                    <FormItem label="开票日期" colon={false}>
                                                        {/* <DatePicker onChange={() => this.onChange} /> */}
                                                        <input placeholder="请输入邮寄地址" disabled value={documentData.invoice_date} />
                                                    </FormItem>
                                                </Col>
                                                <Col span={8}>
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

const WatchUserFiles = Form.create()(WatchUserFiless);

export default WatchUserFiles;