/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import {
    Card, Form, Input, Tooltip, Icon, Cascader,
    Select, Row, Col, Checkbox, Button,
    Table, Menu, Tabs, Upload, DatePicker, Radio, Modal
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { clientPayRecordAdd, clientGetData } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class NewIns extends Component {    
    state = {
        client_id: '',
        client_name: '',
        total_count: '',
        receivables_entity: '',
        receivables_account: '',
        pay_method: 1,
        receivables_status: '',
        receivables_date: '',
        receivables_type: '',
        invoice_status: '',
        invoice_head: '',
        org_code: '',
        invoice_content: '',
        open_bank: '',
        invoice_type: '',
        mail_addr: '',
        invoice_date: '',
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
        resource_id: '1',
        userNameList: [],
    };
    componentDidMount() {
        this.clientGetData();
    }
    clientGetData() {
        let that = this;
        clientGetData().then(res => {
            that.setState({
                users: res.data,
            }, () => {
                    that.formatUsers(res.data);
            })
        })
    }
    formatUsers(dataList) {
        let x = [];
        for (var i = 0; i < dataList.length; i++) {
            x.push(dataList[i].name);
        }
        this.setState({
            userNameList: x,
        })
    }
    onChange(date, dateString) {
        console.log(date, dateString);
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
            value2: e.target.value,
        });
    }
    onChange3 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value3: e.target.value,
        });
    }
    onChange4 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value4: e.target.value,
        });
    }
    goBack() {
        this.props.history.push(`/app/shouldCollect/in`);
    }
    
    newSupplier() {
        const { 
            client_id,
            client_name,
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
        } = this.state;
        const token = localStorage.getItem('user_token');
        let data = {
            client_id,
            client_name,
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
            token
        }
        clientPayRecordAdd(data).then(res => {
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
            id: that.state.dataSource[that.state.dataSource.length-1].id + 1,
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
            name: this.state.users[value].name,
        },()=>{
            console.log(this.state.name)
        });
    }
    render() {
        const { dataSource, count, userNameList } = this.state;
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
            title: '移动充值条数',
            dataIndex: 'yidong',
            key: 'yidong',
        }, {
            title: '联通1充值条数',
            dataIndex: 'liantong1',
            key: 'liantong1',
        }, {
            title: '联通2充值条数',
            dataIndex: 'liantong2',
            key: 'liantong2',
        }, {
            title: '电信充值条数',
            dataIndex: 'dianxing',
            key: 'dianxing',
        }, {
            title: '移动剩余条数(元)',
            dataIndex: 'yidong_price',
            key: 'yidong_price',
        }, {
            title: '联通1剩余条数(元)',
            dataIndex: 'liantong1_price',
            key: 'liantong1_price',
        }, {
            title: '联通2剩余条数(元)',
            dataIndex: 'liantong2_price',
            key: 'liantong2_price',
        }, {
            title: '电信剩余条数(元)',
            dataIndex: 'dianxing_price',
            key: 'dianxing_price',
        }, {
            title: '移动单价(元)',
            dataIndex: 'yidong_cost',
            key: 'yidong_cost',
        }, {
            title: '联通单价(元)',
            dataIndex: 'liantong_cost',
            key: 'liantong_cost',
        }, {
            title: '电信单价(元)',
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
                                                            onChange={this.handleSelectChange.bind(this)}
                                                        >
                                                            {userNameList.map((item, index) => {
                                                                return (
                                                                    <Option value={index} key={index}>{item}</Option>
                                                                )
                                                            })}
                                                        </Select>
                                                        {/* <input placeholder="请输入客户名称" /> */}
                                                    </FormItem>
                                                    <FormItem label="订单编号" colon={false}>
                                                        <input placeholder="请输入公司名称" disabled value="NO.123654"/>
                                                    </FormItem>
                                                    {/* 资源属性 */}
                                                    <Row gutter={16}>
                                                        <Col className="gutter-row" md={24} >
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
                                                                                <FormItem label="移动充值条数" colon={false}>
                                                                                    <input placeholder="请输入充值条数" onChange={event=>{
                                                                                        this.setState({
                                                                                            yidong: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="联通2充值条数" colon={false}>
                                                                                    <input placeholder="请输入充值条数" onChange={event=>{
                                                                                        this.setState({
                                                                                            liantong2: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="移动剩余条数" colon={false}>
                                                                                    <input placeholder="请输入剩余条数" onChange={event=>{
                                                                                        this.setState({
                                                                                            yidong_price: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="联通2剩余条数" colon={false}>
                                                                                    <input placeholder="请输入剩余条数" onChange={event=>{
                                                                                        this.setState({
                                                                                            liantong2_price: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="移动单价" colon={false}>
                                                                                    <input placeholder="请输入单价" onChange={event=>{
                                                                                        this.setState({
                                                                                            yidong_cost: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="电信单价" colon={false}>
                                                                                    <input placeholder="请输入单价" onChange={event=>{
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
                                                                                <FormItem label="联通1充值条数" colon={false}>
                                                                                    <input placeholder="请输入充值条数" onChange={event=>{
                                                                                        this.setState({
                                                                                            liantong1: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="电信充值条数" colon={false}>
                                                                                    <input placeholder="请输入充值条数" onChange={event=>{
                                                                                        this.setState({
                                                                                            dianxing: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="联通1剩余条数" colon={false}>
                                                                                    <input placeholder="请输入剩余条数" onChange={event=>{
                                                                                        this.setState({
                                                                                            liantong1_price: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="电信剩余条数" colon={false}>
                                                                                    <input placeholder="请输入剩余条数" onChange={event=>{
                                                                                        this.setState({
                                                                                            dianxing_price: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="联通单价" colon={false}>
                                                                                    <input placeholder="请输入单价" onChange={event=>{
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
                                                        <input placeholder="请输入公司名称" disabled value="11,000,000" />
                                                    </FormItem>
                                                    <FormItem label="收款主体" colon={false}>
                                                        <input placeholder="请输入收款主体" />
                                                    </FormItem>
                                                    <FormItem label="收款账户" colon={false}>
                                                        <input placeholder="请输入收款账户" />
                                                    </FormItem>
                                                    <FormItem label="结算方式" colon={false}>
                                                        <RadioGroup onChange={this.onChange1} value={this.state.pay_method}>
                                                            <Radio value={1}>月结</Radio>
                                                            <Radio value={2}>预付</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="收款状态" colon={false}>
                                                        <RadioGroup onChange={this.onChange2} value={this.state.receivables_status}>
                                                            <Radio value={1}>已收款</Radio>
                                                            <Radio value={2}>未收款</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="收款日期" colon={false}>
                                                        <DatePicker onChange={()=>this.onChange} />
                                                    </FormItem>
                                                    <FormItem label="收款方式" colon={false}>
                                                        <RadioGroup onChange={this.onChange3} value={this.state.receivables_type}>
                                                            <Radio value={1}>已收款</Radio>
                                                            <Radio value={2}>未收款</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="开票状态" colon={false}>
                                                        <RadioGroup onChange={this.onChange4} value={this.state.value4}>
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
                                                        <DatePicker placeholder="请选择" onChange={() => this.onChange} />
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