/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import {
    Card, Form, Input, Tooltip, Icon, Cascader,
    Select, Row, Col, Checkbox, Button, DatePicker,
    Table, Menu, Tabs, Upload
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { purchanseOne } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

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
        purchanseOne(data).then(res=>{
            this.setState({
                userData: res.data.supplier
            })
        })
    }
    goBack() {
        this.props.history.push(`/app/data/caigoushuju`);
    }
    onChange(date, dateString) {
        console.log(date, dateString);
        
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
                    <BreadcrumbCustom first="数据管理" second="查看采购数据"/>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="查看采购数据" key="1">
                            <Row>
                                <Col className="gutter-row" md={24}>
                                    <div className="gutter-box">
                                        <Card bordered={false}>
                                            <Form {...formItemLayout}>
                                                <Row>
                                                    <Col md={24}>
                                                        <FormItem label="公司名称" colon={false}>
                                                            <input placeholder="请输入公司名称" disabled value={userData.company_name} />
                                                        </FormItem>
                                                        <FormItem label="通道" colon={false}>
                                                            <input placeholder="请输入通道" disabled value={userData.way} />
                                                        </FormItem>
                                                        <FormItem label="属性" colon={false}>
                                                            <input placeholder="请输入属性" disabled value={userData.resource} />
                                                        </FormItem>
                                                        <FormItem label="采购价" colon={false}>
                                                            <input placeholder="请输入采购价" disabled value={userData.price} />
                                                        </FormItem>
                                                        <FormItem label="数量" colon={false}>
                                                            <input placeholder="请输入数量" disabled value={userData.num}  />
                                                        </FormItem>
                                                        <FormItem label="总金额" colon={false}>
                                                            <input placeholder="请输入总金额" disabled value={userData.total_price} />
                                                        </FormItem>
                                                        <FormItem label="采购日期" colon={false}>
                                                            <DatePicker placeholder="请选择" disabled value={moment(userData.date, 'YYYY/MM/DD')} onChange={this.onChange.bind(this)} />
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