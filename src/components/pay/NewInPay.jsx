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
import { imprestAdd } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class NewInPays extends Component {
    state = {
        name: '',
        method: '',
        money: '',
        employment_date: '',
    };
    onChange(date, dateString) {
        console.log(date, dateString);
        this.setState({
            employment_date: dateString,
        })
    }

    onChange2 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    imprestAdd() {
        const {
            name,
            method,
            money,
            employment_date,
        } = this.state;
        let data = {
            name,
            method,
            money,
            employment_date,
            type: 1,
        }
        imprestAdd(data).then(res=>{
            if (res.msg === "success") {
                this.props.history.push(`/app/pay/beiyongjin`);
            }
        })
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
                    <TabPane tab="新增备用金入账记录" key="1">
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
                                                    <FormItem label="入账人" colon={false}>
                                                        <input placeholder="请输入入账人姓名" onChange={event => {
                                                            this.setState({
                                                                name: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="入账时间" colon={false}>
                                                        <DatePicker placeholder="请选择" onChange={this.onChange.bind(this)} />
                                                    </FormItem>
                                                    <FormItem label="入账方式" colon={false}>
                                                        <input placeholder="请输入入账方式" onChange={event => {
                                                            this.setState({
                                                                method: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="入账金额" colon={false}>
                                                        <input placeholder="请输入入账金额" onChange={event => {
                                                            this.setState({
                                                                money: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="当前结余" colon={false}>
                                                        <input placeholder="请输入公司名称" disabled value="11,000,000" />
                                                    </FormItem>
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.goBack()}>返回</Button></Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={()=>this.imprestAdd()}>保存</Button></Col>
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

const NewInPay = Form.create()(NewInPays);

export default NewInPay;