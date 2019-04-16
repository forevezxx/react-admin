/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table, Tabs, DatePicker } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

class Banchiguanlis extends Component {
    state = {
        confirmDirty: false,
    };
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        function onChanges(checkedValues) {
            console.log('checked = ', checkedValues);
        }
        const options = [
            { label: '员工1', value: '员工1' },
            { label: '员工2', value: '员工2' },
            { label: '员工3', value: '员工3' },
        ];
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="考勤管理" second="班次管理" />

                <Tabs defaultActiveKey="1">
                    <TabPane tab="班次管理" key="1">
                        <Row gutter={0}>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="班次" colon={false}>
                                                        <Select
                                                            placeholder="早班"
                                                            onChange={this.handleSelectChange}
                                                        >
                                                            <Option value="male">早班</Option>
                                                            <Option value="female">晚班</Option>
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="时间" colon={false}>
                                                        <input placeholder="请输入班次名称" disabled value="07：00-15：00" />
                                                    </FormItem>
                                                </Col>
                                                <Col md={24}>
                                                    <FormItem label="班次" colon={false}>
                                                        <Select
                                                            placeholder="早班"
                                                            onChange={this.handleSelectChange}
                                                        >
                                                            <Option value="male">早班</Option>
                                                            <Option value="female">晚班</Option>
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="时间" colon={false}>
                                                        <input placeholder="请输入班次名称" disabled value="07：00-15：00" />
                                                    </FormItem>
                                                </Col>
                                                <Col md={24}>
                                                    <Button type="dashed" htmlType="submit"><Icon type="plus-square" />增加班次</Button>
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit">返回</Button></Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit">保存</Button></Col>
                                            </Row>
                                        </Form>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="排班表" key="2">
                        <Row gutter={0}>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="班次" colon={false}>
                                                        <input placeholder="请输入班次名称" />
                                                    </FormItem>
                                                    <FormItem label="时间" colon={false}>
                                                        <DatePicker onChange={() => this.onChange} />
                                                    </FormItem>
                                                    <FormItem label="人员" colon={false}>
                                                        <CheckboxGroup options={options} defaultValue={['员工3']} onChange={onChanges} />
                                                    </FormItem>
                                                </Col>
                                                <Col md={24}>
                                                    <FormItem label="班次" colon={false}>
                                                        <input placeholder="请输入班次名称" />
                                                    </FormItem>
                                                    <FormItem label="时间" colon={false}>
                                                        <DatePicker onChange={() => this.onChange} />
                                                    </FormItem>
                                                    <FormItem label="人员" colon={false}>
                                                        <CheckboxGroup options={options} defaultValue={['员工3']} onChange={onChanges} />
                                                    </FormItem>
                                                </Col>
                                                <Col md={24}>
                                                    <Button type="dashed" htmlType="submit"><Icon type="plus-square" />添加排班</Button>
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit">返回</Button></Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit">保存</Button></Col>
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

const Banchiguanli = Form.create()(Banchiguanlis);

export default Banchiguanli;