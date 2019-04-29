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
import { userAdd } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class NewKaoqingjilus extends Component {
    state = {
        value: 1,
        values: 1,
        type: '',
        username: '',
        position: '',
        phone: '',
        user_ext: '',
        account_name: '',
        password: '',
        employment_date: '',
        user_auth: '',
        function_auth: '', 
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
    goBack() {
        this.props.history.push(`/app/checkIn/kaoqingjilu`);
    }

    newUser() {
        const {
            type,
            username,
            position,
            phone,
            user_ext,
            account_name,
            password,
            employment_date,
            user_auth,
            function_auth, 
        } = this.state;
        let data = {
            type,
            username,
            position,
            phone,
            user_ext,
            account_name,
            password,
            employment_date,
            user_auth,
            function_auth,
        }
        userAdd(data).then(res=>{
            if (res.msg === "success") {
                this.props.history.push(`/app/checkIn/kaoqingjilu`);
            }
        })
    }
    handleSelectChangeUserType(value) {
        this.setState({
            type: value
        });
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="考勤管理" second="考勤记录" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="新增考勤记录" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="员工姓名" colon={false}>
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChange}
                                                        >
                                                            <Option value="male">male</Option>
                                                            <Option value="female">female</Option>
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="入职时间" colon={false}>
                                                        <input placeholder="请输入公司名称" disabled />
                                                    </FormItem>
                                                    <FormItem label="岗位" colon={false}>
                                                        <input placeholder="岗位" disabled />
                                                    </FormItem>
                                                    <FormItem label="部门" colon={false}>
                                                        <input placeholder="部门" disabled />
                                                    </FormItem>
                                                    <FormItem label="考勤日期" colon={false}>
                                                        <DatePicker placeholder="请选择" onChange={()=>this.onChange} />
                                                    </FormItem>
                                                    <FormItem label="考勤状态" colon={false}>
                                                        <RadioGroup name="radiogroup" defaultValue={1}>
                                                            <Row>
                                                                <Col><Radio value={1}>正常</Radio></Col>
                                                                <Col><Radio value={2}>迟到</Radio></Col>
                                                                <Col><Radio value={3}>早退</Radio></Col>
                                                                <Col>
                                                                    <div className="miss-day">
                                                                        <Radio value={4}>事假</Radio>                                                                    
                                                                        <input /><span className="miss-day-span">天</span>
                                                                    </div>                                                                    
                                                                </Col>
                                                                <Col>
                                                                    <div className="miss-day">
                                                                        <Radio value={5}>病假</Radio>                                                                    
                                                                        <input /><span className="miss-day-span">天</span>
                                                                    </div>                                                                    
                                                                </Col>
                                                                <Col>
                                                                    <div className="miss-day">
                                                                        <Radio value={6}>丧假</Radio>                                                                    
                                                                        <input /><span className="miss-day-span">天</span>
                                                                    </div>                                                                    
                                                                </Col>
                                                                <Col>
                                                                    <div className="miss-day">
                                                                        <Radio value={7}>旷工</Radio>                                                                    
                                                                        <input /><span className="miss-day-span">天</span>
                                                                    </div>                                                                    
                                                                </Col>
                                                            </Row>
                                                        </RadioGroup>
                                                    </FormItem>
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.goBack()}>返回</Button></Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.newUser()}>保存</Button></Col>
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

const NewKaoqingjilu = Form.create()(NewKaoqingjilus);

export default NewKaoqingjilu;