/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table, Tabs, DatePicker, TimePicker } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { banciAdd, banciAll, banciSearch, banciOne, banciUpdate, banciExport } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

class Banchiguanlis extends Component {
    state = {
        confirmDirty: false,
        banchiData: [
            // {
            //     banci_name: "早班",
            //     time: 1,
            //     type: 1,
            // },
            // {
            //     banci_name: "晚班",
            //     time: 2,
            //     type: 1,
            // },
        ],
        showEdit: false,
        name: '',
        start_time: '',
        end_time: '',
    };
    componentDidMount() {
        this.banciAll();
    }
    handleSelectChange(value) {
        console.log(value);
        this.setState({
            type: value
        });
    }
    showEdit() {
        let banchiData = {
            banci_name: "",
            time: "",
            type: 2,
        }
        let x = this.state.banchiData;
        x.push(banchiData);
        console.log(x);
        this.setState({
            showEdit: true,
            banchiData: x,
        })
    }
    startTime(time, timeString) {
        console.log(time, timeString);
        this.setState({
            start_time: timeString,
        })
    }
    endTime(time, timeString) {
        console.log(time, timeString);
        this.setState({
            end_time: timeString,
        })
    }
    banciAll() {//获取全部班次数据
        let data = {
            pageNum: this.state.current - 1,
            pageSize: this.state.pageSize,
        }
        banciAll(data).then(res => {
            this.setState({
                banchiData: res.data.data,
            })
        })
    }
    banciAdd() {
        const {
            name,
            start_time,
            end_time
        } = this.state;
        let data = {
            name,
            start_time,
            end_time,
        }
        banciAdd(data).then(res=>{
            console.log(res);
        })
    }
    render() {
        const format = 'HH:mm';
        const { banchiData, showEdit } = this.state;
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
            <div className="gutter-example banchiguanli">
                <BreadcrumbCustom first="考勤管理" second="班次管理" />

                <Tabs defaultActiveKey="1">
                    <TabPane tab="班次管理" key="1">
                        <Row gutter={0}>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                {banchiData.map((item, index)=>{
                                                    return (
                                                        <Col span={24} key={index}>
                                                            <FormItem label="班次" colon={false}>
                                                                    <input placeholder="请输入班次名称" disabled value={item.name} />
                                                            </FormItem>
                                                            <FormItem label="时间" colon={false}>
                                                                    <TimePicker placeholder="请选择" value={moment(item.start_time, format)} onChange={this.startTime.bind(this)} format={format} /> -  <TimePicker placeholder="请选择" value={moment(item.end_time, format)} format={format} onChange={this.endTime.bind(this)} />
                                                            </FormItem>
                                                        </Col>
                                                    )
                                                })}
                                                <Col span={24}>
                                                    <FormItem label="班次" colon={false}>
                                                        {/* <Select
                                                            placeholder="早班"
                                                            onChange={this.handleSelectChange}
                                                        >
                                                            <Option value="male">早班</Option>
                                                            <Option value="female">晚班</Option>
                                                        </Select> */}
                                                        <input placeholder="请输入班次名称" onChange={event => {
                                                            this.setState({
                                                                name: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="时间" colon={false}>
                                                        <TimePicker placeholder="请选择" onChange={this.startTime.bind(this)} format={format} /> -  <TimePicker placeholder="请选择" format={format} onChange={this.endTime.bind(this)} />
                                                    </FormItem>
                                                </Col>
                                                <Col span={24}>
                                                    <Button type="dashed" htmlType="submit" onClick={()=>this.showEdit()}><Icon type="plus-square" />增加班次</Button>
                                                </Col>
                                                <Col span={8}>
                                                    <Button type="primary" onClick={this.banciAdd.bind(this)} >保存</Button>
                                                </Col>
                                                    {/* <Row>
                                                        <Col span={8}>
                                                            <Button type="primary" >返回</Button></Col>
                                                        <Col span={8}>
                                                            <Button type="primary" >保存</Button>
                                                        </Col>
                                                    </Row> */}
                                            </Row>
                                        </Form>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="排班表" key="2">
                        <Row gutter={0}>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col span={24}>
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
                                                <Col span={24}>
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
                                                <Col span={24}>
                                                    <Button type="dashed" htmlType="submit"><Icon type="plus-square" />添加排班</Button>
                                                </Col>
                                                <Col span={8}>
                                                    <Button type="primary" htmlType="submit">返回</Button></Col>
                                                <Col span={8}>
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