/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table, DatePicker } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { attendanceAll, attendanceSearch, userAll} from '../../axios';
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
    newkaoqingjilu() {//新建
        this.props.history.push('/app/checkIn/newkaoqingjilu');
    }
    attendanceAll() {//获取全部考勤数据
        let data = {
            pageNum: this.state.current-1,
            pageSize: this.state.pageSize,
        }
        userAll(data).then(res=>{
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    componentDidMount() {
        this.attendanceAll();
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
            dataIndex: 'userId',
            key: 'userId',
        }, {
            title: '员工姓名',
            dataIndex: 'createPerson',
            key: 'createPerson',
        }, {
            title: '岗位',
            dataIndex: 'userType',
            key: 'userType',
        }, {
            title: '部门',
            dataIndex: 'stuffName',
            key: 'stuffName',
        }, {
            title: '入职时间',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '考勤日期',
            dataIndex: 'telNum',
            key: 'telNum',
        }, {
            title: '出勤天数',
            dataIndex: 'jobNum',
            key: 'jobNum',
        }, {
            title: '旷工天数',
            dataIndex: 'accountName',
            key: 'accountName',
        }, {
            title: '迟到天数',
            dataIndex: 'chidaotianshu',
            key: 'chidaotianshu',
        }, {
            title: '早退天数',
            dataIndex: 'entryTime',
            key: 'entryTime',
        }, {
            title: '事假天数',
            dataIndex: 'shijiatianshu',
            key: 'shijiatianshu',
        }, {
            title: '病假天数',
            dataIndex: 'binjiatianshu',
            key: 'binjiatianshu',
        }, {
            title: '缺勤天数',
            dataIndex: 'queqintianshu',
            key: 'queqintianshu',
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
                                                <input placeholder="请输入员工姓名" />
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="岗位" colon={false}>
                                                <input placeholder="请输入员工所在岗位" />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="部门" colon={false}>
                                                <input placeholder="请输入员工所在部门" />
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="考勤日期" colon={false}>
                                                <DatePicker placeholder="请选择" onChange={()=>this.onChange} />
                                            </FormItem>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.newkaoqingjilu()}><Icon type="plus" />新建</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit"><Icon type="upload" />导出</Button>
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