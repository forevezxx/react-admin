/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table, DatePicker } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { purchanseAll, purchanseSearch, purchanseExport } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;


class Caigoushujus extends Component {
    state = {
        confirmDirty: false,
        dataSource: [],//表格数据源
        count: '',//表格数据源总条数
        pageSize: 5,//每页显示条数
        current: 1,//当前所在页数

        principalName: '',
        companyName: '',
        contractNum: '',
        telNum: '',
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
        purchanseAll(data).then(res => {
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
        purchanseSearch(data).then(res=>{
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
        purchanseExport(data).then(res => {
            console.log(res);
            if (res.status === 0) {
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
            principalName: value
        });
    }
    NewCaigoushuju() {//新建
        this.props.history.push('/app/data/newCaigoushuju');
    }
    WatchCaigoushuju(id) {//查看
        this.props.history.push(`/app/data/watchCaigoushuju/${id}`);
    }
    EditCaigoushuju(id) {//编辑
        this.props.history.push(`/app/data/editCaigoushuju/${id}`);
    }
    render() {
        const { dataSource, count } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const columns = [{
            title: '编号',
            dataIndex: 'sno_num',
            key: 'sno_num',
        }, {
            title: '公司名称',
            dataIndex: 'company_name',
            key: 'company_name',
        }, {
            title: '通道',
            dataIndex: 'channel',
            key: 'channel',
        }, {
            title: '属性',
            dataIndex: 'props',
            key: 'props',
        }, {
            title: '采购价',
            dataIndex: 'caigou_price',
            key: 'caigou_price',
        }, {
            title: '数量',
            dataIndex: 'amount',
            key: 'amount',
        }, {
            title: '总金额',
            dataIndex: 'total_price',
            key: 'total_price',
        }, {
            title: '采购日期',
            dataIndex: 'caigou_date',
            key: 'caigou_date',
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={()=>this.WatchCaigoushuju(record.id)}>查看</a>
                    <a href="javascript:;" onClick={()=>this.EditCaigoushuju(record.id)}>编辑</a>
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
                <BreadcrumbCustom first="数据管理" second="采购数据" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={6}>
                                            <FormItem label="公司名称" colon={false}>
                                                <input placeholder="请输入公司名称" />
                                            </FormItem>
                                        </Col>
                                        <Col md={6}>
                                            <FormItem label="通道名称" colon={false}>
                                                <input placeholder="请输入通道名称" />
                                            </FormItem>
                                        </Col>
                                        <Col md={6}>
                                            <FormItem label="采购日期" colon={false}>
                                                <DatePicker placeholder="请选择" onChange={()=>this.onChange} />
                                            </FormItem>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=> this.getDocumentSearch()}><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.NewCaigoushuju()}><Icon type="plus" />新建</Button>
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
                                <Table columns={columns} dataSource={dataSource}  rowKey={record => record.id} pagination={paginationProps} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const Caigoushuju = Form.create()(Caigoushujus);

export default Caigoushuju;