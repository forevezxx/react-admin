/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, 
    Select, Row, Col, Checkbox, Button, 
    Table, Menu, Tabs, Upload, DatePicker, Radio
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { clientOne, clientUpdate } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;


class EditUserFiless extends Component {
    state = {
        client_number: '',
        name: '',
        order_id: '',
        resource_type: '1',
        principal_name: '',
        mobile: '',
        address: '',
        email: '',
        client_from: '0',
        follower: '',
        follow_date: '',
        flat_account_type: '1',
        data: {},
    };
    componentDidMount() {
        this.getSupplierOne(this.props.match.params.id);
    }
    getSupplierOne(id) {
        let data = {
            id
        }
        clientOne(data).then(res => {
            this.setState({
                client_number: res.data.supplier.client_number,
                name: res.data.supplier.name,
                order_id: res.data.supplier.order_id,
                resource_type: res.data.supplier.resource_type,
                principal_name: res.data.supplier.principal_name,
                mobile: res.data.supplier.mobile,
                address: res.data.supplier.address,
                email: res.data.supplier.email,
                client_from: res.data.supplier.client_from,
                follower: res.data.supplier.follower,
                follow_date: res.data.supplier.follow_date,
                flat_account_type: res.data.supplier.flat_account_type,
            })
        })
    }
    onChangeDate(date, dateString) {
        console.log(date, dateString);
        this.setState({
            follow_date: dateString,
        })
    }
    onChange1(value) {
        console.log(value)
        this.setState({
            client_from: value,
        });
    }
    onChange3 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            flat_account_type: e.target.value,
        });
    }
    goBack() {
        this.props.history.push(`/app/shouldCollect/userFiles`);
    }
    supplierUpdate() {
        const {
            id,
            client_number,
            name,
            order_id,
            resource_type,
            principal_name,
            mobile,
            address,
            email,
            client_from,
            follower,
            follow_date,
            flat_account_type,
        } = this.state;
        let data = {
            id: this.props.match.params.id,
            update_json: JSON.stringify({
                client_number,
                name,
                order_id,
                resource_type,
                principal_name,
                mobile,
                address,
                email,
                client_from,
                follower,
                follow_date,
                flat_account_type,
            }),
            token: localStorage.getItem('user_token'),
        };
        clientUpdate(data).then(res => {
            if (res.msg === "success") {
                this.props.history.push(`/app/shouldCollect/userFiles`);
            }
        })
    }
    render() {
        const { 
            client_number,
            name,
            order_id,
            resource_type,
            principal_name,
            mobile,
            address,
            email,
            client_from,
            follower,
            follow_date,
            flat_account_type,
         } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="应收管理" second="客户档案" third="编辑"/>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="编辑客户档案" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="客户编号" colon={false}>
                                                        <input placeholder="请输入客户编号" value={client_number}  onChange={event => {
                                                            this.setState({
                                                                client_number: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="客户名称" colon={false}>
                                                        <input placeholder="请输入客户名称" value={name}  onChange={event => {
                                                            this.setState({
                                                                name: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="订单编号" colon={false}>
                                                        <input placeholder="请输入订单编号" value={order_id}  onChange={event => {
                                                            this.setState({
                                                                order_id: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                    <FormItem label="资源属性" colon={false}>
                                                        <input placeholder="请输入资源属性" value={resource_type}  onChange={event => {
                                                            this.setState({
                                                                resource_type: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                    <FormItem label="负责人" colon={false}>
                                                        <input placeholder="请输入负责人姓名" value={principal_name}  onChange={event => {
                                                            this.setState({
                                                                principal_name: event.target.value
                                                            });
                                                        }} />
                                                    </FormItem>
                                                    <FormItem label="联系电话" colon={false}>
                                                        <input placeholder="请输入联系电话" value={mobile}  onChange={event => {
                                                            this.setState({
                                                                mobile: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="所在地址" colon={false}>
                                                        <input placeholder="请输入省、市、区、详细地址" value={address}  onChange={event => {
                                                            this.setState({
                                                                address: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="客户邮箱" colon={false}>
                                                        <input placeholder="请输入客户邮箱" value={email}  onChange={event => {
                                                            this.setState({
                                                                email: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>

                                                    <FormItem label="客户来源" colon={false}>
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.onChange1.bind(this)} value={client_from}
                                                        >
                                                            <Option value="0">展会</Option>
                                                            <Option value="1">广告杂志</Option>
                                                            <Option value="2">客户转介绍</Option>
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="跟进人员" colon={false}>
                                                        <input placeholder="请输入跟进人员" value="wendy" onChange={event => {
                                                            this.setState({
                                                                follower: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="跟进时间" colon={false}>
                                                        <DatePicker placeholder="请选择" onChange={this.onChangeDate.bind(this)} />
                                                    </FormItem>
                                                    <FormItem label="平账状态" colon={false}>
                                                        <RadioGroup onChange={this.onChange3} value={flat_account_type}>
                                                            <Radio value="1">已平账</Radio>
                                                            <Radio value="0">未平账</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="创建人" colon={false}>
                                                        <input disabled value="wendy" />
                                                    </FormItem>
                                                    <FormItem label="创建时间" colon={false}>
                                                        <input disabled value="2019.02.28 09:30:56" />
                                                    </FormItem>
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={()=>this.goBack()}>返回</Button></Col>
                                                <Col md={8}>
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