/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table, 
    Tabs, DatePicker, TimePicker, Modal } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { 
    banciAdd, banciAll, banciSearch, banciOne, banciUpdate, banciExport, banciDelete,
    banciOrderAdd, banciOrderAll, banciOrderSearch, banciOrderOne, banciOrderUpdate, banciOrderExport, banciOrderDelete,
    userAll
} from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

class Banchiguanlis extends Component {
    state = {
        confirmDirty: false,
        banchiData: [],
        paibanData: [],
        name: '',
        start_time: '',
        end_time: '',
        visible: false,
        visible1: false,
        visible2: false,
        banciVisible: false,
        banciVisible1: false,
        banciVisible2: false,
        type: 1,
        banciNameList: [],
        banci_start_time: '',
        banci_end_time: '',
        banci_id: '',
        banci_name: '',
        allUserList: [],
        user_id_list: [],
    };
    componentDidMount() {
        // this.banciAll();
        this.callback(this.state.type);
    }
    getUserAll() {//获取用户信息
        let data = {
            pageNum: this.state.current - 1,
            pageSize: this.state.pageSize,
        }
        userAll(data).then(res => {
            console.log(res);
            this.setState({
                allUserList: res.data.data,
            })
        })
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
        let that = this;
        let data = {
            pageNum: this.state.current - 1,
            pageSize: this.state.pageSize,
        }
        banciAll(data).then(res => {
            this.setState({
                banchiData: res.data.data,
            },()=>{
                that.formatUsers(res.data.data);
            })
        })
    }
    banciOrderAll() {
        let that = this;
        let data = {
            pageNum: this.state.current - 1,
            pageSize: this.state.pageSize,
        }
        banciOrderAll(data).then(res => {
            this.setState({
                paibanData: res.data.data,
            })
        })
    }
    formatUsers(dataList) {
        let x = [];
        for (var i = 0; i < dataList.length; i++) {
            x.push(dataList[i].name);
        }
        this.setState({
            banciNameList: x,
        })
    }
    handleSelectChangeBanciNameSelect(value) {
        console.log(value)
        this.setState({
            banci_name: this.state.banchiData[value].name,
            banci_id: this.state.banchiData[value].id,
            banci_start_time: this.state.banchiData[value].start_time,
            banci_end_time: this.state.banchiData[value].end_time,
        });
    }
    userAuth(e) {
        console.log('checked = ', e.target.value);
        let arr = this.state.user_id_list;
        let index = arr.indexOf(e.target.value);
        if (index > -1) {
            arr.splice(index, 1);
        } else {
            arr.push(e.target.value);
        }
        this.setState({
            user_id_list: arr,
        }, () => {
                console.log(this.state.user_id_list)
        });
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
    banciOrderOne(id) {//获取单个班次数据
        let data = {
            id,
        }
        banciOrderOne(data).then(res => {
            // this.setState({
            //     user_id_list: res.data.supplier.name,
            //     start_time: res.data.supplier.start_time,
            //     end_time: res.data.supplier.end_time,
            // })
        })
    }
    banciOrderAdd() {
        const {
            banci_id,
            user_id_list
        } = this.state;
        let data = {
            banci_id,
            user_id_list
        }
        banciOrderAdd(data).then(res => {
            console.log(res);
            if (res.msg === "success") {
                this.banciOrderAll();
            }
        })
    }
    banciOrderUpdate() {
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
        banciOrderUpdate(data).then(res => {
            console.log(res);
            if (res.msg === "success") {
                this.banciOrderAll();
            }
        })
    }
    banciOrderDelete(id) {
        let data = {
            id: this.state.id
        }
        banciOrderDelete(data).then(res => {
            console.log(res);
            if (res.msg === "success") {
                this.banciOrderAll();
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

    //班次
    handleBanciOk = (e) => {//新增资源属性
        this.banciOrderAdd();
        this.setState({
            banciVisible: false,
        })
    }
    handleBanciOk1 = (e) => {//新增资源属性
        this.banciOrderUpdate();
        this.setState({
            banciVisible1: false,
        })
    }
    handleBanciOk2 = (e) => {//新增资源属性
        this.banciOrderDelete();
        this.setState({
            banciVisible2: false,
        })
    }
    handleBanciCancel = (e) => {
        console.log(e);
        this.setState({
            banciVisible: false,
        });
    }
    handleBanciCancel1 = (e) => {
        console.log(e);
        this.setState({
            banciVisible1: false,
        });
    }
    handleBanciCancel2 = (e) => {
        console.log(e);
        this.setState({
            banciVisible2: false,
        });
    }
    showBanciModal = () => {
        let that = this;
        this.setState({
            banciVisible: true,
        }, () => {
            that.handleSelectChangeBanciNameSelect(0);
            that.getUserAll();
        });
    }
    showBanciModal1 = (id) => {
        let that = this;
        this.setState({
            banciVisible1: true,
            id,
        }, () => {
            that.banciOrderOne(id);
        });
    }
    showBanciModal2 = (id) => {
        let that = this;
        this.setState({
            banciVisible2: true,
            id,
        });
    }
    callback(type) {
        console.log(type);
        let that = this;
        this.setState({
            type,
        }, () => {
            if(type == 1){
                that.banciAll();
            }else{
                // that.banciAll();
                that.banciOrderAll();
            }
            
        })
    }
    render() {
        const format = 'HH:mm';
        const { banchiData, banciNameList, paibanData, allUserList } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div className="gutter-example banchiguanli">
                <BreadcrumbCustom first="考勤管理" second="班次管理" />

                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
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
                                                {paibanData.map((item, index) => {
                                                    return (
                                                        <Col span={24} key={index}>
                                                            <FormItem label="班次" colon={false}>
                                                                <Row>
                                                                    <Col span={10}>
                                                                        <input placeholder="请输入班次名称" disabled value={item.name} />
                                                                    </Col>
                                                                    <Col span={10}>
                                                                        <a type="primary" onClick={this.showBanciModal1.bind(this, item.id)} className="banci_a"><Icon type="form" />编辑</a>
                                                                        <a type="primary" onClick={this.showBanciModal2.bind(this, item.id)} className="banci_a stop"><Icon type="delete" />删除</a>
                                                                    </Col>
                                                                </Row>

                                                            </FormItem>
                                                            <FormItem label="时间" colon={false}>
                                                                <TimePicker placeholder="请选择" disabled value={moment(item.start_time, format)} format={format} /> -
                                                                    <TimePicker placeholder="请选择" disabled value={moment(item.end_time, format)} format={format} />
                                                            </FormItem>
                                                        </Col>
                                                    )
                                                })}
                                                <Col span={24}>
                                                    <Button type="dashed" htmlType="submit" onClick={() => this.showBanciModal()}><Icon type="plus-square" />添加排班</Button>
                                                </Col>
                                                <Modal
                                                    title="新增排班"
                                                    visible={this.state.banciVisible}
                                                    onOk={this.handleBanciOk}
                                                    onCancel={this.handleBanciCancel}
                                                    okText="保存"
                                                    cancelText="返回"
                                                >
                                                    <Row>
                                                        <Col span={24}>
                                                            <FormItem label="班次" colon={false}>
                                                                <Select
                                                                    placeholder="请选择"
                                                                    value={this.state.banci_name}
                                                                    onChange={this.handleSelectChangeBanciNameSelect.bind(this)}
                                                                >
                                                                    {banciNameList.map((item, index) => {
                                                                        return (
                                                                            <Option value={index} key={index}>{item}</Option>
                                                                        )
                                                                    })}
                                                                </Select>
                                                            </FormItem>
                                                            <FormItem label="时间" colon={false}>
                                                                <TimePicker placeholder="请选择" format={format} disabled value={moment(this.state.banci_start_time, format)} /> -
                                                                <TimePicker placeholder="请选择" format={format} disabled value={moment(this.state.banci_end_time, format)} />
                                                            </FormItem>
                                                            <FormItem label="人员" colon={false}>
                                                                <Row>
                                                                    {allUserList.map((item, index)=>{
                                                                        return (
                                                                            <Col span={12} key={index}><Checkbox onChange={this.userAuth.bind(this)} value={item.id}>{item.username}</Checkbox></Col>
                                                                        )
                                                                    })}
                                                                </Row>
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                </Modal>
                                                <Modal
                                                    title="编辑排班"
                                                    visible={this.state.banciVisible1}
                                                    onOk={this.handleBanciOk1}
                                                    onCancel={this.handleBanciCancel1}
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
                                                                <TimePicker placeholder="请选择" format={format} disabled value={moment(this.state.banci_start_time, format)} /> -
                                                                <TimePicker placeholder="请选择" format={format} disabled value={moment(this.state.banci_end_time, format)} />
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                </Modal>
                                                <Modal
                                                    title="删除"
                                                    visible={this.state.banciVisible2}
                                                    onOk={this.handleBanciOk2}
                                                    onCancel={this.handleBanciCancel2}
                                                    okText="删除"
                                                    cancelText="取消"
                                                >
                                                    <Row>
                                                        <Col span={24}>
                                                            <p>是否删除排班</p>
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
                </Tabs>
            </div>
        )
    }
}

const Banchiguanli = Form.create()(Banchiguanlis);

export default Banchiguanli;