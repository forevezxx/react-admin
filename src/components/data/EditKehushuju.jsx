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
import { customDataOne, customDataUpdate } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

const TabPane = Tabs.TabPane;


class EditXiaoshoushujus extends Component {
    state = {
        customer_company: "日产无限",
        customer_name: "郑小霞",
        num: "222",
        price: "1",
        repay_date: "2019-05-15",
        repay_money: "22",
        repay_product_name: "智能产品",
        total: "222",
    };
    componentDidMount() {
        this.getUserOne(this.props.match.params.id);
    }
    getUserOne(id){
        let data = {
            id
        }
        customDataOne(data).then(res=>{
            this.setState({
                customer_company: res.data.supplier.customer_company,
                customer_name: res.data.supplier.customer_name,
                num: res.data.supplier.num,
                price: res.data.supplier.price,
                repay_date: res.data.supplier.repay_date,
                repay_money: res.data.supplier.repay_money,
                repay_product_name: res.data.supplier.repay_product_name,
                total: res.data.supplier.total,
            })
        })
    }
    goBack() {
        this.props.history.push(`/app/data/kehushuju`);
    }
    userUpdates() {
        
        const { 
            customer_company,
            customer_name,
            num,
            price,
            repay_date,
            repay_money,
            repay_product_name,
            total,
        } = this.state;
        let data = {
            id: this.props.match.params.id,
            update_json: JSON.stringify({
                customer_company,
                customer_name,
                num,
                price,
                repay_date,
                repay_money,
                repay_product_name,
                total,
            }),
            token: localStorage.getItem('user_token'),
        };
        customDataUpdate(data).then(res =>{
            if(res.msg === "success"){
                this.props.history.push(`/app/data/kehushuju`);
            }
        })
    }
    onChange(date, dateString) {
        console.log(date, dateString);
        this.setState({
            repay_date: dateString,
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { 
            customer_company,
            customer_name,
            num,
            price,
            repay_date,
            repay_money,
            repay_product_name,
            total,
         } = this.state;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="数据管理" second="编辑客户数据"/>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="编辑客户数据" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                <FormItem label="客户姓名" colon={false}>
                                                        <input placeholder="请输入客户姓名" value={customer_name} onChange={event => {
                                                            this.setState({
                                                                customer_name: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="客户公司名称" colon={false}>
                                                        <input placeholder="请输入客户公司名称" value={customer_company} onChange={event => {
                                                            this.setState({
                                                                customer_company: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="回款产品" colon={false}>
                                                        <input placeholder="请输入回款产品" value={repay_product_name} onChange={event => {
                                                            this.setState({
                                                                repay_product_name: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="产品数量" colon={false}>
                                                        <input placeholder="请输入产品数量" value={num} onChange={event => {
                                                            this.setState({
                                                                num: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="产品单价" colon={false}>
                                                        <input placeholder="请输入产品单价" value={price} onChange={event => {
                                                            this.setState({
                                                                price: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="产品总价" colon={false}>
                                                        <input placeholder="请输入产品总价" value={total} onChange={event => {
                                                            this.setState({
                                                                total: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="回款金额" colon={false}>
                                                        <input placeholder="请输入回款金额" value={repay_money} onChange={event => {
                                                            this.setState({
                                                                repay_money: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="回款日期" colon={false}>
                                                        <DatePicker placeholder="请选择" value={moment(repay_date,'YYYY/MM/DD')} onChange={this.onChange.bind(this)} />
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