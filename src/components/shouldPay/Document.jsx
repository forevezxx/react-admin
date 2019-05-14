/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table, Pagination } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { supplierAll, supplierSearch, supplierExport } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;


class Documents extends Component {
    state = {
        confirmDirty: false,
        dataSource: [],//表格数据源
        count: '',//表格数据源总条数
        pageSize: 5,//每页显示条数
        current: 1,//当前所在页数

        company_owner: '',
        company_name: '',
        contract_num: '',
        tel: '',
        maker: '',
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
            company_owner: this.state.company_owner,
            company_name: this.state.company_name,
            contract_num: this.state.contract_num,
            tel: this.state.tel,
            maker: this.state.maker,
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
            company_owner: this.state.company_owner,
            company_name: this.state.company_name,
            contract_num: this.state.contract_num,
            tel: this.state.tel,
            maker: this.state.maker,
        }
        supplierExport(data).then(res => {
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
            company_owner: value
        });
    }
    NewShouldPay() {//新建
        this.props.history.push('/app/shouldPay/newshouldpay');
    }
    WatchDocument(id) {//查看
        this.props.history.push(`/app/shouldPay/watchDocument/${id}`);
    }
    EditDocument(id) {//编辑
        this.props.history.push(`/app/shouldPay/editDocument/${id}`);
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
            title: '公司类型',
            dataIndex: 'company_type',
            key: 'company_type',
            render: (text, record) => record.company_type == 1 ? '运营商' : '同行公司'
        }, {
            title: '公司名称',
            dataIndex: 'company_name',
            key: 'company_name',
        }, {
            title: '负责人',
            dataIndex: 'company_owner',
            key: 'company_owner',
        }, {
            title: '手机号码',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '所属行业',
            dataIndex: 'industry',
            key: 'industry',
            render: (text, record) => record.industry == 1 ? '金融业' : '游戏业'
        }, {
                title: '地址',
            dataIndex: 'address',
            key: 'address',
        }, {
                title: '来源',
            dataIndex: 'source',
            key: 'source',
            render: (text, record) => record.source == 1 ? '展会' : record.source == 2 ? "广告杂志": "客户转介绍"
        }, {
                title: '合同编号',
            dataIndex: 'contract_num',
            key: 'contract_num',
        }, {
                title: '建档人',
            dataIndex: 'maker',
            key: 'maker',
        }, {
                title: '最后跟进时间',
                dataIndex: 'last_follow',
                key: 'last_follow',
                render: (text, record) =>
                record.last_follow === 0
                    ? null
                    : moment(Number(record.last_follow)*1000).format('YYYY-MM-DD')
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text, record) => (
                <span className="operate_a">
                    <a href="javascript:;" className="document_a" onClick={()=>this.WatchDocument(record.id)}>查看</a>
                    <a href="javascript:;" className="document_a" onClick={()=>this.EditDocument(record.id)}>编辑</a>
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
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col span={8}>
                                            <FormItem label="负责人" colon={false}>
                                                <input placeholder="请输入负责人姓名" onChange={event=>{
                                                    this.setState({
                                                        company_owner: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col span={8}>
                                            <FormItem label="公司名称" colon={false}>
                                                <input placeholder="请输入公司名称" onChange={event=>{
                                                    this.setState({
                                                        company_name: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col span={8}>
                                            <FormItem label="合同编号" colon={false}>
                                                <input placeholder="请输入合同编号" onChange={event=>{
                                                    this.setState({
                                                        contract_num: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8}>
                                            <FormItem label="电话号码" colon={false}>
                                                <input placeholder="请输入电话号码" onChange={event=>{
                                                    this.setState({
                                                        tel: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col span={8}>
                                            <FormItem label="建档人" colon={false}>
                                                <input placeholder="请输入建档人" onChange={event=>{
                                                    this.setState({
                                                        maker: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col span={3}>
                                            <Button type="primary" htmlType="submit" onClick={()=> this.getDocumentSearch()}><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col span={3}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.NewShouldPay()}><Icon type="plus" />新建</Button>
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
                    <Col className="gutter-row document_list" span={24} >
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

const Document = Form.create()(Documents);

export default Document;