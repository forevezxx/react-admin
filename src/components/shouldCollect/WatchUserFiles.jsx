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
import { clientOne } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;


class WatchUserFiless extends Component {
    state = {
        data: {},
        values: 1,
        values2: 1,
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
                data: res.data.supplier
            })
        })
    }
    goBack() {
        this.props.history.push(`/app/shouldCollect/userFiles`);
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { data } = this.state;
        const { getFieldDecorator } = this.props.form;
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
                                                    <FormItem label="客户编号" colon={false}>
                                                        <input placeholder="请输入客户编号" value={data.client_number} />
                                                    </FormItem>
                                                    <FormItem label="客户名称" colon={false}>
                                                        <input placeholder="请输入客户名称" value={data.name} />
                                                    </FormItem>
                                                    <FormItem label="订单编号" colon={false}>
                                                        <input placeholder="请输入订单编号" value={data.order_id} />
                                                    </FormItem>
                                                    <FormItem label="资源属性" colon={false}>
                                                        <input placeholder="请输入资源属性" value={data.resource_type} />
                                                    </FormItem>
                                                    <FormItem label="负责人" colon={false}>
                                                        <input placeholder="请输入负责人姓名" value={data.principal_name} />
                                                    </FormItem>
                                                    <FormItem label="联系电话" colon={false}>
                                                        <input placeholder="请输入联系电话" value={data.mobile} />
                                                    </FormItem>
                                                    <FormItem label="所在地址" colon={false}>
                                                        <input placeholder="请输入省、市、区、详细地址" value={data.address} />
                                                    </FormItem>
                                                    <FormItem label="客户邮箱" colon={false}>
                                                        <input placeholder="请输入客户邮箱" value={data.email} />
                                                    </FormItem>

                                                    <FormItem label="客户来源" colon={false}>
                                                        {/* <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChange} value={this.state.values2}
                                                        >
                                                            <Option value={1}>展会</Option>
                                                            <Option value={2}>广告杂志</Option>
                                                            <Option value={3}>客户转介绍</Option>
                                                        </Select> */}
                                                        <input placeholder="请输入客户来源" value={data.client_from == 0 ? '展会' : data.client_from == 1 ? "广告杂志": "客户转介绍"} />
                                                    </FormItem>
                                                    <FormItem label="跟进人员" colon={false}>
                                                        <input placeholder="请输入跟进人员" value={data.follower} />
                                                    </FormItem>
                                                    <FormItem label="跟进时间" colon={false}>
                                                        {/* <DatePicker placeholder="请选择" onChange={() => this.onChange} /> */}
                                                        <input placeholder="请输入跟进时间" value={data.follow_date} />
                                                    </FormItem>
                                                    <FormItem label="平账状态" colon={false}>
                                                        {/* <RadioGroup onChange={this.onChange3} value={this.state.values}>
                                                            <Radio value={1}>已平账</Radio>
                                                            <Radio value={2}>未平账</Radio>
                                                        </RadioGroup> */}
                                                        <input placeholder="请输入平账状态" value={data.flat_account_type == 0 ? '未平帐' : '已平帐'} />
                                                    </FormItem>
                                                    <FormItem label="创建人" colon={false}>
                                                        <input disabled value="wendy" />
                                                    </FormItem>
                                                    <FormItem label="创建时间" colon={false}>
                                                        <input disabled value="2019.02.28 09:30:56" />
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