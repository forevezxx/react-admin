/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, 
    Select, Row, Col, Checkbox, Button, 
    Table, Menu, Tabs, Upload
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { supplierAdd } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;

const TabPane = Tabs.TabPane;


class NewShouldPays extends Component {
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
    };
    handleSelectChangeCompanyType(value){
        console.log(value)
        this.setState({
            company_type: value
        });
    }
    handleSelectChangeIndustry(value) {
        console.log(value)
        this.setState({
            industry: value
        });
    }
    handleSelectChangeSource(value) {
        console.log(value)
        this.setState({
            source: value
        });
    }
    goBack() {
        this.props.history.push(`/app/shouldPay/document`);
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
            source
        }
        supplierAdd(data).then(res => {
            console.log(res);
            if (res.msg === "success") {
                this.props.history.push(`/app/shouldPay/document`);
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
                <BreadcrumbCustom first="应付管理" second="档案管理" third="新增供应商档案"/>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="新增供应商档案" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="公司类型" colon={false}>
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChangeCompanyType.bind(this)}
                                                        >
                                                            <Option value="1">运营商</Option>
                                                            <Option value="2">同行公司</Option>
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="公司名称" colon={false}>
                                                        <input placeholder="请输入公司名称" onChange={event => {
                                                            this.setState({
                                                                company_name: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="负责人" colon={false}>
                                                        <input placeholder="请输入负责人名称" onChange={event => {
                                                            this.setState({
                                                                company_owner: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="职位" colon={false}>
                                                        <input placeholder="请输入负责人职位" onChange={event => {
                                                            this.setState({
                                                                position: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="所属行业" colon={false}>
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChangeIndustry.bind(this)}
                                                        >
                                                            <Option value="1">金融业</Option>
                                                            <Option value="2">游戏业</Option>
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="邮箱" colon={false}>
                                                        <input placeholder="请输入联系邮箱" onChange={event => {
                                                            this.setState({
                                                                email: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="地址" colon={false}>
                                                        <input placeholder="请输入公司地址，省、市、区、详细地址" onChange={event => {
                                                            this.setState({
                                                                address: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="座机" colon={false}>
                                                        <input placeholder="请输入公司座机" onChange={event => {
                                                            this.setState({
                                                                tel: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="手机号码" colon={false}>
                                                        <input placeholder="请输入联系人手机号码" onChange={event => {
                                                            this.setState({
                                                                phone: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <Form.Item
                                                        label="公司照片"
                                                        extra="longgggggggggggggggggggggggggggggggggg"
                                                    >
                                                        {getFieldDecorator('upload', {
                                                            valuePropName: 'fileList',
                                                            getValueFromEvent: this.normFile,
                                                        })(
                                                            <Upload name="logo" action="/upload.do" listType="picture">
                                                                <Button>
                                                                    <Icon type="upload" /> Click to upload
              </Button>
                                                            </Upload>
                                                        )}
                                                    </Form.Item>
                                                    <FormItem label="合同编号" colon={false}>
                                                        <input placeholder="请输入合同编号" onChange={event => {
                                                            this.setState({
                                                                contract_num: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="来源" colon={false}>
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChangeSource.bind(this)}
                                                        >
                                                            <Option value="1">展会</Option>
                                                            <Option value="2">广告杂志</Option>
                                                            <Option value="3">客户转介绍</Option>
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.goBack()}>返回</Button></Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.newSupplier()}>保存</Button></Col>
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

const NewShouldPay = Form.create()(NewShouldPays);

export default NewShouldPay;