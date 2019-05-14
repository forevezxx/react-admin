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
import { purchanseOne, purchanseUpdate } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

const TabPane = Tabs.TabPane;


class EditXiaoshoushujus extends Component {
    state = {
        company_name: '',
        way: '',
        resource: '',
        price: '',
        num: '',
        total_price: '',
        date: '', 
    };
    componentDidMount() {
        this.getUserOne(this.props.match.params.id);
    }
    getUserOne(id){
        let data = {
            id
        }
        purchanseOne(data).then(res=>{
            this.setState({
                company_name: res.data.supplier.company_name,
                way: res.data.supplier.way,
                resource: res.data.supplier.resource,
                price: res.data.supplier.price,
                num: res.data.supplier.num,
                total_price: res.data.supplier.total_price,
                date: res.data.supplier.date,
            })
        })
    }
    goBack() {
        this.props.history.push(`/app/data/caigoushuju`);
    }
    userUpdates() {
        const { 
            company_name,
            way,
            resource,
            price,
            num,
            total_price,
            date, 
        } = this.state;
        let data = {
            id: this.props.match.params.id,
            update_json: JSON.stringify({
                company_name,
                way,
                resource,
                price,
                num,
                total_price,
                date, 
            }),
            token: localStorage.getItem('user_token'),
        };
        purchanseUpdate(data).then(res =>{
            if(res.msg === "success"){
                this.props.history.push(`/app/data/caigoushuju`);
            }
        })
    }
    onChange(date, dateString) {
        console.log(date, dateString);
        this.setState({
            date: dateString,
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { 
            company_name,
                way,
                resource,
                price,
                num,
                total_price,
                date, 
         } = this.state;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="数据管理" second="编辑采购数据"/>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="编辑采购数据" key="1">
                        <Row>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col span={8}>
                                                        <FormItem label="公司名称" colon={false}>
                                                            <input placeholder="请输入公司名称" value={company_name}   onChange={event => {
                                                            this.setState({
                                                                company_name: event.target.value
                                                            });
                                                        }}/>
                                                        </FormItem>
                                                        <FormItem label="通道" colon={false}>
                                                            <input placeholder="请输入通道" value={way}   onChange={event => {
                                                            this.setState({
                                                                way: event.target.value
                                                            });
                                                        }} />
                                                        </FormItem>
                                                        <FormItem label="属性" colon={false}>
                                                            <input placeholder="请输入属性" value={resource}   onChange={event => {
                                                            this.setState({
                                                                resource: event.target.value
                                                            });
                                                        }} />
                                                        </FormItem>
                                                        <FormItem label="采购价" colon={false}>
                                                            <input placeholder="请输入采购价" value={price}   onChange={event => {
                                                            this.setState({
                                                                price: event.target.value
                                                            });
                                                        }} />
                                                        </FormItem>
                                                        <FormItem label="数量" colon={false}>
                                                            <input placeholder="请输入数量"  value={num}   onChange={event => {
                                                            this.setState({
                                                                num: event.target.value
                                                            });
                                                        }}/>
                                                        </FormItem>
                                                        <FormItem label="总金额" colon={false}>
                                                            <input placeholder="请输入总金额" value={total_price}   onChange={event => {
                                                            this.setState({
                                                                total_price: event.target.value
                                                            });
                                                        }} />
                                                        </FormItem>
                                                        <FormItem label="采购日期" colon={false}>
                                                            <DatePicker placeholder="请选择" value={moment(date, "YYYY/MM/DD")} onChange={this.onChange.bind(this)} />
                                                        </FormItem>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={4}><Button type="primary" htmlType="submit" onClick={()=>this.goBack()}>返回</Button></Col>
                                                <Col span={4}><Button type="primary" htmlType="submit" onClick={()=>this.userUpdates()}>保存</Button></Col>
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