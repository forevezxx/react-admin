/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { userAll } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;


class UserManagements extends Component {
    state = {
        confirmDirty: false,
        dataSource: [],//表格数据源
        count: '',//表格数据源总条数
        pageSize: 5,//每页显示条数
        current: 1,//当前所在页数
    };
    newUserManagement() {//新建
        this.props.history.push('/app/account/newUserManagement');
    }
    getUserAll() {//获取用户信息
        let data = {
            pageNum: this.state.current-1,
            pageSize: this.state.pageSize,
        }
        userAll(data).then(res=>{
            console.log(res);
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    componentDidMount() {
        this.getUserAll();
    }
    changePageSize(pageSize, current) {
        let that = this;
        this.setState({
            pageSize,
            current,
        },()=>{
            that.getUserAll();
        })
    }
    changePage(current) {
        let that = this;
        that.setState({
            current
        },()=>{
            that.getUserAll();
        })
    }
    render() {

        const { dataSource, count } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const formatterTime = (val) => {
            return val ? moment(Number(val)*1000).format('YYYY-MM-DD') : ''
        }
        const columns = [{
            title: '用户ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '创建人',
            dataIndex: 'createPerson',
            key: 'createPerson',
        }, {
            title: '用户类别',
            dataIndex: 'type',
            key: 'type',
            render: (val) => {return val === "1" ? '普通员工' : '管理员'}
        }, {
            title: '员工姓名',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: '职位',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '手机号码',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '工号',
            dataIndex: 'user_ext',
            key: 'user_ext',
        }, {
            title: '账号名称',
            dataIndex: 'account_name',
            key: 'account_name',
        }, {
            title: '账号密码',
            dataIndex: 'password',
            key: 'password',
        }, {
            title: '入职时间',
            dataIndex: 'employment_date',
            key: 'employment_date',
            render: formatterTime,
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text,record)=>(
                <span>
                    <a href="javascript:;" className="userManagement_a">查看</a>
                    <a href="javascript:;" className="userManagement_a">编辑</a>
                    <a href="javascript:;" className="userManagement_a">停用</a>
                </span>
            )
        }];
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
        return (
            <div className="gutter-example userManagement">
                <BreadcrumbCustom first="账户管理" second="用户管理" />
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
                                            <FormItem label="用户类别" colon={false}>
                                                <Select
                                                    placeholder="请选择"
                                                    onChange={this.handleSelectChange}
                                                >
                                                    <Option value="male">male</Option>
                                                    <Option value="female">female</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="手机号码" colon={false}>
                                                <input placeholder="请输入手机号码" />
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="工号" colon={false}>
                                                <input placeholder="请输入工号" />
                                            </FormItem>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={() => this.newUserManagement()}><Icon type="plus" />新建</Button>
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
                    <Col className="gutter-row userManagement_list" md={24} >
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={paginationProps}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const UserManagement = Form.create()(UserManagements);

export default UserManagement;