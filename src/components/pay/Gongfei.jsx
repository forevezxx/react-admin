/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table, DatePicker } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { supplierAll, supplierSearch, supplierExport } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;


class Gongfeis extends Component {
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
        supplierSearch(data).then(res=>{
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
            principalName: value
        });
    }
    
    newgongfei() {//新建
        this.props.history.push('/app/pay/newgongfei');
    }
    WatchGongfei(id) {//查看
        this.props.history.push(`/app/pay/watchGongfei/${id}`);
    }
    EditGongfei(id) {//编辑
        this.props.history.push(`/app/pay/editGongfei/${id}`);
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
            title: '请款人',
            dataIndex: 'createPerson',
            key: 'createPerson',
        }, {
            title: '对象类别',
            dataIndex: 'userType',
            key: 'userType',
        }, {
            title: '申请日期',
            dataIndex: 'stuffName',
            key: 'stuffName',
        }, {
            title: '费用类型',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '请款用途',
            dataIndex: 'telNum',
            key: 'telNum',
        }, {
            title: '申请金额(元)',
            dataIndex: 'jobNum',
            key: 'jobNum',
        }, {
            title: '审核人',
            dataIndex: 'accountName',
            key: 'accountName',
        }, {
            title: '复核人',
            dataIndex: 'accountPassword',
            key: 'accountPassword',
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={()=>this.WatchGongfei(record.id)}>查看</a>
                    <a href="javascript:;" onClick={()=>this.EditGongfei(record.id)}>编辑</a>
                </span>
            )
        }];
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="出纳管理" second="公费管理" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={6}>
                                            <FormItem label="费用类型" colon={false}>
                                                <input placeholder="请输入费用类型" />
                                            </FormItem>
                                        </Col>
                                        <Col md={6}>
                                            <FormItem label="公费金额" colon={false}>
                                                <input placeholder="请输入公费金额" />
                                            </FormItem>
                                        </Col>
                                        <Col md={6}>
                                            <FormItem label="申请日期" colon={false}>
                                                <DatePicker onChange={()=>this.onChange} />
                                            </FormItem>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=> this.getDocumentSearch()}><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.newgongfei()}><Icon type="plus" />新建</Button>
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
                                <Table columns={columns} dataSource={dataSource} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const Gongfei = Form.create()(Gongfeis);

export default Gongfei;