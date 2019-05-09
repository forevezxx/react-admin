/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import {
    Card, Form, Input, Tooltip, Icon, Cascader,
    Select, Row, Col, Checkbox, Button, Radio,
    Table, Menu, Tabs, Upload, DatePicker
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { saleDataOne, saleDataUpdate } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;


class EditXiaoshoushujus extends Component {
    state = {
        sales_name: '',
        rank: '',
        date: '',
        month_repay: '',
        invoice_status: '0',
        department: '销售部门',
        employee_time: '',
        reback_money: '',
    };
    componentDidMount() {
        this.getUserOne(this.props.match.params.id);
    }
    onChange(date, dateString) {
        console.log(date, dateString);
        this.setState({
            employee_time: dateString,
        })
    }
    getUserOne(id){
        let data = {
            id
        }
        saleDataOne(data).then(res=>{
            this.setState({
                sales_name: res.data.supplier.sales_name,
                rank: res.data.supplier.rank,
                date: res.data.supplier.date,
                month_repay: res.data.supplier.month_repay,
                invoice_status: res.data.supplier.invoice_status,
                department: res.data.supplier.department,
                employee_time: res.data.supplier.employee_time,
                reback_money: res.data.supplier.reback_money,
            })
        })
    }
    goBack() {
        this.props.history.push(`/app/data/xiaoshoushuju`);
    }
    userUpdates() {
        const {
            sales_name,
            rank,
            date,
            month_repay,
            invoice_status,
            department,
            employee_time,
            reback_money
        } = this.state;
        let data = {
            id: this.props.match.params.id,
            update_json: JSON.stringify({
                sales_name,
                rank,
                date,
                month_repay,
                invoice_status,
                department,
                employee_time,
                reback_money
            }),
            token: localStorage.getItem('user_token'),
        };
        saleDataUpdate(data).then(res =>{
            if(res.msg === "success"){
                this.props.history.push(`/app/data/xiaoshoushuju`);
            }
        })
    }
    handleSelectChangeUserType(value) {
        this.setState({
            date: value
        });
    }
    onChange1 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            invoice_status: e.target.value,
        });
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const {
            sales_name,
            rank,
            date,
            month_repay,
            invoice_status,
            department,
            employee_time,
            reback_money
        } = this.state;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="数据管理" second="编辑销售数据"/>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="编辑销售数据" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="销售员" colon={false}>
                                                        <input placeholder="请输入销售员姓名" value={sales_name} onChange={event => {
                                                            this.setState({
                                                                sales_name: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="当前排名" colon={false}>
                                                        <input placeholder="请输入当前排名" value={rank} onChange={event => {
                                                            this.setState({
                                                                rank: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="考核月份" colon={false}>
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChangeUserType.bind(this)}
                                                            value={date}
                                                        >
                                                            <Option value="1">1月</Option>
                                                            <Option value="2">2月</Option>
                                                            <Option value="3">3月</Option>
                                                            <Option value="4">4月</Option>
                                                            <Option value="5">5月</Option>
                                                            <Option value="6">6月</Option>
                                                            <Option value="7">7月</Option>
                                                            <Option value="8">8月</Option>
                                                            <Option value="9">9月</Option>
                                                            <Option value="10">10月</Option>
                                                            <Option value="11">11月</Option>
                                                            <Option value="12">12月</Option>
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="月度回款金额" colon={false}>
                                                        <input placeholder="请输入月度回款金额" value={month_repay} onChange={event => {
                                                            this.setState({
                                                                month_repay: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="提成金额" colon={false}>
                                                        <input placeholder="请输入提成金额" value={reback_money} onChange={event => {
                                                            this.setState({
                                                                reback_money: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    
                                                    <FormItem label="开票状态" colon={false}>
                                                        <RadioGroup onChange={this.onChange1} value={invoice_status}>
                                                            <Radio value="1">已达成</Radio>
                                                            <Radio value="0">未达成</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="所属部门" colon={false}>
                                                        <input placeholder="请输入提成金额" disabled value={department}/>
                                                    </FormItem>
                                                    <FormItem label="入职时间" colon={false}>
                                                        <DatePicker placeholder="请选择" value={moment(employee_time, 'YYYY/MM/DD')} onChange={this.onChange.bind(this)} />
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