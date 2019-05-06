/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, 
    Select, Row, Col, Checkbox, Button, 
    Table, Menu, Tabs, Upload, DatePicker, Radio
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { supplierOne, supplierUpdate } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class EditBaoxiaos extends Component {
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
        values: 1,
        values2: 1,
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
    onChange3 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            values: e.target.value,
        });
    }
    goBack() {
        this.props.history.push(`/app/pay/gongfei`);
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
                this.props.history.push(`/app/pay/gongfei`);
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
                                                        <input placeholder="请输入请款人姓名"/>
                                                    </FormItem>
                                                    <FormItem label="部门" colon={false}>
                                                        <input placeholder="请输入对象类别"/>
                                                    </FormItem>
                                                    <FormItem label="申请日期" colon={false}>
                                                        <DatePicker  placeholder="请选择" onChange={()=>this.onChange} />
                                                    </FormItem>
                                                    <FormItem label="申请金额" colon={false}>
                                                        <input placeholder="请输入申请金额" />
                                                    </FormItem>
                                                    <FormItem label="费用类型" colon={false}>
                                                        <input placeholder="请输入费用类型" />
                                                    </FormItem>
                                                    <FormItem label="请款用途" colon={false}>
                                                        <TextArea rows={4} defaultValue="请输入请款用途"/>
                                                    </FormItem>
                                                    <FormItem label="审核人" colon={false}>
                                                        <input placeholder="请输入审核人姓名" />
                                                    </FormItem>
                                                    <FormItem label="复核人" colon={false}>
                                                        <input placeholder="请输入复核人姓名" />
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