/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table, DatePicker } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { customDataAll, customDataSearch, customDataExport} from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;

class Kehushujus extends Component {
    state = {
        confirmDirty: false,
        dataSource: [],//表格数据源
        count: '',//表格数据源总条数
        pageSize: 5,//每页显示条数
        current: 1,//当前所在页数

        customer_name: '',
        customer_company: '',
        repay_date: '',
    };
    componentDidMount() {
        this.getUserAll();
    }
    onChange(date, dateString) {
        console.log(date, dateString);
        this.setState({
            repay_date: dateString,
        })
    }
    getUserAll() {//获取用户信息
        let data = {
            pageNum: this.state.current - 1,
            pageSize: this.state.pageSize,
        }
        customDataAll(data).then(res => {
            console.log(res);
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    getUserSearch() {
        let data = {
            search_json: JSON.stringify({
            customer_name: this.state.customer_name,
            customer_company: this.state.customer_company,
            repay_date: this.state.repay_date,
            })
        }
        customDataSearch(data).then(res => {
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    newUserManagement() {//新建
        this.props.history.push('/app/data/newKehushuju');
    }
    WatchUserManagement(id) {
        this.props.history.push(`/app/data/watchKehushuju/${id}`);
    }
    EditUserManagement(id) {
        this.props.history.push(`/app/data/editKehushuju/${id}`);
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
    supplierExport() {
        let data = {
            search_json: JSON.stringify({
            customer_name: this.state.customer_name,
            customer_company: this.state.customer_company,
            repay_date: this.state.repay_date,
            })
        }
        customDataExport(data).then(res => {
            console.log(res);
            if (res.status === 0) {
                window.location.href = res.url;
            }
        })
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
            title: '客户姓名',
            dataIndex: 'customer_name',
            key: 'customer_name',
        }, {
            title: '客户公司名称',
            dataIndex: 'customer_company',
            key: 'customer_company',
        }, {
            title: '回款产品',
            dataIndex: 'repay_product_name',
            key: 'repay_product_name',
        }, {
            title: '产品数量',
            dataIndex: 'num',
            key: 'num',
        }, {
            title: '产品单价(元)',
            dataIndex: 'price',
            key: 'price',
        }, {
            title: '产品总价(元)',
            dataIndex: 'total',
            key: 'total',
        }, {
            title: '回款(元)',
            dataIndex: 'repay_money',
            key: 'repay_money',
        }, {
            title: '回款日期',
            dataIndex: 'repay_date',
            key: 'repay_date',
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" className="document_a" onClick={()=>this.WatchUserManagement(record.id)}>查看</a>
                    <a href="javascript:;" className="document_a" onClick={()=>this.EditUserManagement(record.id)}>编辑</a>
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
                <BreadcrumbCustom first="数据管理" second="客户数据" />

                <Row gutter={0}>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col span={6}>
                                            <FormItem label="客户姓名" colon={false}>
                                                <input placeholder="请输入客户姓名" onChange={event => {
                                                    this.setState({
                                                        customer_name: event.target.value
                                                    });
                                                }} />
                                            </FormItem>
                                        </Col>
                                        <Col span={6}>
                                            <FormItem label="公司名称" colon={false}>
                                                <input placeholder="请输入公司名称" onChange={event => {
                                                    this.setState({
                                                        customer_company: event.target.value
                                                    });
                                                }} />
                                            </FormItem>
                                        </Col>
                                        <Col span={6}>
                                            <FormItem label="回款日期" colon={false}>
                                                <DatePicker placeholder="请选择" onChange={this.onChange.bind(this)} />
                                            </FormItem>
                                        </Col>
                                        
                                        <Col span={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=> this.getUserSearch()}><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col span={2}>
                                            <Button type="primary" htmlType="submit" onClick={() => this.newUserManagement()}><Icon type="plus" />新建</Button>
                                        </Col>
                                        <Col span={2}>
                                            <Button type="primary" htmlType="submit" onClick={() => this.supplierExport()}><Icon type="upload" />导出</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" span={24} >
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Table columns={columns} dataSource={dataSource} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const Kehushuju = Form.create()(Kehushujus);

export default Kehushuju;