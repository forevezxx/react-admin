/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, 
    Select, Row, Col, Checkbox, Button, 
    Table, Menu, Tabs, Upload, DatePicker, Radio
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { baoxiaoOne, baoxiaoUpdate } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class EditBaoxiaos extends Component {
    state = {
        people: '',
        time: '',
        account: '',
        method: '',
        project: '',
        check_people: '',
        recheck_people: '',
        make_people: '',
    };
    componentDidMount() {
        this.getSupplierOne(this.props.match.params.id);
    }
    getSupplierOne(id) {
        let data = {
            id
        }
        baoxiaoOne(data).then(res => {
            this.setState({
                id: res.data.id,
                people: res.data.people,
                time: res.data.time,
                account: res.data.account,
                method: res.data.method,
                project: res.data.project,
                check_people: res.data.check_people,
                recheck_people: res.data.recheck_people,
                make_people: res.data.make_people,
            })
        })
    }

    onChange(date, dateString) {
        this.setState({
            time: dateString,
        })
        console.log(date, dateString);
    }
    goBack() {
        this.props.history.push(`/app/pay/baoxiao`);
    }
    supplierUpdate() {
        const {
            id,
            people,
            time,
            account,
            method,
            project,
            check_people,
            recheck_people,
            make_people,
        } = this.state;
        let data = {
            id: this.props.match.params.id,
            update_json: JSON.stringify({
                people,
                time,
                account,
                method,
                project,
                check_people,
                recheck_people,
                make_people,
            }),
            token: localStorage.getItem('user_token'),
        };
        baoxiaoUpdate(data).then(res => {
            if (res.msg === "success") {
                this.props.history.push(`/app/pay/baoxiao`);
            }
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const {
            people,
            time,
            account,
            method,
            project,
            check_people,
            recheck_people,
            make_people,
        } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="出纳管理" second="报销管理" third="编辑"/>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="编辑报销记录" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="报销人" colon={false}>
                                                        <input placeholder="请输入报销人姓名" value={people} onChange={event => { this.setState({ people: event.target.value }) }}/>
                                                    </FormItem>
                                                    <FormItem label="报销时间" colon={false}>
                                                        <DatePicker  placeholder="请选择" onChange={this.onChange.bind(this)} />
                                                    </FormItem>

                                                    <FormItem label="报销金额" colon={false}>
                                                        <input placeholder="请输入报销金额" value={account} onChange={event => { this.setState({ account: event.target.value }) }} />
                                                    </FormItem>
                                                    <FormItem label="报销方式" colon={false}>
                                                        <input placeholder="请输入报销方式" value={method} onChange={event => { this.setState({ method: event.target.value }) }} />
                                                    </FormItem>
                                                    <FormItem label="报销项目" colon={false}>
                                                        <TextArea rows={4} placeholder="请输入报销项目" value={project} onChange={event => { this.setState({ project: event.target.value }) }} />
                                                    </FormItem>
                                                    <FormItem label="审核人" colon={false}>
                                                        <input placeholder="请输入审核人姓名" value={check_people} onChange={event => { this.setState({ check_people: event.target.value }) }} />
                                                    </FormItem>
                                                    <FormItem label="复核人" colon={false}>
                                                        <input placeholder="请输入复核人姓名" value={recheck_people} onChange={event => { this.setState({ recheck_people: event.target.value }) }} />
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