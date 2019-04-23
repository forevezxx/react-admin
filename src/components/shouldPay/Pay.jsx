/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
const FormItem = Form.Item;
const Option = Select.Option;


class Pays extends Component {
    state = {
        confirmDirty: false,
    };
    NewPay() {//新建
        this.props.history.push('/app/shouldPay/newPay');
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
            title: '编号',
            dataIndex: 'userId',
            key: 'userId',
        }, {
            title: '订单合同编号',
            dataIndex: 'createPerson',
            key: 'createPerson',
        }, {
            title: '合计金额(元)',
            dataIndex: 'userType',
            key: 'userType',
        }, {
            title: '付款主体',
            dataIndex: 'stuffName',
            key: 'stuffName',
        }, {
            title: '付款方式',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '付款账号',
            dataIndex: 'telNum',
            key: 'telNum',
        }, {
            title: '付款日期',
            dataIndex: 'jobNum',
            key: 'jobNum',
        }, {
            title: '付款状态',
            dataIndex: 'accountName',
            key: 'accountName',
        }, {
            title: '开票状态',
            dataIndex: 'accountPassword',
            key: 'accountPassword',
        }, {
            title: '平帐状态',
            dataIndex: 'entryTime',
            key: 'entryTime',
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
                <BreadcrumbCustom first="应付管理" second="应付录入" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="合同编号" colon={false}>
                                                <input placeholder="请输入订单合同编号" />
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="付款主体" colon={false}>
                                                <input placeholder="请输入付款主体" />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="付款状态" colon={false}>
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
                                            <Button type="primary" htmlType="submit" onClick={()=>this.NewPay()} ><Icon type="plus" />新建</Button>
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

const Pay = Form.create()(Pays);

export default Pay;