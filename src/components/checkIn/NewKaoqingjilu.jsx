/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import {
    Card, Form, Input, Tooltip, Icon, Cascader,
    Select, Row, Col, Checkbox, Button,
    Table, Menu, Tabs, Upload, DatePicker, Radio
} from 'antd';
import moment from 'moment';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { attendanceAdd, attendanceGetUsernameExport } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class NewKaoqingjilus extends Component {
    state = {
        value: 1,
        values: 1,
        type: "0",
        username: '',
        position: '',
        phone: '',
        user_ext: '',
        account_name: '',
        password: '',
        employment_date: '',
        user_auth: '',
        function_auth: '', 
        userNameList: [],
    };
    componentDidMount() {
        this.attendanceGetUsernameExport();
    }
    attendanceGetUsernameExport() {
        let that = this;
        attendanceGetUsernameExport().then(res=>{
            that.setState({
                users:res.data.users,
            },()=>{
                    that.formatUsers(res.data.users);
            })
        })
    }
    formatUsers(dataList) {
        let x = [];
        for ( var i = 0; i<dataList.length; i++){
            x.push(dataList[i].username);
        }
        this.setState({
            userNameList: x,
        })
    }
    onChange(date, dateString) {
        console.log(date, dateString);
        this.setState({
            date: dateString,
        })
    }
    onChange1 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            type: e.target.value,
        });
    }
    goBack() {
        this.props.history.push(`/app/checkIn/kaoqingjilu`);
    }

    
    newUser() {
        const {
            user_id,
            name,
            position,
            department,
            join_time,
            date,
            type,
            day,
        } = this.state;
        let data = {
            user_id,
            name,
            position,
            department,
            join_time,
            date,
            type,
            day,
        }
        attendanceAdd(data).then(res=>{
            if (res.msg === "success") {
                this.props.history.push(`/app/checkIn/kaoqingjilu`);
            }
        })
    }
    handleSelectChange(value) {
        console.log(value)
        this.setState({
            user_id: this.state.users[value].id,
            name: this.state.users[value].username,
            position: this.state.users[value].position,
            join_time: this.state.users[value].employment_date,
            department: this.state.users[value].department,
        });
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { userNameList } =  this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="考勤管理" second="考勤记录" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="新增考勤记录" key="1">
                        <Row>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col span={8}>
                                                    <FormItem label="员工姓名" colon={false}>
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChange.bind(this)}
                                                        >   
                                                            {userNameList.map((item, index)=>{
                                                                return (
                                                                    <Option value={index} key={index}>{item}</Option>
                                                                )
                                                            })}
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="入职时间" colon={false}>
                                                        <input placeholder="请输入入职时间" disabled value={this.state.join_time} />
                                                    </FormItem>
                                                    <FormItem label="岗位" colon={false}>
                                                        <input placeholder="岗位" disabled value={this.state.position != "" ? this.state.position: " "} />
                                                    </FormItem>
                                                    <FormItem label="部门" colon={false}>
                                                        <input placeholder="部门" disabled value={this.state.department != "" ? this.state.department : " "}/>
                                                    </FormItem>
                                                    <FormItem label="考勤日期" colon={false}>
                                                        <DatePicker placeholder="请选择" onChange={this.onChange.bind(this)} />
                                                    </FormItem>
                                                    <FormItem label="考勤状态" colon={false}>
                                                        <RadioGroup name="radiogroup" defaultValue={this.state.type} onChange={this.onChange1}>
                                                            <Row>
                                                                <Col><Radio value="0">正常</Radio></Col>
                                                                <Col><Radio value="1">迟到</Radio></Col>
                                                                <Col><Radio value="2">早退</Radio></Col>
                                                                <Col>
                                                                    <div className="miss-day">
                                                                        <Radio value="3">事假</Radio>                                                                    
                                                                        <input /><span className="miss-day-span">天</span>
                                                                    </div>                                                                    
                                                                </Col>
                                                                <Col>
                                                                    <div className="miss-day">
                                                                        <Radio value="4">病假</Radio>                                                                    
                                                                        <input /><span className="miss-day-span">天</span>
                                                                    </div>                                                                    
                                                                </Col>
                                                                <Col>
                                                                    <div className="miss-day">
                                                                        <Radio value="5">丧假</Radio>                                                                    
                                                                        <input /><span className="miss-day-span">天</span>
                                                                    </div>                                                                    
                                                                </Col>
                                                                <Col>
                                                                    <div className="miss-day">
                                                                        <Radio value="6">旷工</Radio>                                                                    
                                                                        <input /><span className="miss-day-span">天</span>
                                                                    </div>                                                                    
                                                                </Col>
                                                            </Row>
                                                        </RadioGroup>
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={8}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.goBack()}>返回</Button></Col>
                                                <Col span={8}>
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