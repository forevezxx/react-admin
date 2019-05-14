
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
import { baoxiaoAdd } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class NewBaoxiaos extends Component {
    state = {
        people: '',
        time: '',
        account: '',
        method: '',
        project: '',
        check_people: '',
        recheck_people: '',
        make_people: '',
    };
    onChange(date, dateString) {
        this.setState({
            time: dateString,
        })
        console.log(date, dateString);
    }
    goBack() {
        this.props.history.push(`/app/pay/baoxiao`);
    }
    newSupplier() {
        const { 
            people,
            time,
            account,
            method,
            project,
            check_people,
            recheck_people,
            make_people,
        } = this.state;
        const token = localStorage.getItem('user_token');
        let data = {
            people,
            time,
            account,
            method,
            project,
            check_people,
            recheck_people,
            make_people,
            token
        }
        baoxiaoAdd(data).then(res => {
            console.log(res);
            if (res.msg === "success") {
                this.props.history.push(`/app/pay/baoxiao`);
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
                <BreadcrumbCustom first="出纳管理" second="报销管理" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="新增报销记录" key="1">
                        <Row>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col span={8}>

                                                    <FormItem label="报销人" colon={false}>
                                                        <input placeholder="请输入报销人姓名" onChange={event => {
                                                            this.setState({
                                                                people: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="报销时间" colon={false}>
                                                        <DatePicker placeholder="请选择" onChange={this.onChange.bind(this)} />
                                                    </FormItem>
                                                    
                                                    <FormItem label="报销金额" colon={false}>
                                                        <input placeholder="请输入报销金额" onChange={event => {
                                                            this.setState({
                                                                account: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="报销方式" colon={false}>
                                                        <input placeholder="请输入报销方式" onChange={event => {
                                                            this.setState({
                                                                method: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="报销项目" colon={false}>
                                                        <TextArea rows={4} placeholder="请输入报销项目" onChange={event => {
                                                            this.setState({
                                                                project: event.target.value
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
                                            </Row>
                                            <Row>
                                                <Col span={4}>
                                                    <Button type="primary" htmlType="submit" onClick={()=>this.goBack()}>返回</Button></Col>
                                                <Col span={4}>
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

const NewBaoxiao = Form.create()(NewBaoxiaos);

export default NewBaoxiao;