/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import {
    Card, Form, Input, Tooltip, Icon, Cascader,
    Select, Row, Col, Checkbox, Button,
    Table, Menu, Tabs, Upload, DatePicker
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { userOne, userUpdate } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

const TabPane = Tabs.TabPane;


class EditXiaoshoushujus extends Component {
    state = {
        id: '',
        type: '',
        username: '',
        position: '',
        phone: '',
        user_ext: '',
        account_name: '',
        password: '',
        employment_date: '',
    };
    componentDidMount() {
        this.getUserOne(this.props.match.params.id);
    }
    getUserOne(id){
        let data = {
            id
        }
        userOne(data).then(res=>{
            this.setState({
                id: res.data.user.id,
                type: res.data.user.type,
                username: res.data.user.username,
                position: res.data.user.position,
                phone: res.data.user.phone,
                user_ext: res.data.user.user_ext,
                account_name: res.data.user.account_name,
                password: res.data.user.password,
                employment_date: res.data.user.employment_date,
            })
        })
    }
    goBack() {
        this.props.history.push(`/app/data/caigoushuju`);
    }
    userUpdates() {
        const { type, username, position, phone, user_ext, account_name, password, employment_date } = this.state;
        let data = {
            id: this.props.match.params.id,
            update_json: JSON.stringify({
                type,
                username,
                position,
                phone,
                user_ext,
                account_name,
                password,
                employment_date,
            }),
            token: localStorage.getItem('user_token'),
        };
        userUpdate(data).then(res =>{
            if(res.msg === "success"){
                this.props.history.push(`/app/data/caigoushuju`);
            }
        })
    }
    onChange(date, dateString) {
        console.log(date, dateString);
        this.setState({
            employment_date: dateString,
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { id, type, username, position, phone, user_ext, account_name, password, employment_date } = this.state;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="数据管理" second="编辑采购数据"/>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="编辑采购数据" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                <FormItem label="公司名称" colon={false}>
                                                            <input placeholder="请输入公司名称"  />
                                                        </FormItem>
                                                        <FormItem label="通道" colon={false}>
                                                            <input placeholder="请输入通道"  />
                                                        </FormItem>
                                                        <FormItem label="属性" colon={false}>
                                                            <input placeholder="请输入属性"  />
                                                        </FormItem>
                                                        <FormItem label="采购价" colon={false}>
                                                            <input placeholder="请输入采购价"  />
                                                        </FormItem>
                                                        <FormItem label="数量" colon={false}>
                                                            <input placeholder="请输入数量"  />
                                                        </FormItem>
                                                        <FormItem label="总金额" colon={false}>
                                                            <input placeholder="请输入总金额"  />
                                                        </FormItem>
                                                        <FormItem label="采购日期" colon={false}>
                                                            <DatePicker placeholder="请选择" onChange={this.onChange.bind(this)} />
                                                        </FormItem>
                                                </Col>
                                                <Col md={8}><Button type="primary" htmlType="submit" onClick={()=>this.goBack()}>返回</Button></Col>
                                                <Col md={8}><Button type="primary" htmlType="submit" onClick={()=>this.userUpdates()}>保存</Button></Col>
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

const EditXiaoshoushuju = Form.create()(EditXiaoshoushujus);

export default EditXiaoshoushuju;