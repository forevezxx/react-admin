/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { clientAll, clientSearch, clientExport } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;


class UserFiless extends Component {
    state = {
        confirmDirty: false,
        dataSource: [],//表格数据源
        count: '',//表格数据源总条数
        pageSize: 5,//每页显示条数
        current: 1,//当前所在页数

        client_number: '',
        name: '',
        order_id: '',
        principal_name: '',
        mobile: '',
    };
    
    componentDidMount(){
        this.getDocumentAll()
    }
    getDocumentAll() {//获取用户信息
        let data = {
            pageNum: this.state.current - 1,
            pageSize: this.state.pageSize,
            token: localStorage.getItem('user_token'),
        }
        clientAll(data).then(res => {
            console.log(res);
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    newUserFiles() {//新建
        this.props.history.push('/app/shouldCollect/newUserFiles');
    }
    WatchUserFiles(id) {//查看
        this.props.history.push(`/app/shouldCollect/watchUserFiles/${id}`);
    }
    EditUserFiles(id) {//编辑
        this.props.history.push(`/app/shouldCollect/editUserFiles/${id}`);
    }
    getDocumentSearch() {
        let data = {
            search_json: JSON.stringify({
                client_number: this.state.client_number,
                name: this.state.name,
                order_id: this.state.order_id,
                principal_name: this.state.principal_name,
                mobile: this.state.mobile,
            })
        }
        clientSearch(data).then(res=>{
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    supplierExport() {
        let data = {
            search_json: JSON.stringify({
            client_number: this.state.client_number,
            name: this.state.name,
            order_id: this.state.order_id,
            principal_name: this.state.principal_name,
            mobile: this.state.mobile,
            })
        }
        clientExport(data).then(res => {
            console.log(res);
            if(res.status === 0){
                window.location.href = res.url;
            }
        })
    }
    changePageSize(pageSize, current) {
        let that = this;
        this.setState({
            pageSize,
            current,
        }, () => {
            that.getDocumentAll();
        })
    }
    changePage(current) {
        let that = this;
        that.setState({
            current
        }, () => {
            that.getDocumentAll();
        })
    }
    onChange(date, dateString) {
        let that = this;
        console.log(date, dateString);
        console.log(dateString);
        that.setState({
            checkedTime: dateString
        })
    }
    handleSelectChange(value) {
        console.log(value)
        this.setState({
            client_number: value
        });
    }
    render() {
        const { dataSource, count } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const columns = [{
            title: '客户编号',
            dataIndex: 'client_number',
            key: 'client_number',
        }, {
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '订单编号',
            dataIndex: 'order_id',
            key: 'order_id',
        }, {
            title: '资源属性',
            dataIndex: 'resource_type',
            key: 'resource_type',
        }, {
            title: '负责人',
            dataIndex: 'principal_name',
            key: 'principal_name',
        }, {
            title: '联系电话',
            dataIndex: 'mobile',
            key: 'mobile',
        }, {
            title: '所在地址',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '客户来源',
            dataIndex: 'client_from',
            key: 'client_from',
            render: (text, record) => record.client_from == 0 ? '展会' : record.client_from == 1 ? "广告杂志": "客户转介绍"
        }, {
            title: '跟进人员',
            dataIndex: 'follower',
            key: 'follower',
        }, {
            title: '跟进时间',
            dataIndex: 'follow_date',
            key: 'follow_date',
        }, {
            title: '平帐状态',
            dataIndex: 'flat_account_type',
            key: 'flat_account_type',
            render: (text, record) => record.flat_account_type == 0 ? '未平帐' : '已平帐'
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" className="document_a" onClick={()=>this.WatchUserFiles(record.id)}>查看</a>
                    <a href="javascript:;" className="document_a" onClick={()=>this.EditUserFiles(record.id)} >编辑</a>
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
            <div className="gutter-example">
                <BreadcrumbCustom first="应收管理" second="客户档案" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="客户编号" colon={false}>
                                                <input placeholder="请输入客户编号"  onChange={event=>{
                                                    this.setState({
                                                        client_number: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="客户名称" colon={false}>
                                                <input placeholder="请输入客户名称"  onChange={event=>{
                                                    this.setState({
                                                        name: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="订单编号" colon={false}>
                                                <input placeholder="请输入订单编号"  onChange={event=>{
                                                    this.setState({
                                                        order_id: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="负责人" colon={false}>
                                                <input placeholder="请输入负责人姓名"  onChange={event=>{
                                                    this.setState({
                                                        principal_name: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="联系电话" colon={false}>
                                                <input placeholder="请输入联系电话"  onChange={event=>{
                                                    this.setState({
                                                        mobile: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=> this.getDocumentSearch()}><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.newUserFiles()}><Icon type="plus" />新建</Button>
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
                                <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={paginationProps}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const UserFiles = Form.create()(UserFiless);

export default UserFiles;