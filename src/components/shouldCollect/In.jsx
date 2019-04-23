/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
const FormItem = Form.Item;
const Option = Select.Option;


class Ins extends Component {
    state = {
        confirmDirty: false,
    };
    newin() {//新建
        this.props.history.push('/app/shouldCollect/newin');
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const dataSource = [{
            key: '1',
            userId: 'id123456',
            createPerson: 'admin',
            userType: '管理用户',
            stuffName: '唐先生',
            position: '销售',
            telNum: '15099999999',
            jobNum: '22',
            accountName: '23456',
            accountPassword: '23456',
            entryTime: '2019.01.02',
        }, {
            key: '2',
            userId: 'id123456',
            createPerson: 'admin',
            userType: '管理用户',
            stuffName: '唐先生',
            position: '销售',
            telNum: '15099999999',
            jobNum: '22',
            accountName: '23456',
            accountPassword: '23456',
            entryTime: '2019.01.02',
        }];

        const columns = [{
            title: '客户订单编号',
            dataIndex: 'userId',
            key: 'userId',
        }, {
            title: '客户合同编号',
            dataIndex: 'createPerson',
            key: 'createPerson',
        }, {
            title: '合计金额(元)',
            dataIndex: 'userType',
            key: 'userType',
        }, {
            title: '结算方式',
            dataIndex: 'stuffName',
            key: 'stuffName',
        }, {
            title: '收款状态',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '收款方式',
            dataIndex: 'telNum',
            key: 'telNum',
        }, {
            title: '收款日期',
            dataIndex: 'jobNum',
            key: 'jobNum',
        }, {
            title: '开票状态',
            dataIndex: 'accountName',
            key: 'accountName',
        }, {
            title: '开票日期',
            dataIndex: 'accountPassword',
            key: 'accountPassword',
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text, record) => (
                <span>
                    <a href="javascript:;">查看</a>
                    <a href="javascript:;">编辑</a>
                </span>
            )
        }];
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="应收管理" second="应收录入" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="订单编号" colon={false}>
                                                <input placeholder="请输入订单编号" />
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="合同编号" colon={false}>
                                                <input placeholder="请输入合同编号" />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="收款状态" colon={false}>
                                                <Select
                                                    placeholder="请选择"
                                                    onChange={this.handleSelectChange}
                                                >
                                                    <Option value="male">male</Option>
                                                    <Option value="female">female</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="开票状态" colon={false}>
                                                <Select
                                                    placeholder="请选择"
                                                    onChange={this.handleSelectChange}
                                                >
                                                    <Option value="male">male</Option>
                                                    <Option value="female">female</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.newin()}><Icon type="plus" />新建</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit"><Icon type="upload" />导出</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24} >
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Table columns={columns} dataSource={dataSource} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const In = Form.create()(Ins);

export default In;