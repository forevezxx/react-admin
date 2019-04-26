/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table, Pagination } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { userAll, userSearch } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;


class Documents extends Component {
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
        }
        userAll(data).then(res => {
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
        userSearch(data).then(res=>{
            this.setState({
                dataSource: res.data.users,
                count: res.data.count,
            })
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
    NewShouldPay() {//新建
        this.props.history.push('/app/shouldPay/newshouldpay');
    }
    WatchDocument() {//查看
        this.props.history.push('/app/shouldPay/watchDocument');
    }
    EditDocument() {//编辑
        this.props.history.push('/app/shouldPay/editDocument');
    }
    render() {
        const { dataSource, count } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const columns = [{
            title: '编号',
            dataIndex: 'seNum',
            key: 'seNum',
        }, {
            title: '公司类型',
            dataIndex: 'companyType',
            key: 'companyType',
        }, {
            title: '公司名称',
            dataIndex: 'companyName',
            key: 'companyName',
        }, {
                title: '负责人',
            dataIndex: 'mainPerson',
            key: 'mainPerson',
        }, {
                title: '手机号码',
            dataIndex: 'telNum',
            key: 'telNum',
        }, {
                title: '所属行业',
            dataIndex: 'industry',
            key: 'industry',
        }, {
                title: '地址',
            dataIndex: 'address',
            key: 'address',
        }, {
                title: '来源',
            dataIndex: 'from',
            key: 'from',
        }, {
                title: '合同编号',
            dataIndex: 'hetongNum',
            key: 'hetongNum',
        }, {
                title: '建档人',
            dataIndex: 'createPerson',
            key: 'createPerson',
        }, {
                title: '最后跟进时间',
                dataIndex: 'finalTime',
                key: 'finalTime',
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" className="document_a" onClick={()=>this.WatchDocument()}>查看</a>
                    <a href="javascript:;" className="document_a" onClick={()=>this.EditDocument()}>编辑</a>
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
            <div className="gutter-example document">
                <BreadcrumbCustom first="应付管理" second="档案管理" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="负责人" colon={false}>
                                                <input placeholder="请输入负责人姓名" onChange={event=>{
                                                    this.setState({
                                                        principalName: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="公司名称" colon={false}>
                                                <input placeholder="请输入公司名称" onChange={event=>{
                                                    this.setState({
                                                        companyName: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="合同编号" colon={false}>
                                                <input placeholder="请输入合同编号" onChange={event=>{
                                                    this.setState({
                                                        contractNum: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <FormItem label="电话号码" colon={false}>
                                                <input placeholder="请输入电话号码" onChange={event=>{
                                                    this.setState({
                                                        telNum: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col md={8}>
                                            <FormItem label="建档人" colon={false}>
                                                <input placeholder="请输入建档人" onChange={event=>{
                                                    this.setState({
                                                        archiver: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit"onClick={()=> this.getDocumentSearch()}><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.NewShouldPay()}><Icon type="plus" />新建</Button>
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
                    <Col className="gutter-row document_list" md={24} >
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Table columns={columns} dataSource={dataSource} pagination={paginationProps} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const Document = Form.create()(Documents);

export default Document;