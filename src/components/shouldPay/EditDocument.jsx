/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import {
    Card, Form, Input, Tooltip, Icon, Cascader,
    Select, Row, Col, Checkbox, Button,
    Table, Menu, Tabs, Upload
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
const FormItem = Form.Item;
const Option = Select.Option;

const TabPane = Tabs.TabPane;


class EditDocuments extends Component {
    state = {
        confirmDirty: false,
    };
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="应付管理" second="档案管理" third="编辑供应商档案" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="编辑供应商档案" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="公司类型" colon={false}>
                                                        <input  value="运营商" />
                                                    </FormItem>
                                                    <FormItem label="公司名称" colon={false}>
                                                        <input  value="中国移动通信集团有限公司" />
                                                    </FormItem>
                                                    <FormItem label="负责人" colon={false}>
                                                        <input  value="李先生" />
                                                    </FormItem>
                                                    <FormItem label="职位" colon={false}>
                                                        <input  value="销售" />
                                                    </FormItem>
                                                    <FormItem label="所属行业" colon={false}>
                                                        <input  value="通讯行业" />
                                                    </FormItem>
                                                    <FormItem label="邮箱" colon={false}>
                                                        <input  value="153365224@163.com" />
                                                    </FormItem>
                                                    <FormItem label="地址" colon={false}>
                                                        <input  value="153365224@163.com" />
                                                    </FormItem>
                                                    <FormItem label="座机" colon={false}>
                                                        <input  value="0563-15632456" />
                                                    </FormItem>
                                                    <FormItem label="手机号码" colon={false}>
                                                        <input  value="15896548654" />
                                                    </FormItem>
                                                    <FormItem label="公司照片" colon={false}>
                                                        <input  value="请输入联系人手机号码" />
                                                    </FormItem>
                                                    <FormItem label="合同编号" colon={false}>
                                                        <input  value="NO.123654898" />
                                                    </FormItem>
                                                    <FormItem label="来源" colon={false}>
                                                        <input  value="展会" />
                                                    </FormItem>
                                                    <FormItem label="建档人" colon={false}>
                                                        <input disabled value="wendy" />
                                                    </FormItem>
                                                    <FormItem label="建档时间" colon={false}>
                                                        <input disabled value="2019.02.28 09:30:56" />
                                                    </FormItem>
                                                    <FormItem label="最后一次跟进" colon={false}>
                                                        <input disabled value="2019.02.28 09:30:56" />
                                                    </FormItem>
                                                </Col>
                                                <Col md={8}><Button type="primary" htmlType="submit">返回</Button></Col>
                                                <Col md={8}><Button type="primary" htmlType="submit">保存</Button></Col>
                                            </Row>
                                        </Form>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    {/* <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane> */}
                </Tabs>,
                {/* <Row gutter={0}>
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
                </Row> */}
            </div>
        )
    }
}

const EditDocument = Form.create()(EditDocuments);

export default EditDocument;