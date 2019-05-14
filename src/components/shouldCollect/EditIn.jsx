/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, 
    Select, Row, Col, Checkbox, Button, 
    Table, Menu, Tabs, Upload, DatePicker, Radio, Modal
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { clientPayRecordOne, clientPayRecordUpdate } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class EditUserFiless extends Component {
    state = {
        client_id: '',
        client_name: '',
        total_count: '',
        receivables_entity: '',
        receivables_account: '',
        pay_method: 1,
        receivables_status: 1,
        receivables_date: '',
        receivables_type: 1,
        invoice_status: 1,
        invoice_head: '',
        org_code: '',
        invoice_content: '',
        open_bank: '',
        invoice_type: 1,
        mail_addr: '',
        invoice_date: '',
        dataSource: [
            // id: 1,
            // resource_pro: '电信营销',
            // pay_method: '月结',
            // yidong: '1',
            // liantong1: '1',
            // liantong2: '1',
            // dianxing: '1',
            // yidong_price: '0.026',
            // liantong1_price: '0.026',
            // liantong2_price: '0.026',
            // dianxing_price: '0.026',
            // yidong_cost: '0.026',
            // liantong_cost: '0.026',
            // dianxing_cost: '0.026',
            // total: '1000',
        ],
        visible: false,
        resource_id: '1',
        userNameList: [],
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
                client_id: res.data.supplier.client_id,
                client_name: res.data.supplier.client_name,
                resource_id: res.data.supplier.resource_id,
                total_count: res.data.supplier.total_count,
                receivables_entity: res.data.supplier.receivables_entity,
                receivables_account: res.data.supplier.receivables_account,
                pay_method: res.data.supplier.pay_method,
                receivables_status: res.data.supplier.receivables_status,
                receivables_date: res.data.supplier.receivables_date,
                receivables_type: res.data.supplier.receivables_type,
                invoice_status: res.data.supplier.invoice_status,
                invoice_head: res.data.supplier.invoice_head,
                org_code: res.data.supplier.org_code,
                invoice_content: res.data.supplier.invoice_content,
                open_bank: res.data.supplier.open_bank,
                invoice_type: res.data.supplier.invoice_type,
                mail_addr: res.data.supplier.mail_addr,
                invoice_date: res.data.supplier.invoice_date,
            })
        })
    }
    onChange1 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            pay_method: e.target.value,
        });
    }
    onChange2 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            receivables_status: e.target.value,
        });
    }
    onChange3 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            receivables_type: e.target.value,
        });
    }
    onChange4 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            invoice_status: e.target.value,
        });
    }
    goBack() {
        this.props.history.push(`/app/shouldCollect/in`);
    }
    supplierUpdate() {
        const {
            client_id,
            client_name,
            resource_id,
            total_count,
            receivables_entity,
            receivables_account,
            pay_method,
            receivables_status,
            receivables_date,
            receivables_type,
            invoice_status,
            invoice_head,
            org_code,
            invoice_content,
            open_bank,
            invoice_type,
            mail_addr,
            invoice_date,
            orderId
        } = this.state;
        let data = {
            id: this.props.match.params.id,
            update_json: JSON.stringify({
                client_id,
                client_name,
                resource_id,
                total_count,
                receivables_entity,
                receivables_account,
                pay_method,
                receivables_status,
                receivables_date,
                receivables_type,
                invoice_status,
                invoice_head,
                org_code,
                invoice_content,
                open_bank,
                invoice_type,
                mail_addr,
                invoice_date,
                orderId
            }),
            token: localStorage.getItem('user_token'),
        };
        clientPayRecordUpdate(data).then(res => {
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
            // id: that.state.dataSource[that.state.dataSource.length-1].id + 1,
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
    handleSelectChange(value) {
        console.log(value)
        this.setState({
            client_name: this.state.users[value].name,
        }, () => {
            console.log(this.state.client_name)
        });
    }
    render() {
        const { dataSource, count, userNameList,
            client_id,
            client_name,
            resource_id,
            total_count,
            receivables_entity,
            receivables_account,
            pay_method,
            receivables_status,
            receivables_date,
            receivables_type,
            invoice_status,
            invoice_head,
            org_code,
            invoice_content,
            open_bank,
            invoice_type,
            mail_addr,
            invoice_date,
            orderId
        } = this.state;
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
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="应收管理" second="应收录入" third="编辑"/>
                <Tabs defaultActiveKey="1">

                    <TabPane tab="编辑应收录入" key="1">
                        <Row>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                            <Col span={24}>
                                                    <FormItem label="客户名称" colon={false}>
                                                        {/* <input placeholder="请输入公司名称" value={client_name} /> */}
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChange}
                                                        >
                                                            {userNameList.map((item, index) => {
                                                                return (
                                                                    <Option value={index} key={index}>{item}</Option>
                                                                )
                                                            })}
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="订单编号" colon={false}>
                                                        <input placeholder="请输入公司名称" value={orderId} onChange={event => {
                                                            this.setState({
                                                                orderId: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    {/* 资源属性 */}
                                                    <Row gutter={16}>
                                                        <Col className="gutter-row" span={24} >
                                                            <div className="gutter-box">
                                                                <Card bordered={false}>
                                                                    <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={false}/>
                                                                    <Button type="dashed" icon="plus-square" onClick={this.showModal}>新增资源属性</Button>
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
                                                        <input placeholder="请输入公司名称" value={orderId} onChange={event => {
                                                            this.setState({
                                                                total_count: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                    <FormItem label="收款主体" colon={false}>
                                                        <input placeholder="请输入收款主体" value={orderId} onChange={event => {
                                                            this.setState({
                                                                receivables_entity: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                    <FormItem label="收款账户" colon={false}>
                                                        <input placeholder="请输入收款账户" value={orderId} onChange={event => {
                                                            this.setState({
                                                                receivables_account: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                    <FormItem label="结算方式" colon={false}>
                                                        <RadioGroup onChange={this.onChange1} value={this.state.pay_method}>
                                                            <Radio value="1">月结</Radio>
                                                            <Radio value="2">预付</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="收款状态" colon={false}>
                                                        <RadioGroup onChange={this.onChange2} value={this.state.receivables_status}>
                                                            <Radio value="1">已收款</Radio>
                                                            <Radio value="2">未收款</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="收款日期" colon={false}>
                                                        <DatePicker placeholder="请选择" value={moment(receivables_date, 'YYYY/MM/DD')} onChange={()=>this.onChange} />
                                                    </FormItem>
                                                    <FormItem label="收款方式" colon={false}>
                                                        <RadioGroup onChange={this.onChange3} value={this.state.receivables_type}>
                                                            <Radio value="1">已收款</Radio>
                                                            <Radio value="2">未收款</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="开票状态" colon={false}>
                                                        <RadioGroup onChange={this.onChange4} value={this.state.invoice_status}>
                                                            <Radio value="1">已开票</Radio>
                                                            <Radio value="2">未开票</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="开票抬头" colon={false}>
                                                        <input placeholder="请输入开票抬头" value={invoice_head} onChange={event => {
                                                            this.setState({
                                                                invoice_head: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="组织机构代码" colon={false}>
                                                        <input placeholder="请输入组织机构代码" value={org_code} onChange={event => {
                                                            this.setState({
                                                                org_code: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                    <FormItem label="开票内容" colon={false}>
                                                        <TextArea rows={4} placeholder="请输入开票内容" value={invoice_content} onChange={event => {
                                                            this.setState({
                                                                invoice_content: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="开户银行" colon={false}>
                                                        <input placeholder="请输入开户银行" value={open_bank} onChange={event => {
                                                            this.setState({
                                                                open_bank: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                    <FormItem label="开票种类" colon={false}>
                                                        <input placeholder="请输入开票种类" value={invoice_type} onChange={event => {
                                                            this.setState({
                                                                invoice_type: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                    <FormItem label="邮寄地址" colon={false}>
                                                        <input placeholder="请输入邮寄地址" value={mail_addr} onChange={event => {
                                                            this.setState({
                                                                mail_addr: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                    <FormItem label="开票日期" colon={false}>
                                                        <DatePicker placeholder="请选择" value={moment(invoice_date, 'YYYY/MM/DD')} onChange={() => this.onChange} />
                                                    </FormItem>
                                                </Col>
                                                <Col span={8}>
                                                    <Button type="primary" htmlType="submit" onClick={()=>this.goBack()}>返回</Button></Col>
                                                <Col span={8}>
                                                    <Button type="primary" htmlType="submit" onClick={()=>this.supplierUpdate()}>保存</Button></Col>
                                            </Row>
                                        </Form>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>,
            </div>
        )
    }
}

const EditUserFiles = Form.create()(EditUserFiless);

export default EditUserFiles;