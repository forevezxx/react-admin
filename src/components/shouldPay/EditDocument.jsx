/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import {
    Card, Form, Input, Tooltip, Icon, Cascader,
    Select, Row, Col, Checkbox, Button,
    Table, Menu, Tabs, Upload
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import moment from 'moment';
import { supplierOne, supplierUpdate } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;

const TabPane = Tabs.TabPane;


class EditDocuments extends Component {
    state = {
        id: '',
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
        maker: '',
        make_time: '',
        last_follow: '',
    };
    componentDidMount() {
        this.getSupplierOne(this.props.match.params.id);
    }
    getSupplierOne(id) {
        let data = {
            id
        }
        supplierOne(data).then(res => {
            this.setState({
                id: res.data.supplier.id,
                company_type: res.data.supplier.company_type,
                company_name: res.data.supplier.company_name,
                company_owner: res.data.supplier.company_owner,
                position: res.data.supplier.position,
                industry: res.data.supplier.industry,
                email: res.data.supplier.email,
                address: res.data.supplier.address,
                tel: res.data.supplier.tel,
                phone: res.data.supplier.phone,
                company_pic: res.data.supplier.company_pic,
                contract_num: res.data.supplier.contract_num,
                source: res.data.supplier.source,
                maker: res.data.supplier.maker,
                make_time: res.data.supplier.make_time,
                last_follow: res.data.supplier.last_follow,
            })
        })
    }
    goBack() {
        this.props.history.push(`/app/shouldPay/document`);
    }
    supplierUpdate() {
        const {
            id,
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
            maker,
            make_time,
            last_follow,
        } = this.state;
        let data = {
            id: this.props.match.params.id,
            update_json: JSON.stringify({
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
                maker,
                make_time,
                last_follow,
            }),
            token: localStorage.getItem('user_token'),
        };
        supplierUpdate(data).then(res => {
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
        const {
            id,
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
            maker,
            make_time,
            last_follow,
        } = this.state;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="应付管理" second="档案管理" third="编辑供应商档案" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="编辑供应商档案" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="公司类型" colon={false}>
                                                        <input value={company_type} onChange={event => { this.setState({ company_type: event.target.value })}} />
                                                    </FormItem>
                                                    <FormItem label="公司名称" colon={false}>
                                                        <input value={company_name} onChange={event => { this.setState({ company_name: event.target.value }) }}  />
                                                    </FormItem>
                                                    <FormItem label="负责人" colon={false}>
                                                        <input value={company_owner} onChange={event => { this.setState({ company_owner: event.target.value }) }}  />
                                                    </FormItem>
                                                    <FormItem label="职位" colon={false}>
                                                        <input value={position} onChange={event => { this.setState({ position: event.target.value }) }}  />
                                                    </FormItem>
                                                    <FormItem label="所属行业" colon={false}>
                                                        <input value={industry} onChange={event => { this.setState({ industry: event.target.value }) }}  />
                                                    </FormItem>
                                                    <FormItem label="邮箱" colon={false}>
                                                        <input value={email} onChange={event => { this.setState({ email: event.target.value }) }}  />
                                                    </FormItem>
                                                    <FormItem label="地址" colon={false}>
                                                        <input value={address} onChange={event => { this.setState({ address: event.target.value }) }}  />
                                                    </FormItem>
                                                    <FormItem label="座机" colon={false}>
                                                        <input value={tel} onChange={event => { this.setState({ tel: event.target.value }) }}  />
                                                    </FormItem>
                                                    <FormItem label="手机号码" colon={false}>
                                                        <input value={phone} onChange={event => { this.setState({ phone: event.target.value }) }}  />
                                                    </FormItem>
                                                    <FormItem label="公司照片" colon={false}>
                                                        <input value={company_pic} onChange={event => { this.setState({ company_pic: event.target.value }) }}  />
                                                    </FormItem>
                                                    <FormItem label="合同编号" colon={false}>
                                                        <input value={contract_num} onChange={event => { this.setState({ contract_num: event.target.value }) }}  />
                                                    </FormItem>
                                                    <FormItem label="来源" colon={false}>
                                                        <input value={source} onChange={event => { this.setState({ source: event.target.value }) }}  />
                                                    </FormItem>
                                                    <FormItem label="建档人" colon={false}>
                                                        <input value={maker} onChange={event => { this.setState({ maker: event.target.value }) }} />
                                                    </FormItem>
                                                    <FormItem label="建档时间" colon={false}>
                                                        <input value={moment(Number(make_time) * 1000).format('YYYY-MM-DD')} onChange={event => { this.setState({ make_time: event.target.value }) }}  />
                                                    </FormItem>
                                                    <FormItem label="最后一次跟进" colon={false}>
                                                        <input value={moment(Number(last_follow) * 1000).format('YYYY-MM-DD')} onChange={event => { this.setState({ last_follow: event.target.value }) }} />
                                                    </FormItem>
                                                </Col>
                                                <Col md={8}><Button type="primary" htmlType="submit" onClick={() => this.goBack()}>返回</Button></Col>
                                                <Col md={8}><Button type="primary" htmlType="submit" onClick={() => this.supplierUpdate()}>保存</Button></Col>
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

const EditDocument = Form.create()(EditDocuments);

export default EditDocument;