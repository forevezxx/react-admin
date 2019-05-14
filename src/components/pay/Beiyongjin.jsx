/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Icon, Row, Col, Button, Table, Tabs, DatePicker } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { imprestAll, imprestSearch, imprestExport } from '../../axios';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class Beiyongjins extends Component {
    state = {
        confirmDirty: false,
        dataSource: [],//表格数据源
        count: '',//表格数据源总条数
        pageSize: 5,//每页显示条数
        current: 1,//当前所在页数

        method: '',
        name: '',
        time: '',
        type: 1,
        // type: localStorage.getItem('money_type') || 1,
    };
    
    componentDidMount(){
        this.callback(this.state.type);
        // this.getImprestAll()
    }
    getImprestAll() {//获取用户信息
        let data = {
            pageNum: this.state.current - 1,
            pageSize: this.state.pageSize,
            type: this.state.type,
        }
        imprestAll(data).then(res => {
            console.log(res);
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    getImprestSearch() {//0 入账 1出账
        let data = {
            search_json: JSON.stringify({
            method: this.state.method,
            name: this.state.name,
            time: this.state.time,
            type: this.state.type,
            })
        }
        imprestSearch(data).then(res=>{
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    NewOutPay() {//新建出账
        this.props.history.push('/app/pay/newoutpay');
    }
    NewInPay() {//新建入账
        this.props.history.push('/app/pay/newinpay');
    }
    changePageSize(pageSize, current) {
        let that = this;
        this.setState({
            pageSize,
            current,
        }, () => {
            that.getImprestAll();
        })
    }
    changePage(current) {
        let that = this;
        that.setState({
            current
        }, () => {
            that.getImprestAll();
        })
    }
    onChange(date, dateString) {
        let that = this;
        console.log(date, dateString);
        console.log(dateString);
        that.setState({
            time: dateString
        })
    }
    handleSelectChange(value) {
        console.log(value)
        this.setState({
            method: value
        });
    }
    supplierExport() {
        let data = {
            search_json: JSON.stringify({
                method: this.state.method,
                name: this.state.name,
                time: this.state.time,
                type: this.state.type,
            })
        }
        imprestExport(data).then(res => {
            console.log(res);
            if (res.status === 0) {
                window.location.href = res.url;
            }
        })
    }
    callback(type) {
        let that = this;
        this.setState({
            type,
        },()=>{
            localStorage.setItem('money_type',type);
            that.getImprestAll();
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
            title: '备用金总额(元)',
            dataIndex: 'now_total',
            key: 'now_total',
        }, {
            title: '入账人',
            dataIndex: 'name',
            key: 'name',
        },{
            title: '入账金额',
            dataIndex: 'money',
            key: 'money',
        }, {
            title: '入账时间',
            dataIndex: 'time',
            key: 'time',
        }, {
            title: '入账方式',
            dataIndex: 'method',
            key: 'method',
            // render: (text, record) => record.method == 1 ? '展会' : record.method == 2 ? "广告杂志": "客户转介绍"
        }];
        const columns2 = [{
            title: '编号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '备用金总额(元)',
            dataIndex: 'now_total',
            key: 'now_total',
        }, {
            title: '出账人',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '出账金额(元)',
            dataIndex: 'money',
            key: 'money',
        }, {
            title: '出账用途',
            dataIndex: 'out_for',
            key: 'out_for',
        }, {
            title: '出账时间',
            dataIndex: 'time',
            key: 'time',
        }, {
            title: '当前结余',
            dataIndex: 'now_left',
            key: 'now_left',
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
                <BreadcrumbCustom first="出纳管理" second="备用金管理" />
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="入账管理" key="1">
                        <Row gutter={0}>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col span={6}>
                                                    <FormItem label="入账时间" colon={false}>
                                                        <DatePicker placeholder="请选择" onChange={this.onChange.bind(this)} />
                                                    </FormItem>
                                                </Col>
                                                <Col span={5}>
                                                    <FormItem label="入账方式" colon={false}>
                                                    <input placeholder="请输入入账方式" onChange={event=>{
                                                        this.setState({
                                                            method: event.target.value
                                                        });
                                                    }}
                                                    />
                                                    </FormItem>
                                                </Col>
                                                <Col span={5}>
                                                    <FormItem label="入账人" colon={false}>
                                                        <input placeholder="请输入入账人" onChange={event=>{
                                                            this.setState({
                                                                name: event.target.value
                                                            });
                                                        }}
                                                        />
                                                    </FormItem>
                                                </Col>
                                                <Col span={3}>
                                                    <Button type="primary" htmlType="submit" onClick={()=> this.getImprestSearch(0)}><Icon type="search" />查询</Button>
                                                </Col>
                                                <Col span={3}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.NewInPay()} ><Icon type="plus" />新建</Button>
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
                                        <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={paginationProps} />
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="出账管理" key="2">
                        <Row gutter={0}>
                                <Col className="gutter-row" span={24}>
                                    <div className="gutter-box">
                                        <Card bordered={false}>
                                            <Form {...formItemLayout}>
                                            <Row>
                                                <Col span={6}>
                                                    <FormItem label="出账时间" colon={false}>
                                                        <DatePicker onChange={this.onChange.bind(this)} />
                                                    </FormItem>
                                                </Col>
                                                <Col span={6}>
                                                    <FormItem label="出账人" colon={false}>
                                                        <input placeholder="请输入出账人" onChange={ event=>{
                                                    this.setState({
                                                        name: event.target.value
                                                      });
                                                }}
                                                        />
                                                    </FormItem>
                                                </Col>
                                                <Col span={3}>
                                                    <Button type="primary" htmlType="submit" onClick={()=> this.getImprestSearch(1)}><Icon type="search" />查询</Button>
                                                </Col>
                                                <Col span={3}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.NewOutPay()}><Icon type="plus" />新建</Button>
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
                                        <Table columns={columns2} dataSource={dataSource} rowKey={record => record.id} pagination={paginationProps} />
                                        </Card>
                                    </div>
                                </Col>
                            </Row>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const Beiyongjin = Form.create()(Beiyongjins);

export default Beiyongjin;