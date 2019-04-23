/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table, DatePicker } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
const FormItem = Form.Item;
const Option = Select.Option;


class Kehushujus extends Component {
    state = {
        confirmDirty: false,
    };
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
            title: '客户姓名',
            dataIndex: 'createPerson',
            key: 'createPerson',
        }, {
            title: '客户公司名称',
            dataIndex: 'userType',
            key: 'userType',
        }, {
            title: '回款产品',
            dataIndex: 'stuffName',
            key: 'stuffName',
        }, {
            title: '产品数量',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '产品单价(元)',
            dataIndex: 'telNum',
            key: 'telNum',
        }, {
            title: '产品总价(元)',
            dataIndex: 'jobNum',
            key: 'jobNum',
        }, {
            title: '回款(元)',
            dataIndex: 'accountName',
            key: 'accountName',
        }, {
            title: '回款日期',
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
                <BreadcrumbCustom first="数据管理" second="客户数据" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="客户姓名" colon={false}>
                                                <input placeholder="请输入客户姓名" />
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="公司名称" colon={false}>
                                                <input placeholder="请输入公司名称" />
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="回款日期" colon={false}>
                                                <DatePicker onChange={()=>this.onChange} />
                                            </FormItem>
                                        </Col>
                                        
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit"><Icon type="plus" />新建</Button>
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

const Kehushuju = Form.create()(Kehushujus);

export default Kehushuju;