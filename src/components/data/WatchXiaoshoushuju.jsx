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
import { userOne } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;


class WatchXiaoshoushujus extends Component {
    state = {
        userData: '',
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
                userData: res.data.user
            })
        })
    }
    goBack() {
        this.props.history.push(`/app/data/xiaoshoushuju`);
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
                                                    <Col md={24}>
                                                    <FormItem label="销售员" colon={false}>
                                                        <input placeholder="请输入销售员姓名" onChange={event => {
                                                            this.setState({
                                                                sales_name: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="当前排名" colon={false}>
                                                        <input placeholder="请输入当前排名" onChange={event => {
                                                            this.setState({
                                                                rank: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="考核月份" colon={false}>
                                                        <Select
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
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="月度回款金额" colon={false}>
                                                        <input placeholder="请输入月度回款金额" onChange={event => {
                                                            this.setState({
                                                                back_money: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="提成金额" colon={false}>
                                                        <input placeholder="请输入提成金额" onChange={event => {
                                                            this.setState({
                                                                back_money: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    
                                                    <FormItem label="开票状态" colon={false}>
                                                        <RadioGroup onChange={this.onChange1} value={this.state.value1}>
                                                            <Radio value={1}>已达成</Radio>
                                                            <Radio value={2}>未达成</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                    <FormItem label="所属部门" colon={false}>
                                                        <input placeholder="请输入提成金额" disabled value="销售部"/>
                                                    </FormItem>
                                                    <FormItem label="入职时间" colon={false}>
                                                        <input placeholder="请输入提成金额" disabled value="2019.02.28"/>
                                                    </FormItem>
                                                    </Col>
                                                    <Col md={8}>
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