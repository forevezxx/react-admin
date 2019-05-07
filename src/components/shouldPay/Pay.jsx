/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { supplierPayRecordAll, supplierPayRecordSearch, supplierPayRecordExport } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;


class Pays extends Component {
    state = {
        confirmDirty: false,
        dataSource: [],//表格数据源
        count: '',//表格数据源总条数
        pageSize: 5,//每页显示条数
        current: 1,//当前所在页数

        order_num: '',
        pay_entity: '',
        status: '',
        receipt_status: '',
    };

    componentDidMount() {
        this.getDocumentAll()
    }
    getDocumentAll() {//获取用户信息
        let data = {
            pageNum: this.state.current - 1,
            pageSize: this.state.pageSize,
            token: localStorage.getItem('user_token'),
        }
        supplierPayRecordAll(data).then(res => {
            console.log(res);
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    getDocumentSearch() {
        
        let data = {
            search_json: JSON.stringify({
                order_num: this.state.order_num,
                pay_entity: this.state.pay_entity,
                status: this.state.status,
                receipt_status: this.state.receipt_status,
            }) 
        }
        supplierPayRecordSearch(data).then(res => {
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    supplierExport() {
        let data = {
            order_num: this.state.order_num,
            pay_entity: this.state.pay_entity,
            status: this.state.status,
            receipt_status: this.state.receipt_status,
        }
        supplierPayRecordExport(data).then(res => {
            console.log(res);
            if (res.msg === "success") {
                window.location.href = res.data;
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
    handleSelectChangeTicketStatus(value) {
        console.log(value)
        this.setState({
            receipt_status: value
        });
    }
    handleSelectChangePayStatus(value) {
        console.log(value)
        this.setState({
            status: value
        });
    }
    
    
    NewPay() {//新建
        this.props.history.push('/app/shouldPay/newPay');
    }
    WatchPay(id) {//查看
        this.props.history.push(`/app/shouldPay/watchPay/${id}`);
    }
    EditPay(id) {//编辑
        this.props.history.push(`/app/shouldPay/editPay/${id}`);
    }
    render() {
        const { dataSource, count } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const columns = [{
            title: '编号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '订单合同编号',
            dataIndex: 'order_num',
            key: 'order_num',
        }, {
            title: '合计金额(元)',
            dataIndex: 'total_price',
            key: 'total_price',
        }, {
            title: '付款主体',
            dataIndex: 'pay_entity',
            key: 'pay_entity',
        }, {
            title: '付款方式',
            dataIndex: 'pay_type',
            key: 'pay_type',
        }, {
            title: '付款账号',
            dataIndex: 'pay_account',
            key: 'pay_account',
        }, {
            title: '付款日期',
            dataIndex: 'pay_time',
            key: 'pay_time',
        }, {
            title: '付款状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '开票状态',
            dataIndex: 'receipt_status',
            key: 'receipt_status',
        }, {
            title: '平帐状态',
            dataIndex: 'flat_account_type',
            key: 'flat_account_type',
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={() => this.WatchPay(record.id)}>查看</a>
                    <a href="javascript:;" onClick={() => this.EditPay(record.id)}>编辑</a>
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
                <BreadcrumbCustom first="应付管理" second="应付录入" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="合同编号" colon={false}>
                                                <input placeholder="请输入订单合同编号" onChange={event=>{
                                                    this.setState({
                                                        order_num: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="付款主体" colon={false}>
                                                <input placeholder="请输入付款主体" onChange={event=>{
                                                    this.setState({
                                                        pay_entity: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="付款状态" colon={false}>
                                                <Select
                                                    placeholder="请选择"
                                                    onChange={this.handleSelectChangePayStatus.bind(this)}
                                                >
                                                    <Option value="1">已付款</Option>
                                                    <Option value="0">未付款</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="开票状态" colon={false}>
                                                <Select
                                                    placeholder="请选择"
                                                    onChange={this.handleSelectChangeTicketStatus.bind(this)}
                                                >
                                                    <Option value="1">已开票</Option>
                                                    <Option value="0">未开票</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={() => this.getDocumentSearch()}><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.NewPay()} ><Icon type="plus" />新建</Button>
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

const Pay = Form.create()(Pays);

export default Pay;