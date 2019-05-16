/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table, 
    Tabs, DatePicker, TimePicker, Modal } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { banciAdd, banciAll, banciSearch, banciOne, banciUpdate, banciExport, banciDelete } from '../../axios';
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
        name: '',
        start_time: '',
        end_time: '',
        visible: false,
        visible1: false,
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
    banciOne(id) {//获取单个班次数据
        let data = {
            id,
        }
        banciOne(data).then(res => {
            this.setState({
                name: res.data.supplier.name,
                start_time: res.data.supplier.start_time,
                end_time: res.data.supplier.end_time,
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
            if (res.msg === "success") {
                this.banciAll();
            }
        })
    }
    banciUpdate() {
        const {
            name,
            start_time,
            end_time,
            id
        } = this.state;
        let data = {
            id,
            update_json: JSON.stringify({
                name,
                start_time,
                end_time,
            }),
            token: localStorage.getItem('user_token'),
        }
        banciUpdate(data).then(res => {
            console.log(res);
            if(res.msg === "success"){
                this.banciAll();
            }
        })
    }
    banciDelete(id) {
        let data = {
            id: this.state.id
        }
        banciDelete(data).then(res => {
            console.log(res);
            if (res.msg === "success") {
                this.banciAll();
            }
        })
    }
    
    handleOk = (e) => {//新增资源属性
        this.banciAdd();
        this.setState({
            visible: false,
        })
    }
    handleOk1 = (e) => {//新增资源属性
        this.banciUpdate();
        this.setState({
            visible1: false,
        })
    }
    handleOk2 = (e) => {//新增资源属性
        this.banciDelete();
        this.setState({
            visible2: false,
        })
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel1 = (e) => {
        console.log(e);
        this.setState({
            visible1: false,
        });
    }
    handleCancel2 = (e) => {
        console.log(e);
        this.setState({
            visible2: false,
        });
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    showModal1 = (id) => {
        let that = this;
        this.setState({
            visible1: true,
            id,
        },()=>{
            that.banciOne(id);
        });
    }
    showModal2 = (id) => {
        let that = this;
        this.setState({
            visible2: true,
            id,
        });
    }
    render() {
        const format = 'HH:mm';
        const { banchiData } = this.state;
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
                                                                <Row>
                                                                    <Col span={10}>
                                                                        <input placeholder="请输入班次名称" disabled value={item.name} />
                                                                    </Col>
                                                                    <Col span={10}>
                                                                        <a type="primary" onClick={this.showModal1.bind(this, item.id)} className="banci_a"><Icon type="form" />编辑</a>
                                                                        <a type="primary" onClick={this.showModal2.bind(this, item.id)} className="banci_a stop"><Icon type="delete" />删除</a>
                                                                    </Col>
                                                                </Row> 
                                                                
                                                            </FormItem>
                                                            <FormItem label="时间" colon={false}>
                                                                    <TimePicker placeholder="请选择" disabled value={moment(item.start_time, format)}  format={format} /> -  
                                                                    <TimePicker placeholder="请选择" disabled value={moment(item.end_time, format)} format={format}  />
                                                            </FormItem>
                                                        </Col>
                                                    )
                                                })}
                                                <Col span={24}>
                                                    <Button type="dashed" htmlType="submit" onClick={() => this.showModal()}><Icon type="plus-square" />增加班次</Button>
                                                </Col>
                                                <Modal
                                                    title="新增班次"
                                                    visible={this.state.visible}
                                                    onOk={this.handleOk}
                                                    onCancel={this.handleCancel}
                                                    okText="保存"
                                                    cancelText="返回"
                                                >
                                                    <Row>
                                                        <Col span={24}>
                                                            <FormItem label="班次" colon={false}>
                                                                <input placeholder="请输入班次名称" onChange={event => {
                                                                    this.setState({
                                                                        name: event.target.value
                                                                    });
                                                                }}/>
                                                            </FormItem>
                                                            <FormItem label="时间" colon={false}>
                                                                <TimePicker placeholder="请选择" format={format} onChange={this.startTime.bind(this)} /> -  
                                                                <TimePicker placeholder="请选择" format={format} onChange={this.endTime.bind(this)} />
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                </Modal>
                                                <Modal
                                                    title="编辑班次"
                                                    visible={this.state.visible1}
                                                    onOk={this.handleOk1}
                                                    onCancel={this.handleCancel1}
                                                    okText="保存"
                                                    cancelText="返回"
                                                >
                                                    <Row>
                                                        <Col span={24}>
                                                            <FormItem label="班次" colon={false}>
                                                                <input placeholder="请输入班次名称" value={this.state.name} onChange={event => {
                                                                    this.setState({
                                                                        name: event.target.value
                                                                    });
                                                                }} />
                                                            </FormItem>
                                                            <FormItem label="时间" colon={false}>
                                                                <TimePicker placeholder="请选择" value={moment(this.state.start_time, format)} format={format} onChange={this.startTime.bind(this)} /> -
                                                                <TimePicker placeholder="请选择" value={moment(this.state.end_time, format)} format={format} onChange={this.endTime.bind(this)} />
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                </Modal>
                                                <Modal
                                                    title="删除"
                                                    visible={this.state.visible2}
                                                    onOk={this.handleOk2}
                                                    onCancel={this.handleCancel2}
                                                    okText="删除"
                                                    cancelText="取消"
                                                >
                                                    <Row>
                                                        <Col span={24}>
                                                               <p>是否删除班次</p>
                                                        </Col>
                                                    </Row>
                                                </Modal>
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