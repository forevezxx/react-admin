/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, 
    Select, Row, Col, Checkbox, Button, 
    Table, Menu, Tabs, Upload, DatePicker, Radio, Modal
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { clientPayRecordOne, clientPayRecordUpdate, resourceClientAdd } from '../../axios';
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
            // resource_attribute: '电信营销',
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
        userNameList: [],
        resource_id: [],
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
                dataSource: res.data.supplier.resource,
                orderId: res.data.supplier.orderId,
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
            resource_attribute: '',
            yd_count: '',
            lt1_count: '',
            lt2_count: '',
            dx_count: '',
            yd_last: '',
            lt1_last: '',
            lt2_last: '',
            dx_last: '',
            yd_cost: '',
            lt_cost: '',
            dx_cost: '',
            total: '',
        });
    }

    handleOk = (e) => {//新增资源属性
        console.log(e);
        let that = this;
        const {
            resource_attribute,
            yd_count,
            lt1_count,
            lt2_count,
            dx_count,
            yd_last,
            lt1_last,
            lt2_last,
            dx_last,
            yd_cost,
            lt_cost,
            dx_cost,
        } = this.state;
        let total = yd_count * yd_cost + lt1_count * lt_cost + lt2_count * lt_cost + dx_count * dx_cost;
        let dataSource = {
            resource_attribute,
            yd_count,
            lt1_count,
            lt2_count,
            dx_count,
            yd_last,
            lt1_last,
            lt2_last,
            dx_last,
            yd_cost,
            lt_cost,
            dx_cost,
            total,
        }
        let x = that.state.dataSource;
        x.push(dataSource);
        console.log(x);
        resourceClientAdd(dataSource).then(res => {
            console.log(res);
            let y = that.state.resource_id;
            if (res.msg == "success") {
                y.push(res.data.id);
                that.setState({
                    resource_id: y,
                    visible: false,
                    dataSource: x,
                }, () => {
                    that.setState({
                        total_count: that.totalPrice(x)
                    })
                })
            }
        })
    }
    totalPrice(arr) {
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
            dataIndex: 'resource_attribute',
            key: 'resource_attribute',
        }, {
            title: '移动充值条数',
            dataIndex: 'yd_count',
            key: 'yd_count',
        }, {
            title: '联通1充值条数',
            dataIndex: 'lt1_count',
            key: 'lt1_count',
        }, {
            title: '联通2充值条数',
            dataIndex: 'lt2_count',
            key: 'lt2_count',
        }, {
            title: '电信充值条数',
            dataIndex: 'dx_count',
            key: 'dx_count',
        }, {
            title: '移动剩余条数(元)',
            dataIndex: 'yd_last',
            key: 'yd_last',
        }, {
            title: '联通1剩余条数(元)',
            dataIndex: 'lt1_last',
            key: 'lt1_last',
        }, {
            title: '联通2剩余条数(元)',
            dataIndex: 'lt2_last',
            key: 'lt2_last',
        }, {
            title: '电信剩余条数(元)',
            dataIndex: 'dx_last',
            key: 'dx_last',
        }, {
            title: '移动单价(元)',
            dataIndex: 'yd_cost',
            key: 'yd_cost',
        }, {
            title: '联通单价(元)',
            dataIndex: 'lt_cost',
            key: 'lt_cost',
        }, {
            title: '电信单价(元)',
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
                                                        {/* <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChange}
                                                        >
                                                            {userNameList.map((item, index) => {
                                                                return (
                                                                    <Option value={index} key={index}>{item}</Option>
                                                                )
                                                            })}
                                                        </Select> */}
                                                        <input placeholder="请输入客户名称" value={client_name} disabled onChange={event => {
                                                            this.setState({
                                                                client_name: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                    <FormItem label="订单编号" colon={false}>
                                                        <input placeholder="请输入公司名称" value={orderId} disabled onChange={event => {
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
                                                                                    <input placeholder="请输入资源属性名称" value={this.state.resource_attribute} onChange={event => {
                                                                                        this.setState({
                                                                                            resource_attribute: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="移动充值条数" colon={false}>
                                                                                    <input placeholder="请输入充值条数" value={this.state.yd_count} onChange={event => {
                                                                                        this.setState({
                                                                                            yd_count: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="联通2充值条数" colon={false}>
                                                                                    <input placeholder="请输入充值条数" value={this.state.lt2_count} onChange={event => {
                                                                                        this.setState({
                                                                                            lt2_count: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="移动剩余条数" colon={false}>
                                                                                    <input placeholder="请输入剩余条数" value={this.state.yd_last} onChange={event => {
                                                                                        this.setState({
                                                                                            yd_last: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="联通2剩余条数" colon={false}>
                                                                                    <input placeholder="请输入剩余条数" value={this.state.lt2_last} onChange={event => {
                                                                                        this.setState({
                                                                                            lt2_last: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="移动单价" colon={false}>
                                                                                    <input placeholder="请输入单价" value={this.state.yd_cost} onChange={event => {
                                                                                        this.setState({
                                                                                            yd_cost: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="电信单价" colon={false}>
                                                                                    <input placeholder="请输入单价" value={this.state.dx_cost} onChange={event => {
                                                                                        this.setState({
                                                                                            dx_cost: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                            </Col>
                                                                            <Col span={12}>
                                                                                <FormItem label="联通1充值条数" colon={false}>
                                                                                    <input placeholder="请输入充值条数" value={this.state.lt1_count} onChange={event => {
                                                                                        this.setState({
                                                                                            lt1_count: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="电信充值条数" colon={false}>
                                                                                    <input placeholder="请输入充值条数" value={this.state.dx_count} onChange={event => {
                                                                                        this.setState({
                                                                                            dx_count: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="联通1剩余条数" colon={false}>
                                                                                    <input placeholder="请输入剩余条数" value={this.state.lt1_last} onChange={event => {
                                                                                        this.setState({
                                                                                            lt1_last: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="电信剩余条数" colon={false}>
                                                                                    <input placeholder="请输入剩余条数" value={this.state.dx_last} onChange={event => {
                                                                                        this.setState({
                                                                                            dx_last: event.target.value
                                                                                        });
                                                                                    }} />
                                                                                </FormItem>
                                                                                <FormItem label="联通单价" colon={false}>
                                                                                    <input placeholder="请输入单价" value={this.state.lt_cost} onChange={event => {
                                                                                        this.setState({
                                                                                            lt_cost: event.target.value
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
                                                        <input placeholder="请输入公司名称" value={total_count} onChange={event => {
                                                            this.setState({
                                                                total_count: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                    <FormItem label="收款主体" colon={false}>
                                                        <input placeholder="请输入收款主体" value={receivables_entity} onChange={event => {
                                                            this.setState({
                                                                receivables_entity: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                    <FormItem label="收款账户" colon={false}>
                                                        <input placeholder="请输入收款账户" value={receivables_account} onChange={event => {
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