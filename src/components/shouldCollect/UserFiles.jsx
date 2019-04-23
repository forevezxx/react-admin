/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
const FormItem = Form.Item;
const Option = Select.Option;


class UserFiless extends Component {
    state = {
        confirmDirty: false,
    };
    newUserFiles() {//新建
        this.props.history.push('/app/shouldCollect/newUserFiles');
    }
    editUserFiles() {//编辑
        this.props.history.push('/app/shouldCollect/editUserFiles');
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
            title: '客户编号',
            dataIndex: 'userId',
            key: 'userId',
        }, {
            title: '客户名称',
            dataIndex: 'createPerson',
            key: 'createPerson',
        }, {
            title: '订单编号',
            dataIndex: 'userType',
            key: 'userType',
        }, {
            title: '资源属性',
            dataIndex: 'stuffName',
            key: 'stuffName',
        }, {
            title: '负责人',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '联系电话',
            dataIndex: 'telNum',
            key: 'telNum',
        }, {
            title: '所在地址',
            dataIndex: 'jobNum',
            key: 'jobNum',
        }, {
            title: '客户来源',
            dataIndex: 'accountName',
            key: 'accountName',
        }, {
            title: '跟进人员',
            dataIndex: 'accountPassword',
            key: 'accountPassword',
        }, {
            title: '跟进时间',
            dataIndex: 'entryTime',
            key: 'entryTime',
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
                    <a href="javascript:;" onClick={()=>this.editUserFiles()} >编辑</a>
                </span>
            )
        }];
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="应收管理" second="客户档案" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="客户编号" colon={false}>
                                                <input placeholder="请输入客户编号" />
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="客户名称" colon={false}>
                                                <input placeholder="请输入客户名称" />
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="订单编号" colon={false}>
                                                <input placeholder="请输入订单编号" />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="负责人" colon={false}>
                                                <input placeholder="请输入负责人姓名" />
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="联系电话" colon={false}>
                                                <input placeholder="请输入联系电话" />
                                            </FormItem>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.newUserFiles()}><Icon type="plus" />新建</Button>
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

const UserFiles = Form.create()(UserFiless);

export default UserFiles;