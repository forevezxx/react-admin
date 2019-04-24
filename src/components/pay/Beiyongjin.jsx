/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table, Tabs } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;


class Beiyongjins extends Component {
    state = {
        confirmDirty: false,
    };
    NewInPay() {//新建入账
        this.props.history.push('/app/pay/newinpay');
    }
    NewOutPay() {//新建出账
        this.props.history.push('/app/pay/newoutpay');
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
            title: '备用金总额(元)',
            dataIndex: 'createPerson',
            key: 'createPerson',
        }, {
            title: '入账人',
            dataIndex: 'userType',
            key: 'userType',
        }, {
            title: '入账时间',
            dataIndex: 'stuffName',
            key: 'stuffName',
        }, {
            title: '入账方式',
            dataIndex: 'position',
            key: 'position',
        }];
        const columns2 = [{
            title: '编号',
            dataIndex: 'userId',
            key: 'userId',
        }, {
            title: '备用金总额(元)',
            dataIndex: 'createPerson',
            key: 'createPerson',
        }, {
            title: '出账人',
            dataIndex: 'userType',
            key: 'userType',
        }, {
            title: '出账金额(元)',
            dataIndex: 'stuffName',
            key: 'stuffName',
        }, {
            title: '出账用途',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '出账时间',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '当前结余',
            dataIndex: 'position',
            key: 'position',
        }];
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="出纳管理" second="备用金管理" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="入账管理" key="1">
                        <Row gutter={0}>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={6}>
                                                    <FormItem label="入账时间" colon={false}>
                                                        <input placeholder="请选择" />
                                                    </FormItem>
                                                </Col>
                                                <Col md={6}>
                                                    <FormItem label="入账方式" colon={false}>
                                                        <input placeholder="请选择" />
                                                    </FormItem>
                                                </Col>
                                                <Col md={6}>
                                                    <FormItem label="入账人" colon={false}>
                                                        <input placeholder="请输入入账人" />
                                                    </FormItem>
                                                </Col>
                                                <Col md={2}>
                                                    <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
                                                </Col>
                                                <Col md={2}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.NewInPay()} ><Icon type="plus" />新建</Button>
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
                    </TabPane>
                    <TabPane tab="出账管理" key="2">
                        <Row gutter={0}>
                                <Col className="gutter-row" md={24}>
                                    <div className="gutter-box">
                                        <Card bordered={false}>
                                            <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={6}>
                                                    <FormItem label="出账时间" colon={false}>
                                                        <input placeholder="请选择" />
                                                    </FormItem>
                                                </Col>
                                                <Col md={6}>
                                                    <FormItem label="出账人" colon={false}>
                                                        <input placeholder="请输入出账人" />
                                                    </FormItem>
                                                </Col>
                                                <Col md={2}>
                                                    <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
                                                </Col>
                                                <Col md={2}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.NewOutPay()}><Icon type="plus" />新建</Button>
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
                                            <Table columns={columns2} dataSource={dataSource} />
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

const Beiyongjin = Form.create()(Beiyongjins);

export default Beiyongjin;