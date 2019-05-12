/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table, DatePicker } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { attendanceAll, attendanceSearch, attendanceExport } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;


class Kaoqingjilus extends Component {
    state = {
        confirmDirty: false,
        dataSource: [],//表格数据源
        count: '',//表格数据源总条数
        pageSize: 5,//每页显示条数
        current: 1,//当前所在页数
    };
    
    componentDidMount() {
        this.attendanceAll();
    }
    onChange(date, dateString) {
        console.log(date, dateString);
        this.setState({
            attendance_date: dateString,
        })
    }
    newkaoqingjilu() {//新建
        this.props.history.push('/app/checkIn/newkaoqingjilu');
    }
    attendanceAll() {//获取全部考勤数据
        let data = {
            pageNum: this.state.current - 1,
            pageSize: this.state.pageSize,
        }
        attendanceAll(data).then(res => {
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    changePageSize(pageSize, current) {
        let that = this;
        this.setState({
            pageSize,
            current,
        },()=>{
            that.attendanceAll();
        })
    }
    changePage(current) {
        let that = this;
        that.setState({
            current
        },()=>{
            that.attendanceAll();
        })
    }
    getDocumentSearch() {
        let data = {
            search_json: JSON.stringify({
            name: this.state.name,
            position: this.state.position,
            department: this.state.department,
                attendance_date: this.state.attendance_date,
            })
        }
        attendanceSearch(data).then(res => {
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    supplierExport() {
        let data = {
            search_json: JSON.stringify({
            name: this.state.name,
            position: this.state.position,
            department: this.state.department,
            attendance_date: this.state.attendance_date,
            })
        }
        attendanceExport(data).then(res => {
            console.log(res);
            if (res.status === 0) {
                window.location.href = res.url;
            }
        })
    }
    render() {
        const { dataSource, count } = this.state;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: () => `共${count}条`,
            pageSize: this.state.pageSize,
            current: this.state.current,
            total: Number(count),
            onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize, current),
            onChange: (current) => this.changePage(current),
            size: "small",
        };
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const columns = [{
            title: '编号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '员工姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '岗位',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '部门',
            dataIndex: 'department',
            key: 'department',
        }, {
            title: '入职时间',
            dataIndex: 'join_date',
            key: 'join_date',
        }, {
            title: '考勤日期',
            dataIndex: 'attendance_date',
            key: 'attendance_date',
        }, {
            title: '出勤天数',
            dataIndex: 'on_days',
            key: 'on_days',
        }, {
            title: '旷工天数',
            dataIndex: 'miss_days',
            key: 'miss_days',
        }, {
            title: '迟到天数',
            dataIndex: 'late_days',
            key: 'late_days',
        }, {
            title: '早退天数',
            dataIndex: 'early_leave_days',
            key: 'early_leave_days',
        }, {
            title: '事假天数',
            dataIndex: 'shi_jia_days',
            key: 'shi_jia_days',
        }, {
            title: '病假天数',
            dataIndex: 'ill_days',
            key: 'ill_days',
        }, {
            title: '缺勤天数',
            dataIndex: 'absence_days',
            key: 'absence_days',
        }];
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="考勤管理" second="考勤记录" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="员工姓名" colon={false}>
                                                <input placeholder="请输入员工姓名" onChange={event => {
                                                    this.setState({
                                                        name: event.target.value
                                                    });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="岗位" colon={false}>
                                                <input placeholder="请输入员工所在岗位" onChange={event => {
                                                    this.setState({
                                                        position: event.target.value
                                                    });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="部门" colon={false}>
                                                <input placeholder="请输入员工所在部门" onChange={event => {
                                                    this.setState({
                                                        department: event.target.value
                                                    });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="考勤日期" colon={false}>
                                                <DatePicker placeholder="请选择" onChange={this.onChange.bind(this)} />
                                            </FormItem>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={() => this.getDocumentSearch()}><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.newkaoqingjilu()}><Icon type="plus" />新建</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={() => this.supplierExport()}><Icon type="upload" />导出</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24} >
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={paginationProps} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const Kaoqingjilu = Form.create()(Kaoqingjilus);

export default Kaoqingjilu;