/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
const FormItem = Form.Item;
const Option = Select.Option;


class Baoxiaos extends Component {
    state = {
        confirmDirty: false,
    };
    newbaoxiao() {//新建
        this.props.history.push('/app/pay/newbaoxiao');
    }
    WatchBaoxiao(id) {//查看
        this.props.history.push(`/app/pay/watchBaoxiao/${id}`);
    }
    EditBaoxiao(id) {//编辑
        this.props.history.push(`/app/pay/editBaoxiao/${id}`);
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
            title: '报销人',
            dataIndex: 'createPerson',
            key: 'createPerson',
        }, {
            title: '报销时间',
            dataIndex: 'userType',
            key: 'userType',
        }, {
            title: '报销金额(元)',
            dataIndex: 'stuffName',
            key: 'stuffName',
        }, {
            title: '报销项目',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '报销方式',
            dataIndex: 'telNum',
            key: 'telNum',
        }, {
            title: '审核人',
            dataIndex: 'jobNum',
            key: 'jobNum',
        }, {
            title: '复核人',
            dataIndex: 'accountName',
            key: 'accountName',
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={()=>this.WatchBaoxiao(record.id)}>查看</a>
                    <a href="javascript:;" onClick={()=>this.EditBaoxiao(record.id)}>编辑</a>
                </span>
            )
        }];
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="出纳管理" second="报销管理" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={6}>
                                            <FormItem label="报销时间" colon={false}>
                                                <input placeholder="请选择" />
                                            </FormItem>
                                        </Col>
                                        <Col md={6}>
                                            <FormItem label="报销人" colon={false}>
                                                <input placeholder="请输入报销人" />
                                            </FormItem>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.newbaoxiao()}><Icon type="plus" />新建</Button>
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

const Baoxiao = Form.create()(Baoxiaos);

export default Baoxiao;