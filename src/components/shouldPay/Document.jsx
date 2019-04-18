/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
const FormItem = Form.Item;
const Option = Select.Option;


class Documents extends Component {
    state = {
        confirmDirty: false,
    };
    NewShouldPay() {//新建
        this.props.history.push('/app/shouldPay/newshouldpay');
    }
    WatchDocument() {//查看
        this.props.history.push('/app/shouldPay/watchDocument');
    }
    EditDocument() {//编辑
        this.props.history.push('/app/shouldPay/editDocument');
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const dataSource = [{
            key: '1',
            seNum: '1',
            companyType: '运营商',
            companyName: '广州福意婚纱服饰有限公司',
            mainPerson: '唐先生',
            telNum: '18816872210',
            industry: '金融业',
            address: '浙江省杭州市富阳区宁线路11号',
            from: '广告杂志',
            hetongNum: 'NO.123214536',
            createPerson: 'Wendy',
            finalTime: '2019.02.28 09:30:56'
        }, {
            key: '2',
            seNum: 'id123456',
            companyType: 'admin',
            companyName: '管理用户',
            mainPerson: '唐先生',
            telNum: '销售',
            industry: '15099999999',
            address: '22',
            from: '23456',
            hetongNum: '23456',
            createPerson: '2019.01.02',
            finalTime: '2019.02.28 09:30:56'
        }];

        const columns = [{
            title: '编号',
            dataIndex: 'seNum',
            key: 'seNum',
        }, {
            title: '公司类型',
            dataIndex: 'companyType',
            key: 'companyType',
        }, {
            title: '公司名称',
            dataIndex: 'companyName',
            key: 'companyName',
        }, {
                title: '负责人',
            dataIndex: 'mainPerson',
            key: 'mainPerson',
        }, {
                title: '手机号码',
            dataIndex: 'telNum',
            key: 'telNum',
        }, {
                title: '所属行业',
            dataIndex: 'industry',
            key: 'industry',
        }, {
                title: '地址',
            dataIndex: 'address',
            key: 'address',
        }, {
                title: '来源',
            dataIndex: 'from',
            key: 'from',
        }, {
                title: '合同编号',
            dataIndex: 'hetongNum',
            key: 'hetongNum',
        }, {
                title: '建档人',
            dataIndex: 'createPerson',
            key: 'createPerson',
        }, {
                title: '最后跟进时间',
                dataIndex: 'finalTime',
                key: 'finalTime',
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={()=>this.WatchDocument()}>查看</a>
                    <a href="javascript:;" onClick={()=>this.EditDocument()}>编辑</a>
                </span>
            )
        }];
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="应付管理" second="档案管理" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="负责人" colon={false}>
                                                <input placeholder="请输入负责人姓名" />
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="公司名称" colon={false}>
                                                <input placeholder="请输入公司名称" />
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
                                            <FormItem label="电话号码" colon={false}>
                                                <input placeholder="请输入电话号码" />
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="建档人" colon={false}>
                                                <input placeholder="请输入建档人" />
                                            </FormItem>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.NewShouldPay()}><Icon type="plus" />新建</Button>
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

const Document = Form.create()(Documents);

export default Document;