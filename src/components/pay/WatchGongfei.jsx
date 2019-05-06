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
const { TextArea } = Input;

class WatchGongfeis extends Component {
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
        this.props.history.push(`/app/pay/gongfei`);
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
                <BreadcrumbCustom first="出纳管理" second="公费管理" third="查看公费记录" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="查看公费记录" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="请款人" colon={false}>
                                                        <input placeholder="请输入请款人姓名"/>
                                                    </FormItem>
                                                    <FormItem label="部门" colon={false}>
                                                        <input placeholder="请输入对象类别"/>
                                                    </FormItem>
                                                    <FormItem label="申请日期" colon={false}>
                                                        <DatePicker  placeholder="请选择" onChange={()=>this.onChange} />
                                                    </FormItem>
                                                    <FormItem label="申请金额" colon={false}>
                                                        <input placeholder="请输入申请金额" />
                                                    </FormItem>
                                                    <FormItem label="费用类型" colon={false}>
                                                        <input placeholder="请输入费用类型" />
                                                    </FormItem>
                                                    <FormItem label="请款用途" colon={false}>
                                                        <TextArea rows={4} defaultValue="请输入请款用途"/>
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

const WatchGongfei = Form.create()(WatchGongfeis);

export default WatchGongfei;