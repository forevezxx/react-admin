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
import { publicMoneyAdd } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class NewGongfeis extends Component {
    state = {
        confirmDirty: false,
        value: 1,
        values: 1,
    };
    onChange(date, dateString) {
        this.setState({
            date: dateString,
        })
        console.log(date, dateString);
    }

    goBack() {
        this.props.history.push(`/app/pay/gongfei`);
    }
        
    newSupplier() {
        const { 
            ask_name,
            department,
            date,
            count,
            type,
            reason,
            check_people,
            recheck_people,
        } = this.state;
        const token = localStorage.getItem('user_token');
        let data = {
            ask_name,
            department,
            date,
            count,
            type,
            reason,
            check_people,
            recheck_people,
            token
        }
        publicMoneyAdd(data).then(res => {
            console.log(res);
            if (res.msg === "success") {
                this.props.history.push(`/app/pay/gongfei`);
            }
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="出纳管理" second="公费管理" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="新增请款记录" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>

                                                    <FormItem label="请款人" colon={false}>
                                                        <input placeholder="请输入请款人姓名" onChange={event => {
                                                            this.setState({
                                                                ask_name: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="部门" colon={false}>
                                                        <input placeholder="请输入对象类别" onChange={event => {
                                                            this.setState({
                                                                department: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="申请日期" colon={false}>
                                                        <DatePicker onChange={this.onChange.bind(this)} />
                                                    </FormItem>
                                                    <FormItem label="申请金额" colon={false} >
                                                        <input placeholder="请输入申请金额" onChange={event => {
                                                            this.setState({
                                                                count: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="费用类型" colon={false}>
                                                        <input placeholder="请输入费用类型" onChange={event => {
                                                            this.setState({
                                                                type: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="请款用途" colon={false}>
                                                        <TextArea rows={4} placeholder="请输入请款用途" onChange={event => {
                                                            this.setState({
                                                                reason: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="审核人" colon={false}>
                                                        <input placeholder="请输入审核人姓名" onChange={event => {
                                                            this.setState({
                                                                check_people: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="复核人" colon={false}>
                                                        <input placeholder="请输入复核人姓名" onChange={event => {
                                                            this.setState({
                                                                recheck_people: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={()=>this.goBack()}>返回</Button></Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={()=>this.newSupplier()}>保存</Button></Col>
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

const NewGongfei = Form.create()(NewGongfeis);

export default NewGongfei;