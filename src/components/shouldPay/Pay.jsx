/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { supplierAll, supplierSearch, supplierExport } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;


class Pays extends Component {
    state = {
        confirmDirty: false,
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
        supplierAll(data).then(res => {
            console.log(res);
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    getDocumentSearch() {
        let data = {
            principalName: this.state.principalName,
            companyName: this.state.companyName,
            contractNum: this.state.contractNum,
            telNum: this.state.telNum,
            archiver: this.state.archiver,
        }
        supplierSearch(data).then(res => {
            this.setState({
                dataSource: res.data.supplier,
                count: res.data.count,
            })
        })
    }
    supplierExport() {
        let data = {
            principalName: this.state.principalName,
            companyName: this.state.companyName,
            contractNum: this.state.contractNum,
            telNum: this.state.telNum,
            archiver: this.state.archiver,
        }
        supplierExport(data).then(res => {
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
    handleSelectChange(value) {
        console.log(value)
        this.setState({
            principalName: value
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
            dataIndex: 'userId',
            key: 'userId',
        }, {
            title: '订单合同编号',
            dataIndex: 'createPerson',
            key: 'createPerson',
        }, {
            title: '合计金额(元)',
            dataIndex: 'userType',
            key: 'userType',
        }, {
            title: '付款主体',
            dataIndex: 'stuffName',
            key: 'stuffName',
        }, {
            title: '付款方式',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '付款账号',
            dataIndex: 'telNum',
            key: 'telNum',
        }, {
            title: '付款日期',
            dataIndex: 'jobNum',
            key: 'jobNum',
        }, {
            title: '付款状态',
            dataIndex: 'accountName',
            key: 'accountName',
        }, {
            title: '开票状态',
            dataIndex: 'accountPassword',
            key: 'accountPassword',
        }, {
            title: '平帐状态',
            dataIndex: 'entryTime',
            key: 'entryTime',
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={() => this.WatchPay()}>查看</a>
                    <a href="javascript:;" onClick={() => this.EditPay()}>编辑</a>
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
                                                <input placeholder="请输入订单合同编号" />
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="付款主体" colon={false}>
                                                <input placeholder="请输入付款主体" />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="付款状态" colon={false}>
                                                <Select
                                                    placeholder="请选择"
                                                    onChange={this.handleSelectChange}
                                                >
                                                    <Option value="1">male</Option>
                                                    <Option value="2">female</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="开票状态" colon={false}>
                                                <Select
                                                    placeholder="请选择"
                                                    onChange={this.handleSelectChange}
                                                >
                                                    <Option value="male">male</Option>
                                                    <Option value="female">female</Option>
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