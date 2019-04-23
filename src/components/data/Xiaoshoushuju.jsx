/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
const FormItem = Form.Item;
const Option = Select.Option;


class Xiaoshoushujus extends Component {
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
            title: '销售员',
            dataIndex: 'createPerson',
            key: 'createPerson',
        }, {
            title: '当前排名',
            dataIndex: 'userType',
            key: 'userType',
        }, {
            title: '考核月份',
            dataIndex: 'stuffName',
            key: 'stuffName',
        }, {
            title: '月度指标',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '月度回款金额(元)',
            dataIndex: 'telNum',
            key: 'telNum',
        }, {
            title: '提成金额(元)',
            dataIndex: 'jobNum',
            key: 'jobNum',
        }, {
            title: '所属部门',
            dataIndex: 'accountName',
            key: 'accountName',
        }, {
            title: '入职时间',
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
                <BreadcrumbCustom first="数据管理" second="销售数据" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={6}>
                                            <FormItem label="销售员" colon={false}>
                                                <input placeholder="请输入销售员姓名" />
                                            </FormItem>
                                        </Col>
                                        <Col md={6}>
                                            <FormItem label="考核月份" colon={false}>
                                                <Select
                                                    placeholder="请选择"
                                                    onChange={this.handleSelectChange}
                                                >
                                                    <Option value="0">1月</Option>
                                                    <Option value="1">2月</Option>
                                                    <Option value="2">3月</Option>
                                                    <Option value="3">4月</Option>
                                                    <Option value="4">5月</Option>
                                                    <Option value="5">6月</Option>
                                                    <Option value="6">7月</Option>
                                                    <Option value="7">8月</Option>
                                                    <Option value="8">9月</Option>
                                                    <Option value="9">10月</Option>
                                                    <Option value="10">11月</Option>
                                                    <Option value="11">12月</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col md={6}>
                                            <FormItem label="月度指标" colon={false}>
                                                <Select
                                                    placeholder="请选择"
                                                    onChange={this.handleSelectChange}
                                                >
                                                    <Option value="0">1月</Option>
                                                    <Option value="1">2月</Option>
                                                </Select>
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

const Xiaoshoushuju = Form.create()(Xiaoshoushujus);

export default Xiaoshoushuju;