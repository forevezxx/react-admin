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
import { supplierPayRecordAdd, resourceAdd, resourceAll, resourceSearch, resourceOne, resourceUpdate, supplierGetData } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class NewPays extends Component {
    state = {
        confirmDirty: false,
        supplier_id: '',
        supplier_name: '',
        order_num: '',
        total_price: '',
        pay_type: 1,
        status: 1,
        pay_time: '',
        pay_entity: '',
        pay_account: '',
        receipt_status: 1,
        receipt_head: '',
        org_code: '',
        receipt_content: '',
        deposit_bank: '',
        receipt_type: 1,
        address: '',
        flat_account_type: 1,
        backup: '',
        
        dataSource: [
            // {
            //     id: '1',
            //     resource_attribute: '电信营销',
            //     pay_method: '月结',
            //     yd_count: '1',
            //     lt1_count: '1',
            //     lt2_count: '1',
            //     dx_count: '1',
            //     yd_money: '0.026',
            //     lt1_money: '0.026',
            //     lt2_money: '0.026',
            //     dx_money: '0.026',
            //     yd_cost: '0.026',
            //     lt1_cost: '0.026',
            //     dx_cost: '0.026',
            //     total: '1000',
            // }
        ],
        resource_id: "1",
        visible: false,
        userNameList: [],
        resource_attribute: '',
        pay_method: '',
        yd_count: '',
        lt1_count: '',
        lt2_count: '',
        dx_count: '',
        yd_money: '',
        lt1_money: '',
        lt2_money: '',
        dx_money: '',
        yd_cost: '',
        lt1_cost: '',
        dx_cost: '',
        total: '',
    };
    componentDidMount() {
        this.supplierGetData();
    }
    supplierGetData() {
        let that = this;
        supplierGetData().then(res => {
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
            x.push(dataList[i].company_name);
        }
        this.setState({
            userNameList: x,
        })
    }

    onChange(date, dateString) {
        console.log(date, dateString);
        this.setState({
            pay_time: dateString,
        })
    }

    onChangeDate(date, dateString) {
        console.log(date, dateString);
        this.setState({
            receipt_date: dateString,
        })
    }

    onChange2 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            status: e.target.value,
        });
    }
    onChange3 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            receipt_status: e.target.value,
        });
    }
    onChange4 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            flat_account_type: e.target.value,
        });
    }
    onChange5 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            pay_type: e.target.value,
        });
    }
    goBack() {
        this.props.history.push(`/app/shouldPay/pay`);
    }
    newSupplier() {
        const { 
            supplier_name,
        order_num,
        resource_id,
        total_price,
        pay_type,
        status,
        pay_time,
        pay_entity,
        pay_account,
        receipt_status,
        receipt_head,
        org_code,
        receipt_content,
        deposit_bank,
        receipt_type,
        address,
        flat_account_type,
        backup,
        } = this.state;
        const token = localStorage.getItem('user_token');
        let data = {
            supplier_name,
        order_num,
        resource_id,
        total_price,
        pay_type,
        status,
        pay_time,
        pay_entity,
        pay_account,
        receipt_status,
        receipt_head,
        org_code,
        receipt_content,
        deposit_bank,
        receipt_type,
        address,
        flat_account_type,
        backup,
            token
        }
        supplierPayRecordAdd(data).then(res => {
            console.log(res);
            if (res.msg === "success") {
                this.props.history.push(`/app/shouldPay/pay`);
            }
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
            resource_attribute: '',
            pay_method: '',
            yd_count: '',
            lt1_count: '',
            lt2_count: '',
            dx_count: '',
            yd_money: '',
            lt1_money: '',
            lt2_money: '',
            dx_money: '',
            yd_cost: '',
            lt1_cost: '',
            dx_cost: '',
            total: '',
        });
    }

    handleOk = (e) => {//新增资源属性
        console.log(e);
        let that = this;
        const {
            resource_attribute,
            pay_method,
            yd_count,
            lt1_count,
            lt2_count,
            dx_count,
            yd_money,
            lt1_money,
            lt2_money,
            dx_money,
            yd_cost,
            lt1_cost,
            dx_cost,
        } = that.state;
        let dataSource = {
            // id: that.state.dataSource[that.state.dataSource.length - 1].id + 1,
            resource_attribute,
            pay_method,
            yd_count,
            lt1_count,
            lt2_count,
            dx_count,
            yd_money,
            lt1_money,
            lt2_money,
            dx_money,
            yd_cost,
            lt1_cost,
            dx_cost,
            // total: that.state.total,
            // total: yd_count * (yd_money - yd_cost) + lt1_count * (lt1_money - lt1_cost) + lt2_count * (lt2_money - lt1_cost) + dx_count * (dx_money - dx_cost)
            total: yd_count * (yd_money ) + lt1_count * (lt1_money ) + lt2_count * (lt2_money ) + dx_count * (dx_money )
        }
        let x = that.state.dataSource;
        x.push(dataSource);
        console.log(x);
        resourceAdd(dataSource).then(res=>{
            console.log(res);
            if (res.msg == "success"){
                that.setState({
                    resource_id: res.data.id,
                    visible: false,
                    dataSource: x,
                },()=>{
                    that.setState({
                        total_price: that.totalPrice(x)
                    })
                })
            }
        })
        
    }
    totalPrice(arr){
        let x = 0;
        arr.forEach(element => {
            x = x + Number(element.total);
        });
        console.log(x);
        return x;
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
            supplier_name: this.state.users[value].company_name,
            order_num: this.state.users[value].contract_num,
        });
    }
    render() {
        const { dataSource, count, userNameList,
            resource_attribute,
            pay_method,
            yd_count,
            lt1_count,
            lt2_count,
            dx_count,
            yd_money,
            lt1_money,
            lt2_money,
            dx_money,
            yd_cost,
            lt1_cost,
            dx_cost,
            total,
        } = this.state;
        console.log(dataSource);
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const columns = [{
            title: '资源属性',
            dataIndex: 'resource_attribute',
            key: 'resource_attribute',
        }, {
            title: '付款方式',
            dataIndex: 'pay_method',
            key: 'pay_method',
        }, {
            title: '移动消耗条数',
            dataIndex: 'yd_count',
            key: 'yd_count',
        }, {
            title: '联通1消耗条数',
            dataIndex: 'lt1_count',
            key: 'lt1_count',
        }, {
            title: '联通2消耗条数',
            dataIndex: 'lt2_count',
            key: 'lt2_count',
        }, {
            title: '电信消耗条数',
            dataIndex: 'dx_count',
            key: 'dx_count',
        }, {
            title: '移动单价(元)',
            dataIndex: 'yd_money',
            key: 'yd_money',
        }, {
            title: '联通1单价(元)',
            dataIndex: 'lt1_money',
            key: 'lt1_money',
        }, {
            title: '联通2单价(元)',
            dataIndex: 'lt2_money',
            key: 'lt2_money',
        }, {
            title: '电信单价(元)',
            dataIndex: 'dx_money',
            key: 'dx_money',
        }, {
            title: '移动成本(元)',
            dataIndex: 'yd_cost',
            key: 'yd_cost',
        }, {
            title: '联通成本(元)',
            dataIndex: 'lt1_cost',
            key: 'lt1_cost',
        }, {
            title: '电信成本(元)',
            dataIndex: 'dx_cost',
            key: 'dx_cost',
        }, {
            title: '总金额(元)',
            dataIndex: 'total',
            key: 'total',
        }];
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="应付管理" second="应付录入" third="新增应付录入" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="新增应付录入" key="1">
                        <Row>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col span={24}>
                                                    <FormItem label="供应商名称" colon={false}>
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
                                                    </FormItem>
                                                    <FormItem label="订单合同编号" colon={false}>
                                                        <input placeholder="请输入订单合同编号" disabled value={this.state.order_num} onChange={event => {
                                                            this.setState({
                                                                order_num: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
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
                                                                                    <input placeholder="请输入资源属性名称" value={resource_attribute} onChange={event=>{
                                                                                        this.setState({
                                                                                            resource_attribute: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="移动消耗条数" colon={false}>
                                                                                    <input placeholder="请输入消耗条数" value={yd_count} onChange={event=>{
                                                                                        this.setState({
                                                                                            yd_count: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="联通2消耗条数" colon={false}>
                                                                                    <input placeholder="请输入消耗条数" value={lt2_count} onChange={event=>{
                                                                                        this.setState({
                                                                                            lt2_count: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="移动报价" colon={false}>
                                                                                    <input placeholder="请输入报价" value={yd_money} onChange={event=>{
                                                                                        this.setState({
                                                                                            yd_money: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="联通2报价" colon={false}>
                                                                                    <input placeholder="请输入报价" value={lt2_money} onChange={event=>{
                                                                                        this.setState({
                                                                                            lt2_money: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="移动成本" colon={false}>
                                                                                    <input placeholder="请输入成本" value={yd_cost} onChange={event=>{
                                                                                        this.setState({
                                                                                            yd_cost: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="电信成本" colon={false}>
                                                                                    <input placeholder="请输入成本" value={dx_cost} onChange={event=>{
                                                                                        this.setState({
                                                                                            dx_cost: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                            </Col>
                                                                            <Col span={12}>
                                                                                <FormItem label="付款方式" colon={false}>
                                                                                    <input placeholder="请输入付款方式" value={pay_method} onChange={event=>{
                                                                                        this.setState({
                                                                                            pay_method: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="联通1消耗条数" colon={false}>
                                                                                    <input placeholder="请输入消耗条数" value={lt1_count} onChange={event=>{
                                                                                        this.setState({
                                                                                            lt1_count: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="电信消耗条数" colon={false}>
                                                                                    <input placeholder="请输入消耗条数" value={dx_count} onChange={event=>{
                                                                                        this.setState({
                                                                                            dx_count: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="联通1报价" colon={false}>
                                                                                    <input placeholder="请输入报价" value={lt1_money} onChange={event=>{
                                                                                        this.setState({
                                                                                            lt1_money: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="电信报价" colon={false}>
                                                                                    <input placeholder="请输入报价" value={dx_money} onChange={event=>{
                                                                                        this.setState({
                                                                                            dx_money: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                <FormItem label="联通成本" colon={false}>
                                                                                    <input placeholder="请输入成本" value={lt1_cost} onChange={event=>{
                                                                                        this.setState({
                                                                                            lt1_cost: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem>
                                                                                {/* <FormItem label="总金额" colon={false}>
                                                                                    <input placeholder="请输入总金额" value={total} onChange={event=>{
                                                                                        this.setState({
                                                                                            total: event.target.value
                                                                                        });
                                                                                    }}/>
                                                                                </FormItem> */}
                                                                            </Col>
                                                                        </Row>
                                                                    </Modal>
                                                                </Card>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <FormItem label="合计金额" colon={false}>
                                                        <input placeholder="请输入合计金额" value={this.state.total_price} onChange={event => {
                                                            this.setState({
                                                                total_price: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                    <FormItem label="付款方式" colon={false}>
                                                        <RadioGroup onChange={this.onChange5.bind(this)} value={this.state.pay_type}>
                                                            <Radio value={0}>对公</Radio>
                                                            <Radio value={1}>对私</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="付款状态" colon={false}>
                                                        <RadioGroup onChange={this.onChange2.bind(this)} value={this.state.status}>
                                                            <Radio value={0}>已付款</Radio>
                                                            <Radio value={1}>未付款</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="付款日期" colon={false}>
                                                        <DatePicker placeholder="请选择" onChange={this.onChange.bind(this)} />
                                                    </FormItem>
                                                    <FormItem label="付款主体" colon={false}>
                                                        <input placeholder="请输入付款主体" onChange={event => {
                                                            this.setState({
                                                                pay_entity: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="付款账号" colon={false}>
                                                        <input placeholder="请输入付款账号" onChange={event => {
                                                            this.setState({
                                                                pay_account: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="开票状态" colon={false}>
                                                        <RadioGroup onChange={this.onChange3} value={this.state.receipt_status}>
                                                            <Radio value={1}>已开票</Radio>
                                                            <Radio value={0}>未开票</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="开票抬头" colon={false}>
                                                        <input placeholder="请输入开票抬头" onChange={event => {
                                                            this.setState({
                                                                receipt_head: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="组织机构代码" colon={false}>
                                                        <input placeholder="请输入组织机构代码" onChange={event => {
                                                            this.setState({
                                                                org_code: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="开票内容" colon={false}>
                                                        <TextArea rows={4} placeholder="请输入开票内容" onChange={event => {
                                                            this.setState({
                                                                receipt_content: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="开户银行" colon={false}>
                                                        <input placeholder="请输入开户银行" onChange={event => {
                                                            this.setState({
                                                                deposit_bank: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="开票种类" colon={false}>
                                                        <input placeholder="请输入开票种类" onChange={event => {
                                                            this.setState({
                                                                receipt_type: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="邮寄地址" colon={false}>
                                                        <input placeholder="请输入邮寄地址" onChange={event => {
                                                            this.setState({
                                                                address: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                    <FormItem label="开票日期" colon={false}>
                                                        <DatePicker placeholder="请选择" onChange={this.onChangeDate.bind(this)} />
                                                    </FormItem>
                                                    <FormItem label="平账状态" colon={false}>
                                                        <RadioGroup onChange={this.onChange4} value={this.state.flat_account_type}>
                                                            <Radio value={1}>已平账</Radio>
                                                            <Radio value={0}>未平账</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="备注信息" colon={false}>
                                                        <TextArea rows={4} placeholder="请输入备注信息" onChange={event => {
                                                            this.setState({
                                                                backup: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                </Col>
                                                <Col span={8}>
                                                    <Button type="primary" htmlType="submit" onClick={()=>this.goBack()}>返回</Button></Col>
                                                <Col span={8}>
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