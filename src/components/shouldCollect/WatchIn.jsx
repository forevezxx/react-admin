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
import { supplierOne } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

const TabPane = Tabs.TabPane;


class WatchUserFiless extends Component {
    state = {
        documentData: {},
    };
    componentDidMount() {
        this.getSupplierOne(this.props.match.params.id);
    }
    getSupplierOne(id) {
        let data = {
            id
        }
        supplierOne(data).then(res => {
            this.setState({
                documentData: res.data.supplier
            })
        })
    }
    goBack() {
        this.props.history.push(`/app/shouldCollect/In`);
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { documentData } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="应付管理" second="档案管理" third="查看供应商档案" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="查看供应商档案" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="公司类型" colon={false}>
                                                        <input disabled value={documentData.company_type} />
                                                    </FormItem>
                                                    <FormItem label="公司名称" colon={false}>
                                                        <input disabled value={documentData.company_name} />
                                                    </FormItem>
                                                    <FormItem label="负责人" colon={false}>
                                                        <input disabled value={documentData.company_owner} />
                                                    </FormItem>
                                                    <FormItem label="职位" colon={false}>
                                                        <input disabled value={documentData.position} />
                                                    </FormItem>
                                                    <FormItem label="所属行业" colon={false}>
                                                        <input disabled value={documentData.industry} />
                                                    </FormItem>
                                                    <FormItem label="邮箱" colon={false}>
                                                        <input disabled value={documentData.email} />
                                                    </FormItem>
                                                    <FormItem label="地址" colon={false}>
                                                        <input disabled value={documentData.address} />
                                                    </FormItem>
                                                    <FormItem label="座机" colon={false}>
                                                        <input disabled value={documentData.tel} />
                                                    </FormItem>
                                                    <FormItem label="手机号码" colon={false}>
                                                        <input disabled value={documentData.phone} />
                                                    </FormItem>
                                                    <FormItem label="公司照片" colon={false}>
                                                        <input disabled value={documentData.company_pic} />
                                                    </FormItem>
                                                    <FormItem label="合同编号" colon={false}>
                                                        <input disabled value={documentData.contract_num} />
                                                    </FormItem>
                                                    <FormItem label="来源" colon={false}>
                                                        <input disabled value={documentData.source} />
                                                    </FormItem>
                                                    <FormItem label="建档人" colon={false}>
                                                        <input disabled value={documentData.maker} />
                                                    </FormItem>
                                                    <FormItem label="建档时间" colon={false}>
                                                        <input disabled value={moment(Number(documentData.make_time) * 1000).format('YYYY-MM-DD')} />
                                                    </FormItem>
                                                    <FormItem label="最后一次跟进" colon={false}>
                                                        <input disabled value={moment(Number(documentData.last_follow) * 1000).format('YYYY-MM-DD')} />
                                                    </FormItem>
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.goBack()}>返回</Button></Col>
                                            </Row>
                                        </Form>
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

const WatchUserFiles = Form.create()(WatchUserFiless);

export default WatchUserFiles;