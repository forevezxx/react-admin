/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import {
    Card, Form, Input, Tooltip, Icon, Cascader,
    Select, Row, Col, Checkbox, Button, Radio,
    Table, Menu, Tabs, Upload
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { saleDataOne } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;


class WatchXiaoshoushujus extends Component {
    state = {
        userData: {},
    };
    componentDidMount() {
        this.getUserOne(this.props.match.params.id);
    }
    getUserOne(id){
        let data = {
            id
        }
        saleDataOne(data).then(res=>{
            this.setState({
                userData: res.data.supplier
            })
        })
    }
    goBack() {
        this.props.history.push(`/app/data/xiaoshoushuju`);
    }

    onChange1 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value1: e.target.value,
        });
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const {userData} = this.state;
        if(userData!=""){
            return (
                <div className="gutter-example">
                    <BreadcrumbCustom first="数据管理" second="查看销售数据"/>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="查看销售数据" key="1">
                            <Row>
                                <Col className="gutter-row" md={24}>
                                    <div className="gutter-box">
                                        <Card bordered={false}>
                                            <Form {...formItemLayout}>
                                                <Row>
                                                    <Col md={8}>
                                                    <FormItem label="销售员" colon={false}>
                                                            <input placeholder="请输入销售员姓名" disabled value={userData.sales_name}/>
                                                    </FormItem>
                                                    <FormItem label="当前排名" colon={false}>
                                                            <input placeholder="请输入当前排名"  disabled value={userData.rank}/>
                                                    </FormItem>
                                                    <FormItem label="考核月份" colon={false}>
                                                            <input placeholder="请输入考核月份" disabled value={userData.date} />
                                                        {/* <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChangeUserType}
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
                                                        </Select> */}
                                                    </FormItem>
                                                    <FormItem label="月度回款金额" colon={false}>
                                                            <input placeholder="请输入月度回款金额" disabled value={userData.month_repay}/>
                                                    </FormItem>
                                                    <FormItem label="提成金额" colon={false}>
                                                            <input placeholder="请输入提成金额" disabled value={userData.reback_money}/>
                                                    </FormItem>
                                                    
                                                    <FormItem label="开票状态" colon={false}>
                                                            <input placeholder="开票状态" disabled value={userData.invoice_status == 0?"未达成":"已达成"} />
                                                        {/* <RadioGroup onChange={this.onChange1} value={this.state.value1}>
                                                            <Radio value={1}>已达成</Radio>
                                                            <Radio value={2}>未达成</Radio>
                                                        </RadioGroup> */}
                                                    </FormItem>
                                                    <FormItem label="所属部门" colon={false}>
                                                            <input placeholder="请输入提成金额" disabled value={userData.department}/>
                                                    </FormItem>
                                                    <FormItem label="入职时间" colon={false}>
                                                            <input placeholder="请输入提成金额" disabled value={userData.employee_time}/>
                                                    </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={4}>
                                                        <Button type="primary" htmlType="submit" onClick={()=>this.goBack()}>返回</Button></Col>
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
        }else{
            return null
        }
        
    }
}

const WatchXiaoshoushuju = Form.create()(WatchXiaoshoushujus);

export default WatchXiaoshoushuju;