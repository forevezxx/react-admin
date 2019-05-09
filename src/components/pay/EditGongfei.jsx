/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, 
    Select, Row, Col, Checkbox, Button, 
    Table, Menu, Tabs, Upload, DatePicker, Radio
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { publicMoneyOne, publicMoneyUpdate } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class EditBaoxiaos extends Component {
    state = {
        ask_name: '',
        department: '',
        date: '',
        count: '',
        type: '',
        reason: '',
        check_people: '',
        recheck_people: '',
    };
    componentDidMount() {
        this.getSupplierOne(this.props.match.params.id);
    }
    getSupplierOne(id) {
        let that = this;
        let data = {
            id
        }
        publicMoneyOne(data).then(res => {
            that.setState({
                ask_name: res.data.supplier.ask_name,
                department: res.data.supplier.department,
                date: res.data.supplier.date,
                count: res.data.supplier.count,
                type: res.data.supplier.type,
                reason: res.data.supplier.reason,
                check_people: res.data.supplier.check_people,
                recheck_people: res.data.supplier.recheck_people,
            })
        })
    }
    onChange3 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            values: e.target.value,
        });
    }

    onChange(date, dateString) {
        this.setState({
            date: dateString,
        })
        console.log(date, dateString);
    }
    goBack() {
        this.props.history.push(`/app/pay/gongfei`);
    }
    supplierUpdate() {
        const {
            ask_name,
            department,
            date,
            count,
            type,
            reason,
            check_people,
            recheck_people,
        } = this.state;
        let data = {
            id: this.props.match.params.id,
            update_json: JSON.stringify({
                ask_name,
                department,
                date,
                count,
                type,
                reason,
                check_people,
                recheck_people,
            }),
            token: localStorage.getItem('user_token'),
        };
        publicMoneyUpdate(data).then(res => {
            if (res.msg === "success") {
                this.props.history.push(`/app/pay/gongfei`);
            }
        })
    }
    render() {
        const {
            ask_name,
            department,
            date,
            count,
            type,
            reason,
            check_people,
            recheck_people,
        } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="出纳管理" second="公费管理" third="编辑"/>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="编辑公费记录" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="请款人" colon={false}>
                                                        <input placeholder="请输入请款人姓名" value={ask_name} onChange={event => { this.setState({ ask_name: event.target.value }) }}/>
                                                    </FormItem>
                                                    <FormItem label="部门" colon={false}>
                                                        <input placeholder="请输入对象类别" value={department} onChange={event => { this.setState({ department: event.target.value }) }}/>
                                                    </FormItem>
                                                    <FormItem label="申请日期" colon={false}>
                                                        <DatePicker  placeholder="请选择" value={moment(date,'YYYY/MM/DD')} onChange={this.onChange.bind(this)} />
                                                    </FormItem>
                                                    <FormItem label="申请金额" colon={false}>
                                                        <input placeholder="请输入申请金额" value={count} onChange={event => { this.setState({ count: event.target.value }) }}/>
                                                    </FormItem>
                                                    <FormItem label="费用类型" colon={false}>
                                                        <input placeholder="请输入费用类型"  value={type} onChange={event => { this.setState({ type: event.target.value }) }}/>
                                                    </FormItem>
                                                    <FormItem label="请款用途" colon={false}>
                                                        <TextArea rows={4} placeholder="请输入请款用途" value={reason} onChange={event => { this.setState({ reason: event.target.value }) }}/>
                                                    </FormItem>
                                                    <FormItem label="审核人" colon={false}>
                                                        <input placeholder="请输入审核人姓名" value={check_people} onChange={event => { this.setState({ check_people: event.target.value }) }} />
                                                    </FormItem>
                                                    <FormItem label="复核人" colon={false}>
                                                        <input placeholder="请输入复核人姓名" value={recheck_people} onChange={event => { this.setState({ recheck_people: event.target.value }) }}/>
                                                    </FormItem>
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={()=>this.goBack()}>返回</Button></Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={()=>this.supplierUpdate()}>保存</Button></Col>
                                            </Row>
                                        </Form>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>,
            </div>
        )
    }
}

const EditBaoxiao = Form.create()(EditBaoxiaos);

export default EditBaoxiao;