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
import { imprestAdd, imprestGetMoney } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class NewOutPays extends Component {
    state = {
        name: '',
        reason: '',
        money: '',
        time: '',
        last: '',
        now_total: '',
    };
    componentDidMount() {
        this.imprestGetMoney();
    }
    onChange(date, dateString) {
        console.log(date, dateString);
        this.setState({
            time: dateString,
        })
    }

    onChange2 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    imprestAdd() {
        const {
            name,
            reason,
            money,
            time, 
        } = this.state;
        let data = {
            name,
            reason,
            money,
            time,
            type: 2,
        }
        imprestAdd(data).then(res=>{
            if (res.msg === "success") {
                this.props.history.push(`/app/pay/beiyongjin`);
            }
        })
    }
    goBack() {
        this.props.history.push(`/app/pay/beiyongjin`);
    }
    imprestGetMoney() {
        imprestGetMoney().then(res => {
            this.setState({
                last: res.data.last,
                now_total: res.data.now_total,
            })
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
                <BreadcrumbCustom first="出纳管理" second="备用金管理" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="新增备用金出账记录" key="1">
                        <Row>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col span={12}>

                                                    <FormItem label="备用金总额" colon={false}>
                                                        <input placeholder="" disabled value={this.state.now_total}/>
                                                    </FormItem>
                                                    <FormItem label="出账人" colon={false}>
                                                        <input placeholder="请输入出账人姓名" onChange={event => {
                                                            this.setState({
                                                                name: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="出账时间" colon={false}>
                                                        <DatePicker placeholder="请选择" onChange={this.onChange.bind(this)} />
                                                    </FormItem>
                                                    <FormItem label="出账用途" colon={false}>
                                                        <input placeholder="请输入出账用途" onChange={event => {
                                                            this.setState({
                                                                reason: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="出账金额" colon={false}>
                                                        <input placeholder="请输入出账金额" onChange={event => {
                                                            this.setState({
                                                                money: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="当前结余" colon={false}>
                                                        <input placeholder="" disabled value={this.state.last} />
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={4}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.goBack()}>返回</Button></Col>
                                                <Col span={4}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.imprestAdd()}>保存</Button></Col>
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

const NewOutPay = Form.create()(NewOutPays);

export default NewOutPay;