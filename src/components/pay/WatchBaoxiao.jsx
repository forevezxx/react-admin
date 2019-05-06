/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import {
    Card, Form, Input, Tooltip, Icon, Cascader,
    Select, Row, Col, Checkbox, Button,
    Table, Menu, Tabs, Upload, DatePicker, Radio
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { supplierOne } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;


class WatchBaoxiaos extends Component {
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
        this.props.history.push(`/app/shouldCollect/userFiles`);
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
                                                    <FormItem label="报销人" colon={false}>
                                                        <input placeholder="请输入报销人姓名"/>
                                                    </FormItem>
                                                    <FormItem label="报销时间" colon={false}>
                                                        <DatePicker onChange={()=>this.onChange} />
                                                    </FormItem>

                                                    <FormItem label="报销金额" colon={false}>
                                                        <input placeholder="请输入报销金额" />
                                                    </FormItem>
                                                    <FormItem label="报销方式" colon={false}>
                                                        <input placeholder="请输入报销方式" />
                                                    </FormItem>
                                                    <FormItem label="报销项目" colon={false}>
                                                        <TextArea rows={4} defaultValue="请输入报销项目"/>
                                                    </FormItem>
                                                    <FormItem label="审核人" colon={false}>
                                                        <input placeholder="请输入审核人姓名" />
                                                    </FormItem>
                                                    <FormItem label="复核人" colon={false}>
                                                        <input placeholder="请输入复核人姓名" />
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

const WatchBaoxiao = Form.create()(WatchBaoxiaos);

export default WatchBaoxiao;