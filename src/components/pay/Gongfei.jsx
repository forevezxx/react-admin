/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table, DatePicker } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { publicMoneyAll, publicMoneySearch, publicMoneyExport } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;


class Gongfeis extends Component {
    state = {
        confirmDirty: false,
        dataSource: [],//表格数据源
        count: '',//表格数据源总条数
        pageSize: 5,//每页显示条数
        current: 1,//当前所在页数

        type: '',
        counts: '',
        date: '',
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
        publicMoneyAll(data).then(res => {
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
            type: this.state.type,
            count: this.state.counts,
            date: this.state.date,
            })
        }
        publicMoneySearch(data).then(res=>{
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    supplierExport() {
        let data = {
            search_json: JSON.stringify({
            type: this.state.type,
            count: this.state.counts,
            date: this.state.date,
            }),
        }
        publicMoneyExport(data).then(res => {
            console.log(res);
            if(res.status == "0"){
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
        that.setState({
            date: dateString
        })
    }
    handleSelectChange(value) {
        console.log(value)
        this.setState({
            type: value
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
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '请款人',
            dataIndex: 'ask_name',
            key: 'ask_name',
        }, {
            title: '对象类别',
            dataIndex: 'userType',
            key: 'userType',
        }, {
            title: '申请日期',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: '费用类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: '请款用途',
            dataIndex: 'reason',
            key: 'reason',
        }, {
            title: '申请金额(元)',
            dataIndex: 'count',
            key: 'count',
        }, {
            title: '审核人',
            dataIndex: 'check_people',
            key: 'check_people',
        }, {
            title: '复核人',
            dataIndex: 'recheck_people',
            key: 'recheck_people',
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" className="document_a" onClick={()=>this.WatchGongfei(record.id)}>查看</a>
                    <a href="javascript:;" className="document_a" onClick={()=>this.EditGongfei(record.id)}>编辑</a>
                </span>
            )
        }];
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="出纳管理" second="公费管理" />

                <Row gutter={0}>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col span={6}>
                                            <FormItem label="费用类型" colon={false}>
                                                <input placeholder="请输入费用类型" onChange={event => { this.setState({ type: event.target.value }) }}/>
                                            </FormItem>
                                        </Col>
                                        <Col span={6}>
                                            <FormItem label="公费金额" colon={false}>
                                                <input placeholder="请输入公费金额" onChange={event => { this.setState({ counts: event.target.value }) }}/>
                                            </FormItem>
                                        </Col>
                                        <Col span={6}>
                                            <FormItem label="申请日期" colon={false}>
                                                <DatePicker onChange={this.onChange.bind(this)} />
                                            </FormItem>
                                        </Col>
                                        <Col span={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=> this.getDocumentSearch()}><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col span={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.newgongfei()}><Icon type="plus" />新建</Button>
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

const Gongfei = Form.create()(Gongfeis);

export default Gongfei;