/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { clientPayRecordAll, clientPayRecordSearch, clientPayRecordExport } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;


class Ins extends Component {
    state = {
        confirmDirty: false,
        dataSource: [],//表格数据源
        count: '',//表格数据源总条数
        pageSize: 5,//每页显示条数
        current: 1,//当前所在页数

        orderId: '',
        id: '',
        receivables_status: '',
        invoice_status: '',
        archiver: '',
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
        clientPayRecordAll(data).then(res => {
            console.log(res);
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    newIn() {//新建
        this.props.history.push('/app/shouldCollect/newIn');
    }
    WatchIn(id) {//查看
        this.props.history.push(`/app/shouldCollect/watchIn/${id}`);
    }
    EditIn(id) {//编辑
        this.props.history.push(`/app/shouldCollect/editIn/${id}`);
    }
    getDocumentSearch() {
        let data = {
            search_json: JSON.stringify({
                orderId: this.state.orderId,
                id: this.state.id,
                receivables_status: this.state.receivables_status,
                invoice_status: this.state.invoice_status,
            })
        }
        clientPayRecordSearch(data).then(res=>{
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    supplierExport() {
        let data = {
            search_json: JSON.stringify({
                orderId: this.state.orderId,
                id: this.state.id,
                receivables_status: this.state.receivables_status,
                invoice_status: this.state.invoice_status,
            })
        }
        clientPayRecordExport(data).then(res => {
            console.log(res);
            if(res.msg === "success"){
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
    handleSelectChange(value) {
        console.log(value)
        this.setState({
            receivables_status: value
        });
    }
    handleSelectChange2(value) {
        console.log(value)
        this.setState({
            invoice_status: value
        });
    }
    render() {
        const { dataSource, count } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const columns = [{
            title: '客户订单编号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '客户合同编号',
            dataIndex: 'orderId',
            key: 'orderId',
        }, {
            title: '合计金额(元)',
            dataIndex: 'total_count',
            key: 'total_count',
        }, {
            title: '结算方式',
            dataIndex: 'pay_method',
            key: 'pay_method',
                render: (text, record) => record.pay_method == 1 ? '月结' : '预付'
        }, {
            title: '收款状态',
            dataIndex: 'receivables_status',
            key: 'receivables_status',
        }, {
            title: '收款方式',
            dataIndex: 'receivables_type',
            key: 'receivables_type',
                render: (text, record) => record.receivables_type == 1 ? '已收款' : '未收款'
        }, {
            title: '收款日期',
            dataIndex: 'receivables_date',
            key: 'receivables_date',
        }, {
            title: '开票状态',
            dataIndex: 'invoice_status',
            key: 'invoice_status',
                render: (text, record) => record.invoice_status == 1 ? '已开票' : '未开票'
        }, {
            title: '开票日期',
            dataIndex: 'invoice_date',
            key: 'invoice_date',
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text, record) => (
                <span className="operate_a">
                    <a href="javascript:;" className="document_a" onClick={()=>this.WatchIn(record.id)}>查看</a>
                    <a href="javascript:;" className="document_a" onClick={()=>this.EditIn(record.id)}>编辑</a>
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
                <BreadcrumbCustom first="应收管理" second="应收录入" />

                <Row gutter={0}>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col span={8}>
                                            <FormItem label="订单编号" colon={false}>
                                                <input placeholder="请输入订单编号" onChange={event => {
                                                    this.setState({
                                                        id: event.target.value
                                                    });
                                                }} />
                                            </FormItem>
                                        </Col>
                                        <Col span={8}>
                                            <FormItem label="合同编号" colon={false}>
                                                <input placeholder="请输入合同编号" onChange={event => {
                                                    this.setState({
                                                        orderId: event.target.value
                                                    });
                                                }}  />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8}>
                                            <FormItem label="收款状态" colon={false}>
                                                <Select
                                                    placeholder="请选择"
                                                    onChange={this.handleSelectChange.bind(this)}
                                                >
                                                    <Option value="1">已收款</Option>
                                                    <Option value="2">未收款</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col span={8}>
                                            <FormItem label="开票状态" colon={false}>
                                                <Select
                                                    placeholder="请选择"
                                                    onChange={this.handleSelectChange2.bind(this)}
                                                >
                                                    <Option value="1">已开票</Option>
                                                    <Option value="2">未开票</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col span={3}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.getDocumentSearch()}><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col span={3}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.newIn()}><Icon type="plus" />新建</Button>
                                        </Col>
                                        <Col span={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.supplierExport()}><Icon type="upload" />导出</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="guttespanrow" span={24} >
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

const In = Form.create()(Ins);

export default In;