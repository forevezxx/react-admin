/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, 
    Select, Row, Col, Checkbox, Button, 
    Table, Menu, Tabs, Upload, DatePicker, Radio
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { supplierAdd } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;


class NewUserFiless extends Component {
    state = {
        confirmDirty: false,
        company_type: '',
        company_name: '',
        company_owner: '',
        position: '',
        industry: '',
        email: '',
        address: '',
        tel: '',
        phone: '',
        company_pic: '',
        contract_num: '',
        source: '',
        values: 1,
    };
    onChange3 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            values: e.target.value,
        });
    }
    goBack() {
        this.props.history.push(`/app/shouldCollect/userFiles`);
    }
    newSupplier() {
        const { 
            company_type,
            company_name,
            company_owner,
            position,
            industry,
            email,
            address,
            tel,
            phone,
            company_pic,
            contract_num,
            source
        } = this.state;
        const token = localStorage.getItem('user_token');
        let data = {
            company_type,
            company_name,
            company_owner,
            position,
            industry,
            email,
            address,
            tel,
            phone,
            company_pic,
            contract_num,
            source,
            token
        }
        supplierAdd(data).then(res => {
            console.log(res);
            if (res.msg === "success") {
                this.props.history.push(`/app/shouldCollect/userFiles`);
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
                <BreadcrumbCustom first="应收管理" second="客户档案" third="新增"/>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="新增客户档案" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="客户编号" colon={false}>
                                                        <input placeholder="请输入客户编号" />
                                                    </FormItem>
                                                    <FormItem label="客户名称" colon={false}>
                                                        <input placeholder="请输入客户名称" />
                                                    </FormItem>
                                                    <FormItem label="订单编号" colon={false}>
                                                        <input placeholder="请输入订单编号" />
                                                    </FormItem>
                                                    <FormItem label="资源属性" colon={false}>
                                                        <input placeholder="请输入资源属性" />
                                                    </FormItem>
                                                    <FormItem label="负责人" colon={false}>
                                                        <input placeholder="请输入负责人姓名" />
                                                    </FormItem>
                                                    <FormItem label="联系电话" colon={false}>
                                                        <input placeholder="请输入联系电话" />
                                                    </FormItem>
                                                    <FormItem label="所在地址" colon={false}>
                                                        <input placeholder="请输入省、市、区、详细地址" />
                                                    </FormItem>
                                                    <FormItem label="客户邮箱" colon={false}>
                                                        <input placeholder="请输入客户邮箱" />
                                                    </FormItem>

                                                    <FormItem label="客户来源" colon={false}>
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChange}
                                                        >
                                                            <Option value="1">展会</Option>
                                                            <Option value="2">广告杂志</Option>
                                                            <Option value="3">客户转介绍</Option>
                                                            
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="跟进人员" colon={false}>
                                                        <input placeholder="请输入跟进人员" />
                                                    </FormItem>
                                                    <FormItem label="跟进时间" colon={false}>
                                                        <DatePicker placeholder="请选择" onChange={() => this.onChange} />
                                                    </FormItem>
                                                    <FormItem label="平账状态" colon={false}>
                                                        <RadioGroup onChange={this.onChange3} value={this.state.values}>
                                                            <Radio value={1}>已平账</Radio>
                                                            <Radio value={2}>未平账</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={()=>this.goBack()}>返回</Button></Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={()=>this.newSupplier()}>保存</Button></Col>
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

const NewUserFiles = Form.create()(NewUserFiless);

export default NewUserFiles;