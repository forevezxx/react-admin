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
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class NewOutPays extends Component {
    state = {
        confirmDirty: false,
        value: 1,
        values: 1,
    };
    onChange(date, dateString) {
        console.log(date, dateString);
    }

    onChange2 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    onChange3 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            values: e.target.value,
        });
    }
    goBack() {
        this.props.history.push(`/app/pay/beiyongjin`);
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="出纳管理" second="备用金管理" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="新增备用金出账记录" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>

                                                    <FormItem label="备用金总额" colon={false}>
                                                        <input placeholder="请输入公司名称" disabled value="11,000,000" />
                                                    </FormItem>
                                                    <FormItem label="出账人" colon={false}>
                                                        <input placeholder="请输入出账人姓名" />
                                                    </FormItem>
                                                    <FormItem label="出账时间" colon={false}>
                                                        <DatePicker onChange={()=>this.onChange} />
                                                    </FormItem>
                                                    <FormItem label="出账方式" colon={false}>
                                                        <input placeholder="请输入出账方式" />
                                                    </FormItem>
                                                    <FormItem label="出账金额" colon={false}>
                                                        <input placeholder="请输入出账金额" />
                                                    </FormItem>
                                                    <FormItem label="当前结余" colon={false}>
                                                        <input placeholder="请输入公司名称" disabled value="11,000,000" />
                                                    </FormItem>
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.goBack()}>返回</Button></Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit">保存</Button></Col>
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
            </div>
        )
    }
}

const NewOutPay = Form.create()(NewOutPays);

export default NewOutPay;