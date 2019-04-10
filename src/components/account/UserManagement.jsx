/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EditableTable from '../tables/EditableTable';
const FormItem = Form.Item;
const Option = Select.Option;


class UserManagements extends Component {
    state = {
        confirmDirty: false,
    };
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="账户管理" second="用户管理" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="员工姓名" colon={false}>
                                                <input placeholder="请输入员工姓名" />
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="用户类别" colon={false}>
                                                <Select
                                                    placeholder="请选择"
                                                    onChange={this.handleSelectChange}
                                                >
                                                    <Option value="male">male</Option>
                                                    <Option value="female">female</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="手机号码" colon={false}>
                                                <input placeholder="请输入手机号码" />
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="工号" colon={false}>
                                                <input placeholder="请输入工号" />
                                            </FormItem>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit">查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit">新建</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit">导出</Button>
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
                                <EditableTable />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const UserManagement = Form.create()(UserManagements);

export default UserManagement;